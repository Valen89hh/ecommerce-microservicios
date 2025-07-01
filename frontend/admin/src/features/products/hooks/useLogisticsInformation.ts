import { useState } from "react";
import type { LogisticsInformation } from "../schemas/Product";

export interface HookLogisticsInformation{
    logistics: LogisticsInformation;
    updateField: <K extends keyof LogisticsInformation>(key: K, value: LogisticsInformation[K]) => void;
}

export const useLogisticsInformation = (initData: LogisticsInformation = {
  weightKg: "",
  length: "",
  width: "",
  height: "",
  isPerishable: false,
  expirationDate: "",
  storageType: "ambient",
  shippingUnit: "",
}): HookLogisticsInformation => {
  const [logistics, setLogistics] = useState<LogisticsInformation>(initData);

  const updateField = <K extends keyof LogisticsInformation>(key: K, value: LogisticsInformation[K]) => {
    setLogistics(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    logistics,
    updateField,
  };
};
