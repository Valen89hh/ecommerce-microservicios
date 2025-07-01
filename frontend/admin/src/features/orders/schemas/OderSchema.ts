export interface Order{
    id: number;
    user_id: number | null;
    recipient_name: string;
    recipient_phone: string;
    recipient_email: string;
    shipping_addres: string;
    shipping_city: string;
    shipping_region: string;
    shipping_zip: string;
    shipping_country: string;
    payment_method: string;
    is_paid: boolean;
    total_amount: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    products: OrderProduct[]
}

export interface OrderForm{
    recipient_name: string;
    recipient_phone: string;
    recipient_email: string;
    shipping_addres: string;
    shipping_city: string;
    shipping_region: string;
    shipping_zip: string;
    shipping_country: string;
    payment_method: string;
    status: string;
    total_amount: string;
    is_paid: boolean;
}

export interface OrderProduct{
    id: number;
    product_id: number;
    product_snapshot_name: string;
    quantity: string;
    unit_price: string;
    total_price: string;
}

export interface FilterOrderSchema{
    email: string | null;
    name: string | null;
    amountFrom: number | null;
    amountTo: number | null;
    status: string[];
    paymentMethod: string[];
    startDate: string | null;
    endDate: string | null;
}

export interface FilterOrderForm{
    email: string;
    name: string;
    amountFrom: string;
    amountTo: string;
    status: string[];
    paymentMethod: string[];
    startDate: string;
    endDate: string;
}