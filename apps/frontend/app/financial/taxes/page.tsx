'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { FilterPanel } from '../../components/FilterPanel'
import { Table } from '../../components/Table'
import { Modal } from '../../components/Modal'
import { Plus, Search, Receipt, Calendar, AlertTriangle, CheckCircle } from 'lucide-react'

// Mock data for tax obligations
const mockTaxObligations = [
  {
    id: '1',
    taxType: 'IVA',
    period: 'Março 2023',
    dueDate: '20/04/2023',
    amount: 3250.00,
    status: 'paid',
    paymentDate: '18/04/2023',
    reference: 'IVA-2023-03',
    description: 'Declaração Periódica de IVA - Março 2023',
    penalty: 0.00,
  },
  {
    id: '2',
    taxType: 'IRS',
    period: 'Março 2023',
    dueDate: '20/04/2023',
    amount: 2100.00,
    status: 'paid',
    paymentDate: '19/04/2023',
    reference: 'IRS-2023-03',
    description: 'Retenções na Fonte - Março 2023',
    penalty: 0.00,
  },
  {
    id: '3',
    taxType: 'Segurança Social',
    period: 'Março 2023',
    dueDate: '15/04/2023',
    amount: 1850.00,
    status: 'paid',
    paymentDate: '14/04/2023',
    reference: 'SS-2023-03',
    description: 'Contribuições para a Segurança Social - Março 2023',
    penalty: 0.00,
  },
  {
    id: '4',
    taxType: 'IVA',
    period: 'Abril 2023',
    dueDate: '20/05/2023',
    amount: 2890.00,
    status: 'pending',
    paymentDate: null,
    reference: 'IVA-2023-04',
    description: 'Declaração Periódica de IVA - Abril 2023',
    penalty: 0.00,
  },
  {
    id: '5',
    taxType: 'IRS',
    period: 'Abril 2023',
    dueDate: '20/05/2023',
    amount: 2250.00,
    status: 'pending',
    paymentDate: null,
    reference: 'IRS-2023-04',
    description: 'Retenções na Fonte - Abril 2023',
    penalty: 0.00,
  },
  {
    id: '6',
    taxType: 'IRC',
    period: 'Anual 2022',
    dueDate: '31/05/2023',
    amount: 15000.00,
    status: 'overdue',
    paymentDate: null,
    reference: 'IRC-2022',
    description: 'Imposto sobre o Rendimento das Pessoas Coletivas - 2022',
    penalty: 750.00,
  },
  {
    id: '7',
    taxType: 'Segurança Social',
    period: 'Abril 2023',
    dueDate: '15/05/2023',
    amount: 1920.00,
    status: 'pending',
    paymentDate: null,
    reference: 'SS-2023-04',
    description: 'Contribuições para a Segurança Social - Abril 2023',
    penalty: 0.00,
  },
];

