'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Leaf, Heart, Zap, Sparkles, Droplet, Package } from 'lucide-react';
import { clsx } from 'clsx';

const Categories = () => {
  const router = useRouter();

  const categories = [
    {
      id: 1,
      name: 'Aceites Naturales',
      description: 'Aceites puros y orgánicos',
      icon: Droplet,
      color: 'amber',
      slug: 'Aceites Naturales',
    },
    {
      id: 2,
      name: 'Superalimentos',
      description: 'Alimentos ricos en nutrientes',
      icon: Leaf,
      color: 'emerald',
      slug: 'Superalimentos',
    },
    {
      id: 3,
      name: 'Suplementos',
      description: 'Vitaminas y minerales naturales',
      icon: Heart,
      color: 'rose',
      slug: 'Suplementos',
    },
    {
      id: 4,
      name: 'Tés e Infusiones',
      description: 'Variedades orgánicas y medicinales',
      icon: Package,
      color: 'green',
      slug: 'Tés e Infusiones',
    },
    {
      id: 5,
      name: 'Vitaminas',
      description: 'Esenciales para tu salud',
      icon: Zap,
      color: 'orange',
      slug: 'Vitaminas',
    },
    {
      id: 6,
      name: 'Granos y Cereales',
      description: 'Integrales y orgánicos',
      icon: Sparkles,
      color: 'yellow',
      slug: 'Granos y Cereales',
    },
  ];

  const handleCategoryClick = (categorySlug: string) => {
    router.push(`/products?category=${encodeURIComponent(categorySlug)}`);
  };

  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Categorías Principales
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra exactamente lo que necesitas para tu bienestar
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            const bgColor = `bg-${category.color}-100`;
            const iconColor = `text-${category.color}-600`;

            return (
              <div
                key={category.id}
                className="group cursor-pointer"
                onClick={() => handleCategoryClick(category.slug)}
              >
                <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                  <div
                    className={clsx(
                      'w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform mx-auto',
                      bgColor
                    )}
                  >
                    <Icon className={clsx('w-6 h-6 md:w-8 md:h-8', iconColor)} />
                  </div>
                  <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 text-center">
                    {category.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 text-center line-clamp-2">
                    {category.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-emerald-600 hover:text-emerald-700 p-0 w-full text-xs md:text-sm"
                  >
                    Explorar →
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories" passHref>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 w-full sm:w-auto"
              >
                Ver Todas las Categorías
              </Button>
            </Link>
            <Link href="/products" passHref>
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto"
              >
                Ver Todos los Productos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
