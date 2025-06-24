'use client'

import React, { useEffect, useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Card } from '../components/Card'
import { Nav } from '../components/Nav'
import { AddBtnCard } from '../components/AddBtnCard'
import { Modal } from '../components/Modal'
import { DrawerMenu } from '../components/DrawerMenu'
import { OptPanel } from '../components/OptPanel'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { getById } from '@/lib/api'
import { Enterprise } from '@prisma/client'

export default function DetailsPage() {

	const [enterprise, setEnterprise] = useState<Enterprise>()
	const [loaded, setLoaded] = useState<boolean>()

	const { getEnterprise } = useEnterpriseStore()

	useEffect(() => {

		getById<Enterprise>("enterprises", getEnterprise())
			.then((data) => {
				setEnterprise(data)
				setLoaded(true)
			})


	}, [])

	return (
		<>
			<SlideFrame />
			{loaded &&
				<Nav isSimple={true} name={enterprise?.legalName} />
			}
			<OptPanel />
		</>
	)
}
