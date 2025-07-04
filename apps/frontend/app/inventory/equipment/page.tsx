'use client'

import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { Filter } from '../../components/Filter'
import { ModalForms } from '../../components/forms/ModalForms'
import { Input } from '../../components/forms/Input'
import { SelectString } from '../../components/forms/SelectString'
import { Fieldset } from '../../components/forms/Fieldset'
import { Pagination } from '../../components/Pagination'
import { create, getAll, getById, update, remove, ListResponse } from '@/lib/api'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'
import { Equipments } from '@prisma/client'
import { CreateEquipmentsDTO, UpdateEquipmentsDTO } from '@utils'

const APIMODULE = "equipments"

export default function EquipmentPage() {
	const [loaded, setLoaded] = useState<boolean>(false);
	const [equipments, setEquipments] = useState<ListResponse<Equipments>>();
	const [paginationNum, setPaginationNum] = useState<number>(1);

	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedEquipment, setSelectedEquipment] = useState<Equipments | null>(null);

	const [inputDataCreate, setInputDataCreate] = useState<Partial<CreateEquipmentsDTO>>({});
	const [inputDataUpdate, setInputDataUpdate] = useState<Partial<UpdateEquipmentsDTO>>({});

	const [searchTerm, setSearchTerm] = useState('');
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('');

	const { getEnterprise } = useEnterpriseStore();

	const convertValue = (key: string, value: any) => {
		if (value === undefined || value === null || value === '') {
			return value;
		}

		if (key === 'purchaseDate' || key === 'warrantyEndDate') {
			return value ? new Date(value) : null;
		}

		return value;
	};

	const formatDate = (date: Date | null): string => {
		if (!date) return 'Não informado';
		return new Date(date).toLocaleDateString('pt-BR');
	};

	const equipmentColumns = [
		{
			header: 'Nome',
			accessor: 'name',
			cell: (value: any) => renderCellValue('name', value),
		},
		{
			header: 'Número de Série',
			accessor: 'serialNumber',
			cell: (value: any) => renderCellValue('serialNumber', value),
		},
		{
			header: 'Marca',
			accessor: 'brand',
			cell: (value: any) => renderCellValue('brand', value),
		},
		{
			header: 'Modelo',
			accessor: 'model',
			cell: (value: any) => renderCellValue('model', value),
		},
		{
			header: 'Localização',
			accessor: 'location',
			cell: (value: any) => renderCellValue('location', value),
		},
		{
			header: 'Data de Compra',
			accessor: 'purchaseDate',
			cell: (value: any) => renderCellValue('purchaseDate', value),
		},
		{
			header: 'Garantia até',
			accessor: 'warrantyEndDate',
			cell: (value: any) => renderCellValue('warrantyEndDate', value),
		},
		{
			header: 'Status',
			accessor: 'status',
			cell: (value: any) => renderCellValue('status', value),
		},
	];

	const renderCellValue = (accessor: string, value: any) => {
		if (accessor === 'status') {
			if (!value) return 'Não informado';

			let statusText = '';
			let statusClass = '';

			if (value === 'operational') {
				statusText = 'Operacional';
				statusClass = 'bg-green-500/20 text-green-400';
			} else if (value === 'maintenance') {
				statusText = 'Em manutenção';
				statusClass = 'bg-yellow-500/20 text-yellow-400';
			} else if (value === 'repair') {
				statusText = 'Em reparo';
				statusClass = 'bg-red-500/20 text-red-400';
			} else if (value === 'inactive') {
				statusText = 'Inativo';
				statusClass = 'bg-gray-500/20 text-gray-400';
			} else {
				statusText = value;
				statusClass = 'bg-gray-500/20 text-gray-400';
			}

			return (
				<span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
					{statusText}
				</span>
			);
		} else if (accessor === 'purchaseDate' || accessor === 'warrantyEndDate') {
			return formatDate(value);
		} else {
			return value || 'Não informada';
		}
	};

	useEffect(() => {
		console.log('🕐 Debounce useEffect triggered, searchTerm:', searchTerm);
		const timer = setTimeout(() => {
			console.log('⏰ Debounce timer fired, setting debouncedSearchTerm to:', searchTerm);
			setDebouncedSearchTerm(searchTerm);
		}, 500);

		return () => clearTimeout(timer);
	}, [searchTerm]);

	const reloadEquipmentsList = async () => {
		const enterpriseId = getEnterprise();
		if (!enterpriseId) return;

		const params: any = {
			"page": paginationNum,
			"quantity": 8,
		};

		if (debouncedSearchTerm) {
			params.term = debouncedSearchTerm;
		}

		params.relationFilter = ["enterpriseId", enterpriseId];

		console.log('reloadEquipmentsList called with statusFilter:', statusFilter);

		try {
			const data = await getAll<ListResponse<Equipments>>(APIMODULE, params);
			let filteredData = data;
			if (statusFilter && statusFilter.trim() !== '') {
				const filteredItems = data.data.items.filter(equipment => {
					return equipment.status === statusFilter;
				});

				filteredData = {
					...data,
					data: {
						...data.data,
						items: filteredItems,
					}
				};
			}
			setEquipments(filteredData);
		} catch (err) {
			console.error('Error loading equipments:', err);
			showError('Error loading equipments');
		}
	};

	useEffect(() => {
		console.log('📊 Main useEffect triggered with:', {
			paginationNum,
			debouncedSearchTerm,
			statusFilter
		});
		setLoaded(false);
		reloadEquipmentsList().then(() => {
			setLoaded(true);
		});
	}, [paginationNum, debouncedSearchTerm, statusFilter]);

	function createEquipment(): Promise<boolean> {
		if (!inputDataCreate.name) {
			showError('Equipment name is required');
			return Promise.resolve(false);
		}

		if (!inputDataCreate.serialNumber) {
			showError('Serial number is required');
			return Promise.resolve(false);
		}

		const payload: Partial<CreateEquipmentsDTO> = {
			...inputDataCreate,
			enterpriseId: getEnterprise()
		};

		const filteredPayload: Partial<CreateEquipmentsDTO> = {};

		Object.entries(payload).forEach(([key, value]) => {
			const convertedValue = convertValue(key, value);
			if (convertedValue !== undefined && convertedValue !== null && convertedValue !== '') {
				(filteredPayload as any)[key] = convertedValue;
			}
		});

		return create<CreateEquipmentsDTO, Equipments>(APIMODULE, filteredPayload as CreateEquipmentsDTO)
			.then((data) => {
				showSuccess('Equipamento criado com sucesso!');
				setShowAddModal(false);
				setInputDataCreate({});
				reloadEquipmentsList();
				return true;
			})
			.catch(err => {
				console.error('Error creating equipment:', err);
				showError('Error creating equipment');
				return false;
			});
	}

	function updateEquipment(): Promise<boolean> {
		if (!selectedEquipment) {
			showError('No equipment selected');
			return Promise.resolve(false);
		}

		const payload: Partial<UpdateEquipmentsDTO> = {};

		Object.entries(inputDataUpdate).forEach(([key, value]) => {
			const convertedValue = convertValue(key, value);
			if (convertedValue !== undefined && convertedValue !== null && convertedValue !== '') {
				(payload as any)[key] = convertedValue;
			}
		});

		console.log('Payload para update:', payload);

		return update<UpdateEquipmentsDTO, Equipments>(APIMODULE, selectedEquipment.id, payload as UpdateEquipmentsDTO)
			.then((data) => {
				console.log('Equipment updated:', data);
				showSuccess('Equipamento atualizado com sucesso!');
				setShowEditModal(false);
				setSelectedEquipment(null);
				setInputDataUpdate({});

				reloadEquipmentsList();
				return true;
			})
			.catch(err => {
				console.error('Error updating equipment:', err);
				showError('Error updating equipment');
				return false;
			});
	}

	const deleteEquipment = async (equipment: Equipments) => {
		if (window.confirm('Tem certeza que deseja deletar este equipamento?')) {
			try {
				await remove(APIMODULE, equipment.id);
				showSuccess('Equipamento deletado com sucesso!');
				reloadEquipmentsList();
			} catch (err) {
				console.error('Error deleting equipment:', err);
				showError('Erro ao deletar equipamento');
			}
		}
	};

	const deleteBulkEquipments = async (selectedIds: number[]) => {
		try {
			const deletePromises = selectedIds.map(id => remove(APIMODULE, id));
			await Promise.all(deletePromises);
			showSuccess(`${selectedIds.length} equipamento(s) deletado(s) com sucesso!`);
			reloadEquipmentsList();
		} catch (err) {
			console.error('Error deleting equipments:', err);
			showError('Erro ao deletar equipamentos');
		}
	};

	const handleEditEquipment = (equipment: Equipments) => {
		setSelectedEquipment(equipment);

		const updateData: Partial<UpdateEquipmentsDTO> = {
			name: equipment.name,
			serialNumber: equipment.serialNumber,
		};

		if (equipment.description) updateData.description = equipment.description;
		if (equipment.model) updateData.model = equipment.model;
		if (equipment.brand) updateData.brand = equipment.brand;
		if (equipment.purchaseDate) updateData.purchaseDate = equipment.purchaseDate;
		if (equipment.warrantyEndDate) updateData.warrantyEndDate = equipment.warrantyEndDate;
		if (equipment.status) updateData.status = equipment.status;
		if (equipment.location) updateData.location = equipment.location;

		setInputDataUpdate(updateData);
		setShowEditModal(true);
	};

	const resetFilters = () => {
		console.log('🔄 Resetting filters in equipment page...');
		console.log('Before reset - searchTerm:', searchTerm, 'debouncedSearchTerm:', debouncedSearchTerm);
		setSearchTerm('');
		setStatusFilter('');
		setPaginationNum(1);

		console.log('✅ Filters reset, waiting for debounce and useEffect to trigger...');
	};

	const statusOptions = [
		{ value: 'operational', label: 'Operacional' },
		{ value: 'maintenance', label: 'Em manutenção' },
		{ value: 'repair', label: 'Em reparo' },
		{ value: 'inactive', label: 'Inativo' },
	];

	// Filter fields
	const filterFields = [
		{
			name: 'statusFilter',
			label: 'Todos os status',
			type: 'select' as const,
			options: statusOptions,
		},
	];

	const filterValues = {
		statusFilter,
	};

	const handleFilterChange = (name: string, value: any) => {
		if (name === 'statusFilter') {
			setStatusFilter(value);
		}
	};



	// Table columns
	const columns = equipmentColumns;

	return (
		<>
			<div className="min-h-screen ml-20 bg-base-300 text-white p-10">
				<div className="flex items-center justify-between mb-10 border-b border-violet-900/30 pb-4">
					<h1 className="text-4xl font-bold text-white">
						🔧 Equipamentos
					</h1>
					<button
						onClick={() => setShowAddModal(true)}
						className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
					>
						<Plus size={18} />
						<span>Add Equipment</span>
					</button>
				</div>

				{/* Filters */}
				<Filter
					searchTerm={searchTerm}
					onSearchChange={setSearchTerm}
					searchPlaceholder="Pesquisar equipamentos por nome, número de série ou localização..."
					fields={filterFields}
					values={filterValues}
					onChange={handleFilterChange}
					onReset={resetFilters}
				/>

				{/* Equipment table */}
				<div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
					<DataTable
						columns={columns}
						data={loaded && equipments ? equipments.data.items : []}
						onEdit={handleEditEquipment}
						onDelete={deleteEquipment}
						onBulkDelete={deleteBulkEquipments}
						selectable={true}
						idField="id"
					/>
				</div>

				{/* Pagination */}
				{loaded && equipments && (
					<div className="mt-10">
						<Pagination
							updatePage={setPaginationNum}
							actualPage={paginationNum}
							last={equipments.data.metadata.last ?? 1}
						/>
					</div>
				)}
			</div>

			{/* Modal to add equipment */}
			{showAddModal && (
				<ModalForms create={createEquipment} setInputData={setInputDataCreate} onclick={() => setShowAddModal(false)}>
					<p className='text-2xl p-5 lg:p-10'>Add new equipment</p>

					<Fieldset title='Equipment Information'>
						<Input nameOnDB='name' name='Equipment name *' />
						<Input nameOnDB='serialNumber' name='Serial number *' />
						<Input nameOnDB='description' name='Description' />
						<Input nameOnDB='model' name='Model' />
						<Input nameOnDB='brand' name='Brand' />
						<Input nameOnDB='location' name='Location' />
						<Input nameOnDB='purchaseDate' name='Purchase date' type='date' />
						<Input nameOnDB='warrantyEndDate' name='Warranty end date' type='date' />
						<SelectString
							nameOnDB='status'
							name='Status'
							options={statusOptions}
						/>
					</Fieldset>
				</ModalForms>
			)}

			{/* Modal to edit equipment */}
			{showEditModal && selectedEquipment && (
				<ModalForms
					create={updateEquipment}
					setInputData={setInputDataUpdate}
					onclick={() => setShowEditModal(false)}
					initialData={inputDataUpdate}
				>
					<p className='text-2xl p-5 lg:p-10'>Edit equipment: {selectedEquipment.name}</p>

					<Fieldset title='Equipment Information'>
						<Input nameOnDB='name' name='Equipment name *' />
						<Input nameOnDB='serialNumber' name='Serial number *' />
						<Input nameOnDB='description' name='Description' />
						<Input nameOnDB='model' name='Model' />
						<Input nameOnDB='brand' name='Brand' />
						<Input nameOnDB='location' name='Location' />
						<Input nameOnDB='purchaseDate' name='Purchase date' type='date' />
						<Input nameOnDB='warrantyEndDate' name='Warranty end date' type='date' />
						<SelectString
							nameOnDB='status'
							name='Status'
							options={statusOptions}
						/>
					</Fieldset>
				</ModalForms>
			)}
		</>
	);
}



