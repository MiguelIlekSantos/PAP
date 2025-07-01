'use client'

import React, { useEffect, useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Card } from '../components/Card'
import { Nav } from '../components/Nav'
import { AddBtnCard } from '../components/AddBtnCard'
import { create, getAll, remove } from '@/lib/api'
import { ListResponse } from '@/lib/api/response.interface'

import { Enterprise } from '@prisma/client'
import { Input } from '../components/forms/Input'
import { Fieldset } from '../components/forms/Fieldset'
import { ModalForms } from '../components/forms/ModalForms'
import { Pagination } from '../components/Pagination'
import { CreateEnterpriseDTO } from '@utils'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'


const APIMODULE = "enterprises"

export default function DashboardPage() {

	const [CreateEnterpriseModal, setCEM] = useState<boolean>(false)

	const [loaded, setLoaded] = useState<boolean>(false);
	const [enterprises, setEnterprises] = useState<ListResponse<Enterprise>>();
	const [paginationNum, setPaginationNum] = useState<number>(1);

	const [inputData, setInputData] = useState<Partial<CreateEnterpriseDTO>>({})


	useEffect(() => {

		getAll<ListResponse<Enterprise>>(APIMODULE, {
			"page": paginationNum,
			"quantity": 10,
		})
			.then((data) => {
				setLoaded(true)
				setEnterprises(data)

				console.log(data)

			})

	}, [paginationNum])


	function createEnterprise(): Promise<boolean> {

		const payload = inputData as CreateEnterpriseDTO;

		return create<CreateEnterpriseDTO, Enterprise>(APIMODULE, payload)
			.then((data) => {
				console.log(data)
				return true
			})
			.catch(err => {
				console.error(err)
				return false
			})
	}

	// Função para deletar empresa
	const handleDeleteEnterprise = async (enterpriseId: number) => {
		if (window.confirm('Tem certeza que deseja deletar esta empresa? Esta ação não pode ser desfeita e removerá todos os dados relacionados.')) {
			try {
				await remove(APIMODULE, enterpriseId);
				showSuccess('Empresa deletada com sucesso!');
				
				// Recarregar a lista de empresas
				const data = await getAll<ListResponse<Enterprise>>(APIMODULE, {
					"page": paginationNum,
					"quantity": 10,
				});
				setEnterprises(data);
			} catch (error) {
				console.error('Erro ao deletar empresa:', error);
				showError('Erro ao deletar empresa. Tente novamente.');
			}
		}
	};


	return (
		<>
			<SlideFrame />
			<Nav />
			<div className='h-20'></div>
			<div className='flex flex-wrap justify-center gap-5 p-5 relative'>

				{loaded &&

					enterprises?.data.items.map((enterprise) => {

						return (
							<Card
								id={enterprise.id}
								key={enterprise.id}
								name={enterprise.legalName}
								email={enterprise.email}
								imgUrl={enterprise.logo}
								foundationDate={enterprise.foundationDate}
								onDelete={handleDeleteEnterprise}
							/>
						)
					})

				}
				<AddBtnCard onclick={() => { setCEM(true) }} />
			</div>
			{loaded &&
				<Pagination updatePage={setPaginationNum} actualPage={paginationNum} last={enterprises?.data.metadata.last ?? 1} />
			}
			<div className='h-20'></div>
			{CreateEnterpriseModal &&
				<ModalForms create={createEnterprise} setInputData={setInputData} onclick={() => { setCEM(false) }}>
					<p className='text-2xl p-5 lg:p-10'>Just insert the basic settings here and then configure your enterprise in its own details page</p>

					<Fieldset title='Create Enterprise'>
						<Input nameOnDB='legalName' name='Legal name' />
						<Input nameOnDB='comercialName' name='Comercial name' />
						<Input nameOnDB='registerNumber' name='Register Number' />
						<Input nameOnDB='registerCountry' name='Registered Country' />
						<Input nameOnDB='registerType' name='Register Type' />
						<Input nameOnDB='type' name='Type' />
						<Input nameOnDB='foundationDate' name='Foundation date' />
						<Input nameOnDB='mainLanguage' name='Main language' />
						<Input nameOnDB='oficialCurrency' name='Currency' />
						<Input nameOnDB='email' name='Email' />
						<Input nameOnDB='phone' name='Phone' />
						<Input nameOnDB='logo' name='Logo' type='file' />
					</Fieldset>

				</ModalForms>
			}


		</>
	)
}
