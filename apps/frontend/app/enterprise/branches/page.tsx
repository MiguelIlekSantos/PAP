'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { Modal } from '../../components/Modal'
import { Branch } from '@/app/components/Branch'

export default function BranchesPage() {
	const [createModal, setCreateModal] = useState<boolean>(false)

	// Dados de exemplo para as filiais com departamentos
	const branches = [
		{
			id: "lisbon-branch",
			name: "Techwave Lisboa",
			address: "Avenida da Liberdade, nº 245, 5º andar, 1250-143 Lisboa, Portugal",
			manager: "Miguel Costa",
			contact: {
				phone: "+351 213 456 789",
				email: "lisboa@techwave.pt"
			},
			function: "Sede / Escritório principal",
			departments: [
				{
					id: "dev-dept",
					name: "Desenvolvimento de Software",
					manager: "Ana Moura",
					employeeCount: 20
				},
				{
					id: "hr-dept",
					name: "Recursos Humanos",
					manager: "Sofia Almeida",
					employeeCount: 8
				},
				{
					id: "finance-dept",
					name: "Finanças",
					manager: "Pedro Santos",
					employeeCount: 12
				},
				{
					id: "frontend-dept",
					name: "Frontend",
					manager: "João Silva",
					employeeCount: 14
				}
			]
		},
		{
			id: "porto-branch",
			name: "Techwave Porto",
			address: "Rua das Flores, nº 123, 4050-262 Porto, Portugal",
			manager: "João Silva",
			contact: {
				phone: "+351 223 456 789",
				email: "porto@techwave.pt"
			},
			function: "Escritório comercial",
			departments: [
				{
					id: "marketing-dept",
					name: "Marketing e Vendas",
					manager: "Carlos Mendes",
					employeeCount: 18
				}
			]
		},
		{
			id: "braga-branch",
			name: "Techwave Braga",
			address: "Avenida Central, nº 56, 4710-229 Braga, Portugal",
			manager: "Ana Pereira",
			contact: {
				phone: "+351 253 123 456",
				email: "braga@techwave.pt"
			},
			function: "Centro de desenvolvimento",
			departments: [
				{
					id: "backend-dept",
					name: "Backend",
					manager: "Maria Costa",
					employeeCount: 18
				}
			]
		},
		{
			id: "faro-branch",
			name: "Techwave Faro",
			address: "Rua do Algarve, nº 78, 8000-123 Faro, Portugal",
			manager: "Pedro Santos",
			contact: {
				phone: "+351 289 123 456",
				email: "faro@techwave.pt"
			},
			function: "Escritório regional",
			departments: []
		}
	]

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

			{/* Lista de filiais em grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{branches.map((branch) => (
					<Branch
						key={branch.id}
						id={branch.id}
						name={branch.name}
						address={branch.address}
						manager={branch.manager}
						contact={branch.contact}
						function={branch.function}
						departments={branch.departments}
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
		</div>
	)
}