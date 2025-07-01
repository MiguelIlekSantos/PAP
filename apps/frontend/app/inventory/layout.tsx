import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative">
			<DrawerMenu page='inventory'/>

			<main className="relative z-0">
				{children}
			</main>
		</div>
	)
}
