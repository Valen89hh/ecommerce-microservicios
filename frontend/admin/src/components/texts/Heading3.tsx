import type React from "react";
import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLHeadingElement>{
    children?: React.ReactNode,
    className?: string

}

const Heading3: React.FC<Props> = ({
    children,
    className,
    ...props
}) => {
    return ( 
        <h3 
            className={twMerge(
                "text-lg font-medium text-text dark:text-dark-text", 
                className
            )}
            {...props}
        >
            {children}
        </h3>
     );
}
 
export default Heading3;