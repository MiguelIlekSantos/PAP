'use client'

import React, { useState } from 'react'
import { InfoCard } from '../components/InfoCard'
import { Pencil } from 'lucide-react'
import { Modal } from '../components/Modal'


export default function EnterprisePage() {

	const [EditModal, setEditModal] = useState<boolean>(false)

	return (
		<div className="min-h-screen ml-20 bg-base-300 text-white p-10 relative">
			<div className="flex items-center relative">
				<h1 className="text-4xl font-bold text-white mb-10 border-b border-violet-900/30 pb-4">
					Home
				</h1>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<InfoCard label="Nome legal da empresa" value="Techwave Lda."/>
				<InfoCard label="Nome comercial" value="Techwave Software Solutions"/>
				<InfoCard label="NIF" value="PT507839241"/>
				<InfoCard label="NISS" value="12345678901"/>
				<InfoCard label="Registro comercial (NIPC)" value="507839241"/>
				<InfoCard label="Tipo de empresa" value="Lda. (Limitada)"/>
				<InfoCard label="Data de fundação" value="12/03/2015"/>
				<InfoCard label="País de registro" value="Portugal"/>
				<InfoCard label="Idioma principal" value="Português"/>
				<InfoCard label="Moeda oficial" value="EUR (€)"/>
				<InfoCard label="Regime fiscal / IVA" value="Regime Normal de IVA"/>
				<InfoCard label="Website" value="https://techwave.pt" isLink/>
				<InfoCard label="Email de contato" value="contato@techwave.pt" isEmail/>
				<InfoCard label="Telefone" value="+351 912 345 678"/>

				{/* Logotipo */}
				<div className="relative bg-[#11161d] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-xl p-5 flex flex-col gap-3 shadow-lg hover:shadow-violet-900/20">
					<span className="text-sm text-violet-400 font-medium">Logotipo da empresa</span>
					<div className="w-full h-32 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-800 hover:border-violet-900/50 transition-all duration-300">
						<span className="text-gray-500 text-sm">[Logotipo exibido aqui]</span>
					</div>
					<button
						onClick={() => alert("Editar logotipo")}
						className="absolute top-3 right-3 text-gray-500 hover:text-violet-300 transition-colors duration-200"
					>
					</button>
				</div>
			</div>

			{EditModal &&
				<Modal onclick={() => { setEditModal(false) }} isCreate={false} isLarge={true}>
					<p>Create enterprise modal</p>
				</Modal>
			}

		</div>
	)
}
