'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { FilterPanel } from '../../components/FilterPanel'
import { Table } from '../../components/Table'
import { Modal } from '../../components/Modal'
import { Plus, Search, Calculator, FileText, BarChart3, TrendingUp } from 'lucide-react'

// Mock data for accounting entries
const mockAccountingEntries = [
  {
    id: '1',
    date: '15/03/2023',
    reference: 'LV001',
    description: 'Venda de Produtos - Cliente ABC',
    account: '7111 - Vendas de Mercadorias',
    debit: 0.00,
    credit: 5000.00,
    balance: 5000.00,
    type: 'revenue',
    document: 'Fatura #2023-001',
  },
  {
    id: '2',
    date: '15/03/2023',
    reference: 'LV001',
    description: 'IVA sobre Vendas',
    account: '2432 - IVA Liquidado',
    debit: 0.00,
    credit: 1150.00,
    balance: 1150.00,
    type: 'tax',
    document: 'Fatura #2023-001',
  },
  {
    id: '3',
    date: '15/03/2023',
    reference: 'LV001',
    description: 'Recebimento de Cliente ABC',
    account: '2111 - Clientes c/c',
    debit: 6150.00,
    credit: 0.00,
    balance: 6150.00,
    type: 'receivable',
    document: 'Fatura #2023-001',
  },
  {
    id: '4',
    date: '10/03/2023',
    reference: 'CP001',
    description: 'Compra de Material de Escritório',
    account: '6111 - Compras de Mercadorias',
    debit: 450.00,
    credit: 0.00,
    balance: 450.00,
    type: 'expense',
    document: 'Fatura Fornecedor #F-2023-045',
  },
  {
    id: '5',
    date: '10/03/2023',
    reference: 'CP001',
    description: 'IVA Suportado',
    account: '2431 - IVA Dedutível',
    debit: 103.50,
    credit: 0.00,
    balance: 103.50,
    type: 'tax',
    document: 'Fatura Fornecedor #F-2023-045',
  },
  {
    id: '6',
    date: '10/03/2023',
    reference: 'CP001',
    description: 'Pagamento a Fornecedor',
    account: '2211 - Fornecedores c/c',
    debit: 0.00,
    credit: 553.50,
    balance: 553.50,
    type: 'payable',
    document: 'Fatura Fornecedor #F-2023-045',
  },
  {
    id: '7',
    date: '05/03/2023',
    reference: 'SAL001',
    description: 'Processamento de Salários - Março',
    account: '6411 - Remunerações do Pessoal',
    debit: 12500.00,
    credit: 0.00,
    balance: 12500.00,
    type: 'expense',
    document: 'Folha de Pagamento #03-2023',
  },
  {
    id: '8',
    date: '05/03/2023',
    reference: 'SAL001',
    description: 'Retenções na Fonte - IRS',
    account: '2451 - IRS',
    debit: 0.00,
    credit: 2100.00,
    balance: 2100.00,
    type: 'tax',
    document: 'Folha de Pagamento #03-2023',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'type',
    label: 'Tipo',
    type: 'select' as const,
    options: [
      { label: 'Receita', value: 'revenue' },
      { label: 'Despesa', value: 'expense' },
      { label: 'Imposto', value: 'tax' },
      { label: 'Recebível', value: 'receivable' },
      { label: 'Pagável', value: 'payable' },
    ],
  },
  {
    name: 'account',
    label: 'Conta',
    type: 'select' as const,
    options: [
      { label: '7111 - Vendas de Mercadorias', value: '7111 - Vendas de Mercadorias' },
      { label: '6111 - Compras de Mercadorias', value: '6111 - Compras de Mercadorias' },
      { label: '6411 - Remunerações do Pessoal', value: '6411 - Remunerações do Pessoal' },
      { label: '2111 - Clientes c/c', value: '2111 - Clientes c/c' },
      { label: '2211 - Fornecedores c/c', value: '2211 - Fornecedores c/c' },
      { label: '2431 - IVA Dedutível', value: '2431 - IVA Dedutível' },
      { label: '2432 - IVA Liquidado', value: '2432 - IVA Liquidado' },
      { label: '2451 - IRS', value: '2451 - IRS' },
    ],
  },
];

