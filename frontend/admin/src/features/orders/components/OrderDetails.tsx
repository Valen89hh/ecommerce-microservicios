import type React from "react";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import ButtonSecondary from "../../../components/buttons/ButtonSecondary";
import Field from "../../../components/inputs/Field";
import Heading1 from "../../../components/texts/Heading1";
import Heading3 from "../../../components/texts/Heading3";
import Heading4 from "../../../components/texts/Heading4";
import Card from "../../../components/ui/Card";
import Loader from "../../../components/ui/Loader";
import { useNavigate } from "react-router-dom";
import type { Order } from "../schemas/OderSchema";
import { useDetailOrder } from "../hooks/useDetailOrder";
import Select from "../../../components/inputs/Select";
import SmallText from "../../../components/texts/SmallText";

interface Props{
    order: Order
}

const OrderDetails: React.FC<Props> = ({
    order
}) => {
    const {loading, handleUpdateCategory, formData, updateField} = useDetailOrder(order)
    const navigate = useNavigate()

    return ( 
        <form className="space-y-4" onSubmit={(e)=>{e.preventDefault(); handleUpdateCategory();}}>
            <div className="flex justify-between">
                <Heading1>Edit Category</Heading1>
                <div className="flex items-center gap-4">
                    <ButtonSecondary disabled={loading} onClick={()=>navigate("/orders")} type="button" className="flex items-center gap-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Cancel</Heading4>
                    </ButtonSecondary>
                    <ButtonPrimary disabled={loading} type="submit" className="flex items-center gap-1">
                        {loading ? <Loader /> : <Heading4 className="text-white">Update</Heading4>}
                    </ButtonPrimary>
                </div>
            </div>
            <Card className="space-y-2">
                <Heading3>Details</Heading3>
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <Heading4 className="text-muted dark:text-dark-muted">Name *</Heading4>
                            <Field
                                required
                                readOnly
                                placeholder="Enter the product name"
                                value={formData.recipient_name}
                                onChange={(e)=>updateField("recipient_name", e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Heading4 className="text-muted dark:text-dark-muted">Email *</Heading4>
                            <Field
                                required
                                readOnly
                                placeholder="Enter the product email"
                                value={formData.recipient_email}
                                onChange={(e)=>updateField("recipient_email", e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Heading4 className="text-muted dark:text-dark-muted">Phone *</Heading4>
                            <Field
                                required
                                readOnly
                                placeholder="Enter the product phone"
                                value={formData.recipient_phone}
                                onChange={(e)=>updateField("recipient_phone", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Address *</Heading4>
                        <Field
                            required
                            readOnly
                            placeholder="Enter the product phone"
                            value={formData.shipping_addres}
                            onChange={(e)=>updateField("shipping_addres", e.target.value)}
                        />
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Country *</Heading4>
                        <Field
                            required
                            readOnly
                            placeholder="Enter the product phone"
                            value={formData.shipping_country}
                            onChange={(e)=>updateField("shipping_country", e.target.value)}
                        />
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <Heading4 className="text-muted dark:text-dark-muted">City *</Heading4>
                            <Field
                                required
                                readOnly
                                placeholder="Enter the product phone"
                                value={formData.shipping_city}
                                onChange={(e)=>updateField("shipping_city", e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Heading4 className="text-muted dark:text-dark-muted">Region *</Heading4>
                            <Field
                                required
                                readOnly
                                placeholder="Enter the product phone"
                                value={formData.shipping_region}
                                onChange={(e)=>updateField("shipping_region", e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Heading4 className="text-muted dark:text-dark-muted">Zip *</Heading4>
                            <Field
                                required
                                readOnly
                                placeholder="Enter the product phone"
                                value={formData.shipping_zip}
                                onChange={(e)=>updateField("shipping_zip", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Heading4 className="text-muted dark:text-dark-muted">Total Amount *</Heading4>
                        <Field
                            required
                            readOnly
                            placeholder="Enter the product phone"
                            value={formData.total_amount}
                            onChange={(e)=>updateField("total_amount", e.target.value)}
                        />
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Heading4 className="text-muted dark:text-dark-muted">Status *</Heading4>
                            <Select
                                placeholder="Status"
                                options={[
                                    {label: "Pending", value: "pending"},
                                    {label: "Paid", value: "paid"},
                                    {label: "Processing", value: "processing"},
                                    {label: "Shipped", value: "shipped"},
                                    {label: "Delivered", value: "delivered"},
                                    {label: "Cancelled", value: "cancelled"},
                                ]}
                                selectedValue={formData.status}
                                onChange={(value)=>updateField("status", value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Heading4 className="text-muted dark:text-dark-muted">Payment Method *</Heading4>
                            <Select
                                placeholder="Payment Method"
                                options={[
                                    {label: "Mercado Pago", value: "mercado_pago"},
                                    {label: "Oxa Pay", value: "oxa_pay"},
                                ]}
                                selectedValue={formData.payment_method}
                                onChange={()=>updateField("payment_method", formData.payment_method)}
                            />
                        </div>
                    </div>
                </div>
            </Card>
            <Card className="space-y-2">
                <Heading3>Products</Heading3>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-start pb-2">
                                <SmallText className="text-muted dark:text-dark-muted">Product</SmallText>
                            </th>
                            <th className="text-end pb-2">
                                <SmallText className="text-muted dark:text-dark-muted">Quantity</SmallText>
                            </th>
                            <th className="text-end pb-2">
                                <SmallText className="text-muted dark:text-dark-muted">Unit Price</SmallText>
                            </th>
                            <th className="text-end pb-2">
                                <SmallText className="text-muted dark:text-dark-muted">Total Price</SmallText>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.products.map(product => (
                            <tr key={"product-ord-"+product.id} className="border-t border-border dark:border-dark-border">
                                <td className="flex py-4 items-center justify-start gap-2">
                                    <SmallText>{product.product_snapshot_name}</SmallText>
                                </td>
                                <td className="text-end py-4">
                                    <SmallText>{product.quantity}</SmallText>
                                </td>
                                <td className="text-end py-4">
                                    <SmallText>S/ {product.unit_price}</SmallText>
                                </td>
                                <td className="text-end py-4">
                                    <SmallText>S/ {product.total_price}</SmallText>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </form>
     );
}
 
export default OrderDetails;