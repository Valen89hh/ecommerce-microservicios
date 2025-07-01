import { Eye, EyeOff } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import type React from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    classNameContainer?: string;
}

const FieldPassword: React.FC<Props> = ({
    className,
    classNameContainer,
    ...props
}) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => setVisible((prev) => !prev);

    return (
        <div
            className={twMerge(
                `border-border dark:border-dark-border h-11
                transition-all
                focus-within:border-primary focus-within:dark:border-dark-primary
                bg-card dark:bg-dark-card border rounded-lg 
                px-2 flex items-center gap-1`,
                classNameContainer
            )}
        >
            <input
                type={visible ? "text" : "password"}
                {...props}
                className={twMerge(
                    "outline-none w-full h-full text-text dark:text-dark-text placeholder:text-dark-muted dark:placeholder:text-muted bg-transparent",
                    className
                )}
            />

            {/* Botón con animación de ícono */}
            <button
                type="button"
                onClick={toggleVisibility}
                className="p-1"
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={visible ? "eye-off" : "eye"}
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                    >
                        {visible ? (
                            <EyeOff size={20} className="text-muted dark:text-dark-muted" />
                        ) : (
                            <Eye size={20} className="text-muted dark:text-dark-muted" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </button>
        </div>
    );
};

export default FieldPassword;
