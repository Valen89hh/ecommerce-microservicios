export interface UserInfo{
    name: string
    email: string
    address: string
}

export enum PaymentMethod{
    MercadoPago = 'mercado_pago',
    OxaPay = 'oxa_pay'
}