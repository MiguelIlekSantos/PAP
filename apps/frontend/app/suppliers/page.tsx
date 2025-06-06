'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Nav } from '../components/Nav'
import { FilterPanel } from '../components/FilterPanel'
import { Modal } from '../components/Modal'
import { Plus, Search, User, Building, Phone, Mail, MapPin, Package, Truck } from 'lucide-react'
import { SupplierCard } from '../components/SupplierCard'

interface supplier{
  id: string;
  name: string;
  type: 'hardware' | 'software' | 'services' | 'office';
  contact: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  status: string;
  totalOrders: number;
  lastOrder: string;
  paymentTerms: string;
  products: string[];
};

const a:supplier = {
    id: '1',
    name: 'Dell Portugal',
    type: 'hardware',
    contact: 'Miguel Oliveira',
    email: 'miguel.oliveira@dell.com',
    phone: '+351 210 123 456',
    address: 'Av. D. João II, Lote 1.06.2.3, 1990-095 Lisboa',
    taxId: 'PT503280089',
    status: 'active',
    totalOrders: 25800.50,
    lastOrder: '15/03/2023',
    paymentTerms: '30 dias',
    products: ['Laptops', 'Desktops', 'Servidores', 'Monitores'],
}

// Mock data for suppliers
const mockSuppliers = [
  {
    id: '1',
    name: 'Dell Portugal',
    type: 'hardware',
    contact: 'Miguel Oliveira',
    email: 'miguel.oliveira@dell.com',
    phone: '+351 210 123 456',
    address: 'Av. D. João II, Lote 1.06.2.3, 1990-095 Lisboa',
    taxId: 'PT503280089',
    status: 'active',
    totalOrders: 25800.50,
    lastOrder: '15/03/2023',
    paymentTerms: '30 dias',
    products: ['Laptops', 'Desktops', 'Servidores', 'Monitores'],
  },
  {
    id: '2',
    name: 'LG Electronics',
    type: 'hardware',
    contact: 'Ana Santos',
    email: 'ana.santos@lg.com',
    phone: '+351 210 234 567',
    address: 'Rua Quinta do Paizinho 8, 2790-237 Carnaxide',
    taxId: 'PT502279710',
    status: 'active',
    totalOrders: 12450.75,
    lastOrder: '10/03/2023',
    paymentTerms: '45 dias',
    products: ['Monitores', 'TVs', 'Projetores'],
  },
  {
    id: '3',
    name: 'Logitech Portugal',
    type: 'hardware',
    contact: 'Pedro Ferreira',
    email: 'pedro.ferreira@logitech.com',
    phone: '+351 210 345 678',
    address: 'Av. D. João II, n.º 41, 1998-023 Lisboa',
    taxId: 'PT503789054',
    status: 'active',
    totalOrders: 8800.25,
    lastOrder: '05/03/2023',
    paymentTerms: '30 dias',
    products: ['Teclados', 'Mouses', 'Webcams', 'Headsets'],
  },
  {
    id: '4',
    name: 'Microsoft Portugal',
    type: 'software',
    contact: 'Sofia Costa',
    email: 'sofia.costa@microsoft.com',
    phone: '+351 210 456 789',
    address: 'Rua do Fogo de Santelmo, Lote 2.07.02, 1990-110 Lisboa',
    taxId: 'PT502995912',
    status: 'active',
    totalOrders: 18750.00,
    lastOrder: '20/02/2023',
    paymentTerms: '30 dias',
    products: ['Windows', 'Office', 'Azure', 'Licenças de software'],
  },
  {
    id: '5',
    name: 'Transportes Rápidos',
    type: 'services',
    contact: 'Carlos Rodrigues',
    email: 'carlos.rodrigues@transportesrapidos.pt',
    phone: '+351 210 567 890',
    address: 'Rua da Boavista 234, 4050-107 Porto',
    taxId: 'PT505678901',
    status: 'active',
    totalOrders: 5500.50,
    lastOrder: '15/02/2023',
    paymentTerms: '15 dias',
    products: ['Serviços de transporte', 'Logística'],
  },
  {
    id: '6',
    name: 'Papelaria Central',
    type: 'office',
    contact: 'Joana Almeida',
    email: 'joana.almeida@papelaria.pt',
    phone: '+351 210 678 901',
    address: 'Av. da República 567, 1050-191 Lisboa',
    taxId: 'PT506789012',
    status: 'inactive',
    totalOrders: 3200.00,
    lastOrder: '01/01/2023',
    paymentTerms: '15 dias',
    products: ['Material de escritório', 'Papel', 'Toners'],
  },
];

