'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Nav } from '../components/Nav'
import { FilterPanel } from '../components/FilterPanel'
import { Modal } from '../components/Modal'
import { Plus, Search, Truck, MapPin, Package, Calendar, Clock, User, Building } from 'lucide-react'

// Mock data for deliveries
const mockDeliveries = [
  {
    id: '1',
    trackingNumber: 'TRK-2023-001',
    customer: 'Empresa ABC',
    customerAddress: 'Av. da Liberdade 123, 1250-096 Lisboa',
    carrier: 'Transportes Rápidos',
    status: 'delivered',
    scheduledDate: '15/03/2023',
    deliveredDate: '15/03/2023',
    items: [
      { name: 'Laptop Dell XPS 13', quantity: 2 },
      { name: 'Monitor LG 27"', quantity: 3 },
    ],
    totalValue: 4899.97,
    notes: 'Entrega realizada com sucesso',
  },
  {
    id: '2',
    trackingNumber: 'TRK-2023-002',
    customer: 'Empresa XYZ',
    customerAddress: 'Rua de Santa Catarina 456, 4000-446 Porto',
    carrier: 'Transportes Rápidos',
    status: 'in_transit',
    scheduledDate: '20/03/2023',
    deliveredDate: null,
    items: [
      { name: 'Teclado Mecânico Logitech', quantity: 5 },
      { name: 'Mouse Wireless Microsoft', quantity: 5 },
      { name: 'Headset Bluetooth Sony', quantity: 2 },
    ],
    totalValue: 1199.85,
    notes: 'Entrega em trânsito',
  },
  {
    id: '3',
    trackingNumber: 'TRK-2023-003',
    customer: 'António Ferreira',
    customerAddress: 'Av. Central 789, 4710-229 Braga',
    carrier: 'CTT Expresso',
    status: 'scheduled',
    scheduledDate: '25/03/2023',
    deliveredDate: null,
    items: [
      { name: 'Webcam Logitech HD', quantity: 1 },
    ],
    totalValue: 79.99,
    notes: 'Entrega agendada',
  },
  {
    id: '4',
    trackingNumber: 'TRK-2023-004',
    customer: 'Empresa DEF',
    customerAddress: 'Rua de Santo António 101, 8000-283 Faro',
    carrier: 'CTT Expresso',
    status: 'pending',
    scheduledDate: null,
    deliveredDate: null,
    items: [
      { name: 'Laptop Dell XPS 13', quantity: 1 },
      { name: 'Teclado Mecânico Logitech', quantity: 1 },
      { name: 'Mouse Wireless Microsoft', quantity: 1 },
    ],
    totalValue: 1439.97,
    notes: 'Aguardando processamento',
  },
  {
    id: '5',
    trackingNumber: 'TRK-2023-005',
    customer: 'Carlos Rodrigues',
    customerAddress: 'Rua da Boavista 234, 4050-107 Porto',
    carrier: 'Transportes Rápidos',
    status: 'cancelled',
    scheduledDate: '10/03/2023',
    deliveredDate: null,
    items: [
      { name: 'Monitor LG 27"', quantity: 1 },
    ],
    totalValue: 299.99,
    notes: 'Entrega cancelada pelo cliente',
  },
  {
    id: '6',
    trackingNumber: 'TRK-2023-006',
    customer: 'Empresa GHI',
    customerAddress: 'Av. da República 567, 1050-191 Lisboa',
    carrier: 'CTT Expresso',
    status: 'delivered',
    scheduledDate: '12/03/2023',
    deliveredDate: '13/03/2023',
    items: [
      { name: 'Headset Bluetooth Sony', quantity: 3 },
      { name: 'Webcam Logitech HD', quantity: 3 },
    ],
    totalValue: 629.94,
    notes: 'Entrega realizada com sucesso',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Entregue', value: 'delivered' },
      { label: 'Em Trânsito', value: 'in_transit' },
      { label: 'Agendado', value: 'scheduled' },
      { label: 'Pendente', value: 'pending' },
      { label: 'Cancelado', value: 'cancelled' },
    ],
  },
  {
    name: 'carrier',
    label: 'Transportadora',
    type: 'select' as const,
    options: [
      { label: 'Transportes Rápidos', value: 'Transportes Rápidos' },
      { label: 'CTT Expresso', value: 'CTT Expresso' },
    ],
  },
];

