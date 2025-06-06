'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { FilterPanel } from '../../components/FilterPanel'
import { Modal } from '../../components/Modal'
import { Plus, Search, User, Building, Phone, Mail, MapPin } from 'lucide-react'

// Mock data for customers
const mockCustomers = [
  {
    id: '1',
    name: 'Empresa ABC',
    type: 'company',
    contact: 'João Silva',
    email: 'joao.silva@empresaabc.pt',
    phone: '+351 912 345 678',
    address: 'Av. da Liberdade 123, 1250-096 Lisboa',
    taxId: 'PT507839241',
    status: 'active',
    totalPurchases: 15800.50,
    lastPurchase: '15/03/2023',
  },
  {
    id: '2',
    name: 'Empresa XYZ',
    type: 'company',
    contact: 'Maria Santos',
    email: 'maria.santos@empresaxyz.pt',
    phone: '+351 923 456 789',
    address: 'Rua de Santa Catarina 456, 4000-446 Porto',
    taxId: 'PT508942367',
    status: 'active',
    totalPurchases: 23450.75,
    lastPurchase: '10/03/2023',
  },
  {
    id: '3',
    name: 'António Ferreira',
    type: 'individual',
    contact: 'António Ferreira',
    email: 'antonio.ferreira@gmail.com',
    phone: '+351 934 567 890',
    address: 'Av. Central 789, 4710-229 Braga',
    taxId: 'PT235678901',
    status: 'active',
    totalPurchases: 2800.25,
    lastPurchase: '05/03/2023',
  },
  {
    id: '4',
    name: 'Empresa DEF',
    type: 'company',
    contact: 'Ana Oliveira',
    email: 'ana.oliveira@empresadef.pt',
    phone: '+351 945 678 901',
    address: 'Rua de Santo António 101, 8000-283 Faro',
    taxId: 'PT509753124',
    status: 'inactive',
    totalPurchases: 8750.00,
    lastPurchase: '20/02/2023',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'type',
    label: 'Tipo',
    type: 'select' as const,
    options: [
      { label: 'Empresa', value: 'company' },
      { label: 'Individual', value: 'individual' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Ativo', value: 'active' },
      { label: 'Inativo', value: 'inactive' },
    ],
  },
];

export default function ClientsPage() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState(mockCustomers);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // Handle filter change
  const handleFilterChange = (name: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...customers];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(term) ||
          customer.contact.toLowerCase().includes(term) ||
          customer.email.toLowerCase().includes(term) ||
          customer.phone.toLowerCase().includes(term) ||
          customer.address.toLowerCase().includes(term) ||
          customer.taxId.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((customer) => {
          if (typeof customer[key as keyof typeof customer] === 'string') {
            return (customer[key as keyof typeof customer] as string).toLowerCase() === value.toLowerCase();
          }
          return customer[key as keyof typeof customer] === value;
        });
      }
    });

    setFilteredCustomers(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredCustomers(customers);
  };

  // Handle customer click
  const handleCustomerClick = (customer: any) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  return (
    <>
      <SlideFrame />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Clientes</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Adicionar Cliente
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
            placeholder="Pesquisar clientes..."
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

        {/* Customer cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCustomers.map((customer) => (
            <div 
              key={customer.id}
              className="relative bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg overflow-hidden shadow-md hover:shadow-violet-900/20 cursor-pointer"
              onClick={() => handleCustomerClick(customer)}
            >
              <div className="absolute top-2 right-2">
                <span className={`${customer.status === 'active' ? 'bg-green-500' : 'bg-gray-500'} text-white text-xs px-2 py-1 rounded-full`}>
                  {customer.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-violet-900/30 p-2 rounded-full">
                    {customer.type === 'company' ? (
                      <Building size={24} className="text-violet-400" />
                    ) : (
                      <User size={24} className="text-violet-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{customer.name}</h3>
                    <p className="text-violet-400 text-sm">{customer.type === 'company' ? 'Empresa' : 'Individual'}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <User size={14} className="text-violet-400" />
                    <span>{customer.contact}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail size={14} className="text-violet-400" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone size={14} className="text-violet-400" />
                    <span>{customer.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin size={14} className="text-violet-400" />
                    <span className="truncate">{customer.address}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Total de Compras:</span>
                    <span className="text-green-500 font-medium">€{customer.totalPurchases.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-400 text-xs">Última Compra:</span>
                    <span className="text-gray-300 text-xs">{customer.lastPurchase}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredCustomers.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
              Nenhum cliente encontrado com os filtros aplicados.
            </div>
          )}
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Adicionar Novo Cliente</h2>
          <p>Formulário para adicionar cliente</p>
        </Modal>
      )}

      {/* Customer Details Modal */}
      {showCustomerModal && selectedCustomer && (
        <Modal onclick={() => setShowCustomerModal(false)} isCreate={false} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Detalhes do Cliente</h2>
          <p>Detalhes de {selectedCustomer.name}</p>
        </Modal>
      )}
    </>
  );
}