'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Nav } from '../components/Nav'
import { DrawerMenu } from '../components/DrawerMenu'
import { FilterPanel } from '../components/FilterPanel'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'
import { Plus, Search, Server, Monitor, Wifi, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { ITTabs } from '../data/tabs'

// Mock data for IT systems
const mockSystems = [
  {
    id: '1',
    name: 'Servidor Principal',
    type: 'Servidor',
    status: 'online',
    uptime: '99.8%',
    lastMaintenance: '15/03/2024',
    nextMaintenance: '15/04/2024',
    responsible: 'João Silva',
    location: 'Data Center A',
    criticality: 'high',
  },
  {
    id: '2',
    name: 'Sistema ERP',
    type: 'Aplicação',
    status: 'online',
    uptime: '99.5%',
    lastMaintenance: '10/03/2024',
    nextMaintenance: '10/04/2024',
    responsible: 'Maria Santos',
    location: 'Cloud AWS',
    criticality: 'high',
  },
  {
    id: '3',
    name: 'Rede WiFi Escritório',
    type: 'Rede',
    status: 'maintenance',
    uptime: '98.2%',
    lastMaintenance: '08/04/2024',
    nextMaintenance: '08/05/2024',
    responsible: 'Carlos Oliveira',
    location: 'Escritório Principal',
    criticality: 'medium',
  },
  {
    id: '4',
    name: 'Backup Server',
    type: 'Servidor',
    status: 'offline',
    uptime: '95.1%',
    lastMaintenance: '01/04/2024',
    nextMaintenance: '01/05/2024',
    responsible: 'Ana Costa',
    location: 'Data Center B',
    criticality: 'medium',
  },
  {
    id: '5',
    name: 'Sistema de Monitoramento',
    type: 'Aplicação',
    status: 'online',
    uptime: '99.9%',
    lastMaintenance: '05/03/2024',
    nextMaintenance: '05/04/2024',
    responsible: 'Pedro Ferreira',
    location: 'Data Center A',
    criticality: 'high',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'type',
    label: 'Tipo',
    type: 'select' as const,
    options: [
      { label: 'Servidor', value: 'Servidor' },
      { label: 'Aplicação', value: 'Aplicação' },
      { label: 'Rede', value: 'Rede' },
      { label: 'Equipamento', value: 'Equipamento' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Online', value: 'online' },
      { label: 'Offline', value: 'offline' },
      { label: 'Manutenção', value: 'maintenance' },
      { label: 'Erro', value: 'error' },
    ],
  },
  {
    name: 'criticality',
    label: 'Criticidade',
    type: 'select' as const,
    options: [
      { label: 'Alta', value: 'high' },
      { label: 'Média', value: 'medium' },
      { label: 'Baixa', value: 'low' },
    ],
  },
];

export default function ITPage() {
  const [systems, setSystems] = useState(mockSystems);
  const [filteredSystems, setFilteredSystems] = useState(mockSystems);
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
    let filtered = [...systems];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (system) =>
          system.name.toLowerCase().includes(term) ||
          system.type.toLowerCase().includes(term) ||
          system.responsible.toLowerCase().includes(term) ||
          system.location.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((system) => {
          if (typeof system[key as keyof typeof system] === 'string') {
            return (system[key as keyof typeof system] as string).toLowerCase() === value.toLowerCase();
          }
          return system[key as keyof typeof system] === value;
        });
      }
    });

    setFilteredSystems(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredSystems(systems);
  };

  // Calculate stats
  const totalSystems = filteredSystems.length;
  const onlineSystems = filteredSystems.filter(s => s.status === 'online').length;
  const offlineSystems = filteredSystems.filter(s => s.status === 'offline').length;
  const maintenanceSystems = filteredSystems.filter(s => s.status === 'maintenance').length;

  // Table columns
  const columns = [
    {
      header: 'Nome do Sistema',
      accessor: 'name',
    },
    {
      header: 'Tipo',
      accessor: 'type',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'online') return <span className="text-green-500">Online</span>;
        if (value === 'offline') return <span className="text-red-500">Offline</span>;
        if (value === 'maintenance') return <span className="text-yellow-500">Manutenção</span>;
        if (value === 'error') return <span className="text-red-500">Erro</span>;
        return value;
      },
    },
    {
      header: 'Uptime',
      accessor: 'uptime',
    },
    {
      header: 'Criticidade',
      accessor: 'criticality',
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
      header: 'Localização',
      accessor: 'location',
    },
    {
      header: 'Próxima Manutenção',
      accessor: 'nextMaintenance',
    },
  ];

  return (
    <>
      <SlideFrame />
      <Nav />
      <DrawerMenu tabs={ITTabs} page="/it" />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Dashboard de TI</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Novo Sistema
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Server size={20} className="text-violet-400" />
              <h3 className="text-gray-400 text-sm">Total de Sistemas</h3>
            </div>
            <p className="text-white text-2xl font-bold">{totalSystems}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle size={20} className="text-green-400" />
              <h3 className="text-gray-400 text-sm">Online</h3>
            </div>
            <p className="text-green-500 text-2xl font-bold">{onlineSystems}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Clock size={20} className="text-yellow-400" />
              <h3 className="text-gray-400 text-sm">Em Manutenção</h3>
            </div>
            <p className="text-yellow-500 text-2xl font-bold">{maintenanceSystems}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle size={20} className="text-red-400" />
              <h3 className="text-gray-400 text-sm">Offline</h3>
            </div>
            <p className="text-red-500 text-2xl font-bold">{offlineSystems}</p>
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
            placeholder="Pesquisar sistemas..."
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

        {/* Systems table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredSystems}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </div>
      </div>

      {/* Add System Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Novo Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields would go here */}
            <p className="text-gray-400 col-span-full">Formulário para adicionar novo sistema de TI</p>
          </div>
        </Modal>
      )}
    </>
  );
}