export default function LogisticPage() {
  const [deliveries, setDeliveries] = useState(mockDeliveries);
  const [filteredDeliveries, setFilteredDeliveries] = useState(mockDeliveries);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);

  // Handle filter change
  const handleFilterChange = (name: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...deliveries];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (delivery) =>
          delivery.trackingNumber.toLowerCase().includes(term) ||
          delivery.customer.toLowerCase().includes(term) ||
          delivery.customerAddress.toLowerCase().includes(term) ||
          delivery.carrier.toLowerCase().includes(term) ||
          delivery.items.some(item => item.name.toLowerCase().includes(term))
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((delivery) => {
          if (typeof delivery[key as keyof typeof delivery] === 'string') {
            return (delivery[key as keyof typeof delivery] as string).toLowerCase() === value.toLowerCase();
          }
          return delivery[key as keyof typeof delivery] === value;
        });
      }
    });

    setFilteredDeliveries(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredDeliveries(deliveries);
  };

  // Handle delivery click
  const handleDeliveryClick = (delivery: any) => {
    setSelectedDelivery(delivery);
    setShowDeliveryModal(true);
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'in_transit':
        return 'bg-blue-500';
      case 'scheduled':
        return 'bg-yellow-500';
      case 'pending':
        return 'bg-purple-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Entregue';
      case 'in_transit':
        return 'Em Trânsito';
      case 'scheduled':
        return 'Agendado';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <>
      <SlideFrame />
      <Nav />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Logística e Expedição</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Nova Entrega
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
            placeholder="Pesquisar entregas..."
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

        {/* Delivery cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDeliveries.map((delivery) => (
            <div 
              key={delivery.id}
              className="relative bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg overflow-hidden shadow-md hover:shadow-violet-900/20 cursor-pointer"
              onClick={() => handleDeliveryClick(delivery)}
            >
              <div className="absolute top-2 right-2">
                <span className={`${getStatusBadgeColor(delivery.status)} text-white text-xs px-2 py-1 rounded-full`}>
                  {getStatusLabel(delivery.status)}
                </span>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-violet-900/30 p-2 rounded-full">
                    <Package size={24} className="text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{delivery.trackingNumber}</h3>
                    <p className="text-violet-400 text-sm">{delivery.carrier}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    {delivery.customer.includes('Empresa') ? (
                      <Building size={14} className="text-violet-400" />
                    ) : (
                      <User size={14} className="text-violet-400" />
                    )}
                    <span>{delivery.customer}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin size={14} className="text-violet-400" />
                    <span className="truncate">{delivery.customerAddress}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar size={14} className="text-violet-400" />
                    <span>
                      {delivery.scheduledDate ? 
                        `Agendado para: ${delivery.scheduledDate}` : 
                        'Não agendado'}
                    </span>
                  </div>
                  
                  {delivery.deliveredDate && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock size={14} className="text-violet-400" />
                      <span>Entregue em: {delivery.deliveredDate}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Itens:</span>
                    <span className="text-gray-300 text-xs">{delivery.items.reduce((sum, item) => sum + item.quantity, 0)} produtos</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-400 text-xs">Valor Total:</span>
                    <span className="text-green-500 font-medium">€{delivery.totalValue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredDeliveries.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
              Nenhuma entrega encontrada com os filtros aplicados.
            </div>
          )}
        </div>
      </div>

      {/* Add Delivery Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Nova Entrega</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Cliente</label>
              <select
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              >
                <option value="">Selecione um cliente</option>
                <option value="Empresa ABC">Empresa ABC</option>
                <option value="Empresa XYZ">Empresa XYZ</option>
                <option value="António Ferreira">António Ferreira</option>
                <option value="Empresa DEF">Empresa DEF</option>
                <option value="Carlos Rodrigues">Carlos Rodrigues</option>
                <option value="Empresa GHI">Empresa GHI</option>
              </select>
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Transportadora</label>
              <select
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              >
                <option value="">Selecione uma transportadora</option>
                <option value="Transportes Rápidos">Transportes Rápidos</option>
                <option value="CTT Expresso">CTT Expresso</option>
              </select>
            </div>
            
            <div className="col-span-full">
              <label className="text-sm text-gray-400 mb-1 block">Endereço de Entrega</label>
              <input
                type="text"
                placeholder="Endereço completo"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Data de Entrega</label>
              <input
                type="date"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Status</label>
              <select
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              >
                <option value="pending">Pendente</option>
                <option value="scheduled">Agendado</option>
                <option value="in_transit">Em Trânsito</option>
                <option value="delivered">Entregue</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
            
            <div className="col-span-full">
              <label className="text-sm text-gray-400 mb-1 block">Itens</label>
              <div className="bg-[#0a0f16] border border-gray-800 rounded-md p-3 mb-2">
                <div className="grid grid-cols-12 gap-2 mb-2">
                  <div className="col-span-6">
                    <select
                      className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
                    >
                      <option value="">Selecione um produto</option>
                      <option value="Laptop Dell XPS 13">Laptop Dell XPS 13</option>
                      <option value="Monitor LG 27">Monitor LG 27</option>
                      <option value="Teclado Mecânico Logitech">Teclado Mecânico Logitech</option>
                      <option value="Mouse Wireless Microsoft">Mouse Wireless Microsoft</option>
                      <option value="Headset Bluetooth Sony">Headset Bluetooth Sony</option>
                      <option value="Webcam Logitech HD">Webcam Logitech HD</option>
                    </select>
                  </div>
                  <div className="col-span-4">
                    <input
                      type="number"
                      placeholder="Quantidade"
                      min="1"
                      className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <button className="bg-violet-700 hover:bg-violet-600 text-white px-3 py-2 rounded-md transition-all duration-200">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-xs">Nenhum item adicionado</p>
            </div>
            
            <div className="col-span-full">
              <label className="text-sm text-gray-400 mb-1 block">Observações</label>
              <textarea
                placeholder="Observações sobre a entrega"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500 h-24"
              ></textarea>
            </div>
            
            <div className="col-span-full flex justify-end mt-2">
              <button
                className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
              >
                <Plus size={18} />
                Criar Entrega
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delivery Details Modal */}
      {showDeliveryModal && selectedDelivery && (
        <Modal onclick={() => setShowDeliveryModal(false)} isCreate={false} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Detalhes da Entrega</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full md:col-span-1">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Informações Básicas</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Número de Rastreio:</span> {selectedDelivery.trackingNumber}</p>
                  <p><span className="text-gray-400">Cliente:</span> {selectedDelivery.customer}</p>
                  <p><span className="text-gray-400">Endereço:</span> {selectedDelivery.customerAddress}</p>
                  <p><span className="text-gray-400">Transportadora:</span> {selectedDelivery.carrier}</p>
                  <p>
                    <span className="text-gray-400">Status:</span> 
                    <span className={`ml-2 ${
                      selectedDelivery.status === 'delivered' ? 'text-green-500' : 
                      selectedDelivery.status === 'in_transit' ? 'text-blue-500' : 
                      selectedDelivery.status === 'scheduled' ? 'text-yellow-500' : 
                      selectedDelivery.status === 'pending' ? 'text-purple-500' : 
                      'text-red-500'
                    }`}>
                      {getStatusLabel(selectedDelivery.status)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-full md:col-span-1">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Datas</h3>
                <div className="space-y-2">
                  <p>
                    <span className="text-gray-400">Data Agendada:</span> 
                    {selectedDelivery.scheduledDate ? selectedDelivery.scheduledDate : ' Não agendada'}
                  </p>
                  <p>
                    <span className="text-gray-400">Data de Entrega:</span> 
                    {selectedDelivery.deliveredDate ? selectedDelivery.deliveredDate : ' Não entregue'}
                  </p>
                  <p><span className="text-gray-400">Valor Total:</span> <span className="text-green-500">€{selectedDelivery.totalValue.toFixed(2)}</span></p>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Itens</h3>
                <div className="space-y-2">
                  <table className="w-full text-sm">
                    <thead className="text-xs text-gray-400 border-b border-gray-800">
                      <tr>
                        <th className="text-left py-2">Produto</th>
                        <th className="text-center py-2">Quantidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedDelivery.items.map((item: any, index: number) => (
                        <tr key={index} className="border-b border-gray-800">
                          <td className="py-2">{item.name}</td>
                          <td className="text-center py-2">{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Observações</h3>
                <div className="space-y-2">
                  <p className="text-gray-300">{selectedDelivery.notes}</p>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Histórico de Rastreamento</h3>
                <div className="space-y-2">
                  <p className="text-gray-400">Histórico de rastreamento da entrega</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}