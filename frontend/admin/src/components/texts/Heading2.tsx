import type React from "react";
import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLHeadingElement>{
    children?: React.ReactNode,
    className?: string

}

const Heading2: React.FC<Props> = ({
    children,
    className,
    ...props
}) => {
    return ( 
        <h2 
            className={twMerge(
                "text-xl font-semibold text-text dark:text-dark-text", 
                className
            )}
            {...props}
        >
            {children}
        </h2>
     );
}
 
export default Heading2;