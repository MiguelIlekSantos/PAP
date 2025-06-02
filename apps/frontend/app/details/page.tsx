'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Card } from '../components/Card'
import { Nav } from '../components/Nav'
import { AddBtnCard } from '../components/AddBtnCard'
import { Modal } from '../components/Modal'
import { DrawerMenu } from '../components/DrawerMenu'
import { OptPanel } from '../components/OptPanel'

export default function DetailsPage() {

	// const [CreateEnterpriseModal, setCEM] = useState<boolean>(false)

	return (
		<>
			<SlideFrame />
			<Nav isSimple={true} />
			<OptPanel/>
		</>
	)
}
