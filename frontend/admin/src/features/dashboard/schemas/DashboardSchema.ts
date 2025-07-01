export interface Summary{
    revenue: string;
    total_sales: string;
    total_orders: string;
    total_users: string;
}

export interface SaleStatistic{
    date: string;
    sale: number;
}

export interface BestSellingProduct{
    name: string;
    stock: number;
    sale: number;
    price: number;

}