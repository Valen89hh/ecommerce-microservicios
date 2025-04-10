import Carousel from "@/components/Carousel";
import Image from "next/image";
import Link from "next/link";

export default async function Home() { 
  const data = await fetch("http://backend:8000/api/products")
  const products = await data.json()
  //console.log(products)

  return (
    <main className="min-h-screen container mx-auto px-6">
      <h1 className="text-2xl text-center font-bold my-6 text-gray-800">Compra tus Libros Premiun</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-2 space-x-2">
        {products.map((product: any) => (

          <div key={product.id} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
            <Image
              alt=""
              src={product.imagen}
              width={600}
              height={300}
            />
            <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 my-2">{product.description}</p>
            <Link href={"/payaout"}>
              <button className="p-2 rounded-md cursor-pointer bg-sky-600 text-white font-semibold">👉 Comprar Libro ${product.price}</button>
            </Link>
          </div>
        ))}
      </section>
    
    </main>
  );
}
