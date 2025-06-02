import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'
import { EnterpriseTabs } from '../data/tabs'

export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative">
			<DrawerMenu tabs={EnterpriseTabs} page='/enterprise'/>

			<main className="relative z-0">
				{children}
			</main>
		</div>
	)
}
