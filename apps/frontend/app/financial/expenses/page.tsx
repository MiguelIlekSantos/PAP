'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { FilterPanel } from '../../components/FilterPanel'
import { Table } from '../../components/Table'
import { Modal } from '../../components/Modal'
import { Plus, Search, TrendingDown, Calendar, Receipt } from 'lucide-react'

// Mock data for expenses
const mockExpenses = [
  {
    id: '1',
    date: '15/03/2023',
    description: 'Fornecedor - Material de Escritório',
    category: 'Material de Escritório',
    amount: 450.00,
    status: 'paid',
    supplier: 'Staples Portugal',
    paymentMethod: 'Transferência Bancária',
    dueDate: '15/03/2023',
  },
  {
    id: '2',
    date: '10/03/2023',
    description: 'Aluguel do Escritório - Março',
    category: 'Instalações',
    amount: 2200.00,
    status: 'paid',
    supplier: 'Imobiliária Central',
    paymentMethod: 'Débito Direto',
    dueDate: '01/03/2023',
  },
  {
    id: '3',
    date: '08/03/2023',
    description: 'Energia Elétrica - Fevereiro',
    category: 'Utilidades',
    amount: 320.50,
    status: 'paid',
    supplier: 'EDP Comercial',
    paymentMethod: 'Débito Direto',
    dueDate: '05/03/2023',
  },
  {
    id: '4',
    date: '05/03/2023',
    description: 'Software de Contabilidade - Licença Anual',
    category: 'Software',
    amount: 1200.00,
    status: 'paid',
    supplier: 'SAGE Portugal',
    paymentMethod: 'Cartão de Crédito',
    dueDate: '05/03/2023',
  },
  {
    id: '5',
    date: '01/03/2023',
    description: 'Combustível - Frota de Veículos',
    category: 'Transporte',
    amount: 680.75,
    status: 'paid',
    supplier: 'Galp Energia',
    paymentMethod: 'Cartão Combustível',
    dueDate: '28/02/2023',
  },
  {
    id: '6',
    date: '25/02/2023',
    description: 'Manutenção de Equipamentos',
    category: 'Manutenção',
    amount: 850.00,
    status: 'pending',
    supplier: 'TechService Lda',
    paymentMethod: 'Transferência Bancária',
    dueDate: '30/03/2023',
  },
  {
    id: '7',
    date: '20/02/2023',
    description: 'Seguro de Responsabilidade Civil',
    category: 'Seguros',
    amount: 1500.00,
    status: 'overdue',
    supplier: 'Fidelidade Seguros',
    paymentMethod: 'Transferência Bancária',
    dueDate: '15/02/2023',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'category',
    label: 'Categoria',
    type: 'select' as const,
    options: [
      { label: 'Material de Escritório', value: 'Material de Escritório' },
      { label: 'Instalações', value: 'Instalações' },
      { label: 'Utilidades', value: 'Utilidades' },
      { label: 'Software', value: 'Software' },
      { label: 'Transporte', value: 'Transporte' },
      { label: 'Manutenção', value: 'Manutenção' },
      { label: 'Seguros', value: 'Seguros' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Pago', value: 'paid' },
      { label: 'Pendente', value: 'pending' },
      { label: 'Em Atraso', value: 'overdue' },
    ],
  },
  {
    name: 'paymentMethod',
    label: 'Método de Pagamento',
    type: 'select' as const,
    options: [
      { label: 'Transferência Bancária', value: 'Transferência Bancária' },
      { label: 'Débito Direto', value: 'Débito Direto' },
      { label: 'Cartão de Crédito', value: 'Cartão de Crédito' },
      { label: 'Cartão Combustível', value: 'Cartão Combustível' },
    ],
  },
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(mockExpenses);
  const [filteredExpenses, setFilteredExpenses] = useState(mockExpenses);
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
    let filtered = [...expenses];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (expense) =>
          expense.description.toLowerCase().includes(term) ||
          expense.category.toLowerCase().includes(term) ||
          expense.supplier.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((expense) => {
          if (typeof expense[key as keyof typeof expense] === 'string') {
            return (expense[key as keyof typeof expense] as string).toLowerCase() === value.toLowerCase();
          }
          return expense[key as keyof typeof expense] === value;
        });
      }
    });

    setFilteredExpenses(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredExpenses(expenses);
  };

  // Calculate totals
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const paidExpenses = filteredExpenses.filter(e => e.status === 'paid').reduce((sum, e) => sum + e.amount, 0);
  const pendingExpenses = filteredExpenses.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);
  const overdueExpenses = filteredExpenses.filter(e => e.status === 'overdue').reduce((sum, e) => sum + e.amount, 0);

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
      header: 'Fornecedor',
      accessor: 'supplier',
    },
    {
      header: 'Valor',
      accessor: 'amount',
      cell: (value: number) => <span className="text-red-500">€{value.toFixed(2)}</span>,
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'paid') return <span className="text-green-500">Pago</span>;
        if (value === 'pending') return <span className="text-yellow-500">Pendente</span>;
        if (value === 'overdue') return <span className="text-red-500">Em Atraso</span>;
        return value;
      },
    },
    {
      header: 'Vencimento',
      accessor: 'dueDate',
    },
  ];

  return (
    <>
      <SlideFrame />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingDown size={32} className="text-red-500" />
            <h1 className="text-3xl font-bold text-white">Despesas</h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Nova Despesa
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total de Despesas</h3>
            <p className="text-red-500 text-2xl font-bold">€{totalExpenses.toFixed(2)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Pagas</h3>
            <p className="text-green-500 text-2xl font-bold">€{paidExpenses.toFixed(2)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Pendentes</h3>
            <p className="text-yellow-500 text-2xl font-bold">€{pendingExpenses.toFixed(2)}</p>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Em Atraso</h3>
            <p className="text-red-500 text-2xl font-bold">€{overdueExpenses.toFixed(2)}</p>
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
            placeholder="Pesquisar despesas..."
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

        {/* Expenses table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredExpenses}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Nova Despesa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Descrição
                </label>
                <input
                  type="text"
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200"
                  placeholder="Descrição da despesa"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Categoria
                </label>
                <select className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200">
                  <option value="">Selecionar categoria</option>
                  <option value="Material de Escritório">Material de Escritório</option>
                  <option value="Instalações">Instalações</option>
                  <option value="Utilidades">Utilidades</option>
                  <option value="Software">Software</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Manutenção">Manutenção</option>
                  <option value="Seguros">Seguros</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Valor
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Fornecedor
                </label>
                <input
                  type="text"
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200"
                  placeholder="Nome do fornecedor"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Data de Vencimento
                </label>
                <input
                  type="date"
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Método de Pagamento
                </label>
                <select className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200">
                  <option value="">Selecionar método</option>
                  <option value="Transferência Bancária">Transferência Bancária</option>
                  <option value="Débito Direto">Débito Direto</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Cartão Combustível">Cartão Combustível</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-violet-700 hover:bg-violet-600 text-white px-6 py-2 rounded-md transition-all duration-200"
              >
                Criar Despesa
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}