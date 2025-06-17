import type React from "react";
import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLHeadingElement>{
    children?: React.ReactNode,
    className?: string

}

const Title: React.FC<Props> = ({
    children,
    className,
    ...props
}) => {
    return ( 
        <h1 
            className={twMerge(
                "text-3xl font-bold text-text dark:text-dark-text", 
                className
            )}
            {...props}
        >
            {children}
        </h1>
     );
}
 
export default Title;