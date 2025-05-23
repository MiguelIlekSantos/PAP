import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'
import { EnterpriseTabs } from '../data/tabs'

export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative">
			{/* Drawer menu fica por cima do conteúdo */}
			<DrawerMenu tabs={EnterpriseTabs} page='/enterprise'/>

			{/* Conteúdo principal */}
			<main className="relative z-0">
				{children}
			</main>
		</div>
	)
}
