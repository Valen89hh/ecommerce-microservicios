import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import Heading3 from "../../../components/texts/Heading3";
import Card from "../../../components/ui/Card";
import SmallText from "../../../components/texts/SmallText";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useThemeStore } from "../../../store/useThemeStore";
import { useSaleStatistic } from "../hooks/useSaleStatistic";
import { motion } from "framer-motion";

const timeframes = ["Daily", "Weekly", "Monthly", "Yearly"]

const SaleStatistic = () => {
    const { theme } = useThemeStore();
    const {sales, loading, type, setType} = useSaleStatistic();


    if(loading) return (
      <motion.div
            className="bg-muted/20 dark:bg-dark-muted/20 rounded animate-pulse"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity }}
        >
          <div className="flex opacity-0 justify-between ">
              <Heading3>Sale Statistic</Heading3>
              <div className="flex items-center gap-2">
                  {timeframes.map(t=>(
                      <ButtonPrimary onClick={()=>setType(t.toLowerCase())} className={`py-1 px-4 border ${type == t.toLowerCase() ? "bg-primary dark:bg-dark-primary  border-primary dark:border-dark-primary" : "bg-background dark:bg-dark-background border-border dark:border-dark-border"}`} key={t}>
                          <SmallText className={`${type == t ? "text-white dark:text-white" : "text-muted dark:text-dark-muted"}`}>{t}</SmallText>
                      </ButtonPrimary>
                  ))}
              </div>
          </div>
          <div className="w-full opacity-0 h-80">
              s
          </div>
        </motion.div>
    )

    return ( 
        <Card>
            <div className="flex justify-between ">
                <Heading3>Sale Statistic</Heading3>
                <div className="flex items-center gap-2">
                    {timeframes.map(t=>(
                        <ButtonPrimary onClick={()=>setType(t.toLowerCase())} className={`py-1 px-4 border ${type == t.toLowerCase() ? "bg-primary dark:bg-dark-primary  border-primary dark:border-dark-primary" : "bg-background dark:bg-dark-background border-border dark:border-dark-border"}`} key={t}>
                            <SmallText className={`${type == t.toLowerCase() ? "text-white dark:text-white" : "text-muted dark:text-dark-muted"}`}>{t}</SmallText>
                        </ButtonPrimary>
                    ))}
                </div>
            </div>
            <div className="w-full h-80">
                <ResponsiveContainer>
                    <AreaChart
                        data={sales}
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