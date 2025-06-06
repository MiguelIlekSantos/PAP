import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'
import { SalesTabs } from '../data/tabs'

export default function SalesLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative">
			<DrawerMenu tabs={SalesTabs} page='/sales'/>

			<main className="relative z-0">
				{children}
			</main>
		</div>
	)
}