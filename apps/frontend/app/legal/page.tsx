'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Nav } from '../components/Nav'
import { DrawerMenu } from '../components/DrawerMenu'
import { FilterPanel } from '../components/FilterPanel'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'
import { Plus, Search, Scale, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { LegalTabs } from '../data/tabs'

// Mock data for legal matters
const mockLegalMatters = [
  {
    id: '1',
    title: 'Contrato de Fornecimento - Empresa ABC',
    type: 'Contrato',
    category: 'Fornecimento',
    status: 'active',
    priority: 'medium',
    startDate: '01/01/2024',
    endDate: '31/12/2024',
    value: 50000.00,
    responsible: 'Ana Costa',
    nextReview: '01/07/2024',
  },
  {
    id: '2',
    title: 'Processo Trabalhista - João Silva',
    type: 'Processo',
    category: 'Trabalhista',
    status: 'pending',
    priority: 'high',
    startDate: '15/02/2024',
    endDate: '',
    value: 0,
    responsible: 'Carlos Mendes',
    nextReview: '20/04/2024',
  },
  {
    id: '3',
    title: 'Auditoria Fiscal - IVA 2023',
    type: 'Auditoria',
    category: 'Fiscal',
    status: 'completed',
    priority: 'high',
    startDate: '01/03/2024',
    endDate: '15/03/2024',
    value: 0,
    responsible: 'Maria Santos',
    nextReview: '',
  },
  {
    id: '4',
    title: 'Acordo de Confidencialidade - Cliente XYZ',
    type: 'Acordo',
    category: 'Confidencialidade',
    status: 'active',
    priority: 'low',
    startDate: '10/01/2024',
    endDate: '10/01/2027',
    value: 0,
    responsible: 'Ana Costa',
    nextReview: '10/01/2025',
  },
  {
    id: '5',
    title: 'Compliance RGPD - Revisão Anual',
    type: 'Compliance',
    category: 'Proteção de Dados',
    status: 'in_progress',
    priority: 'medium',
    startDate: '01/04/2024',
    endDate: '30/04/2024',
    value: 0,
    responsible: 'Pedro Ferreira',
    nextReview: '01/04/2025',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'type',
    label: 'Tipo',
    type: 'select' as const,
    options: [
      { label: 'Contrato', value: 'Contrato' },
      { label: 'Processo', value: 'Processo' },
      { label: 'Auditoria', value: 'Auditoria' },
      { label: 'Acordo', value: 'Acordo' },
      { label: 'Compliance', value: 'Compliance' },
    ],
  },
  {
    name: 'category',
    label: 'Categoria',
    type: 'select' as const,
    options: [
      { label: 'Fornecimento', value: 'Fornecimento' },
      { label: 'Trabalhista', value: 'Trabalhista' },
      { label: 'Fiscal', value: 'Fiscal' },
      { label: 'Confidencialidade', value: 'Confidencialidade' },
      { label: 'Proteção de Dados', value: 'Proteção de Dados' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Ativo', value: 'active' },
      { label: 'Pendente', value: 'pending' },
      { label: 'Em Progresso', value: 'in_progress' },
      { label: 'Concluído', value: 'completed' },
      { label: 'Cancelado', value: 'cancelled' },
    ],
  },
  {
    name: 'priority',
    label: 'Prioridade',
    type: 'select' as const,
    options: [
      { label: 'Alta', value: 'high' },
      { label: 'Média', value: 'medium' },
      { label: 'Baixa', value: 'low' },
    ],
  },
];

export default function LegalPage() {
  const [legalMatters, setLegalMatters] = useState(mockLegalMatters);
  const [filteredMatters, setFilteredMatters] = useState(mockLegalMatters);
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
    let filtered = [...legalMatters];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (matter) =>
          matter.title.toLowerCase().includes(term) ||
          matter.type.toLowerCase().includes(term) ||
          matter.category.toLowerCase().includes(term) ||
          matter.responsible.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((matter) => {
          if (typeof matter[key as keyof typeof matter] === 'string') {
            return (matter[key as keyof typeof matter] as string).toLowerCase() === value.toLowerCase();
          }
          return matter[key as keyof typeof matter] === value;
        });
      }
    });

    setFilteredMatters(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredMatters(legalMatters);
  };

  // Calculate stats
  const totalMatters = filteredMatters.length;
  const activeMatters = filteredMatters.filter(m => m.status === 'active').length;
  const pendingMatters = filteredMatters.filter(m => m.status === 'pending').length;
  const highPriorityMatters = filteredMatters.filter(m => m.priority === 'high').length;

  // Table columns
  const columns = [
    {
      header: 'Título',
      accessor: 'title',
    },
    {
      header: 'Tipo',
      accessor: 'type',
    },
    {
      header: 'Categoria',
      accessor: 'category',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'active') return <span className="text-green-500">Ativo</span>;
        if (value === 'pending') return <span className="text-yellow-500">Pendente</span>;
        if (value === 'in_progress') return <span className="text-blue-500">Em Progresso</span>;
        if (value === 'completed') return <span className="text-gray-500">Concluído</span>;
        if (value === 'cancelled') return <span className="text-red-500">Cancelado</span>;
        return value;
      },
    },
    {
      header: 'Prioridade',
      accessor: 'priority',
      cell: (value: string) => {
        if (value === 'high') return <span className="text-red-500">Alta</span>;
        if (value === 'medium') return <span className="text-yellow-500">Média</span>;
        if (value === 'low') return <span className="text-green-500">Baixa</span>;
        return value;
      },
    },
    {
      header: 'Responsável',
      accessor: 'responsible',
    },
    {
      header: 'Próxima Revisão',
      accessor: 'nextReview',
    },
    {
      header: 'Valor',
      accessor: 'value',
      cell: (value: number) => value > 0 ? `€${value.toFixed(2)}` : '-',
    },
  ];

  return (
    <>
      <SlideFrame />
      <Nav />
      <DrawerMenu tabs={LegalTabs} page="/legal" />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Dashboard Jurídico</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Nova Questão Legal
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Scale size={20} className="text-violet-400" />
              <h3 className="text-gray-400 text-sm">Total de Questões</h3>
            </div>
            <p className="text-white text-2xl font-bold">{totalMatters}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle size={20} className="text-green-400" />
              <h3 className="text-gray-400 text-sm">Ativas</h3>
            </div>
            <p className="text-green-500 text-2xl font-bold">{activeMatters}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Clock size={20} className="text-yellow-400" />
              <h3 className="text-gray-400 text-sm">Pendentes</h3>
            </div>
            <p className="text-yellow-500 text-2xl font-bold">{pendingMatters}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle size={20} className="text-red-400" />
              <h3 className="text-gray-400 text-sm">Alta Prioridade</h3>
            </div>
            <p className="text-red-500 text-2xl font-bold">{highPriorityMatters}</p>
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
            placeholder="Pesquisar questões legais..."
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

        {/* Legal matters table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredMatters}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </div>
      </div>

      {/* Add Legal Matter Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Nova Questão Legal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields would go here */}
            <p className="text-gray-400 col-span-full">Formulário para adicionar nova questão legal</p>
          </div>
        </Modal>
      )}
    </>
  );
}