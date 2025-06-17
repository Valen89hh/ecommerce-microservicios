export interface ProductBasicInfo {
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
}

export interface ProductImage {
  file: File;
  previewUrl: string;
}

export interface PriceAndStockData {
    costPrice: string;
    salePrice: string;
    promotionalPrice: string;
    stock: string;
    minStock: string;
    maxStock: string;
    unit: string; // ejemplo: "u", "g", "kg", "ml", "l"
    unitAmount: string;
    unitsAvailable: string; // calculado automáticamente
}

export interface LogisticsInformation {
  weightKg: string;           // Ej: "1.5"
  length: string;             // Ej: "10"
  width: string;              // Ej: "5"
  height: string;             // Ej: "20"
  isPerishable: boolean;
  expirationDate: string;     // formato yyyy-mm-dd
  storageType: "normal" | "small" | "big";
  shippingUnit: string;       // descripción libre
};

export interface CertificateData {
  enabled: boolean;
  files: File[];
  certifyingBody: string;
  certificateNumber: string;
  issueDate: string;
  expirationDate: string;
}

export type CertificateType = "Organic" | "Vegan" | "Gluten Free";

