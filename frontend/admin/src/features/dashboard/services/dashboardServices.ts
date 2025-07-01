/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../../lib/axios";
import type { ApiResponse } from "../../../types/api-response";
import type { Order } from "../../orders/schemas/OderSchema";
import type { BestSellingProduct, SaleStatistic, Summary } from "../schemas/DashboardSchema";

export async function getSummary(): Promise<ApiResponse<Summary>> {
    try {
        const res = await api.get(`/dashboard/summary`);
        return {
            success: true,
            message: res.data.message,
            data: {
                ...res.data.data
            }
        };
    } catch (err: any) {
        console.log(err)
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al obtener la summary.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

export async function getSaleStatistic(type: string): Promise<ApiResponse<SaleStatistic[]>> {
    try {
        const res = await api.get(`/dashboard/sales-statistics?type=${type}`);
        return {
            success: true,
            message: res.data.message,
            data: res.data.data.map((sl: any)=>({...sl}))
        };
    } catch (err: any) {
        console.log(err)
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al obtener las ventas.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

export async function getBestSellingProducts(): Promise<ApiResponse<BestSellingProduct[]>> {
    try {
        const res = await api.get(`/dashboard/best-selling-products`);
        return {
            success: true,
            message: res.data.message,
            data: res.data.data.map((pr: any)=>({
                name: pr.name,
                stock: Number(pr.stock),
                sale: Number(pr.total_sold),
                price: Number(pr.sale_price),
            }))
        };
    } catch (err: any) {
        console.log(err)
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al obtener los productos.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}

export async function getRecentOrders(): Promise<ApiResponse<Order[]>> {
    try {
        const res = await api.get(`/dashboard/latest-orders`);
        const orders = res.data.data;

        return {
            success: true,
            message: res.data.message,
            data: orders.map((or: any)=>({
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
            }))
        };
    } catch (err: any) {
        console.log(err)
        return {
            success: false,
            error: {
                message: err?.response?.data?.message || 'Error desconocido al obtener las ordenes.',
                code: err?.response?.status,
                details: err?.response?.data.errors,
            },
        };
    }
}