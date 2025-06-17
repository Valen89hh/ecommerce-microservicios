import Image from "next/image";
import { getPublicProducts } from "../../actions/getPublicProducts";
import Link from "next/link";
import { Product } from "@/types/models-database";
import ButtonBuyProduct from "./ButtonBuyProduct";

const ProductList = async() => {
    const result = await getPublicProducts()

    if(!result.success) return <p>{result.error}</p>
    const products = result.data
    return ( 
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-2 space-x-2">
            {products.map((product: Product) => (

            <div key={product.id} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
                <Image
                    alt=""
                    src={product.image}
                    width={600}
                    height={300}
                />
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 my-2">{product.description}</p>
                <ButtonBuyProduct product={product}/>
            </div>
            ))}
      </section>
     );
}
 
export default ProductList;