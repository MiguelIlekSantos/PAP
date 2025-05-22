'use client'

import React, { useState } from 'react'
import { DrawerMenu } from '../components/DrawerMenu'
import { EnterpriseTabs } from '../data/tabs'

export default function DashboardPage() {

	// const [CreateEnterpriseModal, setCEM] = useState<boolean>(false)

	return (
		<>
			<DrawerMenu tabs={EnterpriseTabs}/>


		</>
	)
}
