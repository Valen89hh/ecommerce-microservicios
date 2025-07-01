import { api } from "../../../lib/axios";
import type { ApiResponse } from "../../../types/api-response";
import type { FilterOrderSchema, Order, OrderForm } from "../schemas/OderSchema";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface OrdersListResponse {
    orders: Order[];
    total: number;
    currentPage: number;
    perPage: number;
}


export async function getOrders(perPage: number, page: number, filter: FilterOrderSchema): Promise<ApiResponse<OrdersListResponse>> {
    try {
        const dataFilter: any = {}

        if(filter.name) dataFilter["name"] = filter.name
        if(filter.email) dataFilter["email"] = filter.email
        if(filter.amountFrom) dataFilter["amount_from"] = filter.amountFrom
        if(filter.amountTo) dataFilter["amount_to"] = filter.amountTo 
        if(filter.status.length > 0) dataFilter["status"] = filter.status
        if(filter.paymentMethod.length > 0) dataFilter["payment_method"] = filter.paymentMethod
        if(filter.startDate) dataFilter["created_from"] = filter.startDate
        if(filter.endDate) dataFilter["created_to"] = filter.endDate
        console.log("Filter Order: ", dataFilter)
        const res = await api.post(`/orders/filter?per_page=${perPage}&page=${page}`, dataFilter);
        console.log(res)
        return {
            success: true,
            message: res.data.message,
            data: {
                orders: res.data.data.data.map((or: any)=>({
                    id: or.id,
                    user_id: or.user_id,
                    recipient_name: or.recipient_name,
                    recipient_phone: or.recipient_phone,
                    recipient_email: or.recipient_email,
                    shipping_addres: or.shipping_addres,
                    shipping_city: or.shipping_city,
                    shipping_region: or.shipping_region,
                    shipping_zip: or.shipping_zip,
                    shipping_country: or.shipping_country,
                    payment_method: or.payment_method,
                    is_paid: or.is_paid == 1,
                    total_amount: or.total_amount,
                    status: or.status,
                    created_at: new Date(or.created_at),
                    updated_at: new Date(or.updated_at),
                    products: or.products.map((op: any)=>({
                        id: op.id,
                        product_id: op.product_id,
                        product_snapshot_name: op.product_snapshot_name,
                        quantity: op.quantity,
                        unit_price: op.unit_price,
                        total_price: op.total_price,
                    }))
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
                message: err?.response?.data?.message || 'Error desconocido al obtener ordenes.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

export async function updateOrder(id: number, order: OrderForm): Promise<ApiResponse<"">> {
    try {
        const res = await api.put(`/orders/update-status/`+id, order);
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
                message: err?.response?.data?.message || 'Error desconocido al actualizar la estado.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

export async function getOrder(orderId: string): Promise<ApiResponse<Order>> {
    try {
        const res = await api.get(`/orders/${orderId}`);
        const or = res.data.data;

        return {
            success: true,
            message: res.data.message,
            data: {
                id: or.id,
                user_id: or.user_id,
                recipient_name: or.recipient_name,
                recipient_phone: or.recipient_phone,
                recipient_email: or.recipient_email,
                shipping_addres: or.shipping_address,
                shipping_city: or.shipping_city,
                shipping_region: or.shipping_region,
                shipping_zip: or.shipping_zip,
                shipping_country: or.shipping_country,
                payment_method: or.payment_method,
                is_paid: or.is_paid == 1,
                total_amount: or.total_amount,
                status: or.status,
                created_at: new Date(or.created_at),
                updated_at: new Date(or.updated_at),
                products: or.products.map((op: any)=>({
                    id: op.id,
                    product_id: op.product_id,
                    product_snapshot_name: op.product_snapshot_name,
                    quantity: op.quantity,
                    unit_price: op.unit_price,
                    total_price: op.total_price,
                }))
            }
        };
    } catch (err: any) {
        console.log(err)
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al obtener la orden.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}
