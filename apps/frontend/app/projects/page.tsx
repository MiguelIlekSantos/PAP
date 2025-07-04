'use client'

import React, { useEffect, useState } from 'react'
import { Modal } from '../components/Modal'
import { Plus } from 'lucide-react'
import { Projects } from '@prisma/client'
import { create, getAll, ListResponse } from '@/lib/api'
import { CreateProjectsDTO, ProjectsDTO } from '@pap/utils'
import { ProjectCard } from '../components/ProjectCard'
import { Pagination } from '../components/Pagination'


const APIMODULE = "projects"

export default function ProjectsPage() {
	const [loaded, setLoaded] = useState<boolean>(false);
	const [projects, setProjects] = useState<ListResponse<ProjectsDTO>>();
	const [searchTerm, setSearchTerm] = useState('');
	const [showAddModal, setShowAddModal] = useState(false);
	const [paginationNum, setPaginationNum] = useState<number>(1);

	const [inputData, setInputData] = useState<Partial<CreateProjectsDTO>>({})

	useEffect(() => {

		getAll<ListResponse<ProjectsDTO>>(APIMODULE, {
			"page": paginationNum,
			"quantity": 4,
		})
			.then((data) => {
				setLoaded(true)
				setProjects(data)

				console.log(data)

			})

	}, [paginationNum])

	function createProject(): Promise<boolean> {

		const payload = inputData as CreateProjectsDTO;

		return create<CreateProjectsDTO, Projects>(APIMODULE, payload)
			.then((data) => {
				console.log(data)
				return true
			})
			.catch(err => {
				console.error(err)
				return false
			})
	}


	return (
		<>
			<div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-3xl font-bold text-white">Projetos</h1>
					<button
						onClick={() => setShowAddModal(true)}
						className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
					>
						<Plus size={18} />
						Novo Projeto
					</button>
				</div>

				{/* Project cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{loaded &&
						projects?.data.items.map((project) => {
							return (
								<ProjectCard
									project={project}
									key={project.id}
								/>
							)
						})
					}
					{projects?.data.items.length === 0 && (
						<div className="col-span-full text-center py-10 text-gray-400">
							Nenhum projeto encontrado.
						</div>
					)}
				</div>


				<Pagination
					actualPage={paginationNum}
					last={projects?.data.metadata.last || 1}
					updatePage={setPaginationNum}
				/>
			</div>

			{/* Add Project Modal */}
			{showAddModal && (
				<Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
					<p>a</p>
				</Modal>
			)}
		</>
	);
}