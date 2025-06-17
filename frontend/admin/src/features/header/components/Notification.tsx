import { Bell } from "lucide-react";

const Notificaction = () => {
    return ( 
        <button className="relative p-2 cursor-pointer text-muted dark:text-dark-muted rounded-full hover:bg-background dark:hover:bg-dark-background transition">
            <Bell className="text-muted dark:text-dark-muted" size={20}/>
            <span className="absolute top-1 right-1 w-2 h-2 bg-error dark:bg-dark-error rounded-full"></span>
        </button>
     );
}
 
export default Notificaction;