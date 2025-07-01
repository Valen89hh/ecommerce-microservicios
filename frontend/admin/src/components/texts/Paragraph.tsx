import type React from "react";
import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLParagraphElement>{
    children?: React.ReactNode,
    className?: string

}

const Paragraph: React.FC<Props> = ({
    children,
    className,
    ...props
}) => {
    return ( 
        <p
            className={twMerge(
                "font-medium text-text dark:text-dark-text", 
                className
            )}
            {...props}
        >
            {children}
        </p>
     );
}
 
export default Paragraph;