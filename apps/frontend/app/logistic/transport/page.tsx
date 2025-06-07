'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { Nav } from '../../components/Nav'
import { FilterPanel } from '../../components/FilterPanel'
import { Table } from '../../components/Table'
import { Modal } from '../../components/Modal'
import { Plus, Search, ArrowLeft, Truck, MapPin, Phone, Mail, Star } from 'lucide-react'
import Link from 'next/link'

// Mock data for transport companies
const mockTransportCompanies = [
  {
    id: '1',
    name: 'Transportes Rápidos Lda',
    contact: 'João Silva',
    phone: '+351 21 123 4567',
    email: 'joao@transportesrapidos.pt',
    address: 'Av. da Liberdade 123, 1250-096 Lisboa',
    vehicleTypes: ['Carrinha', 'Camião', 'Furgão'],
    coverage: ['Lisboa', 'Porto', 'Coimbra'],
    rating: 4.8,
    activeDeliveries: 12,
    completedDeliveries: 245,
    status: 'active',
    pricePerKm: 0.85,
  },
  {
    id: '2',
    name: 'CTT Expresso',
    contact: 'Maria Santos',
    phone: '+351 22 987 6543',
    email: 'maria@ctt.pt',
    address: 'Rua de Santa Catarina 456, 4000-446 Porto',
    vehicleTypes: ['Carrinha', 'Moto', 'Furgão'],
    coverage: ['Porto', 'Braga', 'Viana do Castelo'],
    rating: 4.5,
    activeDeliveries: 8,
    completedDeliveries: 189,
    status: 'active',
    pricePerKm: 0.75,
  },
  {
    id: '3',
    name: 'Logística Central',
    contact: 'António Costa',
    phone: '+351 239 456 789',
    email: 'antonio@logisticacentral.pt',
    address: 'Av. Central 789, 4710-229 Braga',
    vehicleTypes: ['Camião', 'Furgão'],
    coverage: ['Braga', 'Guimarães', 'Barcelos'],
    rating: 4.2,
    activeDeliveries: 5,
    completedDeliveries: 156,
    status: 'active',
    pricePerKm: 0.90,
  },
  {
    id: '4',
    name: 'Sul Transportes',
    contact: 'Ana Ferreira',
    phone: '+351 289 321 654',
    email: 'ana@sultransportes.pt',
    address: 'Rua de Santo António 101, 8000-283 Faro',
    vehicleTypes: ['Carrinha', 'Furgão'],
    coverage: ['Faro', 'Portimão', 'Lagos'],
    rating: 4.6,
    activeDeliveries: 3,
    completedDeliveries: 98,
    status: 'active',
    pricePerKm: 0.80,
  },
  {
    id: '5',
    name: 'Express Delivery',
    contact: 'Carlos Rodrigues',
    phone: '+351 21 555 0123',
    email: 'carlos@expressdelivery.pt',
    address: 'Rua da Boavista 234, 4050-107 Porto',
    vehicleTypes: ['Moto', 'Carrinha'],
    coverage: ['Lisboa', 'Cascais', 'Sintra'],
    rating: 3.9,
    activeDeliveries: 0,
    completedDeliveries: 67,
    status: 'inactive',
    pricePerKm: 1.20,
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
      { label: 'Inativo', value: 'inactive' },
      { label: 'Suspenso', value: 'suspended' },
    ],
  },
  {
    name: 'vehicleType',
    label: 'Tipo de Veículo',
    type: 'select' as const,
    options: [
      { label: 'Carrinha', value: 'Carrinha' },
      { label: 'Camião', value: 'Camião' },
      { label: 'Furgão', value: 'Furgão' },
      { label: 'Moto', value: 'Moto' },
    ],
  },
  {
    name: 'rating',
    label: 'Avaliação',
    type: 'select' as const,
    options: [
      { label: '4+ estrelas', value: '4+' },
      { label: '3+ estrelas', value: '3+' },
      { label: '2+ estrelas', value: '2+' },
    ],
  },
];

