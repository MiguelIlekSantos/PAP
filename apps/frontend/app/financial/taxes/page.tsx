'use client'

import React, { useEffect, useState } from 'react'
import { Plus, Search, Receipt, Calendar, AlertTriangle, CheckCircle, Edit, Trash2 } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { Filter } from '../../components/Filter'
import { ModalForms } from '../../components/forms/ModalForms'
import { Input } from '../../components/forms/Input'
import { SelectString } from '../../components/forms/SelectString'
import { Fieldset } from '../../components/forms/Fieldset'
import { Pagination } from '../../components/Pagination'
import { Modal } from '../../components/Modal'
import { create, getAll, getById, update, remove, ListResponse } from '@/lib/api'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'
import { Taxes } from '@prisma/client'
import { CreateTaxesDTO, UpdateTaxesDTO } from '@pap/utils'

const APIMODULE = "taxes"

export default function TaxesPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [taxes, setTaxes] = useState<ListResponse<Taxes>>();
  const [paginationNum, setPaginationNum] = useState<number>(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTax, setSelectedTax] = useState<Taxes | null>(null);

  const [inputDataCreate, setInputDataCreate] = useState<Partial<CreateTaxesDTO>>({});
  const [inputDataUpdate, setInputDataUpdate] = useState<Partial<UpdateTaxesDTO>>({});

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const [statusFilter, setStatusFilter] = useState('');

  const { getEnterprise } = useEnterpriseStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatDate = (date: Date | string): string => {
    if (!date) return 'Não informado';
    return new Date(date).toLocaleDateString('pt-PT');
  };

  const getStatusDisplay = (tax: Taxes) => {
    // If already paid, show paid status
    if (tax.status === 'paid') {
      return { status: 'paid', label: 'Paid', color: 'text-green-500', icon: CheckCircle };
    }

    const today = new Date();
    const dueDate = new Date(tax.endDate);
    
    if (dueDate < today) {
      return { status: 'overdue', label: 'Overdue', color: 'text-red-500', icon: AlertTriangle };
    } else if (dueDate.getTime() - today.getTime() <= 7 * 24 * 60 * 60 * 1000) {
      return { status: 'due_soon', label: 'Due Soon', color: 'text-yellow-500', icon: Calendar };
    } else {
      return { status: 'pending', label: 'Pending', color: 'text-blue-500', icon: CheckCircle };
    }
  };

  const getTaxColumns = () => [
    {
      header: 'Type',
      accessor: 'type',
      cell: (value: any) => value || 'Not specified',
    },
    {
      header: 'Period',
      accessor: 'period',
      cell: (value: any) => value || 'Not specified',
    },
    {
      header: 'Description',
      accessor: 'description',
      cell: (value: any) => value || 'Not specified',
    },
    {
      header: 'Due Date',
      accessor: 'endDate',
      cell: (value: any) => formatDate(value),
    },
    {
      header: 'Amount',
      accessor: 'amount',
      cell: (value: any) => <span className="text-red-400 font-medium">{formatCurrency(value)}</span>,
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: any, row: any) => {
        const statusInfo = getStatusDisplay(row);
        const IconComponent = statusInfo.icon;
        return (
          <div className="flex items-center gap-2">
            <span className={`${statusInfo.color} flex items-center gap-1`}>
              <IconComponent size={16} />
              {statusInfo.label}
            </span>
            {row.status !== 'paid' && (
              <button
                onClick={() => markAsPaid(row)}
                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-colors"
                title="Mark as Paid"
              >
                Pay
              </button>
            )}
          </div>
        );
      },
    },
  ];

  const reloadTaxesList = async () => {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) return;

    try {
      const params: any = {
        "page": paginationNum,
        "quantity": 8,
        "relationFilter": ["enterpriseId", enterpriseId]
      };

      if (debouncedSearchTerm) {
        params.term = debouncedSearchTerm;
      }

      const data = await getAll<ListResponse<Taxes>>(APIMODULE, params);
      
      // Apply frontend filters
      let filteredData = data;
      if (statusFilter) {
        const filteredItems = data.data.items.filter(tax => {
          let matchesStatus = true;

          if (statusFilter) {
            const statusInfo = getStatusDisplay(tax);
            matchesStatus = statusInfo.status === statusFilter;
          }

          return matchesStatus;
        });

        filteredData = {
          ...data,
          data: {
            ...data.data,
            items: filteredItems,
            metadata: {
              ...data.data.metadata,
              total: filteredItems.length
            }
          }
        };
      }

      setTaxes(filteredData);
    } catch (err) {
      console.error('Error loading taxes:', err);
      showError('Erro ao carregar impostos');
    }
  };

  useEffect(() => {
    setLoaded(false);
    reloadTaxesList().then(() => {
      setLoaded(true);
    });
  }, [paginationNum, debouncedSearchTerm, statusFilter]);

  const convertValue = (key: string, value: any) => {
    if (value === undefined || value === null || value === '') {
      return value;
    }

    if (key === 'amount') {
      const numValue = Number(value);
      return isNaN(numValue) ? null : numValue;
    }

    if (key === 'endDate' || key === 'paidDate') {
      // Handle date input (YYYY-MM-DD format from input type="date")
      if (typeof value === 'string' && value.includes('-')) {
        return new Date(value + 'T00:00:00.000Z');
      }
      return new Date(value);
    }

    return value;
  };

  function createTax(): Promise<boolean> {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) {
      showError('Enterprise not selected');
      return Promise.resolve(false);
    }

    if (!inputDataCreate.type || !inputDataCreate.amount || !inputDataCreate.endDate) {
      showError('Type, amount and due date are required');
      return Promise.resolve(false);
    }

    const payload: Partial<CreateTaxesDTO> = {
      ...inputDataCreate,
      enterpriseId: enterpriseId
    };

    const filteredPayload: Partial<CreateTaxesDTO> = {};

    Object.entries(payload).forEach(([key, value]) => {
      const convertedValue = convertValue(key, value);
      if (convertedValue !== undefined && convertedValue !== null && convertedValue !== '') {
        (filteredPayload as any)[key] = convertedValue;
      }
    });

    console.log('Payload for create:', filteredPayload);

    return create<CreateTaxesDTO, Taxes>(APIMODULE, filteredPayload as CreateTaxesDTO)
      .then((data) => {
        console.log('Tax created:', data);
        showSuccess('Tax created successfully!');
        setShowAddModal(false);
        setInputDataCreate({});
        reloadTaxesList();
        return true;
      })
      .catch(err => {
        console.error('Error creating tax:', err);
        showError('Error creating tax');
        return false;
      });
  }

  function updateTax(): Promise<boolean> {
    if (!selectedTax) {
      showError('No tax selected');
      return Promise.resolve(false);
    }

    const payload: Partial<UpdateTaxesDTO> = {};
    
    Object.entries(inputDataUpdate).forEach(([key, value]) => {
      const convertedValue = convertValue(key, value);
      if (convertedValue !== undefined && convertedValue !== null && convertedValue !== '') {
        (payload as any)[key] = convertedValue;
      }
    });

    console.log('Payload for update:', payload);

    return update<UpdateTaxesDTO, Taxes>(APIMODULE, selectedTax.id, payload as UpdateTaxesDTO)
      .then((data) => {
        console.log('Tax updated:', data);
        showSuccess('Tax updated successfully!');
        setShowEditModal(false);
        setSelectedTax(null);
        setInputDataUpdate({});
        reloadTaxesList();
        return true;
      })
      .catch(err => {
        console.error('Error updating tax:', err);
        showError('Error updating tax');
        return false;
      });
  }

  const deleteTax = async (tax: Taxes) => {
    if (window.confirm('Are you sure you want to delete this tax?')) {
      try {
        await remove(APIMODULE, tax.id);
        showSuccess('Tax deleted successfully!');
        reloadTaxesList();
      } catch (err) {
        console.error('Error deleting tax:', err);
        showError('Error deleting tax');
      }
    }
  };

  const deleteBulkTaxes = async (selectedIds: number[]) => {
    try {
      const deletePromises = selectedIds.map(id => remove(APIMODULE, id));
      await Promise.all(deletePromises);
      showSuccess(`${selectedIds.length} tax(es) deleted successfully!`);
      reloadTaxesList();
    } catch (err) {
      console.error('Error deleting taxes:', err);
      showError('Error deleting taxes');
    }
  };

  const markAsPaid = async (tax: Taxes) => {
    if (window.confirm('Mark this tax as paid?')) {
      try {
        const updateData: Partial<UpdateTaxesDTO> = {
          status: 'paid',
          paidDate: new Date()
        };

        await update<UpdateTaxesDTO, Taxes>(APIMODULE, tax.id, updateData as UpdateTaxesDTO);
        showSuccess('Tax marked as paid successfully!');
        reloadTaxesList();
      } catch (err) {
        console.error('Error marking tax as paid:', err);
        showError('Error marking tax as paid');
      }
    }
  };

  const handleEditTax = (tax: Taxes) => {
    setSelectedTax(tax);
    const updateData: Partial<UpdateTaxesDTO> = {
      type: tax.type,
      amount: tax.amount,
      endDate: tax.endDate ? new Date(tax.endDate).toISOString().split('T')[0] : undefined,
      status: tax.status || 'pending',
      paidDate: tax.paidDate ? new Date(tax.paidDate).toISOString().split('T')[0] : undefined,
    };

    if (tax.period) updateData.period = tax.period;
    if (tax.description) updateData.description = tax.description;

    setInputDataUpdate(updateData);
    setShowEditModal(true);
  };

  const handleViewTax = (tax: Taxes) => {
    setSelectedTax(tax);
    setShowDetailsModal(true);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setPaginationNum(1);
  };

  // Calculate summary data
  const totalAmount = taxes?.data.items.reduce((sum, tax) => sum + tax.amount, 0) || 0;
  const overdueAmount = taxes?.data.items
    .filter(tax => getStatusDisplay(tax).status === 'overdue')
    .reduce((sum, tax) => sum + tax.amount, 0) || 0;
  const dueSoonAmount = taxes?.data.items
    .filter(tax => getStatusDisplay(tax).status === 'due_soon')
    .reduce((sum, tax) => sum + tax.amount, 0) || 0;
  const pendingAmount = taxes?.data.items
    .filter(tax => getStatusDisplay(tax).status === 'pending')
    .reduce((sum, tax) => sum + tax.amount, 0) || 0;
  const paidAmount = taxes?.data.items
    .filter(tax => getStatusDisplay(tax).status === 'paid')
    .reduce((sum, tax) => sum + tax.amount, 0) || 0;



  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'due_soon', label: 'Due Soon' },
    { value: 'overdue', label: 'Overdue' },
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
    switch (name) {
      case 'statusFilter':
        setStatusFilter(value);
        break;
    }
  };

  const columns = getTaxColumns();

  return (
    <>
      <div className="min-h-screen ml-20 bg-base-300 text-white p-10">
        <div className="flex items-center justify-between mb-10 border-b border-violet-900/30 pb-4">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <Receipt size={40} className="text-yellow-500" />
            💰 Tax Management
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Add Tax</span>
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total Amount</h3>
            <p className="text-white text-xl font-bold">{formatCurrency(totalAmount)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Paid</h3>
            <p className="text-green-500 text-xl font-bold">{formatCurrency(paidAmount)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Overdue</h3>
            <p className="text-red-500 text-xl font-bold">{formatCurrency(overdueAmount)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Due Soon</h3>
            <p className="text-yellow-500 text-xl font-bold">{formatCurrency(dueSoonAmount)}</p>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Pending</h3>
            <p className="text-blue-500 text-xl font-bold">{formatCurrency(pendingAmount)}</p>
          </div>
        </div>

        {/* Filters */}
        <Filter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search taxes by type, period or description..."
          fields={filterFields}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />

        {/* Tax table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <DataTable
            columns={columns}
            data={loaded && taxes ? taxes.data.items : []}
            onEdit={handleEditTax}
            onDelete={deleteTax}
            onBulkDelete={deleteBulkTaxes}
            onRowClick={handleViewTax}
            selectable={true}
            idField="id"
          />
        </div>

        {/* Pagination */}
        {loaded && taxes && (
          <div className="mt-10">
            <Pagination
              updatePage={setPaginationNum}
              actualPage={paginationNum}
              last={taxes.data.metadata.last ?? 1}
            />
          </div>
        )}
      </div>

      {/* Modal to add tax */}
      {showAddModal && (
        <ModalForms create={createTax} setInputData={setInputDataCreate} onclick={() => setShowAddModal(false)}>
          <Fieldset title='New Tax'>
            <Input 
              nameOnDB='type' 
              name='Tax Type *' 
            />
            <Input nameOnDB='period' name='Period' />
            <Input nameOnDB='amount' name='Amount *' type='number' step='0.01' />
            <Input nameOnDB='endDate' name='Due Date *' type='date' />
            <SelectString
              nameOnDB='status'
              name='Status'
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'paid', label: 'Paid' }
              ]}
            />
            <Input nameOnDB='paidDate' name='Paid Date' type='date' />
            <Input nameOnDB='description' name='Description' />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal to edit tax */}
      {showEditModal && selectedTax && (
        <ModalForms
          create={updateTax}
          setInputData={setInputDataUpdate}
          onclick={() => setShowEditModal(false)}
          initialData={inputDataUpdate}
        >
          <Fieldset title={`Edit Tax: ${selectedTax.type}`}>
            <Input 
              nameOnDB='type' 
              name='Tax Type' 
            />
            <Input nameOnDB='period' name='Period'/>
            <Input nameOnDB='amount' name='Amount' type='number' step='0.01' />
            <Input nameOnDB='endDate' name='Due Date' type='date' />
            <SelectString
              nameOnDB='status'
              name='Status'
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'paid', label: 'Paid' }
              ]}
            />
            <Input nameOnDB='paidDate' name='Paid Date' type='date' />
            <Input nameOnDB='description' name='Description' />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal to view tax details */}
      {showDetailsModal && selectedTax && (
        <Modal onclick={() => setShowDetailsModal(false)} isCreate={false} isLarge={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Detalhes do Imposto
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Receipt className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tipo</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedTax.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Período</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedTax.period || 'Não informado'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <AlertTriangle className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Data de Vencimento</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(selectedTax.endDate)}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Valor</p>
                  <p className="font-medium text-gray-900 dark:text-white text-2xl">{formatCurrency(selectedTax.amount)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const statusInfo = getStatusDisplay(selectedTax.endDate);
                      const IconComponent = statusInfo.icon;
                      return (
                        <span className={`${statusInfo.color} flex items-center gap-1 font-medium`}>
                          <IconComponent size={16} />
                          {statusInfo.label}
                        </span>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
            
            {selectedTax.description && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Descrição</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedTax.description}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}