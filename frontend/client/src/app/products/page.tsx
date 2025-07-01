'use client';

import Link from 'next/link';
import {
  ShoppingCart,
  Search,
  Filter,
  ChevronDown,
  Grid,
  List,
  Star,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Nuestros Productos
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra amplia selección de productos naturales y saludables
          </p>
        </div>
      </section>

      {/* Filtros y búsqueda */}
      <section className="py-4 md:py-8 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Búsqueda y filtros */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 md:flex-none">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="icon">
                <Grid className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Selects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="aceites">Aceites Naturales</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subcategoría</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una subcategoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="coco">Aceite de Coco</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularidad</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a mayor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="hidden md:block">
              <label className="block text-sm font-medium text-gray-700 mb-2">Vista</label>
              <div className="flex border rounded-md">
                <Button variant="default" size="sm" className="rounded-r-none">
                  <Grid className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-l-none">
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Acciones</label>
              <Button variant="outline" className="w-full">
                Limpiar filtros
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Producto de muestra */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
            <div className="relative">
              <Link href="/product/1">
                <img
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"
                  alt="Aceite de Coco Orgánico"
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Oferta
              </div>
            </div>
            <div className="p-4">
              <div className="text-xs text-emerald-600 mb-1">Aceites Naturales → Coco</div>
              <Link href="/product/1">
                <h3 className="font-semibold text-gray-900 hover:text-emerald-600 transition line-clamp-2">
                  Aceite de Coco Orgánico
                </h3>
              </Link>
              <div className="flex items-center mt-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-xs text-gray-600">(124)</span>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-lg font-bold text-gray-900">$24.99</span>
                <span className="text-sm line-through text-gray-500">$29.99</span>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-emerald-600 text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Agregar
                </Button>
                <Link href="/product/1" className="flex-1">
                  <Button variant="outline" className="w-full">Ver</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
