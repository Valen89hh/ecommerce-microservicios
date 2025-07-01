'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { ArrowRight, Shield, Truck, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80',
      alt: 'Productos naturales saludables',
    },
    {
      url: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=800&q=80',
      alt: 'Suplementos premium',
    },
    {
      url: 'https://images.unsplash.com/photo-1550572017-edd951aa8630?auto=format&fit=crop&w=800&q=80',
      alt: 'Vitaminas naturales',
    },
    {
      url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      alt: 'Productos orgánicos',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Vive una vida más
                <span className="text-emerald-600 block">saludable</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Descubre nuestra selección de productos 100% naturales, suplementos premium y 
                alimentos orgánicos que transformarán tu bienestar.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/products" passHref>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full sm:w-auto"
                >
                  Explorar Productos
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/products" passHref>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all w-full sm:w-auto"
                >
                  Ver Ofertas
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
              <div className="text-center">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-xs sm:text-sm font-medium text-gray-700">100% Natural</p>
              </div>
              <div className="text-center">
                <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-xs sm:text-sm font-medium text-gray-700">Envío Gratis</p>
              </div>
              <div className="text-center">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-xs sm:text-sm font-medium text-gray-700">Calidad Premium</p>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl h-64 sm:h-80 lg:h-96">
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                    index === currentSlide ? 'translate-x-0' :
                    index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Blur decoration */}
            <div className="hidden lg:block absolute -top-4 -right-4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="hidden lg:block absolute -bottom-8 -left-4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