// Filter fields
const filterFields = [
  {
    name: 'taxType',
    label: 'Tipo de Imposto',
    type: 'select' as const,
    options: [
      { label: 'IVA', value: 'IVA' },
      { label: 'IRS', value: 'IRS' },
      { label: 'IRC', value: 'IRC' },
      { label: 'Segurança Social', value: 'Segurança Social' },
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
];

export default function TaxesPage() {
  const [taxes, setTaxes] = useState(mockTaxObligations);
  const [filteredTaxes, setFilteredTaxes] = useState(mockTaxObligations);
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
    let filtered = [...taxes];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (tax) =>
          tax.description.toLowerCase().includes(term) ||
          tax.taxType.toLowerCase().includes(term) ||
          tax.reference.toLowerCase().includes(term) ||
          tax.period.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((tax) => {
          if (typeof tax[key as keyof typeof tax] === 'string') {
            return (tax[key as keyof typeof tax] as string).toLowerCase() === value.toLowerCase();
          }
          return tax[key as keyof typeof tax] === value;
        });
      }
    });

    setFilteredTaxes(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredTaxes(taxes);
  };

  // Calculate totals
  const totalTaxes = filteredTaxes.reduce((sum, tax) => sum + tax.amount, 0);
  const paidTaxes = filteredTaxes.filter(t => t.status === 'paid').reduce((sum, t) => sum + t.amount, 0);
  const pendingTaxes = filteredTaxes.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);
  const overdueTaxes = filteredTaxes.filter(t => t.status === 'overdue').reduce((sum, t) => sum + t.amount + t.penalty, 0);
  const totalPenalties = filteredTaxes.reduce((sum, tax) => sum + tax.penalty, 0);

  // Table columns
  const columns = [
    {
      header: 'Tipo',
      accessor: 'taxType',
    },
    {
      header: 'Período',
      accessor: 'period',
    },
    {
      header: 'Descrição',
      accessor: 'description',
    },
    {
      header: 'Vencimento',
      accessor: 'dueDate',
    },
    {
      header: 'Valor',
      accessor: 'amount',
      cell: (value: number) => <span className="text-red-400">€{value.toFixed(2)}</span>,
    },
    {
      header: 'Multa',
      accessor: 'penalty',
      cell: (value: number) => value > 0 ? <span className="text-red-500">€{value.toFixed(2)}</span> : <span className="text-gray-500">-</span>,
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'paid') return <span className="text-green-500 flex items-center gap-1"><CheckCircle size={16} />Pago</span>;
        if (value === 'pending') return <span className="text-yellow-500 flex items-center gap-1"><Calendar size={16} />Pendente</span>;
        if (value === 'overdue') return <span className="text-red-500 flex items-center gap-1"><AlertTriangle size={16} />Em Atraso</span>;
        return value;
      },
    },
    {
      header: 'Referência',
      accessor: 'reference',
    },
  ];

  return (
    <>
      <SlideFrame />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Receipt size={32} className="text-yellow-500" />
            <h1 className="text-3xl font-bold text-white">Impostos</h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Nova Obrigação
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total de Impostos</h3>
            <p className="text-red-400 text-2xl font-bold">€{totalTaxes.toFixed(2)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Pagos</h3>
            <p className="text-green-500 text-2xl font-bold">€{paidTaxes.toFixed(2)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Pendentes</h3>
            <p className="text-yellow-500 text-2xl font-bold">€{pendingTaxes.toFixed(2)}</p>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Em Atraso</h3>
            <p className="text-red-500 text-2xl font-bold">€{overdueTaxes.toFixed(2)}</p>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Multas</h3>
            <p className="text-red-500 text-2xl font-bold">€{totalPenalties.toFixed(2)}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <button className="bg-[#0d1218] border border-gray-800 rounded-lg p-4 hover:border-violet-500 transition-all duration-200 text-left">
            <Receipt size={24} className="text-blue-400 mb-2" />
            <h3 className="text-white font-medium">Declaração IVA</h3>
            <p className="text-gray-400 text-sm">Gerar declaração periódica</p>
          </button>
          
          <button className="bg-[#0d1218] border border-gray-800 rounded-lg p-4 hover:border-violet-500 transition-all duration-200 text-left">
            <Calendar size={24} className="text-green-400 mb-2" />
            <h3 className="text-white font-medium">Calendário Fiscal</h3>
            <p className="text-gray-400 text-sm">Ver próximos vencimentos</p>
          </button>
          
          <button className="bg-[#0d1218] border border-gray-800 rounded-lg p-4 hover:border-violet-500 transition-all duration-200 text-left">
            <AlertTriangle size={24} className="text-yellow-400 mb-2" />
            <h3 className="text-white font-medium">Alertas</h3>
            <p className="text-gray-400 text-sm">Configurar lembretes</p>
          </button>
          
          <button className="bg-[#0d1218] border border-gray-800 rounded-lg p-4 hover:border-violet-500 transition-all duration-200 text-left">
            <CheckCircle size={24} className="text-purple-400 mb-2" />
            <h3 className="text-white font-medium">Compliance</h3>
            <p className="text-gray-400 text-sm">Verificar conformidade</p>
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
            placeholder="Pesquisar obrigações fiscais..."
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

        {/* Tax obligations table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredTaxes}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </div>
      </div>

      {/* Add Tax Obligation Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Nova Obrigação Fiscal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Tipo de Imposto
                </label>
                <select className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200">
                  <option value="">Selecionar tipo</option>
                  <option value="IVA">IVA</option>
                  <option value="IRS">IRS</option>
                  <option value="IRC">IRC</option>
                  <option value="Segurança Social">Segurança Social</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Período
                </label>
                <input
                  type="text"
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200"
                  placeholder="Ex: Março 2023, Anual 2022"
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
                  Referência
                </label>
                <input
                  type="text"
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200"
                  placeholder="Ex: IVA-2023-03"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Status
                </label>
                <select className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200">
                  <option value="">Selecionar status</option>
                  <option value="pending">Pendente</option>
                  <option value="paid">Pago</option>
                  <option value="overdue">Em Atraso</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Descrição
                </label>
                <textarea
                  rows={3}
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 resize-none"
                  placeholder="Descrição da obrigação fiscal"
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
                Criar Obrigação
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}