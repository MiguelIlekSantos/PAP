import { Button } from "../interfaces/painelBtn";
import {
    Building2, Users, Package, DollarSign, ShoppingCart, Truck, MapPin, CheckSquare, Monitor, Megaphone, FileText, Settings, Brain
} from 'lucide-react';

export const Buttons: Button[] = [
    {
        title: "Company",
        icon: Building2,
        url: "/enterprise"
    },
    {
        title: "Human Resources",
        icon: Users,
        url: "/resources"
    },
    {
        title: "Inventory",
        icon: Package,
        url: "/inventory"
    },
    {
        title: "Financial",
        icon: DollarSign,
        url: "/financial"
    },
    {
        title: "Sales & Clients",
        icon: ShoppingCart,
        url: "/sales"
    },
    {
        title: "Purchases & Suppliers",
        icon: Truck,
        url: "/suppliers"
    },
    {
        title: "Logistics & Shipping",
        icon: MapPin,
        url: "/logistic"
    },
    {
        title: "Projects & Tasks",
        icon: CheckSquare,
        url: "/projects"
    },
    {
        title: "Technology & IT",
        icon: Monitor,
        url: "/tecnology"
    },
    {
        title: "Marketing",
        icon: Megaphone,
        url: "/marketing"
    },
    {
        title: "Documentation & Legal",
        icon: FileText,
        url: "/documentation"
    },
    {
        title: "System Administration",
        icon: Settings,
        url: "/system-admin"
    },
    {
        title: "AI Analysis",
        icon: Brain,
        url: "/AI-Analysis"
    },
]
