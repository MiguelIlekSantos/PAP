'use client'

import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { ModalForms } from '../components/forms/ModalForms'
import { Input } from '../components/forms/Input'
import { SelectString } from '../components/forms/SelectString'
import { Fieldset } from '../components/forms/Fieldset'
import { Pagination } from '../components/Pagination'
import { DataTable } from '../components/DataTable'
import { Filter } from '../components/Filter'
import { create, getAll, getById, update, remove, ListResponse } from '@/lib/api'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'
import { Transactions } from '@prisma/client'
import { CreateTransactionsDTO, UpdateTransactionsDTO } from '@pap/utils'

const APIMODULE = "transactions"

export default function FinancialPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<ListResponse<Transactions>>();
  const [paginationNum, setPaginationNum] = useState<number>(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transactions | null>(null);

  const [inputDataCreate, setInputDataCreate] = useState<Partial<CreateTransactionsDTO>>({});
  const [inputDataUpdate, setInputDataUpdate] = useState<Partial<UpdateTransactionsDTO>>({});

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const { getEnterprise } = useEnterpriseStore();

  const convertValue = (key: string, value: any) => {
    if (value === undefined || value === null || value === '') {
      return value;
    }

    if (key === 'amount') {
      const numValue = Number(value);
      return isNaN(numValue) ? null : numValue;
    }

    if (key === 'date') {
      // Handle date input (YYYY-MM-DD format from input type="date")
      if (typeof value === 'string' && value.includes('-')) {
        return new Date(value + 'T00:00:00.000Z');
      }
      return new Date(value);
    }

    return value;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const formatDate = (date: Date | string) => {
    if (!date) return 'Não informado';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return '€0,00';
    return `€${amount.toFixed(2).replace('.', ',')}`;
  };

  const transactionColumns = [
    {
      header: 'Data',
      accessor: 'date',
      cell: (value: any) => renderCellValue('date', value),
    },
    {
      header: 'Descrição',
      accessor: 'description',
      cell: (value: any) => renderCellValue('description', value),
    },
    {
      header: 'Categoria',
      accessor: 'category',
      cell: (value: any) => renderCellValue('category', value),
    },
    {
      header: 'Conta Bancária',
      accessor: 'bankAccount',
      cell: (value: any) => renderCellValue('bankAccount', value),
    },
    {
      header: 'Valor',
      accessor: 'amount',
      cell: (value: any, row: any) => renderCellValue('amount', value, row),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: any) => renderCellValue('status', value),
    },
  ];

  const renderCellValue = (accessor: string, value: any, row?: any) => {
    if (accessor === 'date') {
      return formatDate(value);
    }
    
    if (accessor === 'description') {
      return value || 'Não informado';
    }
    
    if (accessor === 'category') {
      return value || 'Não informada';
    }
    
    if (accessor === 'bankAccount') {
      return value || 'Não informado';
    }
    
    if (accessor === 'amount') {
      const color = row?.amount >= 0 ? 'text-green-500' : 'text-red-500';
      const prefix = row?.amount >= 0 ? '+' : '';
      return <span className={color}>{prefix}{formatCurrency(value)}</span>;
    }
    
    if (accessor === 'status') {
      if (!value) return 'Não informado';
      
      let statusText = '';
      let statusClass = '';
      
      if (value === 'completed') {
        statusText = 'Concluído';
        statusClass = 'bg-green-500/20 text-green-400';
      } else if (value === 'pending') {
        statusText = 'Pendente';
        statusClass = 'bg-yellow-500/20 text-yellow-400';
      } else if (value === 'cancelled') {
        statusText = 'Cancelado';
        statusClass = 'bg-red-500/20 text-red-400';
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

  const reloadTransactionsList = async () => {
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

    try {
      const data = await getAll<ListResponse<Transactions>>(APIMODULE, params);
      let filteredData = data;
      
      if (statusFilter || categoryFilter) {
        const filteredItems = data.data.items.filter(transaction => {
          let matches = true;
          
          if (statusFilter && statusFilter.trim() !== '') {
            matches = matches && transaction.status === statusFilter;
          }
          
          if (categoryFilter && categoryFilter.trim() !== '') {
            matches = matches && transaction.category === categoryFilter;
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
      
      setTransactions(filteredData);
    } catch (err) {
      console.error('Error loading transactions:', err);
      showError('Erro ao carregar transações');
    }
  };

  useEffect(() => {
    setLoaded(false);
    reloadTransactionsList().then(() => {
      setLoaded(true);
    });
  }, [paginationNum, debouncedSearchTerm, statusFilter, categoryFilter]);

  function createTransaction(): Promise<boolean> {
    if (!inputDataCreate.amount) {
      showError('Valor é obrigatório');
      return Promise.resolve(false);
    }

    if (!inputDataCreate.date) {
      showError('Data é obrigatória');
      return Promise.resolve(false);
    }

    if (!inputDataCreate.bankAccount) {
      showError('Conta bancária é obrigatória');
      return Promise.resolve(false);
    }

    const payload: Partial<CreateTransactionsDTO> = {
      ...inputDataCreate,
      enterpriseId: getEnterprise()
    };

    const filteredPayload: Partial<CreateTransactionsDTO> = {};

    Object.entries(payload).forEach(([key, value]) => {
      const convertedValue = convertValue(key, value);
      if (convertedValue !== undefined && convertedValue !== null && convertedValue !== '') {
        (filteredPayload as any)[key] = convertedValue;
      }
    });

    return create<CreateTransactionsDTO, Transactions>(APIMODULE, filteredPayload as CreateTransactionsDTO)
      .then((data) => {
        showSuccess('Transação criada com sucesso!');
        setShowAddModal(false);
        setInputDataCreate({});
        reloadTransactionsList();
        return true;
      })
      .catch(err => {
        console.error('Error creating transaction:', err);
        showError('Erro ao criar transação');
        return false;
      });
  }

  function updateTransaction(): Promise<boolean> {
    if (!selectedTransaction) {
      showError('Nenhuma transação selecionada');
      return Promise.resolve(false);
    }

    const payload: Partial<UpdateTransactionsDTO> = {};

    Object.entries(inputDataUpdate).forEach(([key, value]) => {
      const convertedValue = convertValue(key, value);
      if (convertedValue !== undefined && convertedValue !== null && convertedValue !== '') {
        (payload as any)[key] = convertedValue;
      }
    });

    return update<UpdateTransactionsDTO, Transactions>(APIMODULE, selectedTransaction.id, payload as UpdateTransactionsDTO)
      .then((data) => {
        showSuccess('Transação atualizada com sucesso!');
        setShowEditModal(false);
        setSelectedTransaction(null);
        setInputDataUpdate({});
        reloadTransactionsList();
        return true;
      })
      .catch(err => {
        console.error('Error updating transaction:', err);
        showError('Erro ao atualizar transação');
        return false;
      });
  }

  const deleteTransaction = async (transaction: Transactions) => {
    if (window.confirm('Tem certeza que deseja deletar esta transação?')) {
      try {
        await remove(APIMODULE, transaction.id);
        showSuccess('Transação deletada com sucesso!');
        reloadTransactionsList();
      } catch (err) {
        console.error('Error deleting transaction:', err);
        showError('Erro ao deletar transação');
      }
    }
  };

  const deleteBulkTransactions = async (selectedIds: number[]) => {
    try {
      const deletePromises = selectedIds.map(id => remove(APIMODULE, id));
      await Promise.all(deletePromises);
      showSuccess(`${selectedIds.length} transação(ões) deletada(s) com sucesso!`);
      reloadTransactionsList();
    } catch (err) {
      console.error('Error deleting transactions:', err);
      showError('Erro ao deletar transações');
    }
  };

  const handleEditTransaction = (transaction: Transactions) => {
    setSelectedTransaction(transaction);

    const formattedDate = transaction.date ? new Date(transaction.date).toISOString().split('T')[0] : '';

    const updateData: Partial<UpdateTransactionsDTO> = {
      amount: transaction.amount,
      date: formattedDate,
      bankAccount: transaction.bankAccount,
    };

    if (transaction.category) updateData.category = transaction.category;
    if (transaction.description) updateData.description = transaction.description;
    if (transaction.status) updateData.status = transaction.status;

    setInputDataUpdate(updateData);
    setShowEditModal(true);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setCategoryFilter('');
    setPaginationNum(1);
  };

  // Calculate totals from transactions
  const calculateTotals = () => {
    if (!loaded || !transactions) {
      return { totalIncome: 0, totalExpense: 0, balance: 0 };
    }

    const allTransactions = transactions.data.items;
    const totalIncome = allTransactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = allTransactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const balance = totalIncome - totalExpense;

    return { totalIncome, totalExpense, balance };
  };

  const { totalIncome, totalExpense, balance } = calculateTotals();

  const statusOptions = [
    { value: 'completed', label: 'Concluído' },
    { value: 'pending', label: 'Pendente' },
    { value: 'cancelled', label: 'Cancelado' },
  ];

  const categoryOptions = [
    { value: 'Vendas', label: 'Vendas' },
    { value: 'Fornecedores', label: 'Fornecedores' },
    { value: 'Salários', label: 'Salários' },
    { value: 'Instalações', label: 'Instalações' },
    { value: 'Impostos', label: 'Impostos' },
    { value: 'Outros', label: 'Outros' },
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

  const columns = transactionColumns;

  return (
    <>
      <div className="min-h-screen ml-20 bg-base-300 text-white p-10">
        <div className="flex items-center justify-between mb-10 border-b border-violet-900/30 pb-4">
          <h1 className="text-4xl font-bold text-white">
            💰 Transações Financeiras
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Nova Transação</span>
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Receitas</h3>
            <p className="text-green-500 text-2xl font-bold">{formatCurrency(totalIncome)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Despesas</h3>
            <p className="text-red-500 text-2xl font-bold">{formatCurrency(totalExpense)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Saldo</h3>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatCurrency(balance)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <Filter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Pesquisar transações por descrição, categoria ou conta bancária..."
          fields={filterFields}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />

        {/* Transactions table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <DataTable
            columns={columns}
            data={loaded && transactions ? transactions.data.items : []}
            onEdit={handleEditTransaction}
            onDelete={deleteTransaction}
            onBulkDelete={deleteBulkTransactions}
            selectable={true}
            idField="id"
          />
        </div>

        {/* Pagination */}
        {loaded && transactions && (
          <div className="mt-10">
            <Pagination
              updatePage={setPaginationNum}
              actualPage={paginationNum}
              last={transactions.data.metadata.last ?? 1}
            />
          </div>
        )}
      </div>

      {/* Modal to add transaction */}
      {showAddModal && (
        <ModalForms create={createTransaction} setInputData={setInputDataCreate} onclick={() => setShowAddModal(false)}>
          <p className='text-2xl p-5 lg:p-10'>Nova Transação</p>

          <Fieldset title='Informações da Transação'>
            <Input nameOnDB='amount' name='Valor *' type='number' step='0.01' />
            <Input nameOnDB='date' name='Data *' type='date' />
            <Input nameOnDB='bankAccount' name='Conta Bancária *' />
            <Input nameOnDB='description' name='Descrição' />
            <SelectString
              nameOnDB='category'
              name='Categoria'
              options={categoryOptions}
            />
            <SelectString
              nameOnDB='status'
              name='Status'
              options={statusOptions}
            />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal to edit transaction */}
      {showEditModal && selectedTransaction && (
        <ModalForms
          create={updateTransaction}
          setInputData={setInputDataUpdate}
          onclick={() => setShowEditModal(false)}
          initialData={inputDataUpdate}
        >
          <p className='text-2xl p-5 lg:p-10'>Editar Transação: {selectedTransaction.description || 'Sem descrição'}</p>

          <Fieldset title='Informações da Transação'>
            <Input nameOnDB='amount' name='Valor *' type='number' step='0.01' />
            <Input nameOnDB='date' name='Data *' type='date' />
            <Input nameOnDB='bankAccount' name='Conta Bancária *' />
            <Input nameOnDB='description' name='Descrição' />
            <SelectString
              nameOnDB='category'
              name='Categoria'
              options={categoryOptions}
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