'use client'

import React from 'react'
import { Branch } from '../../components/Branch'

export default function BranchesPage() {
	// Dados das filiais - no futuro, estes dados poderiam vir de uma API
	const branches = [
		{
			name: "Techwave Porto",
			address: "Rua das Flores, nº 123, Porto, Portugal",
			manager: "João Silva",
			phone: "+351 912 345 678",
			email: "porto@techwave.pt",
			function: "Escritório comercial",
			inauguratedAt: "15/05/2018",
			employeesCount: "25",
			workingHours: "Segunda a Sexta, 9h às 18h"
		},
		{
			name: "Techwave Lisboa",
			address: "Avenida da Liberdade, nº 456, Lisboa, Portugal",
			manager: "Maria Santos",
			phone: "+351 923 456 789",
			email: "lisboa@techwave.pt",
			function: "Sede principal",
			inauguratedAt: "12/03/2015",
			employeesCount: "78",
			workingHours: "Segunda a Sexta, 9h às 18h"
		},
		{
			name: "Techwave Faro",
			address: "Rua do Sol, nº 789, Faro, Portugal",
			manager: "António Costa",
			phone: "+351 934 567 890",
			email: "faro@techwave.pt",
			function: "Armazém e Logística",
			inauguratedAt: "20/09/2020",
			employeesCount: "12",
			workingHours: "Segunda a Sexta, 8h às 17h"
		}
	];

	return (
		<div className="min-h-screen ml-20 bg-base-300 text-white p-10">
			<h1 className="text-4xl font-bold text-white mb-10 border-b border-violet-900/30 pb-4">
				🏬 Filiais / Localizações
			</h1>

			{/* Renderiza as filiais usando o componente Branch */}
			{branches.map((branch, index) => (
				<Branch
					key={index}
					name={branch.name}
					address={branch.address}
					manager={branch.manager}
					phone={branch.phone}
					email={branch.email}
					function={branch.function}
					inauguratedAt={branch.inauguratedAt}
					employeesCount={branch.employeesCount}
					workingHours={branch.workingHours}
				/>
			))}

			{/* Botão para adicionar nova filial */}
			<div className="mt-8 flex justify-center">
				<button 
					onClick={() => alert("Adicionar nova filial")}
					className="bg-violet-700 hover:bg-violet-600 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
				>
					<span className="text-xl">+</span>
					<span>Adicionar nova filial</span>
				</button>
			</div>
		</div>
	)
}