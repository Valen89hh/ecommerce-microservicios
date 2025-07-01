import type React from "react";
import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLHeadingElement>{
    children?: React.ReactNode,
    className?: string

}

const Heading1: React.FC<Props> = ({
    children,
    className,
    ...props
}) => {
    return ( 
        <h1 
            className={twMerge(
                "text-2xl font-semibold text-text dark:text-dark-text", 
                className
            )}
            {...props}
        >
            {children}
        </h1>
     );
}
 
export default Heading1;