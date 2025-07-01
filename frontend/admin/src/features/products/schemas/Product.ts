export interface Product{
  id: number;
  name: string;
  category: {
      id: number;
      name: string;
  };
  employeeId: number;
  shortDescription: string;
  fullDescription: string;
  costPrice: string;
  salePrice: string;
  discountedPrice: string;
  stock: string;
  minStock: string;
  maxStock: string;
  unitAmount: string;
  availableUnits: string;
  unitMeasurement: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  isPerishable: boolean;
  expirationDate: Date;
  storageType: string;
  shippingUnit: string;  
  createdAt: Date;
  updatedAt: Date;
  images: FileData[];
  certificates: Certificate[]
}

export interface FileData{
  id: number;
  filePath: string;
  fileUrl: string;
  fileType: string;
}

export interface Certificate{
  id: number;
  certifyingBody: string;
  certificateNumber: string;
  type: string;
  issueDate: Date;
  expirationDate: Date;
  files: FileData[]
}

export interface ProductTable{
  id: number;
  name: string;
  categoryName: string;
  image: string;
  stock: number;
  price: number;
  status: string;
}
export interface ProductBasicInfo {
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
}

export interface ProductImage {
  id: string;
  file?: File;
  previewUrl: string;
  url?: string;
  path?: string;
  uploading?: boolean;
  deleting?: boolean;
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
  storageType: string
  shippingUnit: string;       // descripción libre
};

export interface CertificateData {
  enabled: boolean;
  files: {
    path: string;
    url: string;
    type: string;
  }[];
  certifyingBody: string;
  certificateNumber: string;
  issueDate: string;
  expirationDate: string;
}

export type CertificateType = "Organic" | "Vegan" | "Gluten Free";

