'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Nav } from '../components/Nav'
import { DrawerMenu } from '../components/DrawerMenu'
import { FilterPanel } from '../components/FilterPanel'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'
import { Plus, Search, BarChart3, Download, Calendar, TrendingUp } from 'lucide-react'
import { ReportsTabs } from '../data/tabs'

// Mock data for reports
const mockReports = [
  {
    id: '1',
    name: 'Relatório Financeiro Mensal - Março 2024',
    type: 'Financeiro',
    category: 'Mensal',
    status: 'completed',
    createdDate: '01/04/2024',
    lastRun: '01/04/2024',
    nextRun: '01/05/2024',
    format: 'PDF',
    size: '2.3 MB',
    downloads: 45,
    author: 'Sistema Automático',
  },
  {
    id: '2',
    name: 'Análise de Vendas por Produto - Q1 2024',
    type: 'Vendas',
    category: 'Trimestral',
    status: 'completed',
    createdDate: '31/03/2024',
    lastRun: '31/03/2024',
    nextRun: '30/06/2024',
    format: 'Excel',
    size: '1.8 MB',
    downloads: 23,
    author: 'Maria Santos',
  },
  {
    id: '3',
    name: 'Inventário de Estoque - Semanal',
    type: 'Inventário',
    category: 'Semanal',
    status: 'scheduled',
    createdDate: '15/03/2024',
    lastRun: '08/04/2024',
    nextRun: '15/04/2024',
    format: 'PDF',
    size: '950 KB',
    downloads: 67,
    author: 'João Silva',
  },
  {
    id: '4',
    name: 'Relatório de Performance de Funcionários',
    type: 'RH',
    category: 'Mensal',
    status: 'in_progress',
    createdDate: '01/04/2024',
    lastRun: '',
    nextRun: '01/05/2024',
    format: 'PDF',
    size: '',
    downloads: 0,
    author: 'Ana Costa',
  },
  {
    id: '5',
    name: 'Dashboard Executivo - Indicadores Chave',
    type: 'Executivo',
    category: 'Diário',
    status: 'completed',
    createdDate: '10/04/2024',
    lastRun: '10/04/2024',
    nextRun: '11/04/2024',
    format: 'Dashboard',
    size: '',
    downloads: 156,
    author: 'Sistema Automático',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'type',
    label: 'Tipo de Relatório',
    type: 'select' as const,
    options: [
      { label: 'Financeiro', value: 'Financeiro' },
      { label: 'Vendas', value: 'Vendas' },
      { label: 'Inventário', value: 'Inventário' },
      { label: 'RH', value: 'RH' },
      { label: 'Executivo', value: 'Executivo' },
    ],
  },
  {
    name: 'category',
    label: 'Frequência',
    type: 'select' as const,
    options: [
      { label: 'Diário', value: 'Diário' },
      { label: 'Semanal', value: 'Semanal' },
      { label: 'Mensal', value: 'Mensal' },
      { label: 'Trimestral', value: 'Trimestral' },
      { label: 'Anual', value: 'Anual' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Concluído', value: 'completed' },
      { label: 'Agendado', value: 'scheduled' },
      { label: 'Em Progresso', value: 'in_progress' },
      { label: 'Erro', value: 'error' },
    ],
  },
  {
    name: 'format',
    label: 'Formato',
    type: 'select' as const,
    options: [
      { label: 'PDF', value: 'PDF' },
      { label: 'Excel', value: 'Excel' },
      { label: 'Dashboard', value: 'Dashboard' },
      { label: 'CSV', value: 'CSV' },
    ],
  },
];

export default function ReportsPage() {
  const [reports, setReports] = useState(mockReports);
  const [filteredReports, setFilteredReports] = useState(mockReports);
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
    let filtered = [...reports];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (report) =>
          report.name.toLowerCase().includes(term) ||
          report.type.toLowerCase().includes(term) ||
          report.category.toLowerCase().includes(term) ||
          report.author.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((report) => {
          if (typeof report[key as keyof typeof report] === 'string') {
            return (report[key as keyof typeof report] as string).toLowerCase() === value.toLowerCase();
          }
          return report[key as keyof typeof report] === value;
        });
      }
    });

    setFilteredReports(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredReports(reports);
  };

  // Calculate stats
  const totalReports = filteredReports.length;
  const completedReports = filteredReports.filter(r => r.status === 'completed').length;
  const scheduledReports = filteredReports.filter(r => r.status === 'scheduled').length;
  const totalDownloads = filteredReports.reduce((sum, r) => sum + r.downloads, 0);

  // Table columns
  const columns = [
    {
      header: 'Nome do Relatório',
      accessor: 'name',
    },
    {
      header: 'Tipo',
      accessor: 'type',
    },
    {
      header: 'Frequência',
      accessor: 'category',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'completed') return <span className="text-green-500">Concluído</span>;
        if (value === 'scheduled') return <span className="text-blue-500">Agendado</span>;
        if (value === 'in_progress') return <span className="text-yellow-500">Em Progresso</span>;
        if (value === 'error') return <span className="text-red-500">Erro</span>;
        return value;
      },
    },
    {
      header: 'Formato',
      accessor: 'format',
    },
    {
      header: 'Última Execução',
      accessor: 'lastRun',
    },
    {
      header: 'Próxima Execução',
      accessor: 'nextRun',
    },
    {
      header: 'Downloads',
      accessor: 'downloads',
    },
    {
      header: 'Ações',
      accessor: 'id',
      cell: (value: string, row: any) => (
        <div className="flex gap-2">
          {row.status === 'completed' && (
            <button className="text-green-400 hover:text-green-300" title="Download">
              <Download size={16} />
            </button>
          )}
          <button className="text-blue-400 hover:text-blue-300" title="Visualizar">
            <BarChart3 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <SlideFrame />
      <Nav />
      <DrawerMenu tabs={ReportsTabs} page="/reports" />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Dashboard de Relatórios</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Novo Relatório
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 size={20} className="text-violet-400" />
              <h3 className="text-gray-400 text-sm">Total de Relatórios</h3>
            </div>
            <p className="text-white text-2xl font-bold">{totalReports}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={20} className="text-green-400" />
              <h3 className="text-gray-400 text-sm">Concluídos</h3>
            </div>
            <p className="text-green-500 text-2xl font-bold">{completedReports}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar size={20} className="text-blue-400" />
              <h3 className="text-gray-400 text-sm">Agendados</h3>
            </div>
            <p className="text-blue-500 text-2xl font-bold">{scheduledReports}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Download size={20} className="text-yellow-400" />
              <h3 className="text-gray-400 text-sm">Total Downloads</h3>
            </div>
            <p className="text-yellow-500 text-2xl font-bold">{totalDownloads}</p>
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
            placeholder="Pesquisar relatórios..."
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

        {/* Reports table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredReports}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </div>
      </div>

      {/* Add Report Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Novo Relatório</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields would go here */}
            <p className="text-gray-400 col-span-full">Formulário para criar novo relatório</p>
          </div>
        </Modal>
      )}
    </>
  );
}