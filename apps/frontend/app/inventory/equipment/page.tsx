'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { Nav } from '../../components/Nav'
import { FilterPanel } from '../../components/FilterPanel'
import { Table } from '../../components/Table'
import { Modal } from '../../components/Modal'
import { Plus, Search, ArrowLeft, AlertTriangle, Calendar } from 'lucide-react'
import Link from 'next/link'

// Mock data for equipment
const mockEquipment = [
  {
    id: '1',
    name: 'Empilhadeira Toyota',
    type: 'Movimentação',
    serialNumber: 'TYT-EMP-2021-001',
    location: 'Armazém Lisboa',
    purchaseDate: '15/03/2020',
    lastMaintenance: '10/01/2023',
    nextMaintenance: '10/01/2024',
    status: 'operational',
    responsible: 'António Silva',
  },
  {
    id: '2',
    name: 'Esteira Transportadora',
    type: 'Movimentação',
    serialNumber: 'EST-TRANS-2019-002',
    location: 'Armazém Porto',
    purchaseDate: '05/06/2019',
    lastMaintenance: '20/03/2023',
    nextMaintenance: '20/03/2024',
    status: 'operational',
    responsible: 'Maria Santos',
  },
  {
    id: '3',
    name: 'Máquina de Embalagem',
    type: 'Embalagem',
    serialNumber: 'EMB-2018-003',
    location: 'Armazém Lisboa',
    purchaseDate: '12/04/2018',
    lastMaintenance: '15/05/2023',
    nextMaintenance: '15/05/2024',
    status: 'maintenance',
    responsible: 'João Oliveira',
  },
  {
    id: '4',
    name: 'Scanner de Código de Barras',
    type: 'Identificação',
    serialNumber: 'SCN-2022-004',
    location: 'Armazém Braga',
    purchaseDate: '03/11/2022',
    lastMaintenance: '05/02/2023',
    nextMaintenance: '05/02/2024',
    status: 'operational',
    responsible: 'Ana Costa',
  },
  {
    id: '5',
    name: 'Paleteira Manual',
    type: 'Movimentação',
    serialNumber: 'PLT-2020-005',
    location: 'Armazém Faro',
    purchaseDate: '22/07/2020',
    lastMaintenance: '18/08/2023',
    nextMaintenance: '18/08/2024',
    status: 'repair',
    responsible: 'Carlos Rodrigues',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'type',
    label: 'Tipo',
    type: 'select' as const,
    options: [
      { label: 'Movimentação', value: 'Movimentação' },
      { label: 'Embalagem', value: 'Embalagem' },
      { label: 'Identificação', value: 'Identificação' },
    ],
  },
  {
    name: 'location',
    label: 'Localização',
    type: 'select' as const,
    options: [
      { label: 'Armazém Lisboa', value: 'Armazém Lisboa' },
      { label: 'Armazém Porto', value: 'Armazém Porto' },
      { label: 'Armazém Braga', value: 'Armazém Braga' },
      { label: 'Armazém Faro', value: 'Armazém Faro' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Operacional', value: 'operational' },
      { label: 'Em manutenção', value: 'maintenance' },
      { label: 'Em reparo', value: 'repair' },
      { label: 'Inativo', value: 'inactive' },
    ],
  },
];

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState(mockEquipment);
  const [filteredEquipment, setFilteredEquipment] = useState(mockEquipment);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);

  // Handle filter change
  const handleFilterChange = (name: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...equipment];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.serialNumber.toLowerCase().includes(term) ||
          item.type.toLowerCase().includes(term) ||
          item.location.toLowerCase().includes(term) ||
          item.responsible.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((item) => {
          if (typeof item[key as keyof typeof item] === 'string') {
            return (item[key as keyof typeof item] as string).toLowerCase() === value.toLowerCase();
          }
          return item[key as keyof typeof item] === value;
        });
      }
    });

    setFilteredEquipment(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredEquipment(equipment);
  };

  // Handle equipment click
  const handleEquipmentClick = (item: any) => {
    setSelectedEquipment(item);
    setShowEquipmentModal(true);
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
    },
    {
      header: 'Número de Série',
      accessor: 'serialNumber',
    },
    {
      header: 'Localização',
      accessor: 'location',
    },
    {
      header: 'Próxima Manutenção',
      accessor: 'nextMaintenance',
    },
    {
      header: 'Responsável',
      accessor: 'responsible',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'operational') return <span className="text-green-500">Operacional</span>;
        if (value === 'maintenance') return <span className="text-yellow-500">Em manutenção</span>;
        if (value === 'repair') return <span className="text-red-500">Em reparo</span>;
        if (value === 'inactive') return <span className="text-gray-500">Inativo</span>;
        return value;
      },
    },
  ];

  return (
    <>
      <SlideFrame />
      <Nav />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center mb-6">
          <Link href="/inventory" className="mr-4 text-gray-400 hover:text-violet-400 transition-colors duration-200">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-white">Equipamentos</h1>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Adicionar Equipamento
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
            placeholder="Pesquisar equipamentos..."
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

        {/* Equipment table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredEquipment}
            onRowClick={handleEquipmentClick}
          />
        </div>
      </div>

      {/* Add Equipment Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Adicionar Novo Equipamento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields would go here */}
            <p className="text-gray-400 col-span-full">Formulário de cadastro de equipamento</p>
          </div>
        </Modal>
      )}

      {/* Equipment Details Modal */}
      {showEquipmentModal && selectedEquipment && (
        <Modal onclick={() => setShowEquipmentModal(false)} isCreate={false} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">{selectedEquipment.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full md:col-span-1">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Informações Básicas</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Tipo:</span> {selectedEquipment.type}</p>
                  <p><span className="text-gray-400">Número de Série:</span> {selectedEquipment.serialNumber}</p>
                  <p><span className="text-gray-400">Localização:</span> {selectedEquipment.location}</p>
                  <p><span className="text-gray-400">Data de Aquisição:</span> {selectedEquipment.purchaseDate}</p>
                  <p><span className="text-gray-400">Responsável:</span> {selectedEquipment.responsible}</p>
                  <p>
                    <span className="text-gray-400">Status:</span> 
                    <span className={
                      selectedEquipment.status === 'operational' ? 'text-green-500 ml-2' : 
                      selectedEquipment.status === 'maintenance' ? 'text-yellow-500 ml-2' : 
                      selectedEquipment.status === 'repair' ? 'text-red-500 ml-2' : 
                      'text-gray-500 ml-2'
                    }>
                      {selectedEquipment.status === 'operational' ? 'Operacional' : 
                       selectedEquipment.status === 'maintenance' ? 'Em manutenção' : 
                       selectedEquipment.status === 'repair' ? 'Em reparo' : 
                       'Inativo'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-full md:col-span-1">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Manutenção</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Última Manutenção:</span> {selectedEquipment.lastMaintenance}</p>
                  <p><span className="text-gray-400">Próxima Manutenção:</span> {selectedEquipment.nextMaintenance}</p>
                  
                  <div className="mt-4 flex items-center gap-3">
                    {new Date(selectedEquipment.nextMaintenance.split('/').reverse().join('-')) <= new Date() ? (
                      <div className="flex items-center gap-2 text-red-500">
                        <AlertTriangle size={18} />
                        <span>Manutenção atrasada</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-green-500">
                        <Calendar size={18} />
                        <span>Manutenção em dia</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Histórico de Manutenções</h3>
                <div className="space-y-2">
                  <p className="text-gray-400">Histórico de manutenções realizadas no equipamento</p>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Documentação Técnica</h3>
                <div className="space-y-2">
                  <p className="text-gray-400">Manuais e documentação técnica do equipamento</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}