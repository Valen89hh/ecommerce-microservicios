'use client';

import { Leaf, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription submitted');
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Suscríbete a nuestro newsletter
            </h3>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
              Recibe las últimas ofertas, consejos de salud y novedades directamente en tu correo
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-white/20 border-white/30 text-white placeholder:text-emerald-100 focus:bg-white/30"
                required
              />
              <Button type="submit" className="bg-white text-emerald-600 hover:bg-gray-100">
                Suscribirse
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-600 rounded-full">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">NaturaSalud</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Tu tienda de confianza para productos naturales y saludables. 
              Comprometidos con tu bienestar desde 2020.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <Button key={index} variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-emerald-600">
                  <Icon className="w-5 h-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/products', label: 'Productos' },
                { href: '/categories', label: 'Categorías' },
                { href: '/products', label: 'Ofertas' },
                { href: '/about', label: 'Blog' },
                { href: '/about', label: 'Sobre Nosotros' },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Atención al Cliente</h4>
            <ul className="space-y-3">
              {[
                'Centro de Ayuda',
                'Envíos y Devoluciones',
                'Términos y Condiciones',
                'Política de Privacidad',
                'Preguntas Frecuentes',
                'Contacto'
              ].map((label, i) => (
                <li key={i}>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-400">info@natursalud.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-600 mt-1" />
                <span className="text-gray-400">
                  123 Calle Principal<br />
                  Ciudad, Estado 12345<br />
                  País
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 NaturSalud. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              {['Política de Privacidad', 'Términos de Servicio', 'Cookies'].map((label, i) => (
                <Link key={i} href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
