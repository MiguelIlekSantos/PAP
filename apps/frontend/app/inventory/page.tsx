'use client'

import React, { useState } from 'react'
import { Plus, Search, ArrowLeft, Table } from 'lucide-react'
import Link from 'next/link'
import { SlideFrame } from '../components/SlideFrame';
import { FilterPanel } from '../components/FilterPanel';
import { Modal } from '../components/Modal';

// Mock data for products
const mockProducts = [
  {
    id: '1',
    name: 'Laptop Dell XPS 13',
    category: 'Equipamentos',
    sku: 'DELL-XPS13-001',
    price: 1299.99,
    cost: 1050.00,
    stock: 15,
    minStock: 5,
    supplier: 'Dell Portugal',
    status: 'active',
  },
  {
    id: '2',
    name: 'Monitor LG 27"',
    category: 'Equipamentos',
    sku: 'LG-MON27-002',
    price: 299.99,
    cost: 220.00,
    stock: 23,
    minStock: 8,
    supplier: 'LG Electronics',
    status: 'active',
  },
  {
    id: '3',
    name: 'Teclado Mecânico Logitech',
    category: 'Periféricos',
    sku: 'LOG-KEYB-003',
    price: 89.99,
    cost: 65.00,
    stock: 42,
    minStock: 10,
    supplier: 'Logitech Portugal',
    status: 'active',
  },
  {
    id: '4',
    name: 'Mouse Wireless Microsoft',
    category: 'Periféricos',
    sku: 'MS-MOUSE-004',
    price: 49.99,
    cost: 32.50,
    stock: 38,
    minStock: 15,
    supplier: 'Microsoft Portugal',
    status: 'low',
  },
  {
    id: '5',
    name: 'Headset Bluetooth Sony',
    category: 'Áudio',
    sku: 'SONY-HS-005',
    price: 129.99,
    cost: 95.00,
    stock: 7,
    minStock: 10,
    supplier: 'Sony Portugal',
    status: 'low',
  },
  {
    id: '6',
    name: 'Webcam Logitech HD',
    category: 'Periféricos',
    sku: 'LOG-WC-006',
    price: 79.99,
    cost: 55.00,
    stock: 0,
    minStock: 5,
    supplier: 'Logitech Portugal',
    status: 'out',
  },
  {
    id: '7',
    name: 'Serviço de Instalação',
    category: 'Serviços',
    sku: 'SRV-INST-001',
    price: 50.00,
    cost: 35.00,
    stock: null,
    minStock: null,
    supplier: 'Interno',
    status: 'service',
  },
  {
    id: '8',
    name: 'Serviço de Manutenção',
    category: 'Serviços',
    sku: 'SRV-MAINT-002',
    price: 75.00,
    cost: 50.00,
    stock: null,
    minStock: null,
    supplier: 'Interno',
    status: 'service',
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
      { label: 'Serviços', value: 'Serviços' },
    ],
  },
  {
    name: 'supplier',
    label: 'Fornecedor',
    type: 'select' as const,
    options: [
      { label: 'Dell Portugal', value: 'Dell Portugal' },
      { label: 'LG Electronics', value: 'LG Electronics' },
      { label: 'Logitech Portugal', value: 'Logitech Portugal' },
      { label: 'Microsoft Portugal', value: 'Microsoft Portugal' },
      { label: 'Sony Portugal', value: 'Sony Portugal' },
      { label: 'Interno', value: 'Interno' },
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
      { label: 'Serviço', value: 'service' },
    ],
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

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
          product.category.toLowerCase().includes(term) ||
          (product.supplier && product.supplier.toLowerCase().includes(term))
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

  // Handle product click
  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setShowProductModal(true);
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
      header: 'Custo',
      accessor: 'cost',
      cell: (value: number) => `€${value.toFixed(2)}`,
    },
    {
      header: 'Estoque',
      accessor: 'stock',
      cell: (value: number | null, row: any) => {
        if (row.status === 'service') return 'N/A';
        return (
          <span className={
            row.status === 'out' ? 'text-red-500' : 
            row.status === 'low' ? 'text-yellow-500' : 
            'text-green-500'
          }>
            {value}
          </span>
        );
      },
    },
    {
      header: 'Fornecedor',
      accessor: 'supplier',
    },
  ];

  return (
    <>
      <SlideFrame />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center mb-6">
          <Link href="/inventory" className="mr-4 text-gray-400 hover:text-violet-400 transition-colors duration-200">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-white">Produtos e Serviços</h1>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Adicionar Produto/Serviço
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
            placeholder="Pesquisar produtos e serviços..."
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
            onRowClick={handleProductClick}
          />
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Adicionar Novo Produto/Serviço</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields would go here */}
            <p className="text-gray-400 col-span-full">Formulário de cadastro de produto ou serviço</p>
          </div>
        </Modal>
      )}

      {/* Product Details Modal */}
      {showProductModal && selectedProduct && (
        <Modal onclick={() => setShowProductModal(false)} isCreate={false} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full md:col-span-1">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Informações Básicas</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-400">SKU:</span> {selectedProduct.sku}</p>
                  <p><span className="text-gray-400">Categoria:</span> {selectedProduct.category}</p>
                  <p><span className="text-gray-400">Preço:</span> €{selectedProduct.price.toFixed(2)}</p>
                  <p><span className="text-gray-400">Custo:</span> €{selectedProduct.cost.toFixed(2)}</p>
                  <p><span className="text-gray-400">Margem:</span> {((selectedProduct.price - selectedProduct.cost) / selectedProduct.price * 100).toFixed(2)}%</p>
                  <p><span className="text-gray-400">Fornecedor:</span> {selectedProduct.supplier}</p>
                </div>
              </div>
            </div>
            <div className="col-span-full md:col-span-1">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Estoque</h3>
                <div className="space-y-2">
                  {selectedProduct.status === 'service' ? (
                    <p className="text-gray-400">Este item é um serviço e não possui estoque.</p>
                  ) : (
                    <>
                      <p>
                        <span className="text-gray-400">Quantidade em Estoque:</span> 
                        <span className={
                          selectedProduct.status === 'out' ? 'text-red-500 ml-2' : 
                          selectedProduct.status === 'low' ? 'text-yellow-500 ml-2' : 
                          'text-green-500 ml-2'
                        }>
                          {selectedProduct.stock}
                        </span>
                      </p>
                      <p><span className="text-gray-400">Estoque Mínimo:</span> {selectedProduct.minStock}</p>
                      <p><span className="text-gray-400">Status:</span> {
                        selectedProduct.status === 'active' ? 'Em estoque' :
                        selectedProduct.status === 'low' ? 'Estoque baixo' :
                        'Sem estoque'
                      }</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Histórico de Movimentações</h3>
                <div className="space-y-2">
                  <p className="text-gray-400">Histórico de entradas e saídas do produto</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}