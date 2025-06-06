import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'
import { InventoryTabs } from '../data/tabs'

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative">
			<DrawerMenu tabs={InventoryTabs} page='/inventory'/>

			<main className="relative z-0">
				{children}
			</main>
		</div>
	)
}
