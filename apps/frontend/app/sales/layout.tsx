import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'

export default function SalesLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative">
			<DrawerMenu page='sales'/>

			<main className="relative z-0">
				{children}
			</main>
		</div>
	)
}