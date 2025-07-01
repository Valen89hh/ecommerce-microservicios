import React, { useRef } from "react";
import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Calendar } from "lucide-react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classNameContainer?: string;
}

const FieldDate: React.FC<Props> = ({
  className,
  classNameContainer,
  value,
  onChange,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenDatePicker = () => {
    inputRef.current?.showPicker?.(); // Usamos showPicker si está disponible
    inputRef.current?.click(); // Fallback
  };

  return (
    <div
        className={twMerge(
            "border-border transition-all focus-within:border-primary focus-within:dark:border-dark-primary relative dark:border-dark-border h-11 bg-card dark:bg-dark-card border rounded-lg px-2 grid grid-cols-[1fr_auto] items-center gap-1",
            classNameContainer
        )}
        onClick={handleOpenDatePicker}
    >

        <input
            {...props}
            type="text"
            readOnly
            value={value}
            placeholder="yyyy-mm-dd"
            className={twMerge(
            "outline-none w-full text-text dark:text-dark-text placeholder:text-dark-muted dark:placeholder:text-muted",
            className
        )}
        />
        <Calendar size={18} className="text-muted dark:text-dark-muted"/>
        <input
        {...props}
        ref={inputRef}
        disabled={props.disabled}
        type="date"
        value={value}
        onChange={onChange}
        className="absolute inset-0 opacity-0 pointer-events-none"
      />
    </div>
  );
};

export default FieldDate;
