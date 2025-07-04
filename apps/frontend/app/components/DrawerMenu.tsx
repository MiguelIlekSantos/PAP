'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
	Home, Building2, Settings, Users, Package, Warehouse, Wrench, DollarSign, FileText, Landmark, ShoppingCart, UserCheck, Receipt, Newspaper, Truck, Boxes, ClipboardCheck, Monitor, Globe, Server, History, Megaphone, Share2, FolderOpen, BookOpen, Book, ShieldCheck, BarChart3, UserCog, DatabaseBackup, Brain, ArrowLeft,
} from 'lucide-react'

import { Tabs } from '../interfaces/tabs'

type Props = {
	page: string
}

export const DrawerMenu = ({ page }: Props) => {
	const [isOpen, setIsOpen] = useState(false)

	let currentTabs: Tabs[] = []

	switch (page) {
		case 'enterprise':
			currentTabs = EnterpriseTabs
			break
		case 'resources':
			currentTabs = ResourcesTabs
			break
		case 'inventory':
			currentTabs = InventoryTabs
			break
		case 'financial':
			currentTabs = FinanceTabs
			break
		case 'sales':
			currentTabs = SalesTabs
			break
		case 'suppliers':
			currentTabs = SuppliersTabs
			break
		case 'logistic':
			currentTabs = LogisticsTabs
			break
		case 'projects':
			currentTabs = ProjectsTabs
			break
		case 'tecnology':
			currentTabs = TechnologyTabs
			break
		case 'marketing':
			currentTabs = MarketingTabs
			break
		case 'documentation':
			currentTabs = DocumentationTabs
			break
		case 'system-admin':
			currentTabs = SystemAdminTabs
			break
		case 'ai-analysis':
			currentTabs = AIAnalysisTabs
			break
		default:
			currentTabs = []
	}

	const toggleDrawer = () => setIsOpen(!isOpen)

	return (
		<div
			className={`fixed top-0 left-0 h-full bg-base-200 text-base-content z-40 transition-all duration-300 ease-in-out shadow-md
			${isOpen ? 'w-64' : 'w-20'} flex flex-col items-start py-4 px-2`}
		>
			{/* Toggle Button */}
			<button
				onClick={toggleDrawer}
				className="mb-6 ml-1 p-2 rounded hover:bg-base-300 transition"
			>
				{isOpen ? (
					<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
					</svg>
				) : (
					<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
					</svg>
				)}
			</button>

			{/* Logo */}
			<div className="w-full flex justify-center items-center mb-8">
				<div className="bg-white rounded-lg">
					<Image src="/logo/logoAIMS.png" alt="Logo" width={100} height={100} className="rounded" />
				</div>
			</div>

			{/* Menu Items */}
			<ul className="w-full space-y-1">
				{currentTabs.map((tab, i) => {
					const Icon = tab.icon
					return (
						<li key={i}>
							<Link
								href={"/" + page + tab.url}
								onClick={() => setIsOpen(false)}
								className="h-16 flex items-center gap-4 px-4 py-3 hover:bg-base-300 rounded transition w-full"
							>
								<Icon className="w-6 h-6" />
								{isOpen && <span className="text-sm font-medium">{tab.title}</span>}
							</Link>
						</li>
					)
				})}

				{/* Back/Logout button */}
				<li className="mt-6">
					<Link
						href="/details"
						className="flex items-center justify-center gap-3 bg-error text-white px-4 py-3 rounded w-full hover:bg-red-600 transition"
					>
						<ArrowLeft size={24} />
						{isOpen && <span className="font-medium">Logout</span>}
					</Link>
				</li>
			</ul>
		</div>
	)
}

// ---------------------- TAB DEFINITIONS ----------------------

export const EnterpriseTabs: Tabs[] = [
	{ title: 'Home', icon: Home, url: '/' },
	{ title: 'Branches', icon: Building2, url: '/branches' },
	{ title: 'Departments', icon: Users, url: '/departments' }
]

export const ResourcesTabs: Tabs[] = [
	{ title: 'Employees', icon: Users, url: '/' },
]

export const InventoryTabs: Tabs[] = [
	{ title: 'Products', icon: Package, url: '/' },
	{ title: 'Warehouses', icon: Warehouse, url: '/warehouses' },
	{ title: 'Equipments', icon: Wrench, url: '/equipment' },
]

export const FinanceTabs: Tabs[] = [
	{ title: 'Billing', icon: DollarSign, url: '/' },
	{ title: 'Budgets', icon: FileText, url: '/budgets' },
	{ title: 'Taxes', icon: Landmark, url: '/taxes' },
]

export const SalesTabs: Tabs[] = [
	{ title: 'Dashboard', icon: ShoppingCart, url: '/' },
	{ title: 'Clients', icon: UserCheck, url: '/clients' },
	{ title: 'Orders', icon: Receipt, url: '/orders' },
	{ title: 'Invoices', icon: Newspaper, url: '/invoices' },
]

export const SuppliersTabs: Tabs[] = [
	{ title: 'Suppliers', icon: Truck, url: '/' },
	{ title: 'Purchases', icon: Boxes, url: '/purchases' },
]

export const LogisticsTabs: Tabs[] = [
	{ title: 'Deliveries', icon: ClipboardCheck, url: '/' },
	{ title: 'Transport', icon: Truck, url: '/transport' },
]

export const ProjectsTabs: Tabs[] = [
	{ title: 'Projects', icon: ClipboardCheck, url: '/' },
]

export const TechnologyTabs: Tabs[] = [
	{ title: 'Dashboard', icon: Monitor, url: '/' },
	{ title: 'Domains & Sites', icon: Globe, url: '/domains' },
	{ title: 'Internal Systems', icon: Server, url: '/systems' },
]

export const MarketingTabs: Tabs[] = [
	{ title: 'Campaigns', icon: Megaphone, url: '/' },
	{ title: 'Social Media', icon: Share2, url: '/social-media' },
]

export const DocumentationTabs: Tabs[] = [
	{ title: 'Dashboard', icon: Home, url: '/' },
]

export const SystemAdminTabs: Tabs[] = [
	{ title: 'Users', icon: UserCog, url: '/' },
	{ title: 'System Settings', icon: Settings, url: '/configuration' },
	{ title: 'System Logs', icon: History, url: '/logs' },
]

export const AIAnalysisTabs: Tabs[] = [
	{ title: 'AI Analysis', icon: Brain, url: '/' },
]
