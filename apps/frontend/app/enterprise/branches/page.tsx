'use client'

import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Modal } from '../../components/Modal'
import { Branch } from '@/app/components/Branch'
import { Branches } from '@prisma/client'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { getAll, ListResponse } from '@/lib/api'

const APIMODULE = "branches"

export default function BranchesPage() {
	const [createModal, setCreateModal] = useState<boolean>(false)
	const [editDptModal, setDptModal] = useState<boolean>(false)

	const [loaded, setLoaded] = useState<boolean>(false);
	const [branches, setBranches] = useState<ListResponse<Branches>>();
	const [paginationNum, setPaginationNum] = useState<number>(1);

	const { getEnterprise } = useEnterpriseStore()

	useEffect(() => {

		getAll<ListResponse<Branches>>(APIMODULE, {
			"page": paginationNum,
			"quantity": 10,
		})
			.then((data) => {
				setLoaded(true)
				setBranches(data)

				console.log(data)

			})

	}, [paginationNum])

	return (
		<div className="min-h-screen ml-20 bg-base-300 text-white p-10">
			<div className="flex items-center justify-between mb-10 border-b border-violet-900/30 pb-4">
				<h1 className="text-4xl font-bold text-white">
					🏬 Filiais
				</h1>
				<button
					onClick={() => setCreateModal(true)}
					className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
				>
					<Plus size={18} />
					<span>Adicionar filial</span>
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{ loaded &&
				
				branches?.data.items.map((branch) => (
					<Branch
						key={branch.id}
						id={branch.id}
						name={branch.name}
						address={branch.address}
						manager={branch.manager}
						contact={branch.contact}
						function={branch.function}
						departments={branch.departments}
						setDptModal={() => setDptModal(true)}
					/>
				))}
			</div>

			{/* Modal para criar nova filial */}
			{createModal && (
				<Modal onclick={() => setCreateModal(false)} isCreate={true} isLarge={true}>
					<div className="w-full p-4">
						<h2 className="text-2xl font-bold text-center mb-6 text-violet-400">Adicionar Nova Filial</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="form-control">
								<label className="label">
									<span className="label-text text-white">Nome da filial</span>
								</label>
								<input type="text" placeholder="Ex: Techwave Porto" className="input input-bordered w-full" />
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text text-white">Responsável local</span>
								</label>
								<input type="text" placeholder="Ex: João Silva" className="input input-bordered w-full" />
							</div>
							<div className="form-control md:col-span-2">
								<label className="label">
									<span className="label-text text-white">Endereço completo</span>
								</label>
								<input type="text" placeholder="Ex: Rua das Flores, nº 123, Porto, Portugal" className="input input-bordered w-full" />
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text text-white">Telefone</span>
								</label>
								<input type="text" placeholder="Ex: +351 223 456 789" className="input input-bordered w-full" />
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text text-white">Email de contato</span>
								</label>
								<input type="email" placeholder="Ex: porto@techwave.pt" className="input input-bordered w-full" />
							</div>
							<div className="form-control md:col-span-2">
								<label className="label">
									<span className="label-text text-white">Função da unidade</span>
								</label>
								<input type="text" placeholder="Ex: Escritório comercial, Fábrica, Armazém" className="input input-bordered w-full" />
							</div>
						</div>
					</div>
				</Modal>
			)}

			{editDptModal && (
				<Modal onclick={() => setDptModal(false)} isCreate={true} isLarge={true}>
					<div>
						<p>Edit modal</p>
					</div>
				</Modal>
			)}

		</div>
	)
}