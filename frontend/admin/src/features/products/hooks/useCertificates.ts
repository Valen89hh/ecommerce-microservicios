import { useState } from "react";
import type { CertificateData, CertificateType } from "../schemas/Product";

export interface HookCertificates{
    certificates: Record<CertificateType, CertificateData>;
    updateCertificate: (type: CertificateType, data: Partial<CertificateData>) => void;
}

const initialCertificateData: CertificateData = {
  enabled: false,
  files: [],
  certifyingBody: "",
  certificateNumber: "",
  issueDate: "",
  expirationDate: "",
};

export const useCertificates = (): HookCertificates => {
  const [certificates, setCertificates] = useState<Record<CertificateType, CertificateData>>({
    Organic: { ...initialCertificateData },
    Vegan: { ...initialCertificateData },
    "Gluten Free": { ...initialCertificateData },
  });

  const updateCertificate = (type: CertificateType, data: Partial<CertificateData>) => {
    setCertificates((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        ...data,
      },
    }));
  };


  return {
    certificates,
    updateCertificate,
  };
};
