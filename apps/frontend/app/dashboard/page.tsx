'use client'

import React, { useEffect, useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Card } from '../components/Card'
import { Nav } from '../components/Nav'
import { AddBtnCard } from '../components/AddBtnCard'
import { getAll } from '@/lib/api'
import { ListResponse } from '@/lib/api/response.interface'

import { Enterprise } from '@prisma/client'
import { Input } from '../components/forms/Input'
import { Fieldset } from '../components/forms/Fieldset'
import { ModalForms } from '../components/forms/ModalForms'



export default function DashboardPage() {

	const [CreateEnterpriseModal, setCEM] = useState<boolean>(false)

	const [loaded, setLoaded] = useState<boolean>(false);
	const [enterprises, setEnterprises] = useState<ListResponse<Enterprise>>();

	useEffect(() => {

		getAll<ListResponse<Enterprise>>('enterprises')
			.then((data) => {
				setLoaded(true)
				setEnterprises(data)

				console.log(data)

			})

	}, [])


	return (
		<>
			<SlideFrame />
			<Nav />
			<div className='h-20'></div>
			<div className='flex flex-wrap justify-center gap-5 p-5 relative'>

				{loaded &&
					
					enterprises?.data.items.map((enterprise, idx) => {

						return (
							<Card
								key={enterprise.id}
								name={enterprise.legalName}
								email={enterprise.email}
								imgUrl={enterprise.logo}
								foundationDate={enterprise.foundationDate}
							/>
							// <div key={idx}>{enterprise.legalName}</div>
						)
					})

				}

				{/* <Card name='Enterprise 1' description='bla bla bla' imgUrl='nah'/> */}
				<AddBtnCard onclick={() => { setCEM(true) }} />
			</div>
			<div className='h-20'></div>
			{CreateEnterpriseModal &&
				<ModalForms onclick={() => { setCEM(false) }}>
					<p className='text-2xl p-5 lg:p-10'>Just insert the basic settings here and then configure your enterprise in its own details page</p>
					
					<Fieldset title='Create Enterprise'>
						<Input name='Legal name'/>
						<Input name='Comercial name'/>
						<Input name='NIF'/>
						<Input name='NISS'/>
						<Input name='NIPC'/>
						<Input name='Type'/>
						<Input name='Foundation date'/>
						<Input name='Registered country'/>
						<Input name='Main language'/>
						<Input name='Currency'/>
						<Input name='Email'/>
						<Input name='Phone'/>
						<Input name='Logo' type='file'/>
					</Fieldset>

				</ModalForms>
			}


		</>
	)
}
