<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponse;
use Aws\S3\S3Client;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class S3UploadController extends Controller
{
    use ApiResponse;

    public function upload(Request $request)
    {
        try {
            if(!$request->hasFile("file")){
                return $this->errorResponse($message = "La key debe ser 'file'", $code = 422);
            }
            // Validar que venga el archivo
            $validator = Validator::make($request->all(), [
                'file' => 'required|file|max:25600', // 25 MB
            ]);

            if($validator->fails()){
                return $this->errorResponse('Validación Fallida', $validator->errors(), 422);
            }

            $file = $request->file('file');

            $path = Storage::disk('s3')->put('uploads', $file);

            $url = Storage::disk('s3')->url($path);

            return $this->successResponse([
                'url' => $url,
                'path' => $path,
            ], 'Archivo subido exitosamente');

        } catch (\Exception $e) {
            return $this->errorResponse('Error al subir el archivo', [
                'details' => $e->getMessage()
            ]);
        }
    }

    public function destroy(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'paths' => 'required|array|min:1',
                'paths.*' => 'string'
            ]);

            if($validator->fails()){
                return $this->errorResponse('Validación Fallida', $validator->errors(), 422);
            }
            $paths = $request->paths;

            Storage::disk('s3')->delete($paths);

            return $this->successResponse(null, "Archivos eliminados correctamente", 200);

        }catch(\Exception $e){
            return $this->errorResponse('Error al eliminar los archivos', [
                'details' => $e->getMessage()
            ]);
        }
    }


}
