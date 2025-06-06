'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { FilterPanel } from '../../components/FilterPanel'
import { BarChart, TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react'

export default function SalesReportsPage() {
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});

  // Mock data for reports
  const salesData = {
    totalSales: 125000.50,
    totalOrders: 45,
    totalClients: 28,
    averageOrderValue: 2777.78,
    monthlyGrowth: 12.5,
  };

  const topProducts = [
    { name: 'Sistema ERP Personalizado', sales: 45000.00, quantity: 3 },
    { name: 'Licenças Microsoft Office', sales: 15000.00, quantity: 100 },
    { name: 'Computadores Dell', sales: 22500.00, quantity: 25 },
    { name: 'Serviços de Consultoria', sales: 18000.00, quantity: 12 },
  ];

  const topClients = [
    { name: 'Indústria Metalúrgica', sales: 45000.00, orders: 3 },
    { name: 'Empresa ABC Lda', sales: 25000.00, orders: 8 },
    { name: 'Tech Solutions SA', sales: 18000.00, orders: 12 },
    { name: 'Clínica Médica Central', sales: 15000.00, orders: 5 },
  ];

  // Filter fields
  const filterFields = [
    {
      name: 'period',
      label: 'Período',
      type: 'select' as const,
      options: [
        { label: 'Último Mês', value: 'last_month' },
        { label: 'Últimos 3 Meses', value: 'last_3_months' },
        { label: 'Últimos 6 Meses', value: 'last_6_months' },
        { label: 'Último Ano', value: 'last_year' },
      ],
    },
    {
      name: 'type',
      label: 'Tipo de Relatório',
      type: 'select' as const,
      options: [
        { label: 'Vendas por Produto', value: 'products' },
        { label: 'Vendas por Cliente', value: 'clients' },
        { label: 'Vendas por Vendedor', value: 'salesperson' },
        { label: 'Vendas por Região', value: 'region' },
      ],
    },
  ];

  // Handle filter change
  const handleFilterChange = (name: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    console.log('Applying filters:', filterValues);
  };

  const resetFilters = () => {
    setFilterValues({});
  };

  return (
    <>
      <SlideFrame />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Relatórios de Vendas</h1>
          <button className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200">
            <BarChart size={18} />
            Exportar Relatório
          </button>
        </div>

        {/* Filters */}
        <FilterPanel
          fields={filterFields}
          values={filterValues}
          onChange={handleFilterChange}
          onApply={applyFilters}
          onReset={resetFilters}
        />

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="text-green-500" size={24} />
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Total de Vendas</h3>
                <p className="text-green-500 text-xl font-bold">€{salesData.totalSales.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <ShoppingCart className="text-blue-500" size={24} />
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Total de Pedidos</h3>
                <p className="text-blue-500 text-xl font-bold">{salesData.totalOrders}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Users className="text-purple-500" size={24} />
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Total de Clientes</h3>
                <p className="text-purple-500 text-xl font-bold">{salesData.totalClients}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <BarChart className="text-orange-500" size={24} />
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Valor Médio por Pedido</h3>
                <p className="text-orange-500 text-xl font-bold">€{salesData.averageOrderValue.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-cyan-500" size={24} />
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Crescimento Mensal</h3>
                <p className="text-cyan-500 text-xl font-bold">+{salesData.monthlyGrowth}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reports sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Produtos Mais Vendidos</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#161f2c] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">{product.name}</h3>
                    <p className="text-gray-400 text-sm">Quantidade: {product.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-500 font-bold">€{product.sales.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Clients */}
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Melhores Clientes</h2>
            <div className="space-y-4">
              {topClients.map((client, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#161f2c] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">{client.name}</h3>
                    <p className="text-gray-400 text-sm">Pedidos: {client.orders}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-500 font-bold">€{client.sales.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart placeholder */}
        <div className="mt-6 bg-[#0d1218] border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Evolução das Vendas</h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
            <div className="text-center text-gray-400">
              <BarChart size={48} className="mx-auto mb-2" />
              <p>Gráfico de vendas será exibido aqui</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}