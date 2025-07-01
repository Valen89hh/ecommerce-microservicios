<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    use ApiResponse;

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'user_id' => 'nullable|exists:users,id',
            'recipient_name' => 'required|string',
            'recipient_phone' => 'required|string',
            'recipient_email' => 'required|email',
            'shipping_address' => 'required|string',
            'shipping_city' => 'required|string',
            'shipping_region' => 'nullable|string',
            'shipping_zip' => 'nullable|string',
            'shipping_country' => 'required|string',
            'payment_method' => 'required|in:mercado_pago,oxa_pay',
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        if($validator->fails()){
            return $this->errorResponse("Validación Fallida", $validator->errors(), 400);
        }


        try {
            DB::beginTransaction();

            $total = 0;
            $productsData = [];

            foreach ($request->products as $item) {
                $product = Product::findOrFail($item['product_id']);
                $quantity = $item['quantity'];
                $unitPrice = $product->sale_price;
                $totalPrice = $quantity * $unitPrice;

                $total += $totalPrice;

                $productsData[] = [
                    'product_id' => $product->id,
                    'product_snapshot_name' => $product->name,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'total_price' => $totalPrice,
                ];
            }

            $order = Order::create([
                'user_id' => $request->user_id,
                'recipient_name' => $request->recipient_name,
                'recipient_phone' => $request->recipient_phone,
                'recipient_email' => $request->recipient_email,
                'shipping_address' => $request->shipping_address,
                'shipping_city' => $request->shipping_city,
                'shipping_region' => $request->shipping_region,
                'shipping_zip' => $request->shipping_zip,
                'shipping_country' => $request->shipping_country,
                'payment_method' => $request->payment_method,
                'is_paid' => false,
                'total_amount' => $total,
                'status' => 'pending',
            ]);

            foreach ($productsData as $data) {
                $order->products()->create($data);
            }

            DB::commit();
            return $this->successResponse($order->load('products'), 'Orden creada con éxito', 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return $this->errorResponse('Error al crear la orden', [$e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $order = Order::with('products')->find($id);
        if (!$order) {
            return $this->errorResponse('Orden no encontrada', [], 404);
        }

        return $this->successResponse($order, 'Orden encontrada');
    }

    public function pagination(Request $request)
    {
        $query = Order::with('products');

        // Filtro múltiple para status (como arreglo)
        if ($request->filled('status') && is_array($request->status)) {
            $query->whereIn('status', $request->status);
        }

        // Filtro múltiple para payment_method (como arreglo)
        if ($request->filled('payment_method') && is_array($request->payment_method)) {
            $query->whereIn('payment_method', $request->payment_method);
        }

        if ($request->filled('is_paid')) {
            $query->where('is_paid', $request->input('is_paid'));
        }

        if ($request->filled('amount_from')) {
            $query->where('total_amount', '>=', $request->input('amount_from'));
        }

        if ($request->filled('amount_to')) {
            $query->where('total_amount', '<=', $request->input('amount_to'));
        }


        if ($request->filled('name')) {
            $name = strtolower($request->input('name'));
            $query->whereRaw('LOWER(recipient_name) LIKE ?', ["%{$name}%"]);
        }

        if ($request->filled('email')) {
            $query->where('recipient_email', $request->input('email'));
        }

        if ($request->filled('created_from')) {
            $query->whereDate('created_at', '>=', $request->input('created_from'));
        }

        if ($request->filled('created_to')) {
            $query->whereDate('created_at', '<=', $request->input('created_to'));
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->input('user_id'));
        }


        $perPage = $request->input('per_page', 10);
        $orders = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return $this->successResponse($orders, 'Órdenes obtenidas correctamente');
    }

    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'status' => 'required|in:pending,paid,processing,shipped,delivered,cancelled'
        ]);

        if($validator->fails()){
            return $this->errorResponse("Validación Fallida", $validator->errors(), 400);
        }


        $order = Order::with('products.product')->find($id);
        if (!$order) {
            return $this->errorResponse('Orden no encontrada', [], 404);
        }

        if($request->status === 'paid' && $order->status !== 'paid'){
            $order->is_paid = true;
        }

        // Si cambia a 'processing' y no se había procesado antes
        if ($request->status === 'processing' && $order->status !== 'processing') {
            foreach ($order->products as $orderProduct) {
                $product = $orderProduct->product;

                if (!$product) continue;

                $quantityOrdered = $orderProduct->quantity;
                $unitAmount = $product->unit_amount;

                // Total de stock a descontar (en stock real)
                $stockToDeduct = $quantityOrdered * $unitAmount;

                if ($product->stock < $stockToDeduct) {
                    return $this->errorResponse(
                        "Stock insuficiente para el producto: {$product->name}. Stock disponible: {$product->stock}, se requiere: {$stockToDeduct}",
                        [],
                        422
                    );
                }

                // Actualizar stock y available_units
                $product->stock -= $stockToDeduct;
                $product->available_units = $product->stock / $unitAmount;
                $product->save();
            }
        }

        $order->status = $request->status;
        $order->save();

        return $this->successResponse($order->load('products.product'), 'Estado actualizado correctamente');
    }


    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return $this->errorResponse('Orden no encontrada', [], 404);
        }

        $order->delete();
        return $this->successResponse(null, 'Orden eliminada correctamente');
    }
}
