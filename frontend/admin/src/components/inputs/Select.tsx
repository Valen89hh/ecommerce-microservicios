import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";
import SmallText from "../texts/SmallText";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  selectedValue: string | null;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  selectedValue,
  placeholder = "Select",
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (value: string) => {
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  const selectedLabel = options.find((o) => o.value === selectedValue)?.label;

  // Detectar clics fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className={twMerge("relative", className)}>
      {/* Input Container */}
      <div
        className={twMerge(
          "h-11 bg-card transition-all dark:bg-dark-card border rounded-lg px-2 grid grid-cols-[1fr_auto] items-center gap-1 cursor-pointer",
          isOpen
            ? "border-primary dark:border-dark-primary"
            : "border-border dark:border-dark-border"
        )}
        onClick={toggleDropdown}
      >
        <input
          type="text"
          value={selectedLabel ?? ""}
          placeholder={placeholder}
          readOnly
          className="outline-none w-full text-text dark:text-dark-text placeholder:text-dark-muted dark:placeholder:text-muted bg-transparent cursor-pointer"
        />

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className="text-muted dark:text-dark-muted" />
        </motion.div>
      </div>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-1 bg-card w-full dark:bg-dark-card border border-border dark:border-dark-border rounded-sm z-10 shadow min-w-max"
          >
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option.value)}
                className="hover:bg-background dark:hover:bg-dark-background px-2 py-2 cursor-pointer"
              >
                <SmallText>{option.label}</SmallText>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
