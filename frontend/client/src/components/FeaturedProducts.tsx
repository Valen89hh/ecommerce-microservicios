"use server"

import { Button } from '@/components/ui/button';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const FeaturedProducts = async() => {
  const res = await fetch("http://backend:8000/api/products/filter?per_page=5&page=1", {method: "POST"})
  const data = await res.json()
  const products = data.data.data

  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Productos Destacados
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección de productos más populares y recomendados
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product: any) => (
           <Link 
            key={product.id}
           href={"/products/"+product.id}>
            <div
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative group">
                  <img
                    src={product.images[0].image_url}
                    alt={product.name}
                    className="w-full h-48 md:h-64 object-cover"
                  />
                  <div className="absolute top-2 md:top-4 right-2 md:right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <div className="text-xs md:text-sm text-emerald-600 font-medium mb-2">
                    {product.category.name}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.short_description}
                  </p>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 md:w-4 md:h-4 ${
                            i < Math.floor(4.7)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-xs md:text-sm text-gray-600">
                      {4.7} (5)
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg md:text-xl font-bold text-emerald-600">
                        ${(Number(product.discounted_price) !== 0 && product.discounted_price) ? product.discounted_price : product.sale_price }
                      </span>
                      {Number(product.discounted_price) !== 0 && product.discounted_price && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.sale_price}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm md:text-base">
                    <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                    Agregar al Carrito
                  </Button>
                </div>
              </div>
           </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            >
              Ver Todos los Productos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
