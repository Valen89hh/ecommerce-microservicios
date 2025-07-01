/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../../lib/axios";
import type { ApiResponse } from "../../../types/api-response";
import type { FilterProductSchema } from "../schemas/FilterProductSchema";
import type { Product, ProductTable } from "../schemas/Product";

interface ProductListResponse {
    products: ProductTable[];
    total: number;
    currentPage: number;
    perPage: number;
}

export async function getProducts(perPage: number, page: number, filter: FilterProductSchema): Promise<ApiResponse<ProductListResponse>> {
    try {
        const dataFilter: any = {}

        if(filter.searchName) dataFilter["name"] = filter.searchName
        if(filter.category) dataFilter["category_id"] = Number(filter.category)
        if(filter.minPrice) dataFilter["price_from"] = filter.minPrice
        if(filter.maxPrice) dataFilter["price_to"] = filter.maxPrice
        if(filter.minStock) dataFilter["stock_from"] = filter.minStock
        if(filter.maxStock) dataFilter["stock_to"] = filter.maxStock
        if(filter.status) dataFilter["status"] = filter.status
        if(filter.startDate) dataFilter["created_from"] = filter.startDate
        if(filter.endDate) dataFilter["created_to"] = filter.endDate

        const res = await api.post(`/products/filter?per_page=${perPage}&page=${page}`, dataFilter);
        console.log("REspuesta products: ", res)
        return {
            success: true,
            message: res.data.message,
            data: {
                products: res.data.data.data.map((product: any)=>{
                    let status = "Available"
                    if(!product.is_active) status = "Not Available";
                    else if(product.stock < product.available_units || product.stock == 0) status = "Out of Stock";
                    else if(product.stock <= product.minimun_stock) status = "Low Stock";

                    return {
                        id: product.id,
                        name: product.name,
                        categoryName: product.category.name,
                        image: product.images[0].image_url,
                        stock: Number(product.stock),
                        price: Number(product.sale_price),
                        status: status,
                    }
                }),
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
                message: err?.response?.data?.message || 'Error desconocido al obtener productos.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

export async function createProduct(data: any): Promise<ApiResponse<string>>{
    try{
        const res = await api.post("/products", data)
        return {
            success: true,
            message: res.data.message,
            data: ""
        }
    }catch(err: any){
        console.log(err)
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al crear el producto.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

export async function updateProduct(data: any, productId: number): Promise<ApiResponse<string>>{
    try{
        const res = await api.put("/products/"+productId, data)
        return {
            success: true,
            message: res.data.message,
            data: ""
        }
    }catch(err: any){
        console.log(err)
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al actualizar el producto.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

export async function deleteProduct(productId: number): Promise<ApiResponse<string>>{
    try{
        const res = await api.delete("/products/"+productId)
        return {
            success: true,
            message: res.data.message,
            data: ""
        }
    }catch(err: any){
        console.log(err)
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al eliminar el producto.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

export async function getTotalProducts(): Promise<ApiResponse<number>>{
    try{
        const res = await api.get("/products/stats/total");
        return {
            success: true,
            message: res.data.message,
            data: res.data.data.total_products
        }
    }catch (err: any) {
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al obtener total productos.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

export async function getTotalOutOfStock(): Promise<ApiResponse<number>>{
    try{
        const res = await api.get("/products/stats/out-of-stock");
        return {
            success: true,
            message: res.data.message,
            data: res.data.data.out_of_stock_products
        }
    }catch (err: any) {
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al obtener total productos fuera de stock.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

export async function getTotalLowStock(): Promise<ApiResponse<number>>{
    try{
        const res = await api.get("/products/stats/low-stock");
        return {
            success: true,
            message: res.data.message,
            data: res.data.data.low_stock_products
        }
    }catch (err: any) {
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al obtener total productos bajdo de stock.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

export async function getProduct(id: string): Promise<ApiResponse<Product>>{
    try{
        const res = await api.get("/products/"+id);
        const product = res.data.data
        return {
            success: true,
            message: res.data.message,
            data:   {
                id: product.id,
                category: {
                    id: product.category.id,
                    name: product.category.name
                },
                employeeId: product.employee_id,
                name: product.name,
                shortDescription: product.short_description,
                fullDescription: product.full_description,
                costPrice: product.cost_price,
                salePrice: product.sale_price,
                discountedPrice: product.discounted_price,
                stock: product.stock,
                maxStock: product.maximun_stock,
                minStock: product.minimun_stock,
                unitAmount: product.unit_amount,
                availableUnits: product.available_units,
                unitMeasurement: product.unit_measurement,
                weight: product.weight,
                length: product.length,
                width: product.width,
                height: product.height,
                isPerishable: product.is_perceptible == 1,
                expirationDate: new Date(product.expiration_date),
                storageType: product.storage_type,
                shippingUnit: product.shipping_unit,
                createdAt: new Date(product.created_at),
                updatedAt: new Date(product.updated_at),
                images: product.images.map((img: any)=>({
                    id: img.id,
                    filePath: img.image_path,
                    fileUrl: img.image_url,
                    fileType: "jpg",
                })),
                certificates: product.certificates.map((cr: any)=>({
                    id: cr.id,
                    certifyingBody: cr.certifying_body,
                    certificateNumber: cr.certificate_number,
                    type: cr.type,
                    issueDate: new Date(cr.issue_date),
                    expirationDate: new Date(cr.expiration_date),
                    files: cr.files.map((fl: any)=>({
                        id: fl.id,
                        filePath: fl.file_path,
                        fileUrl: fl.file_url,
                        fileType: fl.file_type,
                    }))
                }))
            }
        }
    }catch (err: any) {
        console.log(err)
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al obtener el producto '+id,
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}