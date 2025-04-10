<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'imagen' => 'required|string',
            'price' => 'required|numeric|min:0'
        ]);

        if($validator->fails()){
            $data = [
                "message" => "Error en la validadción de los datos",
                "errors" => $validator->errors(),
                "status" => 404
            ];

            return response()->json($data, 400);
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'imagen' => $request->imagen,
            'price' => $request->price
        ]);

        if(!$product){
            $data = [
                "message" => "Error al crear el producto",
                "status" => 500
            ];

            return response()->json($data, 500);
        }
        
        $data = [
            "new_product" => $product,
            "status" => 201
        ];

        return response()->json($data, 201);
    }

    public function find($id)
    {
        $product = Product::find($id);

        if(!$product){
            $data = [
                "message" => "No se encontro el producto",
                "status" => 404
            ];

            return response()->json($data, 404);
        }
        
        $data = [
            "product" => $product,
            "status" => 200
        ];

        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if(!$product){
            $data = [
                "message" => "El producto no existe",
                "status" => 404
            ];

            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(),[
            'name' => 'string|max:255',
            'description' => 'string',
            'imagen' => 'string',
            'price' => 'numeric|min:0'
        ]);

        if($validator->fails()){
            $data = [
                "message" => "Error en la validaciones",
                "errors" => $validator->errors()
            ];

            return response()->json($data, 422);
        }

        if ($request->has('name')) $product->name = $request->name;
        if ($request->has('description')) $product->description = $request->description;
        if ($request->has('imagen')) $product->imagen = $request->imagen;
        if ($request->has('price')) $product->price = $request->price;

        $product->save();

        $data = [
            "message" => "Producto actualizado correctamente",
            "product" => $product
        ];

        return response()->json($data, 200);
    }

    public function remove($id)
    {
        $product = Product::find($id);

        if(!$product){
            $data = [
                "message" => "Producto no encontrado",
                "status" => 404
            ];

            return response()->json($data, 404);
        }

        $product->delete();

        $data = [
            "message" => "Producto $id eliminado correctamente",
            "status" => 200
        ];

        return response()->json($data, 200);
        
    }
}
