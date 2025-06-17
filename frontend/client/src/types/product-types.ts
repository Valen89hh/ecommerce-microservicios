import { Product } from "./models-database";

export interface ProductCart{
    product: Product;
    amount: number
}