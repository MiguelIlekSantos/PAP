import { Button } from "../interfaces/painelBtn";
import { 
    Building2, 
    Users, 
    Package, 
    DollarSign, 
    ShoppingCart, 
    Truck, 
    MapPin, 
    CheckSquare, 
    Monitor, 
    Megaphone, 
    FileText, 
    BarChart3, 
    Settings 
} from 'lucide-react';

export const Buttons : Button[] = [
    {
        "title": "Empresa",
        "icon": Building2,
        "url": "/enterprise"
    },
    {
        "title": "Recursos humanos",
        "icon": Users,
        "url": "/resources"
    },
    {
        "title": "Inventário",
        "icon": Package,
        "url": "/inventory"
    },
    {
        "title": "Financeiro",
        "icon": DollarSign,
        "url": "/financial"
    },
    {
        "title": "Vendas e Clientes",
        "icon": ShoppingCart,
        "url": "/sales"
    },
    {
        "title": "Compras e Fornecedores",
        "icon": Truck,
        "url": "/suppliers"
    },
    {
        "title": "Logística e Expedição",
        "icon": MapPin,
        "url": "/logistic"
    },
    {
        "title": "Projetos e Tarefas",
        "icon": CheckSquare,
        "url": "/projects"
    },
    {
        "title": "Tecnologia e TI",
        "icon": Monitor,
        "url": "/tecnology"
    },
    {
        "title": "Marketing",
        "icon": Megaphone,
        "url": "/marketing"
    },
    {
        "title": "Documentação e Jurídico",
        "icon": FileText,
        "url": "/documentation"
    },
    {
        "title": "Relatórios",
        "icon": BarChart3,
        "url": "/reports"
    },
    {
        "title": "Administração do Sistema",
        "icon": Settings,
        "url": "/system-admin"
    },
]
