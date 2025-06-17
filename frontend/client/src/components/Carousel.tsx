"use client"
import React, { useState } from "react";

interface CarouselProps {
  items: string[]; // puedes usar cualquier tipo, aquí usamos strings como imágenes
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-2xl shadow-lg">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((src, idx) => (
          <div className="min-w-full h-64 bg-gray-200 flex items-center justify-center" key={idx}>
            <img src={src} alt={`Slide ${idx + 1}`} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>

      {/* Controles */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white">
        ◀
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white">
        ▶
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {items.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${currentIndex === idx ? "bg-blue-600" : "bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
