'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { FilterPanel } from '../../components/FilterPanel'
import { Table } from '../../components/Table'
import { Modal } from '../../components/Modal'
import { Plus, Search } from 'lucide-react'

// Mock data for invoices
const mockInvoices = [
  {
    id: '1',
    invoiceNumber: 'FAT-2023-001',
    date: '15/03/2023',
    client: 'Empresa ABC Lda',
    amount: 4499.95,
    status: 'paid',
    dueDate: '15/04/2023',
    paymentDate: '10/04/2023',
  },
  {
    id: '2',
    invoiceNumber: 'FAT-2023-002',
    date: '12/03/2023',
    client: 'Tech Solutions SA',
    amount: 1499.90,
    status: 'paid',
    dueDate: '12/04/2023',
    paymentDate: '08/04/2023',
  },
  {
    id: '3',
    invoiceNumber: 'FAT-2023-003',
    date: '10/03/2023',
    client: 'Startup Inovadora',
    amount: 2500.00,
    status: 'pending',
    dueDate: '10/04/2023',
    paymentDate: null,
  },
  {
    id: '4',
    invoiceNumber: 'FAT-2023-004',
    date: '08/03/2023',
    client: 'Indústria Metalúrgica',
    amount: 15000.00,
    status: 'overdue',
    dueDate: '08/04/2023',
    paymentDate: null,
  },
];

// Filter fields
const filterFields = [
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Pago', value: 'paid' },
      { label: 'Pendente', value: 'pending' },
      { label: 'Em Atraso', value: 'overdue' },
      { label: 'Cancelado', value: 'cancelled' },
    ],
  },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [filteredInvoices, setFilteredInvoices] = useState(mockInvoices);
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
    let filtered = [...invoices];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (invoice) =>
          invoice.invoiceNumber.toLowerCase().includes(term) ||
          invoice.client.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((invoice) => {
          return invoice[key as keyof typeof invoice] === value;
        });
      }
    });

    setFilteredInvoices(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredInvoices(invoices);
  };

  // Table columns
  const columns = [
    {
      header: 'Nº Fatura',
      accessor: 'invoiceNumber',
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
      header: 'Valor',
      accessor: 'amount',
      cell: (value: number) => <span className="text-green-500 font-semibold">€{value.toFixed(2)}</span>,
    },
    {
      header: 'Data de Vencimento',
      accessor: 'dueDate',
    },
    {
      header: 'Data de Pagamento',
      accessor: 'paymentDate',
      cell: (value: string | null) => value || <span className="text-gray-500">-</span>,
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'paid') return <span className="text-green-500">Pago</span>;
        if (value === 'pending') return <span className="text-yellow-500">Pendente</span>;
        if (value === 'overdue') return <span className="text-red-500">Em Atraso</span>;
        if (value === 'cancelled') return <span className="text-gray-500">Cancelado</span>;
        return value;
      },
    },
  ];

  return (
    <>
      <SlideFrame />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Faturas</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Nova Fatura
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
            placeholder="Pesquisar faturas..."
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

        {/* Invoices table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredInvoices}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </div>
      </div>

      {/* Add Invoice Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <p>Formulário para nova fatura</p>
        </Modal>
      )}
    </>
  );
}