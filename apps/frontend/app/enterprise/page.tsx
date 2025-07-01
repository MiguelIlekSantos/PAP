'use client'

import React, { useEffect, useState } from 'react'
import { InfoCard } from '../components/InfoCard'
import { Modal } from '../components/Modal'
import { getById } from '@/lib/api'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { Enterprise } from '@prisma/client'

const APIMODULE = "enterprises"

export default function EnterprisePage() {

	const [EditModal, setEditModal] = useState<boolean>(false)

	const [loaded, setLoaded] = useState<boolean>(false);
	const [enterprise, setEnterprise] = useState<Enterprise>();

	const { getEnterprise } = useEnterpriseStore()

	useEffect(() => {

		getById<Enterprise>(APIMODULE, getEnterprise())
			.then((data) => {
				setLoaded(true)
				setEnterprise(data)
			})

	}, [])


	return (
		<div className="min-h-screen ml-20 bg-base-300 text-white p-10 relative">
			<div className="flex items-center relative">
				<h1 className="text-4xl font-bold text-white mb-10 border-b border-violet-900/30 pb-4">
					Home
				</h1>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{loaded &&
					<>
						<InfoCard isEnterprise={true} module={APIMODULE} name='legalName' label="Nome legal da empresa" value={enterprise?.legalName ?? undefined} />
						<InfoCard isEnterprise={true} module={APIMODULE} name='comercialName' label="Nome comercial" value={enterprise?.comercialName ?? undefined} />
						<InfoCard isEnterprise={true} module={APIMODULE} name='registerNumber' label="Número de registo" value={enterprise?.registerNumber ?? undefined} />
						<InfoCard isEnterprise={true} module={APIMODULE} name='registerCountry' label="País de registro" value={enterprise?.registerCountry ?? undefined} />
						<InfoCard isEnterprise={true} module={APIMODULE} name='registerType' label="Tipo de registro" value={enterprise?.registerType ?? undefined} />
						<InfoCard isEnterprise={true} module={APIMODULE} name='type' label="Tipo de empresa" value={enterprise?.type ?? undefined} />
						<InfoCard isEnterprise={true} module={APIMODULE} name='foundationDate' label="Data de fundação" value={enterprise?.foundationDate ? new Date(enterprise.foundationDate).toLocaleDateString('pt-PT') : undefined} />
						<InfoCard isEnterprise={true} module={APIMODULE} name='mainLanguage' label="Idioma principal" value={enterprise?.mainLanguage ?? undefined} />
						<InfoCard isEnterprise={true} module={APIMODULE} name='oficialCurrency' label="Moeda oficial" value={enterprise?.oficialCurrency ?? undefined} />
						<InfoCard isEnterprise={true} module={APIMODULE} name='email' label="Email de contato" value={enterprise?.email ?? undefined} isEmail />
						<InfoCard isEnterprise={true} module={APIMODULE} name='phone' label="Telefone" value={enterprise?.phone ?? undefined} />
						<InfoCard isEnterprise={true} module={APIMODULE} isFile name='logo' label="Logotipo da empresa" value={enterprise?.logo ?? undefined} />
					</>
				}


			</div>

			{EditModal &&
				<Modal onclick={() => { setEditModal(false) }} isCreate={false} isLarge={true}>
					<p>Create enterprise modal</p>
				</Modal>
			}

		</div>
	)
}
