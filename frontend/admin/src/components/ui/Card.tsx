import type { HTMLAttributes } from "react";
import type React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
}

const Card: React.FC<Props> = ({
    className,
    children,
    ...props
}) => {
    return ( 
        <div
            className={twMerge(
                "bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg py-3 px-3",
                className
            )}
            {...props}
        >
            {children}
        </div>
     );
}
 
export default Card;