<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    use ApiResponse;
    // Listar todas las categorías
    public function index()
    {
        return $this->successResponse([
            'categories' => Category::all()
        ], "Categorias obtenidas correctamente");
    }

    // Listar las categorias con paginacion
    public function pagination(Request $request)
    {
        $query = Category::query();

        // Filtro por nombre (parcial y no sensible a mayúsculas)
        if ($request->filled('name')) {
            $name = strtolower($request->input('name'));
            $query->whereRaw('LOWER(name) LIKE ?', ["%{$name}%"]);
        }

        // Filtro por fechas
        if ($request->filled('created_from')) {
            $query->whereDate('created_at', '>=', $request->input('created_from'));
        }

        if ($request->filled('created_to')) {
            $query->whereDate('created_at', '<=', $request->input('created_to'));
        }

        // Parámetros de paginación
        $perPage = $request->input('per_page', 10);
        $categories = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return $this->successResponse($categories, 'Categorías obtenidas correctamente');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|unique:categories',
                'description' => 'nullable|string',
            ]);

            $category = Category::create($validated);

            return $this->successResponse($category, 'Categoría creada correctamente', 201);
        } catch (\Throwable $th) {
            return $this->errorResponse('Error al crear la categoría', [$th->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $category = Category::findOrFail($id);
            return $this->successResponse($category, 'Categoría encontrada');
        } catch (\Throwable $th) {
            return $this->errorResponse('Categoría no encontrada', [$th->getMessage()], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $category = Category::findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|unique:categories,name,' . $category->id,
                'description' => 'nullable|string',
            ]);

            $category->update($validated);

            return $this->successResponse($category, 'Categoría actualizada correctamente');
        } catch (\Throwable $th) {
            return $this->errorResponse('Error al actualizar la categoría', [$th->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->delete();

            return $this->successResponse(null, 'Categoría eliminada correctamente', 200);
        } catch (\Throwable $th) {
            return $this->errorResponse('Error al eliminar la categoría', [$th->getMessage()], 500);
        }
    }
}
