import { useParams } from "react-router-dom";
import Loader from "../../../components/ui/Loader";
import { useEffect, useRef, useState } from "react";
import { getCategory } from "../services/categoryService";
import { toast } from "react-toastify";
import type { Category } from "../schemas/CategorySchema";
import CategoryForm from "../components/CategoryForm";
import SmallText from "../../../components/texts/SmallText";

const EditCategoryPage = () => {
    const {id} = useParams()
    const hasRun = useRef(false)
    const [category, setCategory] = useState<Category | null>(null)

    useEffect(()=>{
        if (hasRun.current) return
        hasRun.current = true

        async function initCateogory(id: string) {
            const res = await getCategory(id)
            if(res.success){
                 setCategory(res.data)
            }else{
                toast.error(res.error.message)
            }
        }

        if(id){
            initCateogory(id)
        }
    }, [id])

    if(category) return <CategoryForm category={category}/>

    return ( 
        <div className="w-full h-full flex justify-center items-center flex-col">
            <Loader/>
            <SmallText>Cargando...</SmallText>
        </div>
    );
}
 
export default EditCategoryPage;