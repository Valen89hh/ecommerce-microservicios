import type { InputHTMLAttributes } from "react";
import type React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    iconStart?: React.ReactNode,
    classNameContainer?: string
}

const Field: React.FC<Props> = ({
    className,
    classNameContainer,
    iconStart,
    ...props
}) => {
    const gridCols = iconStart ? "grid-cols-[auto_1fr]" : "grid-cols-[1fr]";

    return ( 
        <div
            className={twMerge(
                `border-border dark:border-dark-border h-11
                transition-all
                 focus-within:border-primary focus-within:dark:border-dark-primary
                 bg-card dark:bg-dark-card border rounded-lg 
                 px-2 grid items-center gap-1 ${gridCols}`,
                classNameContainer
            )}
        >
            {iconStart && iconStart}

            <input
                {...props}
                type="text"
                className={twMerge(
                    "outline-none w-full h-full text-text dark:text-dark-text placeholder:text-dark-muted dark:placeholder:text-muted bg-transparent",
                    className
                )}
            />
        </div>
    );
}

export default Field;