export default function TransportPage() {
  const [transportCompanies, setTransportCompanies] = useState(mockTransportCompanies);
  const [filteredCompanies, setFilteredCompanies] = useState(mockTransportCompanies);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  // Handle filter change
  const handleFilterChange = (name: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...transportCompanies];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(term) ||
          company.contact.toLowerCase().includes(term) ||
          company.address.toLowerCase().includes(term) ||
          company.coverage.some(city => city.toLowerCase().includes(term))
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        if (key === 'status') {
          filtered = filtered.filter((company) => company.status === value);
        } else if (key === 'vehicleType') {
          filtered = filtered.filter((company) => 
            company.vehicleTypes.includes(value)
          );
        } else if (key === 'rating') {
          const minRating = parseFloat(value.replace('+', ''));
          filtered = filtered.filter((company) => company.rating >= minRating);
        }
      }
    });

    setFilteredCompanies(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredCompanies(transportCompanies);
  };

  // Handle company click
  const handleCompanyClick = (company: any) => {
    setSelectedCompany(company);
    setShowCompanyModal(true);
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-gray-500';
      case 'suspended':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'inactive':
        return 'Inativo';
      case 'suspended':
        return 'Suspenso';
      default:
        return status;
    }
  };

  // Table columns
  const columns = [
    {
      header: 'Empresa',
      accessor: 'name',
    },
    {
      header: 'Contacto',
      accessor: 'contact',
    },
    {
      header: 'Telefone',
      accessor: 'phone',
    },
    {
      header: 'Cobertura',
      accessor: 'coverage',
      cell: (value: string[]) => value.join(', '),
    },
    {
      header: 'Avaliação',
      accessor: 'rating',
      cell: (value: number) => (
        <div className="flex items-center gap-1">
          <Star size={14} className="text-yellow-500 fill-current" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      header: 'Entregas Ativas',
      accessor: 'activeDeliveries',
      cell: (value: number) => (
        <span className={value > 0 ? 'text-green-500' : 'text-gray-400'}>
          {value}
        </span>
      ),
    },
    {
      header: 'Preço/Km',
      accessor: 'pricePerKm',
      cell: (value: number) => `€${value.toFixed(2)}`,
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => (
        <span className={
          value === 'active' ? 'text-green-500' : 
          value === 'inactive' ? 'text-gray-500' : 
          'text-red-500'
        }>
          {getStatusLabel(value)}
        </span>
      ),
    },
  ];

  return (
    <>
      <SlideFrame />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center mb-6">
          <Link href="/logistic" className="mr-4 text-gray-400 hover:text-violet-400 transition-colors duration-200">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-white">Transportes</h1>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Adicionar Transportadora
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
            placeholder="Pesquisar transportadoras..."
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

        {/* Transport companies table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredCompanies}
            onRowClick={handleCompanyClick}
          />
        </div>
      </div>

      {/* Add Transport Company Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Adicionar Nova Transportadora</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                  placeholder="Nome da transportadora"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Pessoa de Contacto
                </label>
                <input
                  type="text"
                  className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                  placeholder="Nome do contacto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                  placeholder="+351 XXX XXX XXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                  placeholder="email@empresa.pt"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Endereço
                </label>
                <textarea
                  className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                  rows={3}
                  placeholder="Endereço completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Preço por Km (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                  placeholder="0.85"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tipos de Veículos
                </label>
                <div className="space-y-2">
                  {['Carrinha', 'Camião', 'Furgão', 'Moto'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 text-violet-600 focus:ring-violet-500"
                      />
                      <span className="text-gray-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-violet-700 hover:bg-violet-600 text-white rounded-md transition-all duration-200"
            >
              Adicionar
            </button>
          </div>
        </Modal>
      )}

      {/* Transport Company Details Modal */}
      {showCompanyModal && selectedCompany && (
        <Modal onclick={() => setShowCompanyModal(false)} isCreate={false} isLarge={true}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">{selectedCompany.name}</h2>
            <span className={`${getStatusBadgeColor(selectedCompany.status)} text-white text-xs px-3 py-1 rounded-full`}>
              {getStatusLabel(selectedCompany.status)}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3 flex items-center gap-2">
                  <Phone size={16} />
                  Informações de Contacto
                </h3>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Contacto:</span> {selectedCompany.contact}</p>
                  <p><span className="text-gray-400">Telefone:</span> {selectedCompany.phone}</p>
                  <p><span className="text-gray-400">Email:</span> {selectedCompany.email}</p>
                  <p><span className="text-gray-400">Endereço:</span> {selectedCompany.address}</p>
                </div>
              </div>

              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3 flex items-center gap-2">
                  <Truck size={16} />
                  Frota e Serviços
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-400">Tipos de Veículos:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedCompany.vehicleTypes.map((type: string) => (
                        <span key={type} className="bg-violet-900/30 text-violet-400 px-2 py-1 rounded text-xs">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Cobertura:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedCompany.coverage.map((city: string) => (
                        <span key={city} className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded text-xs">
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p><span className="text-gray-400">Preço por Km:</span> €{selectedCompany.pricePerKm.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3 flex items-center gap-2">
                  <Star size={16} />
                  Avaliação e Performance
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="text-lg font-medium">{selectedCompany.rating}</span>
                    <span className="text-gray-400">/ 5.0</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${(selectedCompany.rating / 5) * 100}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">{selectedCompany.activeDeliveries}</div>
                      <div className="text-xs text-gray-400">Entregas Ativas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500">{selectedCompany.completedDeliveries}</div>
                      <div className="text-xs text-gray-400">Entregas Concluídas</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3 flex items-center gap-2">
                  <MapPin size={16} />
                  Localização
                </h3>
                <div className="w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={20} />
                    <span>Mapa de localização</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowCompanyModal(false)}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              Fechar
            </button>
            <button
              className="px-4 py-2 bg-violet-700 hover:bg-violet-600 text-white rounded-md transition-all duration-200"
            >
              Editar
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}