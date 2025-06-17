import type React from "react";
import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLSpanElement>{
    children?: React.ReactNode,
    className?: string

}

const SmallText: React.FC<Props> = ({
    children,
    className,
    ...props
}) => {
    return ( 
        <span
            className={twMerge(
                "text-sm font-medium text-text dark:text-dark-text", 
                className
            )}
            {...props}
        >
            {children}
        </span>
     );
}
 
export default SmallText;