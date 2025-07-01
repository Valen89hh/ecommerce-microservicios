"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Card from "../../../components/ui/Card";
import Heading3 from "../../../components/texts/Heading3";
import { useThemeStore } from "../../../store/useThemeStore";
import { useBestSellingProducts } from "../hooks/useBestSellingProducts";
import { motion } from "framer-motion";

// Datos de ejemplo
const data = [
  {
    name: "Producto A",
    sale: 400,
    stock: 240,
    price: 50,
  },
  {
    name: "Producto B",
    sale: 300,
    stock: 139,
    price: 70,
  },
  {
    name: "Producto C",
    sale: 200,
    stock: 980,
    price: 60,
  },
  {
    name: "Producto D",
    sale: 278,
    stock: 390,
    price: 90,
  },
];

const BestSellingProducts = () => {
    const { theme } = useThemeStore();
    const {loading, products} = useBestSellingProducts();

    if(loading) return (
      <motion.div
            className="bg-muted/20 flex-1 dark:bg-dark-muted/20 rounded animate-pulse"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity }}
        >
          <div className="opacity-0">
            <Heading3>Best Selling Products</Heading3>
            <div className="w-full h-80">
                <ResponsiveContainer>
                    <BarChart
                        layout="vertical"
                        data={data}
                        margin={{ top: 20, right: 30, left: 5, bottom:0  }}
                    >
                        <CartesianGrid stroke={theme == "dark" ? "#444444" : "#E0E0E0"} horizontal={false} vertical={true} />
                        <XAxis tick={{fontSize: 12}}  type="number" stroke={theme == "dark" ? "#B0B0B0" : "#757575"} />
                        <YAxis tick={{fontSize: 12}}  dataKey="name" type="category" stroke={theme == "dark" ? "#B0B0B0" : "#757575"} />
                        <Tooltip />
                        <Legend
                            wrapperStyle={{
                                fontSize: '14px',  // Tamaño del texto
                            }}
                        />
                        <Bar dataKey="sale" fill="#2E7D32" name="Sale" />
                        <Bar dataKey="stock" fill="#E2725B" name="Stock" />
                        <Bar dataKey="price" fill="#FFF59D" name="Price" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
    )
    return (
        <Card className="flex-1">
            <Heading3>Best Selling Products</Heading3>
            <div className="w-full h-80">
                <ResponsiveContainer>
                    <BarChart
                        layout="vertical"
                        data={products}
                        margin={{ top: 20, right: 30, left: 5, bottom:0  }}
                    >
                        <CartesianGrid stroke={theme == "dark" ? "#444444" : "#E0E0E0"} horizontal={false} vertical={true} />
                        <XAxis tick={{fontSize: 12}}  type="number" stroke={theme == "dark" ? "#B0B0B0" : "#757575"} />
                        <YAxis tick={{fontSize: 12}}  dataKey="name" type="category" stroke={theme == "dark" ? "#B0B0B0" : "#757575"} />
                        <Tooltip />
                        <Legend
                            wrapperStyle={{
                                fontSize: '14px',  // Tamaño del texto
                            }}
                        />
                        <Bar dataKey="sale" fill="#2E7D32" name="Sale" />
                        <Bar dataKey="stock" fill="#E2725B" name="Stock" />
                        <Bar dataKey="price" fill="#FFF59D" name="Price" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default BestSellingProducts;
