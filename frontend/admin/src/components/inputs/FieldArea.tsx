import type { TextareaHTMLAttributes } from "react";
import type React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    classNameContainer?: string
}

const FieldArea: React.FC<Props> = ({
    className,
    classNameContainer,
    ...props
}) => {
    return (
        <div
            className={twMerge(
                "border-border transition-all focus-within:border-primary focus-within:dark:border-dark-primary dark:border-dark-border bg-card dark:bg-dark-card border rounded-lg px-2 py-2 grid grid-cols-1 items-start gap-1",
                classNameContainer
            )}
        >

            <textarea
                {...props}
                className={twMerge(
                    "outline-none w-full h-15 resize-none text-text dark:text-dark-text placeholder:text-dark-muted dark:placeholder:text-muted bg-transparent",
                    className
                )}
            />
        </div>
    );
}

export default FieldArea;
