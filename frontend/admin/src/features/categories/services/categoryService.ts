/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../../lib/axios";
import type { ApiResponse } from "../../../types/api-response";
import type { Category, CategoryForm, FilterCategorySchema } from "../schemas/CategorySchema";



export async function getCategoriesFull(): Promise<ApiResponse<Category[]>> {
    try {
        const res = await api.get("/categories");
        console.log("REspuesta categories: ", res)
        return {
            success: true,
            message: res.data.data.message,
            data: res.data.data.categories
        }
    } catch (err: any) {
        console.log(err)
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al obtener categories.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

interface CategoryListResponse {
    categories: Category[];
    total: number;
    currentPage: number;
    perPage: number;
}


export async function getCategories(perPage: number, page: number, filter: FilterCategorySchema): Promise<ApiResponse<CategoryListResponse>> {
    try {
        const dataFilter: any = {}

        if(filter.name) dataFilter["name"] = filter.name
        if(filter.startDate) dataFilter["created_from"] = filter.startDate
        if(filter.endDate) dataFilter["created_to"] = filter.endDate

        const res = await api.post(`/categories/filter?per_page=${perPage}&page=${page}`, dataFilter);
        return {
            success: true,
            message: res.data.message,
            data: {
                categories: res.data.data.data.map((cr: any)=>({
                    id: cr.id,
                    name: cr.name,
                    description: cr.description,
                })),
                total: res.data.data.total,
                currentPage: res.data.data.current_page,
                perPage: res.data.data.per_page,
            },
        };
    } catch (err: any) {
        console.log(err)
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al obtener categorias.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

export async function createCategory(category: CategoryForm): Promise<ApiResponse<"">> {
    try {
        const res = await api.post(`/categories`, category);
        return {
            success: true,
            message: res.data.message,
            data: ""
        };
    } catch (err: any) {
        console.log(err)
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al crea la categoria.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

export async function updateCategory(id: number, category: CategoryForm): Promise<ApiResponse<"">> {
    try {
        const res = await api.put(`/categories/`+id, category);
        return {
            success: true,
            message: res.data.message,
            data: ""
        };
    } catch (err: any) {
        console.log(err)
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al actualizar la categoria.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

export async function getCategory(categoryId: string): Promise<ApiResponse<Category>> {
    try {
        const res = await api.get(`/categories/${categoryId}`);
        return {
            success: true,
            message: res.data.message,
            data: {
                id: res.data.data.id,
                name: res.data.data.name,
                description: res.data.data.description
            }
        };
    } catch (err: any) {
        console.log(err)
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al obtener la categoria.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

export async function deleteCategory(categoryId: number): Promise<ApiResponse<"">> {
    try {
        const res = await api.delete(`/categories/${categoryId}`);
        return {
            success: true,
            message: res.data.message,
            data: ""
        };
    } catch (err: any) {
        console.log(err)
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al eliminar la categoria.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}