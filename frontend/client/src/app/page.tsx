import Benefits from "@/components/Benefits";
import Carousel from "@/components/Carousel";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import ProductList from "@/features/products/components/public/ProductList";
import Image from "next/image";
import Link from "next/link";

export default async function Home() { 
  //const data = await fetch("http://backend:8000/api/products")
  //const products = await data.json()
  //console.log(products)
  const products = [
    { 
      id: 1,
      imagen: "https://picsum.photos/600/300",
      name: "Producto 1",
      description: "Este es el proucto numero 1 de todo el pais",
      price: 34.99
    },
    { 
      id: 2,
      imagen: "https://picsum.photos/600/300",
      name: "Producto 2",
      description: "Este es el proucto numero 1 de todo el pais",
      price: 55.99
    },
    { 
      id: 3,
      imagen: "https://picsum.photos/600/300",
      name: "Producto 3",
      description: "Este es el proucto numero 1 de todo el pais",
      price: 14.99
    },
  ]

  return (
    <>
      <Hero/>
      <Categories/>
      <FeaturedProducts/>
      <Benefits/>
    </>
  );
}
