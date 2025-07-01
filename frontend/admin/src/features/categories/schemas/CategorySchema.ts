export interface Category{
    id: number;
    name: string;
    description: string;
}

export interface FilterCategorySchema{
    name: string | null;
    startDate: string | null;
    endDate: string | null;
}

export interface FilterCategoryForm{
    name: string;
    startDate: string;
    endDate: string;
}

export interface CategoryForm{
    name: string;
    description: string;
}