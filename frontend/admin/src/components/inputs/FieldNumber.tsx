/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown, ChevronUp } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import type React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    classNameContainer?: string;
}

const FieldNumber: React.FC<Props> = ({
    className,
    classNameContainer,
    onKeyDown,
    onPaste,
    onChange,
    value,
    step = 1,
    min,
    max,
    ...props
}) => {
    const parseValue = () => parseFloat(value as string) || 0;
    const stepNumber = typeof step === "string" ? parseFloat(step) : step;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = [
            "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete",
            "Home", "End", "Enter", "-"
        ];
        if (
            (e.ctrlKey || e.metaKey) &&
            ["a", "c", "v", "x"].includes(e.key.toLowerCase())
        ) return;

        if (!/[\d.-]/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }

        const val = (e.target as HTMLInputElement).value;
        if (e.key === "." && val.includes(".")) e.preventDefault();
        if (e.key === "-" && (val.includes("-") || (e.currentTarget.selectionStart ?? 0) > 0))
            e.preventDefault();
    };

    const roundToStepPrecision = (num: number, step: number): number => {
        const decimals = (step.toString().split(".")[1] || "").length;
        return parseFloat(num.toFixed(decimals));
    };


    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = e.clipboardData.getData("text");
        if (!/^[-]?\d*\.?\d*$/.test(paste)) {
            e.preventDefault();
        }
    };

    const clamp = (val: number) => {
        if (min !== undefined && val < +min) return +min;
        if (max !== undefined && val > +max) return +max;
        return val;
    };

    const handleIncrement = () => {
        const newValue = clamp(
            roundToStepPrecision(parseValue() + stepNumber, stepNumber)
        );
        onChange?.({ target: { value: newValue.toString() } } as any);
    };

    const handleDecrement = () => {
        const newValue = clamp(
            roundToStepPrecision(parseValue() - stepNumber, stepNumber)
        );
        onChange?.({ target: { value: newValue.toString() } } as any);
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;

        // Permitir valores intermedios válidos mientras escribe
        if (/^[-]?\d*\.?\d*$/.test(raw)) {
            const numeric = parseFloat(raw);

            // Si no es un número válido (aún escribiendo), lo dejamos pasar tal cual
            if (isNaN(numeric)) {
                onChange?.(e);
                return;
            }

            // Si ya no está escribiendo un número parcial (ej. ya escribió "5.4")
            // NO lo clampées todavía, solo pásalo al padre
            onChange?.(e);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) {
            const clamped = clamp(val);
            if (clamped !== val) {
                onChange?.({ target: { value: clamped.toString() } } as any);
            }
        }

        props.onBlur?.(e); // Ejecuta cualquier onBlur externo
    };



    return (
        <div className={twMerge(
            "border-border transition-all  focus-within:border-primary focus-within:dark:border-dark-primary h-11 dark:border-dark-border bg-card dark:bg-dark-card border rounded-lg px-2 grid  grid-cols-[1fr_auto] items-center gap-1",
            classNameContainer
        )}>
            <input
                {...props}
                type="text"
                inputMode="decimal"
                value={value}
                onKeyDown={(e) => {
                    handleKeyDown(e);
                    onKeyDown?.(e);
                }}
                onPaste={(e) => {
                    handlePaste(e);
                    onPaste?.(e);
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                className={twMerge(
                    "outline-none w-full text-text dark:text-dark-text placeholder:text--dark-muted dark:placeholder:text-muted",
                    className
                )}
            />
            <div className="flex flex-col">
                <button type="button" onClick={handleIncrement}>
                    <ChevronUp className="text-muted dark:text-dark-muted" size={16} />
                </button>
                <button type="button" onClick={handleDecrement}>
                    <ChevronDown className="text-muted dark:text-dark-muted" size={16} />
                </button>
            </div>
        </div>
    );
};

export default FieldNumber;
