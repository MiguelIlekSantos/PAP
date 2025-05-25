'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { Nav } from '../../components/Nav'
import { FilterPanel } from '../../components/FilterPanel'
import { Table } from '../../components/Table'
import { Modal } from '../../components/Modal'
import { Plus, Search, ArrowLeft, MapPin } from 'lucide-react'
import Link from 'next/link'

// Mock data for warehouses
const mockWarehouses = [
  {
    id: '1',
    name: 'Armazém Lisboa',
    address: 'Av. da Liberdade 123, 1250-096 Lisboa',
    manager: 'António Silva',
    capacity: '500m²',
    occupancy: 68,
    sections: 12,
    status: 'active',
  },
  {
    id: '2',
    name: 'Armazém Porto',
    address: 'Rua de Santa Catarina 456, 4000-446 Porto',
    manager: 'Maria Santos',
    capacity: '350m²',
    occupancy: 75,
    sections: 8,
    status: 'active',
  },
  {
    id: '3',
    name: 'Armazém Braga',
    address: 'Av. Central 789, 4710-229 Braga',
    manager: 'João Oliveira',
    capacity: '200m²',
    occupancy: 92,
    sections: 5,
    status: 'full',
  },
  {
    id: '4',
    name: 'Armazém Faro',
    address: 'Rua de Santo António 101, 8000-283 Faro',
    manager: 'Ana Costa',
    capacity: '150m²',
    occupancy: 45,
    sections: 4,
    status: 'active',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Ativo', value: 'active' },
      { label: 'Lotado', value: 'full' },
      { label: 'Em manutenção', value: 'maintenance' },
    ],
  },
  {
    name: 'occupancy',
    label: 'Ocupação',
    type: 'select' as const,
    options: [
      { label: 'Baixa (<50%)', value: 'low' },
      { label: 'Média (50-75%)', value: 'medium' },
      { label: 'Alta (>75%)', value: 'high' },
    ],
  },
];

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState(mockWarehouses);
  const [filteredWarehouses, setFilteredWarehouses] = useState(mockWarehouses);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWarehouseModal, setShowWarehouseModal] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null);

  // Handle filter change
  const handleFilterChange = (name: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...warehouses];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (warehouse) =>
          warehouse.name.toLowerCase().includes(term) ||
          warehouse.address.toLowerCase().includes(term) ||
          warehouse.manager.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        if (key === 'status') {
          filtered = filtered.filter((warehouse) => warehouse.status === value);
        } else if (key === 'occupancy') {
          filtered = filtered.filter((warehouse) => {
            const occupancy = warehouse.occupancy;
            if (value === 'low') return occupancy < 50;
            if (value === 'medium') return occupancy >= 50 && occupancy <= 75;
            if (value === 'high') return occupancy > 75;
            return true;
          });
        }
      }
    });

    setFilteredWarehouses(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredWarehouses(warehouses);
  };

  // Handle warehouse click
  const handleWarehouseClick = (warehouse: any) => {
    setSelectedWarehouse(warehouse);
    setShowWarehouseModal(true);
  };

  // Table columns
  const columns = [
    {
      header: 'Nome',
      accessor: 'name',
    },
    {
      header: 'Endereço',
      accessor: 'address',
    },
    {
      header: 'Responsável',
      accessor: 'manager',
    },
    {
      header: 'Capacidade',
      accessor: 'capacity',
    },
    {
      header: 'Ocupação',
      accessor: 'occupancy',
      cell: (value: number) => {
        const color = value > 90 ? 'text-red-500' : value > 75 ? 'text-yellow-500' : 'text-green-500';
        return <span className={color}>{value}%</span>;
      },
    },
    {
      header: 'Seções',
      accessor: 'sections',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'active') return <span className="text-green-500">Ativo</span>;
        if (value === 'full') return <span className="text-yellow-500">Lotado</span>;
        if (value === 'maintenance') return <span className="text-red-500">Em manutenção</span>;
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
          <h1 className="text-3xl font-bold text-white">Armazéns</h1>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Adicionar Armazém
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
            placeholder="Pesquisar armazéns..."
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

        {/* Warehouses table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredWarehouses}
            onRowClick={handleWarehouseClick}
          />
        </div>
      </div>

      {/* Add Warehouse Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Adicionar Novo Armazém</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields would go here */}
            <p className="text-gray-400 col-span-full">Formulário de cadastro de armazém</p>
          </div>
        </Modal>
      )}

      {/* Warehouse Details Modal */}
      {showWarehouseModal && selectedWarehouse && (
        <Modal onclick={() => setShowWarehouseModal(false)} isCreate={false} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">{selectedWarehouse.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full md:col-span-1">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Informações Básicas</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Endereço:</span> {selectedWarehouse.address}</p>
                  <p><span className="text-gray-400">Responsável:</span> {selectedWarehouse.manager}</p>
                  <p><span className="text-gray-400">Capacidade:</span> {selectedWarehouse.capacity}</p>
                  <p><span className="text-gray-400">Número de Seções:</span> {selectedWarehouse.sections}</p>
                  <p>
                    <span className="text-gray-400">Status:</span> 
                    <span className={
                      selectedWarehouse.status === 'active' ? 'text-green-500 ml-2' : 
                      selectedWarehouse.status === 'full' ? 'text-yellow-500 ml-2' : 
                      'text-red-500 ml-2'
                    }>
                      {selectedWarehouse.status === 'active' ? 'Ativo' : 
                       selectedWarehouse.status === 'full' ? 'Lotado' : 
                       'Em manutenção'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-full md:col-span-1">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Ocupação</h3>
                <div className="space-y-4">
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full ${
                        selectedWarehouse.occupancy > 90 ? 'bg-red-500' : 
                        selectedWarehouse.occupancy > 75 ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}
                      style={{ width: `${selectedWarehouse.occupancy}%` }}
                    ></div>
                  </div>
                  <p className="text-center">{selectedWarehouse.occupancy}% ocupado</p>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Localização</h3>
                <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={20} />
                    <span>Mapa de localização do armazém</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Produtos em Estoque</h3>
                <div className="space-y-2">
                  <p className="text-gray-400">Lista de produtos armazenados neste local</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}