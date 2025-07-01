import type { ButtonHTMLAttributes } from "react";
import type React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
}

const ButtonError: React.FC<Props> = ({
    className,
    children,
    ...props
}) => {
    return ( 
        <button
            className={twMerge(
                "cursor-pointer bg-tag-red-accent dark:bg-tag-red-accent rounded-sm px-2 py-2",
                className
            )}
            {...props}
        >
            {children}
        </button>
     );
}
 
export default ButtonError;