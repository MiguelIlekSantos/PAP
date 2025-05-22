'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Card } from '../components/Card'
import { Nav } from '../components/Nav'
import { AddBtnCard } from '../components/AddBtnCard'
import { Modal } from '../components/Modal'
import { DrawerMenu } from '../components/DrawerMenu'
import { Menu } from '../components/Menu'
import { OptPanel } from '../components/OptPanel'

export default function DashboardPage() {

	// const [CreateEnterpriseModal, setCEM] = useState<boolean>(false)

	return (
		<>
			<SlideFrame />
			<OptPanel/>
			{/* <Nav /> */}
			{/* <DrawerMenu/> */}
			{/* <Menu/> */}
			{/* <div className='h-20'></div>
			<div className='flex flex-wrap justify-center gap-5 p-5 relative'>
				<Card />
				<Card />
				<AddBtnCard onclick={() => { setCEM(true) }} />
			</div>
			<div className='h-20'></div>
			{CreateEnterpriseModal &&
				<Modal onclick={() => { setCEM(false) }} isCreate={true} isLarge={true}>
					<p>Create enterprise modal</p>
				</Modal>
			} */}


		</>
	)
}
