'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { FilterPanel } from '../../components/FilterPanel'
import { Table } from '../../components/Table'
import { Modal } from '../../components/Modal'
import { Plus, Search } from 'lucide-react'

// Mock data for orders
const mockOrders = [
  {
    id: '1',
    orderNumber: 'PED-2023-001',
    date: '15/03/2023',
    client: 'Empresa ABC Lda',
    products: 'Computadores Dell (5x)',
    total: 4499.95,
    status: 'pending',
    deliveryDate: '20/03/2023',
  },
  {
    id: '2',
    orderNumber: 'PED-2023-002',
    date: '12/03/2023',
    client: 'Tech Solutions SA',
    products: 'Licenças Microsoft Office (10x)',
    total: 1499.90,
    status: 'confirmed',
    deliveryDate: '18/03/2023',
  },
  {
    id: '3',
    orderNumber: 'PED-2023-003',
    date: '10/03/2023',
    client: 'Startup Inovadora',
    products: 'Serviços de Consultoria',
    total: 2500.00,
    status: 'delivered',
    deliveryDate: '15/03/2023',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Pendente', value: 'pending' },
      { label: 'Confirmado', value: 'confirmed' },
      { label: 'Entregue', value: 'delivered' },
      { label: 'Cancelado', value: 'cancelled' },
    ],
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
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
    let filtered = [...orders];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(term) ||
          order.client.toLowerCase().includes(term) ||
          order.products.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((order) => {
          return order[key as keyof typeof order] === value;
        });
      }
    });

    setFilteredOrders(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredOrders(orders);
  };

  // Table columns
  const columns = [
    {
      header: 'Nº Pedido',
      accessor: 'orderNumber',
    },
    {
      header: 'Data',
      accessor: 'date',
    },
    {
      header: 'Cliente',
      accessor: 'client',
    },
    {
      header: 'Produtos',
      accessor: 'products',
    },
    {
      header: 'Valor Total',
      accessor: 'total',
      cell: (value: number) => <span className="text-green-500 font-semibold">€{value.toFixed(2)}</span>,
    },
    {
      header: 'Data de Entrega',
      accessor: 'deliveryDate',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'pending') return <span className="text-yellow-500">Pendente</span>;
        if (value === 'confirmed') return <span className="text-blue-500">Confirmado</span>;
        if (value === 'delivered') return <span className="text-green-500">Entregue</span>;
        if (value === 'cancelled') return <span className="text-red-500">Cancelado</span>;
        return value;
      },
    },
  ];

  return (
    <>
      <SlideFrame />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Pedidos</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Novo Pedido
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
            placeholder="Pesquisar pedidos..."
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

        {/* Orders table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredOrders}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </div>
      </div>

      {/* Add Order Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <p>Formulário para novo pedido</p>
        </Modal>
      )}
    </>
  );
}