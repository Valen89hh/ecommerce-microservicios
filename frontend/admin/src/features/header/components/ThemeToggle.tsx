import { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react'; 
import { useThemeStore } from '../../../store/useThemeStore';
const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(()=>{
    console.log("Theme: ", theme)
  }, [theme])

  return (
    <button onClick={toggleTheme} className="p-2 cursor-pointer text-muted dark:text-dark-muted rounded-full hover:bg-background dark:hover:bg-dark-background transition">
      {theme === 'dark' ? <Sun size={20}/> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
