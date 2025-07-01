
import { Leaf, Users, Award, Heart } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Compromiso Natural',
      description: 'Todos nuestros productos son 100% naturales y orgánicos, sin químicos dañinos.'
    },
    {
      icon: Users,
      title: 'Comunidad Saludable',
      description: 'Creamos una comunidad dedicada al bienestar y la vida saludable.'
    },
    {
      icon: Award,
      title: 'Calidad Premium',
      description: 'Seleccionamos solo los mejores productos con certificaciones internacionales.'
    },
    {
      icon: Heart,
      title: 'Bienestar Integral',
      description: 'Nos preocupamos por tu salud física, mental y emocional.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sobre NaturSalud
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos más que una tienda de productos naturales. Somos tu compañero 
              en el camino hacia una vida más saludable y equilibrada.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nuestra Historia
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                NaturSalud nació en 2020 con una misión clara: hacer que los productos 
                naturales y saludables sean accesibles para todos. Fundada por un equipo 
                de profesionales apasionados por la salud y el bienestar, nuestra empresa 
                ha crecido hasta convertirse en una de las tiendas online de productos 
                naturales más confiables.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Creemos firmemente que la naturaleza nos proporciona todo lo que necesitamos 
                para mantener nuestro cuerpo y mente en perfecto equilibrio. Por eso, 
                trabajamos directamente con productores locales y proveedores certificados 
                para ofrecerte solo lo mejor.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Cada producto en nuestro catálogo ha sido cuidadosamente seleccionado 
                y probado por nuestro equipo de expertos en nutrición y bienestar.
              </p>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg"
                alt="Equipo NaturSalud"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Los principios que guían cada decisión que tomamos y cada producto que ofrecemos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center bg-white p-8 rounded-lg shadow-md">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
                    <IconComponent className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conoce a las personas que hacen posible tu bienestar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'María González',
                role: 'Fundadora & CEO',
                image: '/placeholder.svg',
                description: 'Nutricionista con 15 años de experiencia en productos naturales.'
              },
              {
                name: 'Carlos Rodríguez',
                role: 'Director de Calidad',
                image: '/placeholder.svg',
                description: 'Experto en certificaciones orgánicas y control de calidad.'
              },
              {
                name: 'Ana Martínez',
                role: 'Especialista en Bienestar',
                image: '/placeholder.svg',
                description: 'Coach de vida saludable y consultora en productos naturales.'
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-emerald-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