export default function AccountingPage() {
  const [entries, setEntries] = useState(mockAccountingEntries);
  const [filteredEntries, setFilteredEntries] = useState(mockAccountingEntries);
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
    let filtered = [...entries];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          entry.description.toLowerCase().includes(term) ||
          entry.account.toLowerCase().includes(term) ||
          entry.reference.toLowerCase().includes(term) ||
          entry.document.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((entry) => {
          if (typeof entry[key as keyof typeof entry] === 'string') {
            return (entry[key as keyof typeof entry] as string).toLowerCase() === value.toLowerCase();
          }
          return entry[key as keyof typeof entry] === value;
        });
      }
    });

    setFilteredEntries(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredEntries(entries);
  };

  // Calculate totals
  const totalDebits = filteredEntries.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredits = filteredEntries.reduce((sum, entry) => sum + entry.credit, 0);
  const balance = totalDebits - totalCredits;

  // Table columns
  const columns = [
    {
      header: 'Data',
      accessor: 'date',
    },
    {
      header: 'Referência',
      accessor: 'reference',
    },
    {
      header: 'Descrição',
      accessor: 'description',
    },
    {
      header: 'Conta',
      accessor: 'account',
    },
    {
      header: 'Débito',
      accessor: 'debit',
      cell: (value: number) => value > 0 ? <span className="text-red-400">€{value.toFixed(2)}</span> : <span className="text-gray-500">-</span>,
    },
    {
      header: 'Crédito',
      accessor: 'credit',
      cell: (value: number) => value > 0 ? <span className="text-green-400">€{value.toFixed(2)}</span> : <span className="text-gray-500">-</span>,
    },
    {
      header: 'Documento',
      accessor: 'document',
    },
  ];

  return (
    <>
      <SlideFrame />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calculator size={32} className="text-blue-500" />
            <h1 className="text-3xl font-bold text-white">Contabilidade</h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Novo Lançamento
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total Débitos</h3>
            <p className="text-red-400 text-2xl font-bold">€{totalDebits.toFixed(2)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total Créditos</h3>
            <p className="text-green-400 text-2xl font-bold">€{totalCredits.toFixed(2)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Diferença</h3>
            <p className={`text-2xl font-bold ${balance === 0 ? 'text-blue-400' : balance > 0 ? 'text-red-400' : 'text-green-400'}`}>
              €{Math.abs(balance).toFixed(2)}
            </p>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Lançamentos</h3>
            <p className="text-blue-400 text-2xl font-bold">{filteredEntries.length}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <button className="bg-[#0d1218] border border-gray-800 rounded-lg p-4 hover:border-violet-500 transition-all duration-200 text-left">
            <FileText size={24} className="text-violet-400 mb-2" />
            <h3 className="text-white font-medium">Balancete</h3>
            <p className="text-gray-400 text-sm">Visualizar balancete</p>
          </button>
          
          <button className="bg-[#0d1218] border border-gray-800 rounded-lg p-4 hover:border-violet-500 transition-all duration-200 text-left">
            <BarChart3 size={24} className="text-green-400 mb-2" />
            <h3 className="text-white font-medium">Demonstrações</h3>
            <p className="text-gray-400 text-sm">Relatórios financeiros</p>
          </button>
          
          <button className="bg-[#0d1218] border border-gray-800 rounded-lg p-4 hover:border-violet-500 transition-all duration-200 text-left">
            <TrendingUp size={24} className="text-blue-400 mb-2" />
            <h3 className="text-white font-medium">Análise</h3>
            <p className="text-gray-400 text-sm">Análise de contas</p>
          </button>
          
          <button className="bg-[#0d1218] border border-gray-800 rounded-lg p-4 hover:border-violet-500 transition-all duration-200 text-left">
            <Calculator size={24} className="text-yellow-400 mb-2" />
            <h3 className="text-white font-medium">Reconciliação</h3>
            <p className="text-gray-400 text-sm">Reconciliar contas</p>
          </button>
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
            placeholder="Pesquisar lançamentos..."
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

        {/* Accounting entries table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredEntries}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </div>
      </div>

      {/* Add Entry Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Novo Lançamento Contabilístico</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Data
                </label>
                <input
                  type="date"
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Referência
                </label>
                <input
                  type="text"
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200"
                  placeholder="Ex: LV001, CP001"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Descrição
                </label>
                <input
                  type="text"
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200"
                  placeholder="Descrição do lançamento"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Conta
                </label>
                <select className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200">
                  <option value="">Selecionar conta</option>
                  <option value="7111 - Vendas de Mercadorias">7111 - Vendas de Mercadorias</option>
                  <option value="6111 - Compras de Mercadorias">6111 - Compras de Mercadorias</option>
                  <option value="6411 - Remunerações do Pessoal">6411 - Remunerações do Pessoal</option>
                  <option value="2111 - Clientes c/c">2111 - Clientes c/c</option>
                  <option value="2211 - Fornecedores c/c">2211 - Fornecedores c/c</option>
                  <option value="2431 - IVA Dedutível">2431 - IVA Dedutível</option>
                  <option value="2432 - IVA Liquidado">2432 - IVA Liquidado</option>
                  <option value="2451 - IRS">2451 - IRS</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Tipo
                </label>
                <select className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200">
                  <option value="">Selecionar tipo</option>
                  <option value="revenue">Receita</option>
                  <option value="expense">Despesa</option>
                  <option value="tax">Imposto</option>
                  <option value="receivable">Recebível</option>
                  <option value="payable">Pagável</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Débito
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
                  Crédito
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200"
                  placeholder="0.00"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Documento
                </label>
                <input
                  type="text"
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200"
                  placeholder="Ex: Fatura #2023-001"
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
                Criar Lançamento
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}