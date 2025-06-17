export interface FilterProductSchema{
    searchName: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    minStock: number | null;
    maxStock: number | null;
    category: string | null;
    status: string[];
    startDate: string | null;
    endDate: string | null;
}

export interface FilterProductForm{
    searchName: string;
    minPrice: string;
    maxPrice: string;
    minStock: string;
    maxStock: string;
    category: string;
    status: string[];
    startDate: string;
    endDate: string;
}