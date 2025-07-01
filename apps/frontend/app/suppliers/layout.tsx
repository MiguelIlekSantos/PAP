import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'

export default function SuppliersLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative">
			<DrawerMenu page='suppliers'/>

			<main className="relative z-0">
				{children}
			</main>
		</div>
	)
}