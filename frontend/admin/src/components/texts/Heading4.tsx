import type React from "react";
import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLHeadingElement>{
    children?: React.ReactNode,
    className?: string

}

const Heading4: React.FC<Props> = ({
    children,
    className,
    ...props
}) => {
    return ( 
        <h4 
            className={twMerge(
                "font-medium text-text dark:text-dark-text", 
                className
            )}
            {...props}
        >
            {children}
        </h4>
     );
}
 
export default Heading4;