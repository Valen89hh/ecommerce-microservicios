import { useEffect, useState } from "react";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import Heading3 from "../../../components/texts/Heading3";
import Card from "../../../components/ui/Card";
import SmallText from "../../../components/texts/SmallText";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useThemeStore } from "../../../store/useThemeStore";

const timeframes = ["Diary", "Weekly", "Monthly", "Yearly"]
type SaleData = { date: string; sale: number };

// Función para generar datos aleatorios de venta
const generateSalesData = (type: string): SaleData[] => {
  const now = new Date();
  const data: SaleData[] = [];

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  switch (type) {
    case "Diary":{
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        data.push({
          date: formatDate(d),
          sale: Math.floor(Math.random() * 2000 + 500),
        });
      }
      break;
    }
    case "Weekly":{
      for (let i = 6; i >= 0; i--) {
        data.push({
          date: `Week ${7 - i}`,
          sale: Math.floor(Math.random() * 10000 + 3000),
        });
      }
      break;
    }
    case "Monthly":{
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      for (let i = 0; i < 6; i++) {
        const month = months[(now.getMonth() - i + 12) % 12];
        data.unshift({
          date: month,
          sale: Math.floor(Math.random() * 20000 + 5000),
        });
      }
      break;
    }
    case "Yearly":{
      for (let i = 5; i >= 0; i--) {
        const year = now.getFullYear() - i;
        data.push({
          date: `${year}`,
          sale: Math.floor(Math.random() * 100000 + 20000),
        });
      }
      break;
    }
  }

  return data;
};


const SaleStatistic = () => {
    const [tf, setTf] = useState(timeframes[1])
    const [data, setData] = useState<SaleData[]>([]);
    const { theme } = useThemeStore();

    useEffect(() => {
        setData(generateSalesData(tf));
    }, [tf]);
    return ( 
        <Card>
            <div className="flex justify-between ">
                <Heading3>Sale Statistic</Heading3>
                <div className="flex items-center gap-2">
                    {timeframes.map(t=>(
                        <ButtonPrimary onClick={()=>setTf(t)} className={`py-1 px-4 border ${tf == t ? "bg-primary dark:bg-dark-primary  border-primary dark:border-dark-primary" : "bg-background dark:bg-dark-background border-border dark:border-dark-border"}`} key={t}>
                            <SmallText className={`${tf == t ? "text-white dark:text-white" : "text-muted dark:text-dark-muted"}`}>{t}</SmallText>
                        </ButtonPrimary>
                    ))}
                </div>
            </div>
            <div className="w-full h-80">
                <ResponsiveContainer>
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                        >
                        <CartesianGrid stroke={theme == "dark" ? "#444444" : "#E0E0E0"} horizontal={true} vertical={false} />
                        <XAxis tick={{fontSize: 12}}  dataKey="date"  stroke={theme == "dark" ? "#B0B0B0" : "#757575"} />
                        <YAxis tick={{fontSize: 12}}  stroke={theme == "dark" ? "#B0B0B0" : "#757575"} />
                        <Tooltip />
                        <Area type="monotone" dataKey="sale" stroke="#2E7D32" fill="#2E7D3266" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
     );
}
 
export default SaleStatistic;