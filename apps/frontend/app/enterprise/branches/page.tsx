'use client'

import React, { useEffect, useState } from 'react'
import { Plus, Users } from 'lucide-react'
import { Branch } from '@/app/components/Branch'
import { Branches, Departments, Enterprise } from '@prisma/client'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { create, getAll, getById, ListResponse, update, remove } from '@/lib/api'
import { ModalForms } from '@/app/components/forms/ModalForms'
import { Input } from '@/app/components/forms/Input'
import { Fieldset } from '@/app/components/forms/Fieldset'
import { Pagination } from '@/app/components/Pagination'
import { BranchesWithDepartments, CreateBranchesDTO, DepartmentsDTO, EnterpriseWithBranches, UpdateBranchesDTO } from '@pap/utils'
import { Modal } from '@/app/components/Modal'
import { useBranchStore } from '@/lib/store/items/branch.store'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'

const APIMODULE = "branches"

export default function BranchesPage() {
	const [createModal, setCreateModal] = useState<boolean>(false)
	const [editDptModal, setDptModal] = useState<boolean>(false)

	const [loaded, setLoaded] = useState<boolean>(false);
	const [branches, setBranches] = useState<ListResponse<Branches>>();
	const [paginationNum, setPaginationNum] = useState<number>(1);
	const [inputData, setInputData] = useState<Partial<CreateBranchesDTO>>({})
	
	
	const [dpts, setDpts] = useState<ListResponse<Departments>>();
	const [dptsLoaded, setDptsLoaded] = useState<boolean>(false);
	
	const [checkedDpts, setCheckedDpts] = useState<number[]>([]);
	const [paginationNumDpt, setPaginationNumDpt] = useState<number>(1);
	const [loadingBranchDepts, setLoadingBranchDepts] = useState<boolean>(false);

	const { getEnterprise } = useEnterpriseStore()
	const { getBranch, setBranch } = useBranchStore()

	useEffect(() => {
		const enterpriseId = getEnterprise();
		if (!enterpriseId) {
			console.error('Enterprise ID not found in store');
			return;
		}

		getAll<ListResponse<BranchesWithDepartments>>(APIMODULE, {
			"page": paginationNum,
			"quantity": 4,
			"relationFilter": ["enterpriseId", enterpriseId]
		})
			.then((data) => {
				setLoaded(true)
				setBranches(data)
			})

	}, [paginationNum, getEnterprise])

	useEffect(() => {
		const enterpriseId = getEnterprise();
		if (!enterpriseId) {
			console.error('Enterprise ID not found in store');
			return;
		}

		getAll<ListResponse<Departments>>("departments", {
			"page": paginationNumDpt,
			"quantity": 6,
			"relationFilter": ["enterpriseId", enterpriseId]
		})
			.then((data) => {
				setDptsLoaded(true)
				setDpts(data)

				console.log(data)
			})

	}, [paginationNumDpt, getEnterprise])

	// Debug: monitorar mudanças no checkedDpts
	useEffect(() => {
		console.log('checkedDpts state changed:', checkedDpts);
	}, [checkedDpts]);

	function createBranch(): Promise<boolean> {
		if (!inputData.address) {
			alert('Address é obrigatório');
			return Promise.resolve(false);
		}

		const payload = {
			...inputData,
			enterpriseId: getEnterprise()
		} as CreateBranchesDTO;

		return create<CreateBranchesDTO, Branches>(APIMODULE, payload)
			.then((data) => {
				console.log(data)
				return true
			})
			.catch(err => {
				console.error(err)
				return false
			})
	}

	function clickUpdateBtn(update: boolean, id: number) {
		if (update) {
			setDptModal(true);
			setBranch(id);
			setLoadingBranchDepts(true);
			setCheckedDpts([]); 
			
			getById<BranchesWithDepartments>(APIMODULE, id)
				.then((branchData) => {
					console.log('Branch data loaded:', branchData);
					const associatedDeptIds = branchData.departments?.map(dept => dept.id) || [];
					console.log('Associated department IDs:', associatedDeptIds);
					setCheckedDpts(associatedDeptIds);
				})
				.catch(err => {
					console.error('Erro ao carregar branch:', err);
					showError('Erro ao carregar departamentos da filial');
					setCheckedDpts([]);
				})
				.finally(() => {
					setLoadingBranchDepts(false);
				});
		} else {
			setDptModal(false);
			setCheckedDpts([]);
		}
	}

	function updateDepartment(): Promise<boolean> {
		const branchId = getBranch();
		
		if (!branchId) {
			showError('Erro: ID da filial não encontrado');
			return Promise.resolve(false);
		}

		const payload = {
			departments: checkedDpts
		} as UpdateBranchesDTO;

		return update<UpdateBranchesDTO, Branches>(APIMODULE, branchId, payload)
			.then((data) => {
				if (data) {
					showSuccess('Departamentos atualizados com sucesso!');
					console.log('Departamentos atualizados:', data);
					
					const enterpriseId = getEnterprise();
					if (enterpriseId) {
						getAll<ListResponse<BranchesWithDepartments>>(APIMODULE, {
							"page": paginationNum,
							"quantity": 4,
							"relationFilter": ["enterpriseId", enterpriseId]
						})
						.then((data) => {
							setBranches(data);
						})
						.catch(err => {
							console.error('Erro ao recarregar branches:', err);
						});
					}
					
					setDptModal(false);
					window.location.reload()
					return true;
				}
				showError('Erro ao atualizar departamentos');
				return false;
			})
			.catch(err => {
				console.error('Erro ao atualizar departamentos:', err);
				showError('Erro ao atualizar departamentos da filial');
				return false;
			});
	}

	function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>, id: number) {
		setCheckedDpts((prev) => {
			const newState = (() => {
				if (!prev) return e.target.checked ? [id] : [];

				if (e.target.checked) {
					if (!prev.includes(id)) {
						return [...prev, id];
					}
					return prev;
				} else {
					return prev.filter(d => d !== id);
				}
			})();
			
			console.log('Checkbox clicked:', { id, checked: e.target.checked, newState });
			return newState;
		});
	}

	// Função para deletar filial
	const handleDeleteBranch = async (branchId: number) => {
		if (window.confirm('Tem certeza que deseja deletar esta filial? Esta ação não pode ser desfeita.')) {
			try {
				await remove(APIMODULE, branchId);
				showSuccess('Filial deletada com sucesso!');
				
				// Recarregar a lista de filiais
				const enterpriseId = getEnterprise();
				if (enterpriseId) {
					const data = await getAll<ListResponse<BranchesWithDepartments>>(APIMODULE, {
						"page": paginationNum,
						"quantity": 4,
						"relationFilter": ["enterpriseId", enterpriseId]
					});
					setBranches(data);
				}
			} catch (error) {
				console.error('Erro ao deletar filial:', error);
				showError('Erro ao deletar filial. Tente novamente.');
			}
		}
	};


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
				{loaded &&

					branches?.data.items.map((branch, idx) => (
						<Branch
							key={branch.id}
							id={branch.id}
							idOfEnterprise={idx + 1}
							address={branch.address}
							phone={branch.phone}
							email={branch.email}
							purpose={branch.purpose}
							setDptModal={() => clickUpdateBtn(true, branch.id)}
							onDelete={handleDeleteBranch}
						/>
					))}
			</div>

			<div className='mt-10'></div>

			{loaded &&
				<Pagination updatePage={setPaginationNum} actualPage={paginationNum} last={branches?.data.metadata.last ?? 1} />
			}

			{createModal &&
				<ModalForms<CreateBranchesDTO> create={createBranch} setInputData={setInputData} onclick={() => { setCreateModal(false) }}>
					<p className='text-2xl p-5 lg:p-10'>Adicione as informações básicas da nova filial</p>

					<Fieldset title='Create Branch'>
						<Input nameOnDB='address' name='Endereço completo' />
						<Input nameOnDB='phone' name='Telefone' />
						<Input nameOnDB='email' name='Email de contato' />
						<Input nameOnDB='purpose' name='Função da unidade' />
					</Fieldset>

				</ModalForms>
			}

			{editDptModal && (
				<Modal createFunction={updateDepartment} onclick={() => { setDptModal(false); setCheckedDpts([]); }} isCreate={true} isLarge={false}>
					<p className='text-xl p-5 lg:p-10' >Select which departments are available on this branch.</p>

					<div className='flex flex-wrap gap-4 mt-5 justify-center items-center'>
						{dptsLoaded &&
							dpts?.data.items.map((dpt) => {
								return (
									<>
										<div key={dpt.id} className="min-w-72 flex justify-between items-center p-3 border border-gray-800 rounded-lg hover:border-violet-700 transition-all duration-200">
											<div>
												<h4 className="text-white font-medium">{dpt.name}</h4>
												<p className="text-sm text-gray-400">Responsável: {dpt.responsible}</p>
											</div>
											<div className="flex items-center gap-4">
												<div className="flex items-center text-gray-400">
													<Users size={14} className="mr-1" />

													<input
														checked={checkedDpts?.includes(dpt.id) || false}
														onChange={(e) => handleCheckboxClick(e, dpt.id)}
														type="checkbox"
														className='w-4 h-4 accent-violet-700' />

												</div>
											</div>
										</div>
									</>
								)
							})
						}
					</div>
					<Pagination updatePage={setPaginationNumDpt} actualPage={paginationNumDpt} last={dpts?.data.metadata.last ?? 1} />
				</Modal>
			)}

		</div>
	)
}