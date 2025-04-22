"use client"
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types/models-database";
import { useRouter } from "next/navigation";

const ButtonBuyProduct = ({
    product
}: {
    product: Product
}) => {
    const router = useRouter()
    const {addToCart} = useCartStore()

    const onBuy = () => {
        addToCart({
            product,
            amount: 1
        })
        router.push("/checkout")
    }
     
    return ( 
        <button onClick={onBuy} className="p-2 rounded-md cursor-pointer bg-sky-600 text-white font-semibold">👉 Comprar Producto ${product.price}</button>
     );
}
 
export default ButtonBuyProduct;