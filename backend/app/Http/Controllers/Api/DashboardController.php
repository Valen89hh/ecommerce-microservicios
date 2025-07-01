<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    use ApiResponse;

    public function summary()
    {
        try {
            $totalRevenue = Order::where('is_paid', true)->sum('total_amount');
            $totalSales = Order::sum('total_amount');
            $totalOrders = Order::count();
            $totalUsers = User::count();

            return $this->successResponse([
                'revenue' => $totalRevenue,
                'total_sales' => $totalSales,
                'total_orders' => $totalOrders,
                'total_users' => $totalUsers,
            ], 'Resumen del dashboard obtenido correctamente');
        } catch (\Throwable $th) {
            return $this->errorResponse('Error al obtener los datos del dashboard', [$th->getMessage()], 500);
        }
    }


    public function salesStatistics(Request $request)
    {
        try {
            $type = $request->input('type', 'daily'); // Por defecto diario
            $validTypes = ['daily', 'weekly', 'monthly', 'yearly'];

            if (!in_array($type, $validTypes)) {
                return $this->errorResponse('Tipo de estadística no válido. Debe ser: daily, weekly, monthly o yearly.', [], 422);
            }

            $query = Order::where('is_paid', true);

            $statistics = match ($type) {
                'daily' => $query->selectRaw("DATE(created_at) as date, SUM(total_amount) as sale")
                                ->groupByRaw("DATE(created_at)")
                                ->orderByRaw("DATE(created_at)")
                                ->get(),

                'weekly' => $query->selectRaw("YEAR(created_at) as year, WEEK(created_at, 1) as week, SUM(total_amount) as sale")
                                ->groupByRaw("YEAR(created_at), WEEK(created_at, 1)")
                                ->orderByRaw("YEAR(created_at), WEEK(created_at, 1)")
                                ->get()
                                ->map(fn ($row) => [
                                    'date' => "{$row->year}-W{$row->week}",
                                    'sale' => $row->sale,
                                ]),

                'monthly' => $query->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as date, SUM(total_amount) as sale")
                                ->groupByRaw("DATE_FORMAT(created_at, '%Y-%m')")
                                ->orderByRaw("DATE_FORMAT(created_at, '%Y-%m')")
                                ->get(),

                'yearly' => $query->selectRaw("YEAR(created_at) as date, SUM(total_amount) as sale")
                                ->groupByRaw("YEAR(created_at)")
                                ->orderByRaw("YEAR(created_at)")
                                ->get(),
            };

            return $this->successResponse($statistics, 'Estadísticas de ventas obtenidas correctamente');
        } catch (\Throwable $th) {
            return $this->errorResponse('Error al obtener las estadísticas de ventas', [$th->getMessage()], 500);
        }
    }

    public function bestSellingProducts()
    {
        try {
            $products = Product::select('products.name', 'products.stock', 'products.sale_price', DB::raw('SUM(order_product.quantity) as total_sold'))
                ->join('order_product', 'products.id', '=', 'order_product.product_id')
                ->join('orders', 'orders.id', '=', 'order_product.order_id')
                ->where('orders.is_paid', true)
                ->groupBy('products.id', 'products.name', 'products.stock', 'products.sale_price')
                ->orderByDesc('total_sold')
                ->limit(4)
                ->get();

            return $this->successResponse($products, 'Top 4 productos más vendidos obtenidos correctamente');
        } catch (\Throwable $th) {
            return $this->errorResponse('Error al obtener los productos más vendidos', [$th->getMessage()], 500);
        }
    }

    public function latestOrders()
    {
        try {
            $orders = Order::with('products') // Carga el usuario relacionado, puede ser null
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get();

            return $this->successResponse($orders, 'Últimas órdenes obtenidas correctamente');
        } catch (\Throwable $th) {
            return $this->errorResponse('Error al obtener las órdenes recientes', [$th->getMessage()]);
        }
    }

}
