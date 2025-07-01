import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'

export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative">
			<DrawerMenu page='enterprise'/>

			<main className="relative z-0">
				{children}
			</main>
		</div>
	)
}
