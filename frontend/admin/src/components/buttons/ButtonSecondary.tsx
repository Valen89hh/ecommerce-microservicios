import type { ButtonHTMLAttributes } from "react";
import type React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
}

const ButtonSecondary: React.FC<Props> = ({
    className,
    children,
    ...props
}) => {
    return ( 
        <button
            className={twMerge(
                "cursor-pointer bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-sm px-2 py-2",
                className
            )}
            {...props}
        >
            {children}
        </button>
     );
}
 
export default ButtonSecondary;