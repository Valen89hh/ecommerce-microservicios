import { Eye, Pencil, Trash } from "lucide-react";
import Caption from "../../../components/texts/Caption";
import SmallText from "../../../components/texts/SmallText";
import Card from "../../../components/ui/Card"
import Pagination from "../../pagination/components/Pagination";

const TableProducts = () => {
    return ( 
        <Card>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-start pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Product</SmallText>
                        </th>
                        <th className="text-end pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Category</SmallText>
                        </th>
                        <th className="text-end pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Stock</SmallText>
                        </th>
                        <th className="text-end pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Price</SmallText>
                        </th>
                        <th className="text-end pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Status</SmallText>
                        </th>
                        <th className="text-end pb-2">
                            <SmallText className="text-muted dark:text-dark-muted">Actions</SmallText>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-t border-border dark:border-dark-border">
                        <td className="flex py-4 items-center justify-start gap-2">
                            <img 
                                src="https://okdiario.com/img/vida-sana/2016/11/21/vegetales.jpg" 
                                alt="" 
                                width={40}
                                height={40}
                                className="object-cover rounded-xs overflow-hidden"
                            />
                            <SmallText>Spirulina Orgánica 500g</SmallText>
                        </td>
                        <td className="text-end py-4">
                            <SmallText>Superfoods</SmallText>
                        </td>
                        <td className="text-end py-4">
                            <SmallText>129</SmallText>
                        </td>
                        <td className="text-end py-4">
                            <SmallText>S/ 12.33</SmallText>
                        </td>
                        <td className="text-end py-4">
                            <Caption
                                className={`
                                    h-fit w-fit
                                    leading-4
                                rounded-full px-2 py-[2px]
                                ${ "bg-tag-yellow text-tag-yellow-accent dark:text-tag-yellow-accent"}
                                    `}
                            >
                                Available
                            </Caption>
                        </td>
                        <td className="flex py-4 items-center gap-1 justify-end">
                            <button>
                                <Eye size={20} className="text-tag-blue-accent"/>
                            </button>
                            <button>
                                <Pencil size={20} className="text-tag-yellow-accent"/>
                            </button>
                            <button>
                                <Trash size={20} className="text-tag-red-accent"/>
                            </button>
                        </td>
                    </tr>
                    <tr className="border-t border-border dark:border-dark-border">
                        <td className="flex py-4 items-center justify-start gap-2">
                            <img 
                                src="https://okdiario.com/img/vida-sana/2016/11/21/vegetales.jpg" 
                                alt="" 
                                width={40}
                                height={40}
                                className="object-cover"
                            />
                            <SmallText>Spirulina Orgánica 500g</SmallText>
                        </td>
                        <td className="text-end py-4">
                            <SmallText>Superfoods</SmallText>
                        </td>
                        <td className="text-end py-4">
                            <SmallText>129</SmallText>
                        </td>
                        <td className="text-end py-4">
                            <SmallText>S/ 12.33</SmallText>
                        </td>
                        <td className="text-end py-4">
                            <Caption
                                className={`
                                    h-fit w-fit
                                    leading-4
                                rounded-full px-2 py-[2px]
                                ${ "bg-tag-yellow text-tag-yellow-accent dark:text-tag-yellow-accent"}
                                    `}
                            >
                                Available
                            </Caption>
                        </td>
                        <td className="flex py-4 items-center gap-1 justify-end">
                            <button>
                                <Eye size={20} className="text-tag-blue-accent"/>
                            </button>
                            <button>
                                <Pencil size={20} className="text-tag-yellow-accent"/>
                            </button>
                            <button>
                                <Trash size={20} className="text-tag-red-accent"/>
                            </button>
                        </td>
                    </tr>
                    <tr className="border-t border-border dark:border-dark-border">
                        <td className="flex py-4 items-center justify-start gap-2">
                            <img 
                                src="https://okdiario.com/img/vida-sana/2016/11/21/vegetales.jpg" 
                                alt="" 
                                width={40}
                                height={40}
                                className="object-cover"
                            />
                            <SmallText>Spirulina Orgánica 500g</SmallText>
                        </td>
                        <td className="text-end py-4">
                            <SmallText>Superfoods</SmallText>
                        </td>
                        <td className="text-end py-4">
                            <SmallText>129</SmallText>
                        </td>
                        <td className="text-end py-4">
                            <SmallText>S/ 12.33</SmallText>
                        </td>
                        <td className="text-end py-4">
                            <Caption
                                className={`
                                    h-fit w-fit
                                    leading-4
                                rounded-full px-2 py-[2px]
                                ${ "bg-tag-yellow text-tag-yellow-accent dark:text-tag-yellow-accent"}
                                    `}
                            >
                                Available
                            </Caption>
                        </td>
                        <td className="flex py-4 items-center gap-1 justify-end">
                            <button>
                                <Eye size={20} className="text-tag-blue-accent"/>
                            </button>
                            <button>
                                <Pencil size={20} className="text-tag-yellow-accent"/>
                            </button>
                            <button>
                                <Trash size={20} className="text-tag-red-accent"/>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination/>
        </Card>
     );
}
 
export default TableProducts;