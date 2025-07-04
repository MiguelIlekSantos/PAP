'use client'

import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { ModalForms } from '../../components/forms/ModalForms'
import { Input } from '../../components/forms/Input'
import { SelectString } from '../../components/forms/SelectString'
import { Fieldset } from '../../components/forms/Fieldset'
import { Pagination } from '../../components/Pagination'
import { DataTable } from '../../components/DataTable'
import { Filter } from '../../components/Filter'
import { create, getAll, getById, update, remove, ListResponse } from '@/lib/api'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'
import { WareHouses } from '@prisma/client'
import { CreateWareHousesDTO, UpdateWareHousesDTO } from '@utils'

const APIMODULE = "warehouses"

export default function WarehousesPage() {
	const [loaded, setLoaded] = useState<boolean>(false);
	const [warehouses, setWarehouses] = useState<ListResponse<WareHouses>>();
	const [paginationNum, setPaginationNum] = useState<number>(1);

	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedWarehouse, setSelectedWarehouse] = useState<WareHouses | null>(null);

	const [inputDataCreate, setInputDataCreate] = useState<Partial<CreateWareHousesDTO>>({});
	const [inputDataUpdate, setInputDataUpdate] = useState<Partial<UpdateWareHousesDTO>>({});

	const [searchTerm, setSearchTerm] = useState('');
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('');

	const { getEnterprise } = useEnterpriseStore();

	const convertValue = (key: string, value: any) => {
		if (value === undefined || value === null || value === '') {
			return value;
		}

		if (key === 'capacity' || key === 'currentStock' || key === 'section') {
			const numValue = Number(value);
			return isNaN(numValue) ? null : numValue;
		}

		return value;
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 500);

		return () => clearTimeout(timer);
	}, [searchTerm]);

	const calculateOccupancy = (currentStock: number | null, capacity: number | null): number => {
		if (!currentStock || !capacity || capacity === 0) return 0;
		return Math.round((currentStock / capacity) * 100);
	};

	const warehousesColumns = [
		{
			header: 'Nome',
			accessor: 'name',
			cell: (value: any, row: any) => renderCellValue('name', value, row),
		},
		{
			header: 'Localização',
			accessor: 'location',
			cell: (value: any, row: any) => renderCellValue('location', value, row),
		},
		{
			header: 'Capacidade',
			accessor: 'capacity',
			cell: (value: any, row: any) => renderCellValue('capacity', value, row),
		},
		{
			header: 'Estoque Atual',
			accessor: 'currentStock',
			cell: (value: any, row: any) => renderCellValue('currentStock', value, row),
		},
		{
			header: 'Ocupação',
			accessor: 'occupancy',
			cell: (value: any, row: any) => renderCellValue('occupancy', value, row),
		},
		{
			header: 'Seções',
			accessor: 'section',
			cell: (value: any, row: any) => renderCellValue('section', value, row),
		},
		{
			header: 'Responsável',
			accessor: 'responsible',
			cell: (value: any, row: any) => renderCellValue('responsible', value, row),
		},
		{
			header: 'Status',
			accessor: 'status',
			cell: (value: any, row: any) => renderCellValue('status', value, row),
		},
	];

	const renderCellValue = (accessor: string, value: any, row?: any) => {
		if (accessor === 'name') {
			return value || 'Não informado';
		}
		
		if (accessor === 'location') {
			return value || 'Não informado';
		}
		
		if (accessor === 'capacity') {
			return value ? value.toLocaleString() : 'Não informado';
		}
		
		if (accessor === 'currentStock') {
			return value ? value.toLocaleString() : '0';
		}
		
		if (accessor === 'occupancy') {
			const occupancy = calculateOccupancy(row.currentStock, row.capacity);
			return (
				<div className="flex items-center gap-2">
					<div className="w-16 bg-gray-700 rounded-full h-2">
						<div
							className={`h-2 rounded-full ${occupancy >= 90 ? 'bg-red-500' :
									occupancy >= 70 ? 'bg-yellow-500' :
										'bg-green-500'
								}`}
							style={{ width: `${Math.min(occupancy, 100)}%` }}
						/>
					</div>
					<span className="text-sm">{occupancy}%</span>
				</div>
			);
		}
		
		if (accessor === 'section') {
			return value?.toString() || 'Não informado';
		}
		
		if (accessor === 'responsible') {
			return value || 'Não informado';
		}
		
		if (accessor === 'status') {
			if (!value) return 'Não informado';
			
			let statusText = '';
			let statusClass = '';
			
			if (value === 'active') {
				statusText = 'Ativo';
				statusClass = 'bg-green-500/20 text-green-400';
			} else if (value === 'full') {
				statusText = 'Cheio';
				statusClass = 'bg-red-500/20 text-red-400';
			} else if (value === 'maintenance') {
				statusText = 'Manutenção';
				statusClass = 'bg-yellow-500/20 text-yellow-400';
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
		}
		
		return value;
	};

	const reloadWarehousesList = async () => {
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

		console.log('reloadWarehousesList called with statusFilter:', statusFilter);

		try {
			const data = await getAll<ListResponse<WareHouses>>(APIMODULE, params);
			let filteredData = data;
			if (statusFilter && statusFilter.trim() !== '') {
				const filteredItems = data.data.items.filter(warehouse => {
					return warehouse.status === statusFilter;
				});

				filteredData = {
					...data,
					data: {
						...data.data,
						items: filteredItems,
						// total: filteredItems.length
					}
				};
			}
			setWarehouses(filteredData);
		} catch (err) {
			console.error('Error loading warehouses:', err);
			showError('Error loading warehouses');
		}
	};

	useEffect(() => {
		setLoaded(false);
		reloadWarehousesList().then(() => {
			setLoaded(true);
		});
	}, [paginationNum, debouncedSearchTerm, statusFilter]);

	function createWarehouse(): Promise<boolean> {
		if (!inputDataCreate.name) {
			showError('Warehouse name is required');
			return Promise.resolve(false);
		}

		if (!inputDataCreate.location) {
			showError('Location is required');
			return Promise.resolve(false);
		}

		const payload: Partial<CreateWareHousesDTO> = {
			...inputDataCreate,
			enterpriseId: getEnterprise()
		};

		const filteredPayload: Partial<CreateWareHousesDTO> = {};

		Object.entries(payload).forEach(([key, value]) => {
			const convertedValue = convertValue(key, value);
			if (convertedValue !== undefined && convertedValue !== null && convertedValue !== '') {
				(filteredPayload as any)[key] = convertedValue;
			}
		});

		return create<CreateWareHousesDTO, WareHouses>(APIMODULE, filteredPayload as CreateWareHousesDTO)
			.then((data) => {
				showSuccess('Armazém criado com sucesso!');
				setShowAddModal(false);
				setInputDataCreate({});
				reloadWarehousesList();
				return true;
			})
			.catch(err => {
				console.error('Error creating warehouse:', err);
				showError('Error creating warehouse');
				return false;
			});
	}

	function updateWarehouse(): Promise<boolean> {
		if (!selectedWarehouse) {
			showError('No warehouse selected');
			return Promise.resolve(false);
		}

		const payload: Partial<UpdateWareHousesDTO> = {};

		Object.entries(inputDataUpdate).forEach(([key, value]) => {
			const convertedValue = convertValue(key, value);
			if (convertedValue !== undefined && convertedValue !== null && convertedValue !== '') {
				(payload as any)[key] = convertedValue;
			}
		});

		console.log('Payload para update:', payload);

		return update<UpdateWareHousesDTO, WareHouses>(APIMODULE, selectedWarehouse.id, payload as UpdateWareHousesDTO)
			.then((data) => {
				console.log('Warehouse updated:', data);
				showSuccess('Armazém atualizado com sucesso!');
				setShowEditModal(false);
				setSelectedWarehouse(null);
				setInputDataUpdate({});

				reloadWarehousesList();
				return true;
			})
			.catch(err => {
				console.error('Error updating warehouse:', err);
				showError('Error updating warehouse');
				return false;
			});
	}

	const deleteWarehouse = async (warehouse: WareHouses) => {
		if (window.confirm('Tem certeza que deseja deletar este armazém?')) {
			try {
				await remove(APIMODULE, warehouse.id);
				showSuccess('Armazém deletado com sucesso!');
				reloadWarehousesList();
			} catch (err) {
				console.error('Error deleting warehouse:', err);
				showError('Erro ao deletar armazém');
			}
		}
	};

	const deleteBulkWarehouses = async (selectedIds: number[]) => {
		try {
			const deletePromises = selectedIds.map(id => remove(APIMODULE, id));
			await Promise.all(deletePromises);
			showSuccess(`${selectedIds.length} armazém(s) deletado(s) com sucesso!`);
			reloadWarehousesList();
		} catch (err) {
			console.error('Error deleting warehouses:', err);
			showError('Erro ao deletar armazéns');
		}
	};

	const handleEditWarehouse = (warehouse: WareHouses) => {
		setSelectedWarehouse(warehouse);

		const updateData: Partial<UpdateWareHousesDTO> = {
			name: warehouse.name,
		};

		if (warehouse.location) updateData.location = warehouse.location;
		if (warehouse.capacity) updateData.capacity = warehouse.capacity;
		if (warehouse.currentStock) updateData.currentStock = warehouse.currentStock;
		if (warehouse.section) updateData.section = warehouse.section;
		if (warehouse.responsible) updateData.responsible = warehouse.responsible;
		if (warehouse.status) updateData.status = warehouse.status;

		setInputDataUpdate(updateData);
		setShowEditModal(true);
	};


	const resetFilters = () => {
		console.log('🔄 Resetting filters in warehouses page...');
		console.log('Before reset - searchTerm:', searchTerm, 'debouncedSearchTerm:', debouncedSearchTerm);
		setSearchTerm('');
		setStatusFilter('');
		setPaginationNum(1);

		console.log('✅ Filters reset, waiting for debounce and useEffect to trigger...');
	};

	const statusOptions = [
		{ value: 'active', label: 'Ativo' },
		{ value: 'full', label: 'Cheio' },
		{ value: 'maintenance', label: 'Manutenção' },
		{ value: 'inactive', label: 'Inativo' },
	];

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
	const columns = warehousesColumns;



	return (
		<>
			<div className="min-h-screen ml-20 bg-base-300 text-white p-10">
				<div className="flex items-center justify-between mb-10 border-b border-violet-900/30 pb-4">
					<h1 className="text-4xl font-bold text-white">
						🏭 Warehouses
					</h1>
					<button
						onClick={() => setShowAddModal(true)}
						className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
					>
						<Plus size={18} />
						<span>Add Warehouse</span>
					</button>
				</div>

				{/* Filters */}
				<Filter
					searchTerm={searchTerm}
					onSearchChange={setSearchTerm}
					searchPlaceholder="Pesquisar armazéns por nome, localização ou responsável..."
					fields={filterFields}
					values={filterValues}
					onChange={handleFilterChange}
					onReset={resetFilters}
				/>

				{/* Warehouse table */}
				<div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
					<DataTable
						columns={columns}
						data={loaded && warehouses ? warehouses.data.items : []}
						onEdit={handleEditWarehouse}
						onDelete={deleteWarehouse}
						onBulkDelete={deleteBulkWarehouses}
						selectable={true}
						idField="id"
					/>
				</div>

				{/* Pagination */}
				{loaded && warehouses && (
					<div className="mt-10">
						<Pagination
							updatePage={setPaginationNum}
							actualPage={paginationNum}
							last={warehouses.data.metadata.last ?? 1}
						/>
					</div>
				)}
			</div>

			{/* Modal to add warehouse */}
			{showAddModal && (
				<ModalForms create={createWarehouse} setInputData={setInputDataCreate} onclick={() => setShowAddModal(false)}>
					<p className='text-2xl p-5 lg:p-10'>Add new warehouse</p>

					<Fieldset title='Warehouse Information'>
						<Input nameOnDB='name' name='Warehouse name *' />
						<Input nameOnDB='location' name='Location/Address *' />
						<Input nameOnDB='capacity' name='Capacity' type='number' />
						<Input nameOnDB='currentStock' name='Current stock' type='number' />
						<Input nameOnDB='section' name='Number of sections' type='number' />
						<Input nameOnDB='responsible' name='Responsible person' />
						<SelectString
							nameOnDB='status'
							name='Status'
							options={statusOptions}
						/>
					</Fieldset>
				</ModalForms>
			)}

			{/* Modal to edit warehouse */}
			{showEditModal && selectedWarehouse && (
				<ModalForms
					create={updateWarehouse}
					setInputData={setInputDataUpdate}
					onclick={() => setShowEditModal(false)}
					initialData={inputDataUpdate}
				>
					<p className='text-2xl p-5 lg:p-10'>Edit warehouse: {selectedWarehouse.name}</p>

					<Fieldset title='Warehouse Information'>
						<Input nameOnDB='name' name='Warehouse name *' />
						<Input nameOnDB='location' name='Location/Address *' />
						<Input nameOnDB='capacity' name='Capacity' type='number' />
						<Input nameOnDB='currentStock' name='Current stock' type='number' />
						<Input nameOnDB='section' name='Number of sections' type='number' />
						<Input nameOnDB='responsible' name='Responsible person' />
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