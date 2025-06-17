import type { ButtonHTMLAttributes } from "react";
import type React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
}

const ButtonPrimary: React.FC<Props> = ({
    className,
    children,
    ...props
}) => {
    return ( 
        <button
            className={twMerge(
                "cursor-pointer bg-primary dark:bg-dark-primary rounded-sm px-2 py-2",
                className
            )}
            {...props}
        >
            {children}
        </button>
     );
}
 
export default ButtonPrimary;