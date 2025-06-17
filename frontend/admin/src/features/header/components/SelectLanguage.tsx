import { ChevronDown } from "lucide-react";
import SmallText from "../../../components/texts/SmallText";
import { useState } from "react";

const SelectLanguaje = () => {
    const [language, setLanguage] = useState<"EN" | "ES">("EN")
    const [open, setOpen] = useState(false)
    const handleSelectLanguage = (lg: "EN" | "ES")=>{
        setOpen(false)
        setLanguage(lg)
    }
    return ( <div className="relative">
        <div 
            onClick={()=>setOpen(prev=>!prev)} 
            className="text-muted p-2 cursor-pointer rounded-sm hover:bg-background dark:hover:bg-dark-background dark:text-dark-muted flex items-center gap-2"
        >
            <SmallText>
                {language}
            </SmallText>
            <ChevronDown size={18}/>
        </div>
        {open && (
            <ul className="absolute overflow-hidden bg-card w-full dark:bg-dark-card border border-border dark:border-dark-border rounded-sm">
                <li className="hover:bg-background cursor-pointer dark:hover:bg-dark-background px-2 pb-1 pt-1" onClick={()=>handleSelectLanguage("EN")}><SmallText>EN</SmallText></li>
                <li className="hover:bg-background cursor-pointer dark:hover:bg-dark-background px-2 pb-2 pt-1" onClick={()=>handleSelectLanguage("ES")}><SmallText>ES</SmallText></li>
            </ul>
        )}
    </div> );
}
 
export default SelectLanguaje;