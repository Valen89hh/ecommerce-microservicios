import { useState } from "react";

export function useCheckoutSteps(){
    const [step, setStep] = useState<1 | 2 | 3>(1);

    const next = () => setStep((s) => Math.min(s + 1, 3) as 1 | 2 | 3);
    const back = () => setStep((s) => Math.max(s - 1, 1) as 1 | 2 | 3);

    return { step, next, back };
}