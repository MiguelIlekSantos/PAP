import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'
import { FinanceTabs } from '../data/tabs'

export default function FinancialLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative">
			<DrawerMenu tabs={FinanceTabs} page='/financial'/>

			<main className="relative z-0">
				{children}
			</main>
		</div>
	)
}
