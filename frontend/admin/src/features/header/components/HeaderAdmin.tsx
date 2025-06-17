import FieldSearch from "./FieldSearch";
import Notificaction from "./Notification";
import SelectLanguaje from "./SelectLanguage";
import ThemeToggle from "./ThemeToggle";

const HeaderAdmin = () => {
    return ( 
        <header className="bg-card border-b border-border dark:border-dark-border  dark:bg-dark-card w-full flex items-center justify-between px-6 py-3">
            <FieldSearch/>
            <div className="flex items-center ">
                <Notificaction/>
                <ThemeToggle/>
                <div className="h-6 mx-2 border-r border-border dark:border-dark-border"></div>
                <SelectLanguaje/>
            </div>
        </header>
     );
}
 
export default HeaderAdmin;