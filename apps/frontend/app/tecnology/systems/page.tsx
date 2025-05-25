'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { Nav } from '../../components/Nav'
import { FilterPanel } from '../../components/FilterPanel'
import { Table } from '../../components/Table'
import { Modal } from '../../components/Modal'
import { Plus, Search, ArrowLeft, Server, Database, Cloud, Code, Settings, AlertTriangle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

// Mock data for systems
const mockSystems = [
  {
    id: '1',
    name: 'Sistema ERP',
    type: 'internal',
    version: '3.5.2',
    status: 'online',
    lastUpdate: '15/03/2023',
    nextUpdate: '15/06/2023',
    environment: 'production',
    technology: 'Java / Spring Boot',
    database: 'PostgreSQL',
    server: 'AWS EC2',
    maintainer: 'Equipe de Desenvolvimento',
    url: 'https://erp.techwave.pt',
    description: 'Sistema de gestão empresarial integrado',
  },
  {
    id: '2',
    name: 'Sistema CRM',
    type: 'internal',
    version: '2.1.0',
    status: 'degraded',
    lastUpdate: '10/02/2023',
    nextUpdate: '10/05/2023',
    environment: 'production',
    technology: 'PHP / Laravel',
    database: 'MySQL',
    server: 'AWS EC2',
    maintainer: 'Equipe de Desenvolvimento',
    url: 'https://crm.techwave.pt',
    description: 'Sistema de gestão de relacionamento com clientes',
  },
  {
    id: '3',
    name: 'Website Corporativo',
    type: 'external',
    version: '4.0.1',
    status: 'online',
    lastUpdate: '05/03/2023',
    nextUpdate: '05/06/2023',
    environment: 'production',
    technology: 'React / Next.js',
    database: 'N/A',
    server: 'Vercel',
    maintainer: 'Equipe de Marketing',
    url: 'https://techwave.pt',
    description: 'Website principal da empresa',
  },
  {
    id: '4',
    name: 'Portal de Clientes',
    type: 'external',
    version: '1.8.3',
    status: 'online',
    lastUpdate: '20/02/2023',
    nextUpdate: '20/05/2023',
    environment: 'production',
    technology: 'Angular',
    database: 'MongoDB',
    server: 'AWS EC2',
    maintainer: 'Equipe de Desenvolvimento',
    url: 'https://portal.techwave.pt',
    description: 'Portal de acesso para clientes',
  },
  {
    id: '5',
    name: 'Sistema de Helpdesk',
    type: 'internal',
    version: '2.4.5',
    status: 'online',
    lastUpdate: '01/03/2023',
    nextUpdate: '01/06/2023',
    environment: 'production',
    technology: 'Python / Django',
    database: 'PostgreSQL',
    server: 'AWS EC2',
    maintainer: 'Equipe de Suporte',
    url: 'https://helpdesk.techwave.pt',
    description: 'Sistema de gestão de tickets de suporte',
  },
  {
    id: '6',
    name: 'Ambiente de Testes',
    type: 'internal',
    version: 'N/A',
    status: 'offline',
    lastUpdate: '10/03/2023',
    nextUpdate: 'N/A',
    environment: 'testing',
    technology: 'Diversos',
    database: 'Diversos',
    server: 'AWS EC2',
    maintainer: 'Equipe de QA',
    url: 'https://test.techwave.pt',
    description: 'Ambiente de testes para novos desenvolvimentos',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'type',
    label: 'Tipo',
    type: 'select' as const,
    options: [
      { label: 'Interno', value: 'internal' },
      { label: 'Externo', value: 'external' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Online', value: 'online' },
      { label: 'Degradado', value: 'degraded' },
      { label: 'Offline', value: 'offline' },
    ],
  },
  {
    name: 'environment',
    label: 'Ambiente',
    type: 'select' as const,
    options: [
      { label: 'Produção', value: 'production' },
      { label: 'Testes', value: 'testing' },
      { label: 'Desenvolvimento', value: 'development' },
    ],
  },
];

export default function SystemsPage() {
  const [systems, setSystems] = useState(mockSystems);
  const [filteredSystems, setFilteredSystems] = useState(mockSystems);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSystemModal, setShowSystemModal] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<any>(null);

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
          system.technology.toLowerCase().includes(term) ||
          system.database.toLowerCase().includes(term) ||
          system.server.toLowerCase().includes(term) ||
          system.description.toLowerCase().includes(term)
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

  // Handle system click
  const handleSystemClick = (system: any) => {
    setSelectedSystem(system);
    setShowSystemModal(true);
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'degraded':
        return 'Degradado';
      case 'offline':
        return 'Offline';
      default:
        return status;
    }
  };

  // Table columns
  const columns = [
    {
      header: 'Nome',
      accessor: 'name',
    },
    {
      header: 'Tipo',
      accessor: 'type',
      cell: (value: string) => value === 'internal' ? 'Interno' : 'Externo',
    },
    {
      header: 'Versão',
      accessor: 'version',
    },
    {
      header: 'Ambiente',
      accessor: 'environment',
      cell: (value: string) => {
        if (value === 'production') return 'Produção';
        if (value === 'testing') return 'Testes';
        if (value === 'development') return 'Desenvolvimento';
        return value;
      },
    },
    {
      header: 'Tecnologia',
      accessor: 'technology',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => (
        <span className={`${getStatusBadgeColor(value)} text-white text-xs px-2 py-1 rounded-full`}>
          {getStatusLabel(value)}
        </span>
      ),
    },
  ];

  return (
    <>
      <SlideFrame />
      <Nav />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center mb-6">
          <Link href="/tecnology" className="mr-4 text-gray-400 hover:text-violet-400 transition-colors duration-200">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-white">Sistemas Internos</h1>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Adicionar Sistema
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
            onRowClick={handleSystemClick}
          />
        </div>
      </div>

      {/* Add System Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Adicionar Novo Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full">
              <label className="text-sm text-gray-400 mb-1 block">Nome do Sistema</label>
              <input
                type="text"
                placeholder="Nome do sistema"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="col-span-full">
              <label className="text-sm text-gray-400 mb-1 block">Descrição</label>
              <textarea
                placeholder="Descrição do sistema"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500 h-24"
              ></textarea>
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Tipo</label>
              <select
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              >
                <option value="internal">Interno</option>
                <option value="external">Externo</option>
              </select>
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Versão</label>
              <input
                type="text"
                placeholder="Versão do sistema"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Status</label>
              <select
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              >
                <option value="online">Online</option>
                <option value="degraded">Degradado</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Ambiente</label>
              <select
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              >
                <option value="production">Produção</option>
                <option value="testing">Testes</option>
                <option value="development">Desenvolvimento</option>
              </select>
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Tecnologia</label>
              <input
                type="text"
                placeholder="Tecnologias utilizadas"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Banco de Dados</label>
              <input
                type="text"
                placeholder="Banco de dados utilizado"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Servidor</label>
              <input
                type="text"
                placeholder="Servidor ou hospedagem"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Responsável</label>
              <input
                type="text"
                placeholder="Equipe ou pessoa responsável"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="col-span-full">
              <label className="text-sm text-gray-400 mb-1 block">URL</label>
              <input
                type="url"
                placeholder="https://exemplo.com"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="col-span-full flex justify-end mt-2">
              <button
                className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
              >
                <Plus size={18} />
                Adicionar
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* System Details Modal */}
      {showSystemModal && selectedSystem && (
        <Modal onclick={() => setShowSystemModal(false)} isCreate={false} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">{selectedSystem.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full md:col-span-1">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Informações Básicas</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Descrição:</span> {selectedSystem.description}</p>
                  <p>
                    <span className="text-gray-400">Tipo:</span> 
                    {selectedSystem.type === 'internal' ? ' Interno' : ' Externo'}
                  </p>
                  <p><span className="text-gray-400">Versão:</span> {selectedSystem.version}</p>
                  <p>
                    <span className="text-gray-400">Ambiente:</span> 
                    {selectedSystem.environment === 'production' && ' Produção'}
                    {selectedSystem.environment === 'testing' && ' Testes'}
                    {selectedSystem.environment === 'development' && ' Desenvolvimento'}
                  </p>
                  <p>
                    <span className="text-gray-400">Status:</span> 
                    <span className={`ml-1 ${
                      selectedSystem.status === 'online' ? 'text-green-500' : 
                      selectedSystem.status === 'degraded' ? 'text-yellow-500' : 
                      'text-red-500'
                    }`}>
                      {getStatusLabel(selectedSystem.status)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-full md:col-span-1">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Detalhes Técnicos</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Tecnologia:</span> {selectedSystem.technology}</p>
                  <p><span className="text-gray-400">Banco de Dados:</span> {selectedSystem.database}</p>
                  <p><span className="text-gray-400">Servidor:</span> {selectedSystem.server}</p>
                  <p><span className="text-gray-400">Responsável:</span> {selectedSystem.maintainer}</p>
                  <p>
                    <span className="text-gray-400">URL:</span> 
                    <a 
                      href={selectedSystem.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-violet-300 hover:text-violet-200 ml-1 underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {selectedSystem.url}
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Atualizações</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Última Atualização:</span> {selectedSystem.lastUpdate}</p>
                  <p><span className="text-gray-400">Próxima Atualização:</span> {selectedSystem.nextUpdate}</p>
                  
                  <div className="mt-4">
                    {selectedSystem.status === 'degraded' && (
                      <div className="flex items-center gap-2 text-yellow-500">
                        <AlertTriangle size={18} />
                        <span>Sistema operando com performance reduzida. Verificação em andamento.</span>
                      </div>
                    )}
                    {selectedSystem.status === 'offline' && (
                      <div className="flex items-center gap-2 text-red-500">
                        <AlertTriangle size={18} />
                        <span>Sistema offline. Manutenção em andamento.</span>
                      </div>
                    )}
                    {selectedSystem.status === 'online' && (
                      <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle size={18} />
                        <span>Sistema operando normalmente.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Ações</h3>
                <div className="flex flex-wrap gap-2">
                  <a 
                    href={selectedSystem.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-3 py-1 rounded-md transition-all duration-200 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Server size={14} />
                    Acessar Sistema
                  </a>
                  <button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-all duration-200 text-sm">
                    <Database size={14} />
                    Verificar Banco de Dados
                  </button>
                  <button className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-all duration-200 text-sm">
                    <Cloud size={14} />
                    Verificar Servidor
                  </button>
                  <button className="flex items-center gap-2 bg-yellow-700 hover:bg-yellow-600 text-white px-3 py-1 rounded-md transition-all duration-200 text-sm">
                    <Code size={14} />
                    Logs do Sistema
                  </button>
                  <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md transition-all duration-200 text-sm">
                    <Settings size={14} />
                    Configurações
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}