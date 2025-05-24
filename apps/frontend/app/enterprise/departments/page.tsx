'use client'

import React from 'react'
import { Pencil } from 'lucide-react'
import { InfoCard } from '@/app/components/InfoCard'

export default function DepartamentsPage() {
	return (
		<div className="min-h-screen ml-20 bg-base-300 text-white p-10">
			<h1 className="text-4xl font-bold text-white mb-10 border-b border-violet-900/30 pb-4">
				🗂️ Departamentos / Setores
			</h1>

			{/* Departamento 1 */}
			<div className="mb-12">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-semibold text-violet-400">Desenvolvimento de Software</h2>
					<button 
						onClick={() => alert("Editar departamento")}
						className="bg-[#11161d] text-violet-400 hover:text-violet-300 px-4 py-2 rounded-lg border border-gray-800 hover:border-violet-700 transition-all duration-300 flex items-center gap-2"
					>
						<Pencil size={16} />
						<span>Editar departamento</span>
					</button>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<InfoCard label="Nome do departamento" value="Desenvolvimento de Software" onEdit={() => alert("Editar nome")} />
					<InfoCard label="Responsável" value="Ana Moura" onEdit={() => alert("Editar responsável")} />
					<InfoCard label="Número de funcionários" value="32" onEdit={() => alert("Editar número")} />
					<InfoCard label="Filial associada" value="Techwave Lisboa" onEdit={() => alert("Editar filial")} />
					<InfoCard label="Email do departamento" value="dev@techwave.pt" isEmail onEdit={() => alert("Editar email")} />
					<InfoCard label="Orçamento anual" value="€1.250.000" onEdit={() => alert("Editar orçamento")} />
					<InfoCard label="Projetos ativos" value="8" onEdit={() => alert("Editar projetos")} />
					<InfoCard label="Data de criação" value="15/03/2015" onEdit={() => alert("Editar data")} />
					<InfoCard label="Tecnologias principais" value="React, Node.js, Python, AWS" onEdit={() => alert("Editar tecnologias")} />
				</div>
			</div>

			{/* Departamento 2 */}
			<div className="mb-12">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-semibold text-violet-400">Marketing e Vendas</h2>
					<button 
						onClick={() => alert("Editar departamento")}
						className="bg-[#11161d] text-violet-400 hover:text-violet-300 px-4 py-2 rounded-lg border border-gray-800 hover:border-violet-700 transition-all duration-300 flex items-center gap-2"
					>
						<Pencil size={16} />
						<span>Editar departamento</span>
					</button>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<InfoCard label="Nome do departamento" value="Marketing e Vendas" onEdit={() => alert("Editar nome")} />
					<InfoCard label="Responsável" value="Carlos Mendes" onEdit={() => alert("Editar responsável")} />
					<InfoCard label="Número de funcionários" value="18" onEdit={() => alert("Editar número")} />
					<InfoCard label="Filial associada" value="Techwave Porto" onEdit={() => alert("Editar filial")} />
					<InfoCard label="Email do departamento" value="marketing@techwave.pt" isEmail onEdit={() => alert("Editar email")} />
					<InfoCard label="Orçamento anual" value="€750.000" onEdit={() => alert("Editar orçamento")} />
					<InfoCard label="Campanhas ativas" value="5" onEdit={() => alert("Editar campanhas")} />
					<InfoCard label="Data de criação" value="20/05/2016" onEdit={() => alert("Editar data")} />
					<InfoCard label="Canais principais" value="Digital, Eventos, Parcerias" onEdit={() => alert("Editar canais")} />
				</div>
			</div>

			{/* Departamento 3 */}
			<div className="mb-12">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-semibold text-violet-400">Recursos Humanos</h2>
					<button 
						onClick={() => alert("Editar departamento")}
						className="bg-[#11161d] text-violet-400 hover:text-violet-300 px-4 py-2 rounded-lg border border-gray-800 hover:border-violet-700 transition-all duration-300 flex items-center gap-2"
					>
						<Pencil size={16} />
						<span>Editar departamento</span>
					</button>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<InfoCard label="Nome do departamento" value="Recursos Humanos" onEdit={() => alert("Editar nome")} />
					<InfoCard label="Responsável" value="Sofia Almeida" onEdit={() => alert("Editar responsável")} />
					<InfoCard label="Número de funcionários" value="8" onEdit={() => alert("Editar número")} />
					<InfoCard label="Filial associada" value="Techwave Lisboa" onEdit={() => alert("Editar filial")} />
					<InfoCard label="Email do departamento" value="rh@techwave.pt" isEmail onEdit={() => alert("Editar email")} />
					<InfoCard label="Orçamento anual" value="€350.000" onEdit={() => alert("Editar orçamento")} />
					<InfoCard label="Vagas abertas" value="12" onEdit={() => alert("Editar vagas")} />
					<InfoCard label="Data de criação" value="10/01/2016" onEdit={() => alert("Editar data")} />
					<InfoCard label="Ferramentas utilizadas" value="Workday, LinkedIn Recruiter, BambooHR" onEdit={() => alert("Editar ferramentas")} />
				</div>
			</div>

			{/* Botão para adicionar novo departamento */}
			<div className="mt-8 flex justify-center">
				<button 
					onClick={() => alert("Adicionar novo departamento")}
					className="bg-violet-700 hover:bg-violet-600 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
				>
					<span className="text-xl">+</span>
					<span>Adicionar novo departamento</span>
				</button>
			</div>
		</div>
	)
}