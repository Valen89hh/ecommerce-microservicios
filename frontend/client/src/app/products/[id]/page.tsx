// app/products/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Award, Heart, ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { notFound } from 'next/navigation';



export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;

    const res = await fetch(`http://backend:8000/api/products/${id}`);
    if (!res.ok) return notFound();

    const data = await res.json();
    const product = data.data;
    console.log(product)
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/products">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver a Productos
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imágenes */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.images[0].image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image: any) => (
                <div key={image.image_path} className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                  <img src={image.image_url} alt={`${product.name} ${image.image_path + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Información */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category.name}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(4.6)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  4.6 ({3} reseñas)
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-emerald-600">${product.sale_price}</span>
                <span className="text-xl text-gray-500 line-through">${product.discounted_price}</span>
                <Badge variant="destructive">
                  Ahorro: ${(product.sale_price - product.discounted_price).toFixed(2)}
                </Badge>
              </div>

              <p className="text-gray-600 mb-6">{product.short_description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {product.certificates.map((cert: any) => (
                <Badge key={cert.type} variant="outline" className="flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {cert.type}
                </Badge>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="text-sm text-gray-500">({product.available_units} disponibles)</div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Agregar al Carrito
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                  Comprar Ahora
                </Button>
                <Button variant="outline" className="px-6 py-3 border-2 border-gray-300 hover:border-red-300 hover:bg-red-50 transition-all duration-200">
                  <Heart className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}