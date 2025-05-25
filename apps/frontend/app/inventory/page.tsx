'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Nav } from '../components/Nav'
import { FilterPanel } from '../components/FilterPanel'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'
import { Plus, Search, Package, Warehouse } from 'lucide-react'
import Link from 'next/link'

// Mock data for inventory
const mockProducts = [
  {
    id: '1',
    name: 'Laptop Dell XPS 13',
    category: 'Equipamentos',
    sku: 'DELL-XPS13-001',
    price: 1299.99,
    stock: 15,
    location: 'Armazém Lisboa',
    status: 'active',
  },
  {
    id: '2',
    name: 'Monitor LG 27"',
    category: 'Equipamentos',
    sku: 'LG-MON27-002',
    price: 299.99,
    stock: 23,
    location: 'Armazém Porto',
    status: 'active',
  },
  {
    id: '3',
    name: 'Teclado Mecânico Logitech',
    category: 'Periféricos',
    sku: 'LOG-KEYB-003',
    price: 89.99,
    stock: 42,
    location: 'Armazém Lisboa',
    status: 'active',
  },
  {
    id: '4',
    name: 'Mouse Wireless Microsoft',
    category: 'Periféricos',
    sku: 'MS-MOUSE-004',
    price: 49.99,
    stock: 38,
    location: 'Armazém Porto',
    status: 'low',
  },
  {
    id: '5',
    name: 'Headset Bluetooth Sony',
    category: 'Áudio',
    sku: 'SONY-HS-005',
    price: 129.99,
    stock: 7,
    location: 'Armazém Lisboa',
    status: 'low',
  },
  {
    id: '6',
    name: 'Webcam Logitech HD',
    category: 'Periféricos',
    sku: 'LOG-WC-006',
    price: 79.99,
    stock: 0,
    location: 'Armazém Porto',
    status: 'out',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'category',
    label: 'Categoria',
    type: 'select' as const,
    options: [
      { label: 'Equipamentos', value: 'Equipamentos' },
      { label: 'Periféricos', value: 'Periféricos' },
      { label: 'Áudio', value: 'Áudio' },
    ],
  },
  {
    name: 'location',
    label: 'Localização',
    type: 'select' as const,
    options: [
      { label: 'Armazém Lisboa', value: 'Armazém Lisboa' },
      { label: 'Armazém Porto', value: 'Armazém Porto' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Em estoque', value: 'active' },
      { label: 'Estoque baixo', value: 'low' },
      { label: 'Sem estoque', value: 'out' },
    ],
  },
];

export default function InventoryPage() {
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
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
    let filtered = [...products];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.sku.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((product) => {
          if (typeof product[key as keyof typeof product] === 'string') {
            return (product[key as keyof typeof product] as string).toLowerCase() === value.toLowerCase();
          }
          return product[key as keyof typeof product] === value;
        });
      }
    });

    setFilteredProducts(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredProducts(products);
  };

  // Table columns
  const columns = [
    {
      header: 'Nome',
      accessor: 'name',
    },
    {
      header: 'SKU',
      accessor: 'sku',
    },
    {
      header: 'Categoria',
      accessor: 'category',
    },
    {
      header: 'Preço',
      accessor: 'price',
      cell: (value: number) => `€${value.toFixed(2)}`,
    },
    {
      header: 'Estoque',
      accessor: 'stock',
      cell: (value: number, row: any) => (
        <span className={
          row.status === 'out' ? 'text-red-500' : 
          row.status === 'low' ? 'text-yellow-500' : 
          'text-green-500'
        }>
          {value}
        </span>
      ),
    },
    {
      header: 'Localização',
      accessor: 'location',
    },
  ];

  return (
    <>
      <SlideFrame />
      <Nav />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Inventário e Produção</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Adicionar Produto
          </button>
        </div>

        {/* Navigation cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Link href="/inventory/products" className="bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg p-4 flex items-center gap-4">
            <div className="bg-violet-900/30 p-3 rounded-lg">
              <Package size={24} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-white font-medium">Produtos e Serviços</h3>
              <p className="text-gray-400 text-sm">Gerenciar catálogo de produtos</p>
            </div>
          </Link>
          
          <Link href="/inventory/warehouses" className="bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg p-4 flex items-center gap-4">
            <div className="bg-violet-900/30 p-3 rounded-lg">
              <Warehouse size={24} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-white font-medium">Armazéns</h3>
              <p className="text-gray-400 text-sm">Gestão de estoque e armazéns</p>
            </div>
          </Link>
          
          <Link href="/inventory/equipment" className="bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg p-4 flex items-center gap-4">
            <div className="bg-violet-900/30 p-3 rounded-lg">
              {/* <Tool size={24} className="text-violet-400" /> */}
            </div>
            <div>
              <h3 className="text-white font-medium">Equipamentos</h3>
              <p className="text-gray-400 text-sm">Manutenção e controle de equipamentos</p>
            </div>
          </Link>
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
            placeholder="Pesquisar produtos..."
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

        {/* Products table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredProducts}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Adicionar Novo Produto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields would go here */}
            <p className="text-gray-400 col-span-full">Formulário de cadastro de produto</p>
          </div>
        </Modal>
      )}
    </>
  );
}