// Filter fields
const filterFields = [
  {
    name: 'type',
    label: 'Tipo',
    type: 'select' as const,
    options: [
      { label: 'Hardware', value: 'hardware' },
      { label: 'Software', value: 'software' },
      { label: 'Serviços', value: 'services' },
      { label: 'Material de Escritório', value: 'office' },
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

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [filteredSuppliers, setFilteredSuppliers] = useState(mockSuppliers);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  // Handle filter change
  const handleFilterChange = (name: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...suppliers];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(term) ||
          supplier.contact.toLowerCase().includes(term) ||
          supplier.email.toLowerCase().includes(term) ||
          supplier.phone.toLowerCase().includes(term) ||
          supplier.address.toLowerCase().includes(term) ||
          supplier.taxId.toLowerCase().includes(term) ||
          supplier.products.some(product => product.toLowerCase().includes(term))
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((supplier) => {
          if (typeof supplier[key as keyof typeof supplier] === 'string') {
            return (supplier[key as keyof typeof supplier] as string).toLowerCase() === value.toLowerCase();
          }
          return supplier[key as keyof typeof supplier] === value;
        });
      }
    });

    setFilteredSuppliers(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredSuppliers(suppliers);
  };

  // Handle supplier click
  const handleSupplierClick = (supplier: any) => {
    setSelectedSupplier(supplier);
    setShowSupplierModal(true);
  };

  return (
    <>
      <SlideFrame />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Fornecedores</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Adicionar Fornecedor
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
            placeholder="Pesquisar fornecedores..."
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


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* {filteredSuppliers.map((supplier) => (
            <div 
              key={supplier.id}
              className="relative bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg overflow-hidden shadow-md hover:shadow-violet-900/20 cursor-pointer"
              onClick={() => handleSupplierClick(supplier)}
            >
              <div className="absolute top-2 right-2">
                <span className={`${supplier.status === 'active' ? 'bg-green-500' : 'bg-gray-500'} text-white text-xs px-2 py-1 rounded-full`}>
                  {supplier.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-violet-900/30 p-2 rounded-full">
                    <Building size={24} className="text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{supplier.name}</h3>
                    <p className="text-violet-400 text-sm">
                      {supplier.type === 'hardware' && 'Hardware'}
                      {supplier.type === 'software' && 'Software'}
                      {supplier.type === 'services' && 'Serviços'}
                      {supplier.type === 'office' && 'Material de Escritório'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <User size={14} className="text-violet-400" />
                    <span>{supplier.contact}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail size={14} className="text-violet-400" />
                    <span className="truncate">{supplier.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone size={14} className="text-violet-400" />
                    <span>{supplier.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin size={14} className="text-violet-400" />
                    <span className="truncate">{supplier.address}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Total de Pedidos:</span>
                    <span className="text-green-500 font-medium">€{supplier.totalOrders.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-400 text-xs">Último Pedido:</span>
                    <span className="text-gray-300 text-xs">{supplier.lastOrder}</span>
                  </div>
                </div>
              </div>
            </div>
          ))} */}

          <SupplierCard supplier={a}/>

          {filteredSuppliers.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
              Nenhum fornecedor encontrado com os filtros aplicados.
            </div>
          )}
        </div>
      </div>

      {/* Add Supplier Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <p>aaaa</p>
        </Modal>
      )}

      {/* Supplier Details Modal */}
      {showSupplierModal && selectedSupplier && (
        <Modal onclick={() => setShowSupplierModal(false)} isCreate={false} isLarge={true}>
          <p>aaaa</p>
        </Modal>
      )}
    </>
  );
}