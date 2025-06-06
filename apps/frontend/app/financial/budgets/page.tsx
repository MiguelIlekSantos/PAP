'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { FilterPanel } from '../../components/FilterPanel'
import { Table } from '../../components/Table'
import { Modal } from '../../components/Modal'
import { Plus, Search, Target, TrendingUp, AlertTriangle } from 'lucide-react'

// Mock data for budgets
const mockBudgets = [
  {
    id: '1',
    name: 'Orçamento Marketing Q1 2023',
    category: 'Marketing',
    totalBudget: 15000.00,
    spent: 8500.00,
    remaining: 6500.00,
    period: 'Q1 2023',
    status: 'active',
    startDate: '01/01/2023',
    endDate: '31/03/2023',
    department: 'Marketing',
  },
  {
    id: '2',
    name: 'Orçamento TI - Infraestrutura',
    category: 'Tecnologia',
    totalBudget: 25000.00,
    spent: 22000.00,
    remaining: 3000.00,
    period: 'Anual 2023',
    status: 'active',
    startDate: '01/01/2023',
    endDate: '31/12/2023',
    department: 'TI',
  },
  {
    id: '3',
    name: 'Orçamento Recursos Humanos',
    category: 'Recursos Humanos',
    totalBudget: 120000.00,
    spent: 45000.00,
    remaining: 75000.00,
    period: 'Anual 2023',
    status: 'active',
    startDate: '01/01/2023',
    endDate: '31/12/2023',
    department: 'RH',
  },
  {
    id: '4',
    name: 'Orçamento Operacional Q4 2022',
    category: 'Operações',
    totalBudget: 50000.00,
    spent: 50000.00,
    remaining: 0.00,
    period: 'Q4 2022',
    status: 'completed',
    startDate: '01/10/2022',
    endDate: '31/12/2022',
    department: 'Operações',
  },
  {
    id: '5',
    name: 'Orçamento Vendas Q1 2023',
    category: 'Vendas',
    totalBudget: 30000.00,
    spent: 32000.00,
    remaining: -2000.00,
    period: 'Q1 2023',
    status: 'exceeded',
    startDate: '01/01/2023',
    endDate: '31/03/2023',
    department: 'Vendas',
  },
  {
    id: '6',
    name: 'Orçamento Manutenção Equipamentos',
    category: 'Manutenção',
    totalBudget: 8000.00,
    spent: 3200.00,
    remaining: 4800.00,
    period: 'Semestral 2023',
    status: 'active',
    startDate: '01/01/2023',
    endDate: '30/06/2023',
    department: 'Manutenção',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'category',
    label: 'Categoria',
    type: 'select' as const,
    options: [
      { label: 'Marketing', value: 'Marketing' },
      { label: 'Tecnologia', value: 'Tecnologia' },
      { label: 'Recursos Humanos', value: 'Recursos Humanos' },
      { label: 'Operações', value: 'Operações' },
      { label: 'Vendas', value: 'Vendas' },
      { label: 'Manutenção', value: 'Manutenção' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Ativo', value: 'active' },
      { label: 'Concluído', value: 'completed' },
      { label: 'Excedido', value: 'exceeded' },
    ],
  },
  {
    name: 'department',
    label: 'Departamento',
    type: 'select' as const,
    options: [
      { label: 'Marketing', value: 'Marketing' },
      { label: 'TI', value: 'TI' },
      { label: 'RH', value: 'RH' },
      { label: 'Operações', value: 'Operações' },
      { label: 'Vendas', value: 'Vendas' },
      { label: 'Manutenção', value: 'Manutenção' },
    ],
  },
];

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState(mockBudgets);
  const [filteredBudgets, setFilteredBudgets] = useState(mockBudgets);
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
    let filtered = [...budgets];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (budget) =>
          budget.name.toLowerCase().includes(term) ||
          budget.category.toLowerCase().includes(term) ||
          budget.department.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((budget) => {
          if (typeof budget[key as keyof typeof budget] === 'string') {
            return (budget[key as keyof typeof budget] as string).toLowerCase() === value.toLowerCase();
          }
          return budget[key as keyof typeof budget] === value;
        });
      }
    });

    setFilteredBudgets(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredBudgets(budgets);
  };

  // Calculate totals
  const totalBudget = filteredBudgets.reduce((sum, budget) => sum + budget.totalBudget, 0);
  const totalSpent = filteredBudgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = filteredBudgets.reduce((sum, budget) => sum + budget.remaining, 0);
  const activeBudgets = filteredBudgets.filter(b => b.status === 'active').length;

  // Table columns
  const columns = [
    {
      header: 'Nome do Orçamento',
      accessor: 'name',
    },
    {
      header: 'Categoria',
      accessor: 'category',
    },
    {
      header: 'Departamento',
      accessor: 'department',
    },
    {
      header: 'Orçamento Total',
      accessor: 'totalBudget',
      cell: (value: number) => <span className="text-blue-400">€{value.toFixed(2)}</span>,
    },
    {
      header: 'Gasto',
      accessor: 'spent',
      cell: (value: number) => <span className="text-red-400">€{value.toFixed(2)}</span>,
    },
    {
      header: 'Restante',
      accessor: 'remaining',
      cell: (value: number, row: any) => {
        const color = value >= 0 ? 'text-green-400' : 'text-red-500';
        return <span className={color}>€{value.toFixed(2)}</span>;
      },
    },
    {
      header: 'Progresso',
      accessor: 'progress',
      cell: (value: any, row: any) => {
        const percentage = (row.spent / row.totalBudget) * 100;
        const color = percentage > 100 ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500';
        return (
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${color}`} 
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
        );
      },
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'active') return <span className="text-green-500">Ativo</span>;
        if (value === 'completed') return <span className="text-blue-500">Concluído</span>;
        if (value === 'exceeded') return <span className="text-red-500">Excedido</span>;
        return value;
      },
    },
    {
      header: 'Período',
      accessor: 'period',
    },
  ];

  return (
    <>
      <SlideFrame />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Target size={32} className="text-blue-500" />
            <h1 className="text-3xl font-bold text-white">Orçamentos</h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Novo Orçamento
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Orçamento Total</h3>
            <p className="text-blue-400 text-2xl font-bold">€{totalBudget.toFixed(2)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total Gasto</h3>
            <p className="text-red-400 text-2xl font-bold">€{totalSpent.toFixed(2)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total Restante</h3>
            <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-green-400' : 'text-red-500'}`}>
              €{totalRemaining.toFixed(2)}
            </p>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Orçamentos Ativos</h3>
            <p className="text-green-400 text-2xl font-bold">{activeBudgets}</p>
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
            placeholder="Pesquisar orçamentos..."
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

        {/* Budgets table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredBudgets}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </div>
      </div>

      {/* Add Budget Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Novo Orçamento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Nome do Orçamento
                </label>
                <input
                  type="text"
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200"
                  placeholder="Nome do orçamento"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Categoria
                </label>
                <select className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200">
                  <option value="">Selecionar categoria</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Recursos Humanos">Recursos Humanos</option>
                  <option value="Operações">Operações</option>
                  <option value="Vendas">Vendas</option>
                  <option value="Manutenção">Manutenção</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Departamento
                </label>
                <select className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200">
                  <option value="">Selecionar departamento</option>
                  <option value="Marketing">Marketing</option>
                  <option value="TI">TI</option>
                  <option value="RH">RH</option>
                  <option value="Operações">Operações</option>
                  <option value="Vendas">Vendas</option>
                  <option value="Manutenção">Manutenção</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Orçamento Total
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
                  Data de Início
                </label>
                <input
                  type="date"
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Data de Fim
                </label>
                <input
                  type="date"
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Período
                </label>
                <input
                  type="text"
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200"
                  placeholder="Ex: Q1 2023, Anual 2023, etc."
                />
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
                Criar Orçamento
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}