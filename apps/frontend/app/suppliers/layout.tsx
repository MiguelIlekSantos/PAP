import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'
import { PurchasesTabs } from '../data/tabs'

export default function SuppliersLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative">
			<DrawerMenu tabs={PurchasesTabs} page='/suppliers'/>

			<main className="relative z-0">
				{children}
			</main>
		</div>
	)
}