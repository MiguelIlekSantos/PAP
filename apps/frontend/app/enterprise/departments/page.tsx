'use client'

import React, { useState } from 'react'
import { Plus, Search, Filter, ChevronDown } from 'lucide-react'
import { DepartmentCard } from '@/app/components/DepartmentCard'
import { Modal } from '@/app/components/Modal'

// Definindo o tipo para um departamento
type Department = {
	id: string;
	name: string;
	manager: string;
	employeeCount: number;
	budget: {
		total: number;
		used: number;
		currency: string;
	};
	location: string;
	parentId: string | null;
};

export default function DepartmentsPage() {
	const [createDepartmentModal, setCreateDepartmentModal] = useState<boolean>(false);
	const [createSubDepartmentModal, setCreateSubDepartmentModal] = useState<boolean>(false);
	const [editModal, setEditModal] = useState<boolean>(false);
	const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

	// Dados de exemplo para os departamentos
	const departments: Department[] = [
		{
			id: "dev-dept",
			name: "Desenvolvimento de Software",
			manager: "Ana Moura",
			employeeCount: 32,
			budget: {
				total: 1250000,
				used: 875000,
				currency: "€"
			},
			location: "Techwave Lisboa",
			parentId: null
		},
		{
			id: "marketing-dept",
			name: "Marketing e Vendas",
			manager: "Carlos Mendes",
			employeeCount: 18,
			budget: {
				total: 750000,
				used: 420000,
				currency: "€"
			},
			location: "Techwave Porto",
			parentId: null
		},
		{
			id: "hr-dept",
			name: "Recursos Humanos",
			manager: "Sofia Almeida",
			employeeCount: 8,
			budget: {
				total: 350000,
				used: 210000,
				currency: "€"
			},
			location: "Techwave Lisboa",
			parentId: null
		},
		{
			id: "finance-dept",
			name: "Finanças",
			manager: "Pedro Santos",
			employeeCount: 12,
			budget: {
				total: 500000,
				used: 380000,
				currency: "€"
			},
			location: "Techwave Lisboa",
			parentId: null
		},
		{
			id: "frontend-dept",
			name: "Frontend",
			manager: "João Silva",
			employeeCount: 14,
			budget: {
				total: 600000,
				used: 450000,
				currency: "€"
			},
			location: "Techwave Lisboa",
			parentId: "dev-dept"
		},
		{
			id: "backend-dept",
			name: "Backend",
			manager: "Maria Costa",
			employeeCount: 18,
			budget: {
				total: 650000,
				used: 425000,
				currency: "€"
			},
			location: "Techwave Braga",
			parentId: "dev-dept"
		}
	];

	// Função para lidar com o clique no ícone de edição
	const handleEditClick = (departmentId: string) => {
		setSelectedDepartmentId(departmentId);
		setEditModal(true);
	};

	// Encontrar o departamento selecionado
	const selectedDepartment = selectedDepartmentId 
		? departments.find(dept => dept.id === selectedDepartmentId) 
		: null;

	return (
		<div className="min-h-screen ml-20 bg-base-300 text-white p-10">
			<div className="flex items-center justify-between mb-10 border-b border-violet-900/30 pb-4">
				<h1 className="text-4xl font-bold text-white">
					🗂️ Estrutura Organizacional
				</h1>
			</div>

			{/* Departamentos Principais */}
			<div className="mb-10">
				<div className='flex gap-10'>
					<h2 className="text-2xl font-semibold text-violet-400 mb-6">Departamentos Principais</h2>
					<button onClick={() => setCreateDepartmentModal(true)} className='btn btn-primary text-2xl'>
						<Plus size={18} />
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{departments
						.filter(dept => dept.parentId === null)
						.map(dept => (
							<DepartmentCard
								key={dept.id}
								id={dept.id}
								name={dept.name}
								manager={dept.manager}
								employeeCount={dept.employeeCount}
								budget={dept.budget}
								location={dept.location}
								onClick={handleEditClick}
							/>
						))}
				</div>
			</div>

			{/* Subdepartamentos */}
			<div className="mb-10">
				<div className='flex gap-10'>
					<h2 className="text-2xl font-semibold text-violet-400 mb-6">Subdepartamentos</h2>
					<button onClick={() => setCreateSubDepartmentModal(true)} className='btn btn-primary text-2xl'>
						<Plus size={18} />
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{departments
						.filter(dept => dept.parentId !== null)
						.map(dept => (
							<DepartmentCard
								key={dept.id}
								id={dept.id}
								name={dept.name}
								manager={dept.manager}
								employeeCount={dept.employeeCount}
								budget={dept.budget}
								location={dept.location}
								onClick={handleEditClick}
							/>
						))}
				</div>
			</div>

			{/* Modal para criar novo departamento principal */}
			{createDepartmentModal && (
				<Modal onclick={() => setCreateDepartmentModal(false)} isCreate={true} isLarge={true}>
					<p>a</p>
				</Modal>
			)}

			{/* Modal para criar subdepartamento */}
			{createSubDepartmentModal && (
				<Modal onclick={() => setCreateSubDepartmentModal(false)} isCreate={true} isLarge={true}>
					<p>a</p>
				</Modal>
			)}

			{/* Modal para editar departamento */}
			{editModal && selectedDepartment && (
				<Modal onclick={() => setEditModal(false)} isCreate={false} isLarge={true}>
					<p>a</p>
				</Modal>
			)}
		</div>
	);
}