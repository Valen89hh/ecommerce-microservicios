'use client';

import { Shield, Truck, Award, Heart, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Benefits = () => {
  const benefits = [
    {
      icon: Shield,
      title: '100% Natural',
      description: 'Todos nuestros productos están certificados como naturales y libres de químicos dañinos.',
    },
    {
      icon: Truck,
      title: 'Envío Gratuito',
      description: 'Envío gratuito en pedidos superiores a $50. Entrega rápida y segura a tu puerta.',
    },
    {
      icon: Award,
      title: 'Calidad Premium',
      description: 'Productos de la más alta calidad, respaldados por certificaciones internacionales.',
    },
    {
      icon: Heart,
      title: 'Bienestar Garantizado',
      description: 'Garantía de satisfacción del 100% o te devolvemos tu dinero.',
    },
    {
      icon: Clock,
      title: 'Entrega Rápida',
      description: 'Procesamos y enviamos tu pedido en menos de 24 horas.',
    },
    {
      icon: Users,
      title: 'Soporte Experto',
      description: 'Nuestro equipo de especialistas en salud natural está aquí para ayudarte.',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir NaturSalud?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprometidos con tu bienestar y satisfacción en cada paso del camino
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            ¿Listo para comenzar tu viaje hacia una vida más saludable?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Únete a miles de personas que ya han transformado su bienestar con nuestros productos naturales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3" size="lg">
                Explorar Productos
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-3"
              >
                Conoce Nuestra Historia
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
