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
import { Budget } from '@prisma/client'
import { CreateBudgetDTO, UpdateBudgetDTO } from '@pap/utils'

const APIMODULE = "budget"

export default function BudgetsPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [budgets, setBudgets] = useState<ListResponse<Budget>>();
  const [paginationNum, setPaginationNum] = useState<number>(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  const [inputDataCreate, setInputDataCreate] = useState<Partial<CreateBudgetDTO>>({});
  const [inputDataUpdate, setInputDataUpdate] = useState<Partial<UpdateBudgetDTO>>({});

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const { getEnterprise } = useEnterpriseStore();

  const convertValue = (key: string, value: any) => {
    if (value === undefined || value === null || value === '') {
      return value;
    }

    if (key === 'amount' || key === 'usedAmount' || key === 'remainingAmount') {
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

  const formatCurrency = (amount: number | null) => {
    if (!amount) return '€0,00';
    return `€${amount.toFixed(2).replace('.', ',')}`;
  };

  const budgetColumns = [
    {
      header: 'Nome',
      accessor: 'name',
      cell: (value: any) => renderCellValue('name', value),
    },
    {
      header: 'Categoria',
      accessor: 'category',
      cell: (value: any) => renderCellValue('category', value),
    },
    {
      header: 'Orçamento Total',
      accessor: 'amount',
      cell: (value: any) => renderCellValue('amount', value),
    },
    {
      header: 'Valor Usado',
      accessor: 'usedAmount',
      cell: (value: any) => renderCellValue('usedAmount', value),
    },
    {
      header: 'Valor Restante',
      accessor: 'remainingAmount',
      cell: (value: any, row: any) => renderCellValue('remainingAmount', value, row),
    },
    {
      header: 'Progresso',
      accessor: 'progress',
      cell: (value: any, row: any) => renderCellValue('progress', value, row),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: any) => renderCellValue('status', value),
    },
    {
      header: 'Período',
      accessor: 'period',
      cell: (value: any) => renderCellValue('period', value),
    },
  ];

  const renderCellValue = (accessor: string, value: any, row?: any) => {
    if (accessor === 'name') {
      return value || 'Não informado';
    }
    
    if (accessor === 'category') {
      return value || 'Não informada';
    }
    
    if (accessor === 'amount') {
      return <span className="text-blue-400">{formatCurrency(value)}</span>;
    }
    
    if (accessor === 'usedAmount') {
      return <span className="text-red-400">{formatCurrency(value)}</span>;
    }
    
    if (accessor === 'remainingAmount') {
      const remaining = row ? (row.amount - (row.usedAmount || 0)) : value;
      const color = remaining >= 0 ? 'text-green-400' : 'text-red-500';
      return <span className={color}>{formatCurrency(remaining)}</span>;
    }
    
    if (accessor === 'progress') {
      if (!row || !row.amount || row.amount === 0) return (
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className="h-2 rounded-full bg-gray-500" style={{ width: '0%' }}></div>
        </div>
      );
      
      const percentage = ((row.usedAmount || 0) / row.amount) * 100;
      const color = percentage > 100 ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500';
      
      return (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${color}`} 
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <span className="text-sm">{percentage.toFixed(1)}%</span>
        </div>
      );
    }
    
    if (accessor === 'status') {
      if (!value) return 'Não informado';
      
      let statusText = '';
      let statusClass = '';
      
      if (value === 'active') {
        statusText = 'Ativo';
        statusClass = 'bg-green-500/20 text-green-400';
      } else if (value === 'completed') {
        statusText = 'Concluído';
        statusClass = 'bg-blue-500/20 text-blue-400';
      } else if (value === 'exceeded') {
        statusText = 'Excedido';
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
    }
    
    if (accessor === 'period') {
      return value || 'Não informado';
    }
    
    return value;
  };

  const reloadBudgetsList = async () => {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) return;

    const params: any = {
      "page": paginationNum,
      "quantity": 8,
    };

    if (debouncedSearchTerm) {
      params.term = debouncedSearchTerm;
    }


    try {
      const data = await getAll<ListResponse<Budget>>(APIMODULE, params);
      let filteredData = data;
      
      if (statusFilter || categoryFilter) {
        const filteredItems = data.data.items.filter(budget => {
          let matches = true;
          
          if (statusFilter && statusFilter.trim() !== '') {
            matches = matches && budget.status === statusFilter;
          }
          
          if (categoryFilter && categoryFilter.trim() !== '') {
            matches = matches && budget.category === categoryFilter;
          }
          
          return matches;
        });

        filteredData = {
          ...data,
          data: {
            ...data.data,
            items: filteredItems,
          }
        };
      }
      
      setBudgets(filteredData);
    } catch (err) {
      console.error('Error loading budgets:', err);
      showError('Erro ao carregar orçamentos');
    }
  };

  useEffect(() => {
    setLoaded(false);
    reloadBudgetsList().then(() => {
      setLoaded(true);
    });
  }, [paginationNum, debouncedSearchTerm, statusFilter, categoryFilter]);

  function createBudget(): Promise<boolean> {
    if (!inputDataCreate.name) {
      showError('Nome é obrigatório');
      return Promise.resolve(false);
    }

    if (!inputDataCreate.amount) {
      showError('Valor do orçamento é obrigatório');
      return Promise.resolve(false);
    }

    const payload: Partial<CreateBudgetDTO> = {
      ...inputDataCreate,
    };

    const filteredPayload: Partial<CreateBudgetDTO> = {};

    Object.entries(payload).forEach(([key, value]) => {
      const convertedValue = convertValue(key, value);
      if (convertedValue !== undefined && convertedValue !== null && convertedValue !== '') {
        (filteredPayload as any)[key] = convertedValue;
      }
    });

    // Calculate remaining amount if used amount is provided
    if (filteredPayload.amount && filteredPayload.usedAmount !== undefined) {
      filteredPayload.remainingAmount = filteredPayload.amount - (filteredPayload.usedAmount || 0);
    }

    return create<CreateBudgetDTO, Budget>(APIMODULE, filteredPayload as CreateBudgetDTO)
      .then((data) => {
        showSuccess('Orçamento criado com sucesso!');
        setShowAddModal(false);
        setInputDataCreate({});
        reloadBudgetsList();
        return true;
      })
      .catch(err => {
        console.error('Error creating budget:', err);
        showError('Erro ao criar orçamento');
        return false;
      });
  }

  function updateBudget(): Promise<boolean> {
    if (!selectedBudget) {
      showError('Nenhum orçamento selecionado');
      return Promise.resolve(false);
    }

    const payload: Partial<UpdateBudgetDTO> = {};

    Object.entries(inputDataUpdate).forEach(([key, value]) => {
      const convertedValue = convertValue(key, value);
      if (convertedValue !== undefined && convertedValue !== null && convertedValue !== '') {
        (payload as any)[key] = convertedValue;
      }
    });

    // Calculate remaining amount if needed
    if (payload.amount !== undefined || payload.usedAmount !== undefined) {
      const amount = payload.amount !== undefined ? payload.amount : selectedBudget.amount;
      const usedAmount = payload.usedAmount !== undefined ? payload.usedAmount : (selectedBudget.usedAmount || 0);
      payload.remainingAmount = amount - usedAmount;
    }

    return update<UpdateBudgetDTO, Budget>(APIMODULE, selectedBudget.id, payload as UpdateBudgetDTO)
      .then((data) => {
        showSuccess('Orçamento atualizado com sucesso!');
        setShowEditModal(false);
        setSelectedBudget(null);
        setInputDataUpdate({});
        reloadBudgetsList();
        return true;
      })
      .catch(err => {
        console.error('Error updating budget:', err);
        showError('Erro ao atualizar orçamento');
        return false;
      });
  }

  const deleteBudget = async (budget: Budget) => {
    if (window.confirm('Tem certeza que deseja deletar este orçamento?')) {
      try {
        await remove(APIMODULE, budget.id);
        showSuccess('Orçamento deletado com sucesso!');
        reloadBudgetsList();
      } catch (err) {
        console.error('Error deleting budget:', err);
        showError('Erro ao deletar orçamento');
      }
    }
  };

  const deleteBulkBudgets = async (selectedIds: number[]) => {
    try {
      const deletePromises = selectedIds.map(id => remove(APIMODULE, id));
      await Promise.all(deletePromises);
      showSuccess(`${selectedIds.length} orçamento(s) deletado(s) com sucesso!`);
      reloadBudgetsList();
    } catch (err) {
      console.error('Error deleting budgets:', err);
      showError('Erro ao deletar orçamentos');
    }
  };

  const handleEditBudget = (budget: Budget) => {
    setSelectedBudget(budget);

    const updateData: Partial<UpdateBudgetDTO> = {
      name: budget.name,
      amount: budget.amount,
      usedAmount: budget.usedAmount || undefined,
      remainingAmount: budget.remainingAmount || undefined,
      status: budget.status || undefined,
      period: budget.period || undefined,
      category: budget.category || undefined,
    };

    setInputDataUpdate(updateData);
    setShowEditModal(true);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setCategoryFilter('');
    setPaginationNum(1);
  };

  // Calculate totals from budgets
  const calculateTotals = () => {
    if (!loaded || !budgets) {
      return { totalBudget: 0, totalSpent: 0, totalRemaining: 0, activeBudgets: 0 };
    }

    const allBudgets = budgets.data.items;
    const totalBudget = allBudgets.reduce((sum, budget) => sum + (budget.amount || 0), 0);
    const totalSpent = allBudgets.reduce((sum, budget) => sum + (budget.usedAmount || 0), 0);
    const totalRemaining = allBudgets.reduce((sum, budget) => sum + (budget.remainingAmount || (budget.amount - (budget.usedAmount || 0))), 0);
    const activeBudgets = allBudgets.filter(b => b.status === 'active').length;

    return { totalBudget, totalSpent, totalRemaining, activeBudgets };
  };

  const { totalBudget, totalSpent, totalRemaining, activeBudgets } = calculateTotals();

  const statusOptions = [
    { value: 'active', label: 'Ativo' },
    { value: 'completed', label: 'Concluído' },
    { value: 'exceeded', label: 'Excedido' },
    { value: 'inactive', label: 'Inativo' },
  ];

  const categoryOptions = [
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Tecnologia', label: 'Tecnologia' },
    { value: 'Recursos Humanos', label: 'Recursos Humanos' },
    { value: 'Operações', label: 'Operações' },
    { value: 'Vendas', label: 'Vendas' },
    { value: 'Manutenção', label: 'Manutenção' },
    { value: 'Administrativo', label: 'Administrativo' },
    { value: 'Financeiro', label: 'Financeiro' },
  ];

  const periodOptions = [
    { value: 'Mensal', label: 'Mensal' },
    { value: 'Trimestral', label: 'Trimestral' },
    { value: 'Semestral', label: 'Semestral' },
    { value: 'Anual', label: 'Anual' },
  ];

  const filterFields = [
    {
      name: 'statusFilter',
      label: 'Status',
      type: 'select' as const,
      options: statusOptions,
    },
    {
      name: 'categoryFilter',
      label: 'Categoria',
      type: 'select' as const,
      options: categoryOptions,
    },
  ];

  const filterValues = {
    statusFilter,
    categoryFilter,
  };

  const handleFilterChange = (name: string, value: any) => {
    if (name === 'statusFilter') {
      setStatusFilter(value);
    } else if (name === 'categoryFilter') {
      setCategoryFilter(value);
    }
  };

  const columns = budgetColumns;

  return (
    <>
      <div className="min-h-screen ml-20 bg-base-300 text-white p-10">
        <div className="flex items-center justify-between mb-10 border-b border-violet-900/30 pb-4">
          <h1 className="text-4xl font-bold text-white">
            🎯 Orçamentos
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Novo Orçamento</span>
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Orçamento Total</h3>
            <p className="text-blue-400 text-2xl font-bold">{formatCurrency(totalBudget)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total Usado</h3>
            <p className="text-red-400 text-2xl font-bold">{formatCurrency(totalSpent)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total Restante</h3>
            <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-green-400' : 'text-red-500'}`}>
              {formatCurrency(totalRemaining)}
            </p>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Orçamentos Ativos</h3>
            <p className="text-green-400 text-2xl font-bold">{activeBudgets}</p>
          </div>
        </div>

        {/* Filters */}
        <Filter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Pesquisar orçamentos por nome, categoria ou período..."
          fields={filterFields}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />

        {/* Budgets table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <DataTable
            columns={columns}
            data={loaded && budgets ? budgets.data.items : []}
            onEdit={handleEditBudget}
            onDelete={deleteBudget}
            onBulkDelete={deleteBulkBudgets}
            selectable={true}
            idField="id"
          />
        </div>

        {/* Pagination */}
        {loaded && budgets && (
          <div className="mt-10">
            <Pagination
              updatePage={setPaginationNum}
              actualPage={paginationNum}
              last={budgets.data.metadata.last ?? 1}
            />
          </div>
        )}
      </div>

      {/* Modal to add budget */}
      {showAddModal && (
        <ModalForms create={createBudget} setInputData={setInputDataCreate} onclick={() => setShowAddModal(false)}>
          <p className='text-2xl p-5 lg:p-10'>Novo Orçamento</p>

          <Fieldset title='Informações do Orçamento'>
            <Input nameOnDB='name' name='Nome *' />
            <Input nameOnDB='amount' name='Valor Total *' type='number' step='0.01' />
            <Input nameOnDB='usedAmount' name='Valor Usado' type='number' step='0.01' />
            <SelectString
              nameOnDB='category'
              name='Categoria'
              options={categoryOptions}
            />
            <SelectString
              nameOnDB='period'
              name='Período'
              options={periodOptions}
            />
            <SelectString
              nameOnDB='status'
              name='Status'
              options={statusOptions}
            />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal to edit budget */}
      {showEditModal && selectedBudget && (
        <ModalForms
          create={updateBudget}
          setInputData={setInputDataUpdate}
          onclick={() => setShowEditModal(false)}
          initialData={inputDataUpdate}
        >
          <p className='text-2xl p-5 lg:p-10'>Editar Orçamento: {selectedBudget.name}</p>

          <Fieldset title='Informações do Orçamento'>
            <Input nameOnDB='name' name='Nome *' />
            <Input nameOnDB='amount' name='Valor Total *' type='number' step='0.01' />
            <Input nameOnDB='usedAmount' name='Valor Usado' type='number' step='0.01' />
            <SelectString
              nameOnDB='category'
              name='Categoria'
              options={categoryOptions}
            />
            <SelectString
              nameOnDB='period'
              name='Período'
              options={periodOptions}
            />
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