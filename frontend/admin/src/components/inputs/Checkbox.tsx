import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";
import type { InputHTMLAttributes } from "react";
import SmallText from "../texts/SmallText";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  className?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bgCheckedColor?: string;     // ejemplo: "bg-blue-600"
  borderCheckedColor?: string; // ejemplo: "border-blue-600"
  borderColor?: string;        // ejemplo: "border-gray-400"
  iconColor?: string;          // ejemplo: "text-white"
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
  checked = false,
  onChange,
  bgCheckedColor="bg-primary",
  borderCheckedColor="border-primary",
  borderColor="border-primary",
  iconColor = "text-white",
  ...props
}) => {
  return (
    <label className="inline-flex items-center cursor-pointer space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer hidden"
        {...props}
      />

      {/* Visual */}
      <div
        className={twMerge(
          "w-4 h-4 border-2 rounded-xs flex items-center justify-center transition-colors duration-200",
          checked
            ? `${bgCheckedColor} ${borderCheckedColor}`
            : borderColor,
          className
        )}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Check size={12} className={iconColor} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {label && (
        <SmallText className="text-muted dark:text-dark-muted">{label}</SmallText>
      )}
    </label>
  );
};

export default Checkbox;
