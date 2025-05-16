'use client'

import React, { useEffect, useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { MenuBtn } from '../components/MenuBtn'
import { DrawerMenu } from '../components/DrawerMenu'
import { Menu } from '../components/Menu'
import Image from 'next/image'
import { Card } from '../components/Card'
import { Nav } from '../components/Nav'
import { AddBtnCard } from '../components/AddBtnCard'
import { AddEnterpriseModal } from '../components/AddEnterpriseModal'

export default function DashboardPage() {

	const [addEnterpriseModal, setAddEnterpriseModal] = useState<boolean>(false)

	return (
		<>
			<SlideFrame />
			<Nav />
			<div className='h-20'></div>
			<div className='flex flex-wrap justify-center gap-5 p-5 relative'>
				<Card />
				<Card />
				<AddBtnCard onclick={() => {setAddEnterpriseModal(true)}}/>
			</div>
			<div className='h-20'></div>
			{addEnterpriseModal &&
				<AddEnterpriseModal onclick={() => {setAddEnterpriseModal(false)}}/>
			}


		</>
	)
}
