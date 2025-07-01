import type React from "react";
import { twMerge } from "tailwind-merge";

interface Props{
    className?: string
}

const Loader: React.FC<Props> = ({
    className
}) => {
  return (
    <div 
        className={twMerge(
            "w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full",
            className
        )} 
    />
  );
};

export default Loader;
