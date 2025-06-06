'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Nav } from '../components/Nav'
import { DrawerMenu } from '../components/DrawerMenu'
import { FilterPanel } from '../components/FilterPanel'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'
import { Plus, Search, CreditCard, BarChart, Receipt } from 'lucide-react'
import Link from 'next/link'
import { FinanceTabs } from '../data/tabs'

// Mock data for financial transactions
const mockTransactions = [
  {
    id: '1',
    date: '15/03/2023',
    description: 'Pagamento de Fornecedor - Dell Portugal',
    type: 'expense',
    category: 'Fornecedores',
    amount: 5250.00,
    status: 'completed',
    account: 'Banco Millennium BCP',
  },
  {
    id: '2',
    date: '10/03/2023',
    description: 'Recebimento de Cliente - Empresa ABC',
    type: 'income',
    category: 'Vendas',
    amount: 3899.97,
    status: 'completed',
    account: 'Banco Millennium BCP',
  },
  {
    id: '3',
    date: '05/03/2023',
    description: 'Pagamento de Salários',
    type: 'expense',
    category: 'Salários',
    amount: 12500.00,
    status: 'completed',
    account: 'Banco Santander',
  },
  {
    id: '4',
    date: '01/03/2023',
    description: 'Pagamento de Aluguel',
    type: 'expense',
    category: 'Instalações',
    amount: 2200.00,
    status: 'completed',
    account: 'Banco Santander',
  },
  {
    id: '5',
    date: '28/02/2023',
    description: 'Recebimento de Cliente - Empresa XYZ',
    type: 'income',
    category: 'Vendas',
    amount: 4500.00,
    status: 'completed',
    account: 'Banco Millennium BCP',
  },
  {
    id: '6',
    date: '25/02/2023',
    description: 'Pagamento de Impostos - IVA',
    type: 'expense',
    category: 'Impostos',
    amount: 3200.00,
    status: 'completed',
    account: 'Banco Santander',
  },
  {
    id: '7',
    date: '20/04/2023',
    description: 'Fatura #2023-042 - Empresa DEF',
    type: 'income',
    category: 'Vendas',
    amount: 2800.00,
    status: 'pending',
    account: 'Banco Millennium BCP',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'type',
    label: 'Tipo',
    type: 'select' as const,
    options: [
      { label: 'Receita', value: 'income' },
      { label: 'Despesa', value: 'expense' },
    ],
  },
  {
    name: 'category',
    label: 'Categoria',
    type: 'select' as const,
    options: [
      { label: 'Vendas', value: 'Vendas' },
      { label: 'Fornecedores', value: 'Fornecedores' },
      { label: 'Salários', value: 'Salários' },
      { label: 'Instalações', value: 'Instalações' },
      { label: 'Impostos', value: 'Impostos' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Concluído', value: 'completed' },
      { label: 'Pendente', value: 'pending' },
      { label: 'Cancelado', value: 'cancelled' },
    ],
  },
  {
    name: 'account',
    label: 'Conta',
    type: 'select' as const,
    options: [
      { label: 'Banco Millennium BCP', value: 'Banco Millennium BCP' },
      { label: 'Banco Santander', value: 'Banco Santander' },
    ],
  },
];

export default function FinancialPage() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Handle filter change
  const handleFilterChange = (name: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...transactions];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (transaction) =>
          transaction.description.toLowerCase().includes(term) ||
          transaction.category.toLowerCase().includes(term) ||
          transaction.account.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((transaction) => {
          if (typeof transaction[key as keyof typeof transaction] === 'string') {
            return (transaction[key as keyof typeof transaction] as string).toLowerCase() === value.toLowerCase();
          }
          return transaction[key as keyof typeof transaction] === value;
        });
      }
    });

    setFilteredTransactions(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredTransactions(transactions);
  };

  // Calculate totals
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpense;

  // Table columns
  const columns = [
    {
      header: 'Data',
      accessor: 'date',
    },
    {
      header: 'Descrição',
      accessor: 'description',
    },
    {
      header: 'Categoria',
      accessor: 'category',
    },
    {
      header: 'Conta',
      accessor: 'account',
    },
    {
      header: 'Valor',
      accessor: 'amount',
      cell: (value: number, row: any) => {
        const color = row.type === 'income' ? 'text-green-500' : 'text-red-500';
        const prefix = row.type === 'income' ? '+' : '-';
        return <span className={color}>{prefix}€{value.toFixed(2)}</span>;
      },
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'completed') return <span className="text-green-500">Concluído</span>;
        if (value === 'pending') return <span className="text-yellow-500">Pendente</span>;
        if (value === 'cancelled') return <span className="text-red-500">Cancelado</span>;
        return value;
      },
    },
  ];

  return (
    <>
      <SlideFrame />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Faturamento</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Nova Transação
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Receitas</h3>
            <p className="text-green-500 text-2xl font-bold">€{totalIncome.toFixed(2)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Despesas</h3>
            <p className="text-red-500 text-2xl font-bold">€{totalExpense.toFixed(2)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Saldo</h3>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              €{balance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar transações..."
            className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 pl-10 pr-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
          />
        </div>

        {/* Filters */}
        <FilterPanel
          fields={filterFields}
          values={filterValues}
          onChange={handleFilterChange}
          onApply={applyFilters}
          onReset={resetFilters}
        />

        {/* Transactions table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredTransactions}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <p>a</p>
        </Modal>
      )}
    </>
  );
}