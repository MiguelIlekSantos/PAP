'use client'

import React, { useEffect, useState } from 'react'
import { Plus, Search, Filter, ChevronDown } from 'lucide-react'
import { DepartmentCard } from '@/app/components/DepartmentCard'
import { SubDepartmentCard } from '@/app/components/SubDepartmentCard'
import { Modal } from '@/app/components/Modal'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { CreateDepartmentsDTO, UpdateDepartmentsDTO, CreateSubDepartmentsDTO, UpdateSubDepartmentsDTO } from '@pap/utils'
import { create, getAll, ListResponse, update, remove } from '@/lib/api'
import { Departments, SubDepartments } from '@prisma/client'
import { Pagination } from '@/app/components/Pagination'
import { ModalForms } from '@/app/components/forms/ModalForms'
import { Fieldset } from '@/app/components/forms/Fieldset'
import { Input } from '@/app/components/forms/Input'
import { Select } from '@/app/components/forms/Select'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'


const APIMODULE = "departments"
const APIMODULE_SUB = "subdepartments"

export default function DepartmentsPage() {
	const [createDepartmentModal, setCreateDepartmentModal] = useState<boolean>(false);
	const [createSubDepartmentModal, setCreateSubDepartmentModal] = useState<boolean>(false);
	const [editModal, setEditModal] = useState<boolean>(false);

	const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>();


	const [loaded, setLoaded] = useState<boolean>(false);
	const [dpts, setDpts] = useState<ListResponse<Departments>>();
	const [subDpts, setSubDpts] = useState<ListResponse<SubDepartments>>();

	const [paginationNumDtps, setPaginationNumDtps] = useState<number>(1);
	const [paginationNumSubDtps, setPaginationNumSubDtps] = useState<number>(1);
	const [inputDataDpt, setInputDataDpt] = useState<Partial<CreateDepartmentsDTO>>({})
	const [inputDataSubDpt, setInputDataSubDpt] = useState<Partial<CreateSubDepartmentsDTO>>({})
	const [departmentOptions, setDepartmentOptions] = useState<{value: number, label: string}[]>([])
	

	const { getEnterprise } = useEnterpriseStore()

	useEffect(() => {
		const enterpriseId = getEnterprise();
		if (!enterpriseId) {
			console.error('Enterprise ID not found in store');
			return;
		}

		getAll<ListResponse<Departments>>(APIMODULE, {
			"page": paginationNumDtps,
			"quantity": 3,
			"relationFilter": ["enterpriseId", enterpriseId]
		})
			.then((data) => {
				setLoaded(true)
				setDpts(data)
				
				// Criar opções para o select de departamentos
				const options = data.data.items.map(dept => ({
					value: dept.id,
					label: dept.name
				}));
				setDepartmentOptions(options);
				
				console.log(data)
			})

	}, [paginationNumDtps, getEnterprise])

	useEffect(() => {
		const enterpriseId = getEnterprise();
		if (!enterpriseId) {
			console.error('Enterprise ID not found in store');
			return;
		}

		getAll<ListResponse<SubDepartments>>(APIMODULE_SUB, {
			"page": paginationNumSubDtps,
			"quantity": 3,
			"relationFilter": ["enterpriseId", enterpriseId]
		})
			.then((data) => {
				setSubDpts(data)
				console.log(data)
			})

	}, [paginationNumSubDtps, getEnterprise])

	// Função para lidar com o clique no ícone de edição
	const handleEditClick = (departmentId: number) => {
		setSelectedDepartmentId(departmentId);
		setEditModal(true);
	};



	// Função para obter o nome do department pelo ID
	const getDepartmentName = (departmentId: number): string => {
		const department = departmentOptions.find(dept => dept.value === departmentId);
		return department?.label || "";
	};


	function createDpts(): Promise<boolean> {
		inputDataDpt.enterpriseId = getEnterprise();
		const payload = inputDataDpt as CreateDepartmentsDTO;

		return create<CreateDepartmentsDTO, Departments>(APIMODULE, payload)
			.then((data) => {
				console.log(data)
				return true
			})
			.catch(err => {
				console.error(err)
				return false
			})
	}

	function updateDpts(id: number): Promise<boolean> {
		inputDataDpt.enterpriseId = getEnterprise();
		const payload = inputDataDpt as UpdateDepartmentsDTO;

		return update<UpdateDepartmentsDTO, Departments>(APIMODULE, id, payload)
			.then((data) => {
				console.log(data)
				return true
			})
			.catch(err => {
				console.error(err)
				return false
			})
	}

	function createSubDpts(): Promise<boolean> {
		inputDataSubDpt.enterpriseId = getEnterprise();
		const payload = inputDataSubDpt as CreateSubDepartmentsDTO;

		return create<CreateSubDepartmentsDTO, SubDepartments>(APIMODULE_SUB, payload)
			.then((data) => {
				console.log(data)
				return true
			})
			.catch(err => {
				console.error(err)
				return false
			})
	}

	// Função para deletar departamento
	const handleDeleteDepartment = async (departmentId: number) => {
		if (window.confirm('Tem certeza que deseja deletar este departamento? Esta ação não pode ser desfeita.')) {
			try {
				await remove(APIMODULE, departmentId);
				showSuccess('Departamento deletado com sucesso!');
				
				// Recarregar a lista de departamentos
				const enterpriseId = getEnterprise();
				if (enterpriseId) {
					const data = await getAll<ListResponse<Departments>>(APIMODULE, {
						"page": paginationNumDtps,
						"quantity": 3,
						"relationFilter": ["enterpriseId", enterpriseId]
					});
					setDpts(data);
					
					// Atualizar opções do select
					const options = data.data.items.map(dept => ({
						value: dept.id,
						label: dept.name
					}));
					setDepartmentOptions(options);
				}
			} catch (error) {
				console.error('Erro ao deletar departamento:', error);
				showError('Erro ao deletar departamento. Tente novamente.');
			}
		}
	};

	// Função para deletar subdepartamento
	const handleDeleteSubDepartment = async (subDepartmentId: number) => {
		if (window.confirm('Tem certeza que deseja deletar este subdepartamento? Esta ação não pode ser desfeita.')) {
			try {
				await remove(APIMODULE_SUB, subDepartmentId);
				showSuccess('Subdepartamento deletado com sucesso!');
				
				// Recarregar a lista de subdepartamentos
				const enterpriseId = getEnterprise();
				if (enterpriseId) {
					const data = await getAll<ListResponse<SubDepartments>>(APIMODULE_SUB, {
						"page": paginationNumSubDtps,
						"quantity": 3,
						"relationFilter": ["enterpriseId", enterpriseId]
					});
					setSubDpts(data);
				}
			} catch (error) {
				console.error('Erro ao deletar subdepartamento:', error);
				showError('Erro ao deletar subdepartamento. Tente novamente.');
			}
		}
	};




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
					{loaded &&
						dpts?.data.items.map((department) => (
							<DepartmentCard
								key={department.id}
								id={department.id}
								name={department.name}
								manager={department.responsible ?? ""}
								employeeCount={department.totalEmployees ?? 0}
								description={department.description ?? ""}
								onClick={handleEditClick} // Passa a função como prop
								onDelete={handleDeleteDepartment} // Passa a função de deletar
							/>))
					}
				</div>
			</div>

			<Pagination actualPage={paginationNumDtps} last={dpts?.data.metadata.last ?? 1} updatePage={setPaginationNumDtps} />

			{/* Subdepartamentos */}
			<div className="mb-10">
				<div className='flex gap-10'>
					<h2 className="text-2xl font-semibold text-violet-400 mb-6">Subdepartamentos</h2>
					<button onClick={() => setCreateSubDepartmentModal(true)} className='btn btn-primary text-2xl'>
						<Plus size={18} />
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{loaded &&
						subDpts?.data.items.map((subDepartment) => (
							<SubDepartmentCard
								key={subDepartment.id}
								id={subDepartment.id}
								name={subDepartment.name}
								manager={subDepartment.responsible ?? ""}
								employeeCount={subDepartment.totalEmployees ?? 0}
								description={subDepartment.description ?? ""}
								departmentName={getDepartmentName(subDepartment.departmentId)}
								departmentId={subDepartment.departmentId}
								departmentOptions={departmentOptions}
								onDelete={handleDeleteSubDepartment} // Passa a função de deletar
							/>))
					}
				</div>

				<Pagination actualPage={paginationNumSubDtps} last={subDpts?.data.metadata.last ?? 1} updatePage={setPaginationNumSubDtps} />
			</div>

			{/* Modal para criar subdepartamento */}
			{createSubDepartmentModal &&
				<ModalForms create={createSubDpts} setInputData={setInputDataSubDpt} onclick={() => { setCreateSubDepartmentModal(false) }}>
					<Fieldset title='Create Sub-Department'>
						<Input nameOnDB='name' name='Name' />
						<Input nameOnDB='description' name='Description' />
						<Input nameOnDB='responsible' name='Responsible' />
						<Select 
							nameOnDB='departmentId' 
							name='Department' 
							options={departmentOptions}
							required={true}
						/>
					</Fieldset>
				</ModalForms>
			}

			{createDepartmentModal &&
				<ModalForms create={createDpts} setInputData={setInputDataDpt} onclick={() => { setCreateDepartmentModal(false) }}>
					{/* <p className='text-2xl p-5 lg:p-10'>Just insert the basic settings here and then      </> */}

					<Fieldset title='Create Deparment'>
						<Input nameOnDB='name' name='Name' />
						<Input nameOnDB='description' name='Description' />
						<Input nameOnDB='responsible' name='Responsible' />
					</Fieldset>

				</ModalForms>
			}

			{/* Modal para editar departamento */}
			{editModal && (
				<ModalForms create={() => updateDpts(selectedDepartmentId ?? 0)} setInputData={setInputDataDpt} onclick={() => { setEditModal(false) }}>
					<Fieldset title='Edit Department'>
						<Input nameOnDB='name' name='Name' />
						<Input nameOnDB='description' name='Description' />
						<Input nameOnDB='responsible' name='Responsible' />
					</Fieldset>
				</ModalForms>
			)}



		</div>
	);
}