import type React from "react";
import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLSpanElement>{
    children?: React.ReactNode,
    className?: string

}

const Caption: React.FC<Props> = ({
    children,
    className,
    ...props
}) => {
    return ( 
        <span
            className={twMerge(
                "text-xs font-medium text-text dark:text-dark-text", 
                className
            )}
            {...props}
        >
            {children}
        </span>
     );
}
 
export default Caption;