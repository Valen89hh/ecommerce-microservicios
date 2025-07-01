<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function totalProducts()
    {
        try {
            $total = Product::count();

            return $this->successResponse([
                'total_products' => $total
            ],"Total de productos obtenidos correctamente");
        } catch (\Throwable $th) {
            return $this->errorResponse('No se pudo obtener el total de productos', [$th->getMessage()], 404);
        }
    }

    public function outOfStockProducts()
    {
        try {
            $outOfStockCount = Product::where(function ($query) {
            $query->whereColumn('stock', '<', 'available_units')
                  ->orWhere('stock', 0);
            })->count();

            return $this->successResponse([
                'out_of_stock_products' => $outOfStockCount
            ],"Total de productos fuera de stock obtenidos correctamente");
        } catch (\Throwable $th) {
            return $this->errorResponse('No se pudo obtener el total de productos fuera de stock', [$th->getMessage()], 404);
        }
        
    }

    public function lowStockProducts()
    {
        try {
            $lowStockCount = Product::whereColumn('stock', '<=', 'minimun_stock')->count();

            return $this->successResponse([
                'low_stock_products' => $lowStockCount
            ],"Total de productos bajo de stock obtenidos correctamente");
        } catch (\Throwable $th) {
            return $this->errorResponse('No se pudo obtener el total de productos bajo de stock', [$th->getMessage()], 404);
        }
    }

    public function pagination(Request $request)
    {
        $query = Product::with([
            'category:id,name',
            'images',
            'certificates.files'
        ]);

        // Filtro por nombre del producto (no sensible a mayúsculas)
        if ($request->filled('name')) {
            $name = strtolower($request->input('name'));
            $query->whereRaw('LOWER(name) LIKE ?', ["%{$name}%"]);
        }

        // Filtro por categoría
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }

        // Filtro por fechas
        if ($request->filled('created_from')) {
            $query->whereDate('created_at', '>=', $request->input('created_from'));
        }

        if ($request->filled('created_to')) {
            $query->whereDate('created_at', '<=', $request->input('created_to'));
        }

        // Filtro por rango de precio (sale_price)
        if ($request->filled('price_from')) {
            $query->where('sale_price', '>=', $request->input('price_from'));
        }

        if ($request->filled('price_to')) {
            $query->where('sale_price', '<=', $request->input('price_to'));
        }

        // Filtro por rango de stock
        if ($request->filled('stock_from')) {
            $query->where('stock', '>=', $request->input('stock_from'));
        }

        if ($request->filled('stock_to')) {
            $query->where('stock', '<=', $request->input('stock_to'));
        }

        // Filtro por estado (pueden venir varios)
        if ($request->filled('status') && is_array($request->input('status'))) {
            $statuses = $request->input('status');

            $query->where(function ($q) use ($statuses) {
                foreach ($statuses as $status) {
                    $q->orWhere(function ($subQ) use ($status) {
                        if ($status === 'available') {
                            $subQ->where('is_active', true);
                        } elseif ($status === 'not_available') {
                            $subQ->where('is_active', false);
                        } elseif ($status === 'low_stock') {
                            $subQ->whereColumn('stock', '<=', 'minimun_stock');
                        } elseif ($status === 'out_of_stock') {
                            $subQ->where('available_units', '=', 0);
                        }
                    });
                }
            });
        }

        // Paginación
        $perPage = $request->input('per_page', 10);
        $products = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return $this->successResponse($products, 'Productos obtenidos correctamente');
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:categories,id',
            'employee_id' => 'nullable|exists:employees,id',
            'name' => 'required|string',
            'short_description' => 'required|string',
            'full_description' => 'required|string',

            'cost_price' => 'required|numeric',
            'sale_price' => 'required|numeric',
            'discounted_price' => 'nullable|numeric',

            'stock' => 'required|numeric',
            'maximun_stock' => 'required|numeric',
            'minimun_stock' => 'required|numeric',
            'unit_amount' => 'required|numeric',
            'available_units' => 'required|numeric',
            'unit_measurement' => 'required|in:u,g,kg,ml,l',

            'weight' => 'required|numeric',
            'length' => 'required|numeric',
            'width' => 'required|numeric',
            'height' => 'required|numeric',
            'is_perceptible' => 'boolean',
            'expiration_date' => 'nullable|date',
            'storage_type' => 'required|in:refrigerated,frozen,ambient,dry,supplement,light_protected',
            'shipping_unit' => 'required|string',
            'is_active' => 'boolean',

            'images' => 'nullable|array',
            'images.*.image_path' => 'required_with:images|string',
            'images.*.image_url' => 'required_with:images|string',

            'certificates' => 'nullable|array',
            'certificates.*.certifying_body' => 'required|string',
            'certificates.*.certificate_number' => 'required|string',
            'certificates.*.type' => 'required|string',
            'certificates.*.issue_date' => 'required|date',
            'certificates.*.expiration_date' => 'required|date',
            'certificates.*.files' => 'nullable|array',
            'certificates.*.files.*.file_path' => 'required|string',
            'certificates.*.files.*.file_url' => 'required|string',
            'certificates.*.files.*.file_type' => 'required|in:image,pdf',
        ]);

        if($validator->fails()){
            return $this->errorResponse("Validación Fallida", $validator->errors(), 400);
        }

        try {
            DB::beginTransaction();

            $product = Product::create($validator->valid());

            // Guardar imágenes
            if (!empty($request->images)) {
                foreach ($request->images as $img) {
                    $product->images()->create([
                        'image_path' => $img['image_path'],
                        'image_url' => $img['image_url'],
                    ]);
                }
            }

            // Guardar certificados y sus archivos
            if (!empty($request->certificates)) {
                foreach ($request->certificates as $certData) {
                    $certificate = $product->certificates()->create([
                        'certifying_body' => $certData['certifying_body'],
                        'certificate_number' => $certData['certificate_number'],
                        'type' => $certData['type'],
                        'issue_date' => $certData['issue_date'],
                        'expiration_date' => $certData['expiration_date'],
                    ]);

                    if (!empty($certData['files'])) {
                        foreach ($certData['files'] as $file) {
                            $certificate->files()->create([
                                'file_path' => $file['file_path'],
                                'file_url' => $file['file_url'],
                                'file_type' => $file['file_type'],
                            ]);
                        }
                    }
                }
            }

            DB::commit();
            return $this->successResponse($product->load('images', 'certificates.files'), 'Producto creado correctamente', 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return $this->errorResponse('Error al crear el producto', [$th->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $product = Product::with([
                'category:id,name',
                'images',
                'certificates.files'
            ])->findOrFail($id);
            return $this->successResponse($product, 'Producto encontrado');
        } catch (\Throwable $th) {
            return $this->errorResponse('Producto no encontrado', [$th->getMessage()], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $product = Product::with(['images', 'certificates.files'])->findOrFail($id);

            // Actualizar campos básicos
            $product->update($request->only([
                'category_id',
                'employee_id',
                'name',
                'short_description',
                'full_description',
                'cost_price',
                'sale_price',
                'discounted_price',
                'stock',
                'maximun_stock',
                'minimun_stock',
                'unit_amount',
                'available_units',
                'unit_measurement',
                'weight',
                'length',
                'width',
                'height',
                'is_perceptible',
                'expiration_date',
                'storage_type',
                'shipping_unit',
                'is_active',
            ]));

            /*
            |--------------------------------------------------------------------------
            | IMÁGENES DEL PRODUCTO
            |--------------------------------------------------------------------------
            */
            if($request->filled('images')){
                $imageIdsFromRequest = collect($request->input('images'))->pluck('id')->filter()->all();
                $existingImages = $product->images;
    
                // Eliminar imágenes que ya no están en el request
                $existingImages->each(function ($img) use ($imageIdsFromRequest) {
                    if (!in_array($img->id, $imageIdsFromRequest)) {
                        $img->delete();
                    }
                });
    
                // Crear o actualizar imágenes
                foreach ($request->input('images', []) as $imgData) {
                    if (!empty($imgData['id'])) {
                        $img = $product->images()->find($imgData['id']);
                        if ($img) {
                            $img->update([
                                'image_path' => $imgData['image_path'],
                                'image_url'  => $imgData['image_url'],
                            ]);
                        }
                    } else {
                        $product->images()->create([
                            'image_path' => $imgData['image_path'],
                            'image_url'  => $imgData['image_url'],
                        ]);
                    }
                }
            }

            /*
            |--------------------------------------------------------------------------
            | CERTIFICADOS Y ARCHIVOS
            |--------------------------------------------------------------------------
            */
            if($request->filled('certificates')){

                $certificateIdsFromRequest = collect($request->input('certificates'))->pluck('id')->filter()->all();
    
                // Eliminar certificados que ya no están
                $product->certificates->each(function ($cert) use ($certificateIdsFromRequest) {
                    if (!in_array($cert->id, $certificateIdsFromRequest)) {
                        $cert->files()->delete();
                        $cert->delete();
                    }
                });
    
                foreach ($request->input('certificates', []) as $certData) {
                    if (!empty($certData['id'])) {
                        $certificate = $product->certificates()->find($certData['id']);
                        if ($certificate) {
                            $certificate->update([
                                'certifying_body'    => $certData['certifying_body'],
                                'certificate_number' => $certData['certificate_number'],
                                'type' => $certData['type'],
                                'issue_date'         => $certData['issue_date'],
                                'expiration_date'    => $certData['expiration_date'],
                            ]);
    
                            // Archivos: misma lógica de actualizar/crear/eliminar
                            if(isset($certData['files'])){
                                $fileIdsFromRequest = collect($certData['files'])->pluck('id')->filter()->all();
        
                                $certificate->files->each(function ($file) use ($fileIdsFromRequest) {
                                    if (!in_array($file->id, $fileIdsFromRequest)) {
                                        $file->delete();
                                    }
                                });
        
                                foreach ($certData['files'] as $fileData) {
                                    if (!empty($fileData['id'])) {
                                        $file = $certificate->files()->find($fileData['id']);
                                        if ($file) {
                                            $file->update([
                                                'file_path' => $fileData['file_path'],
                                                'file_url' => $fileData['file_url'],
                                                'file_type' => $fileData['file_type'],
                                            ]);
                                        }
                                    } else {
                                        $certificate->files()->create([
                                            'file_path' => $fileData['file_path'],
                                            'file_url' => $fileData['file_url'],
                                            'file_type' => $fileData['file_type'],
                                        ]);
                                    }
                                }
                            }
                        }
                    } else {
                        // Crear nuevo certificado
                        $certificate = $product->certificates()->create([
                            'certifying_body'    => $certData['certifying_body'],
                            'certificate_number' => $certData['certificate_number'],
                            'type' => $certData['type'],
                            'issue_date'         => $certData['issue_date'],
                            'expiration_date'    => $certData['expiration_date'],
                        ]);
    
                        // Crear archivos
                        foreach ($certData['files'] ?? [] as $fileData) {
                            $certificate->files()->create([
                                'file_path' => $fileData['file_path'],
                                'file_url' => $fileData['file_url'],
                                'file_type' => $fileData['file_type'],
                            ]);
                        }
                    }
                }
            }

            DB::commit();

            return $this->successResponse($product->fresh(['images', 'certificates.files']), 'Producto actualizado correctamente');
        } catch (\Throwable $th) {
            DB::rollBack();
            return $this->errorResponse('Error al actualizar el producto', [$th->getMessage()], 500);
        }
    }


    public function destroy($id)
    {
        try {
            $product = Product::with(['images', 'certificates.files'])->findOrFail($id);

            // Eliminar imágenes relacionadas
            foreach ($product->images as $image) {
                $image->delete();
            }

            // Eliminar certificados y sus archivos relacionados
            foreach ($product->certificates as $certificate) {
                foreach ($certificate->files as $file) {
                    $file->delete();
                }
                $certificate->delete();
            }

            // Eliminar el producto
            $product->delete();

            return $this->successResponse(null, 'Producto eliminado correctamente');
        } catch (\Throwable $th) {
            return $this->errorResponse('Error al eliminar el producto', [$th->getMessage()], 500);
        }
    }

}
