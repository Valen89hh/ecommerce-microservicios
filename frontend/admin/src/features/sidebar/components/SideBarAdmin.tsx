import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../../components/ui/Logo";
import Heading4 from "../../../components/texts/Heading4";
import { BadgePercent, Box, ChartLine, ChartPie, ChevronRight, Headset, Settings, ShoppingCart, Tag, UserCog, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SmallText from "../../../components/texts/SmallText";

const routesAdmin = [
    {
        route: "/dashboard",
        name: "Dashboard",
        icon: <ChartLine size={20} />
    },
    {
        route: "/products",
        name: "Products",
        icon: <Box size={20} />,
        subroutes: [
            { route: "", name: "View Products" },
            { route: "/create", name: "Create Product" }
        ]
    },
    {
        route: "/categories",
        name: "Categories",
        icon: <Tag size={20} />,
        subroutes: [
            { route: "", name: "View Categories" },
            { route: "/create", name: "Create Category" }
        ]
    },
    {
        route: "/orders",
        name: "Orders",
        icon: <ShoppingCart size={20} />,
        subroutes: [
            { route: "", name: "View Orders" },
            { route: "/create", name: "Create Order" }
        ]
    },
    {
        route: "/promotions",
        name: "Promotions",
        icon: <BadgePercent size={20} />,
        subroutes: [
            { route: "", name: "View Promotions" },
            { route: "/create", name: "Create Promotion" }
        ]
    },
    {
        route: "/clients",
        name: "Clients",
        icon: <Users size={20} />,
        subroutes: [
            { route: "", name: "View Clients" },
            { route: "/create", name: "Create Client" }
        ]
    },
    {
        route: "/employees",
        name: "Employees",
        icon: <UserCog size={20} />,
        subroutes: [
            { route: "", name: "View Employees" },
            { route: "/create", name: "Create Employee" }
        ]
    },
    {
        route: "/support",
        name: "Support",
        icon: <Headset size={20} />
    },
    {
        route: "/reports",
        name: "Reports",
        icon: <ChartPie size={20} />
    },
    {
        route: "/settings",
        name: "Settings",
        icon: <Settings size={20} />
    },
];

const SideBarAdmin = () => {
    const [routeSelect, setRouteSelect] = useState("/dashboard");
    const [expanded, setExpanded] = useState<string | null>(null);

    const toggleExpand = (route: string) => {
        setExpanded(prev => (prev === route ? null : route));
    };

    return (
        <aside className="w-64 flex flex-col  bg-secondary dark:bg-dark-secondary text-white h-screen overflow-auto">
            <div className="py-[16.5px] px-4 border-b border-b-terciario dark:border-b-dark-terciario">
                <Logo />
            </div>
            <ul className="flex-1">
                {routesAdmin.map((rt) => {
                    const isExpanded = expanded === rt.route;

                    if (rt.subroutes) {
                        return (
                            <li key={rt.route}>
                                <button
                                    onClick={() => toggleExpand(rt.route)}
                                    className={`flex w-full px-4 py-2 items-center gap-2 cursor-pointer transition-colors duration-200 ${routeSelect.startsWith(rt.route)
                                            ? "bg-primary dark:bg-dark-primary"
                                            : "hover:bg-terciario dark:hover:bg-dark-terciario"
                                        }`}
                                >
                                    {rt.icon}
                                    <Heading4 className="flex-1 text-start font-semibold text-white">
                                        {rt.name}
                                    </Heading4>
                                    <motion.div
                                        animate={{ rotate: isExpanded ? 90 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronRight size={16} />
                                    </motion.div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.ul
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            {rt.subroutes.map((sr) => (
                                                <li key={sr.route}>
                                                    <Link
                                                        to={rt.route + sr.route}
                                                        onClick={() => {
                                                            setRouteSelect(rt.route + sr.route);
                                                        }}
                                                        className={`flex pl-10 py-1 cursor-pointer items-center gap-2 ${routeSelect === rt.route + sr.route
                                                                ? "bg-terciario dark:bg-dark-terciario"
                                                                : "hover:bg-terciario dark:hover:bg-dark-terciario"
                                                            }`}
                                                    >
                                                        <div className="h-[6px] w-[6px] rounded-full bg-white" />
                                                        <Heading4 className="text-white">{sr.name}</Heading4>
                                                    </Link>
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </li>
                        );
                    } else {
                        return (
                            <li key={rt.route}>
                                <Link
                                    onClick={() => setRouteSelect(rt.route)}
                                    to={rt.route}
                                    className={`flex w-full px-4 py-2 items-center gap-2 cursor-pointer transition-colors duration-200 ${routeSelect === rt.route
                                            ? "bg-primary dark:bg-dark-primary"
                                            : "hover:bg-terciario dark:hover:bg-dark-terciario"
                                        }`}
                                >
                                    {rt.icon}
                                    <Heading4 className="text-white font-semibold">{rt.name}</Heading4>
                                </Link>
                            </li>
                        );
                    }
                })}
            </ul>
            <div className="py-3 px-4 border-t flex items-center gap-2 border-t-terciario dark:border-t-dark-terciario">
                <img 
                    className="rounded-full h-10 w-10"
                    src="https://picsum.photos/id/1/200/300" 
                    alt="user" 
                />
                <div className="flex-1">
                    <Heading4 className="text-white leading-2">Admin Sistema</Heading4>
                    <SmallText className="text-white leading-0">admin@naturasalud.com</SmallText>
                </div>
            </div>
        </aside>
    );
};

export default SideBarAdmin;
