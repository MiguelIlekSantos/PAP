'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Nav } from '../components/Nav'
import { DrawerMenu } from '../components/DrawerMenu'
import { FilterPanel } from '../components/FilterPanel'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'
import { Plus, Search, TrendingUp, Users, Mail, BarChart3 } from 'lucide-react'
import { MarketingTabs } from '../data/tabs'

// Mock data for marketing campaigns
const mockCampaigns = [
  {
    id: '1',
    name: 'Campanha de Verão 2024',
    type: 'Email Marketing',
    status: 'active',
    startDate: '01/06/2024',
    endDate: '31/08/2024',
    budget: 5000.00,
    spent: 2350.00,
    leads: 245,
    conversions: 32,
    roi: 156.8,
  },
  {
    id: '2',
    name: 'Promoção Black Friday',
    type: 'Redes Sociais',
    status: 'planned',
    startDate: '15/11/2024',
    endDate: '30/11/2024',
    budget: 8000.00,
    spent: 0.00,
    leads: 0,
    conversions: 0,
    roi: 0,
  },
  {
    id: '3',
    name: 'Lançamento Produto X',
    type: 'Google Ads',
    status: 'completed',
    startDate: '01/03/2024',
    endDate: '31/03/2024',
    budget: 3000.00,
    spent: 2890.00,
    leads: 189,
    conversions: 28,
    roi: 142.3,
  },
  {
    id: '4',
    name: 'Webinar Educativo',
    type: 'Content Marketing',
    status: 'active',
    startDate: '15/05/2024',
    endDate: '15/07/2024',
    budget: 2000.00,
    spent: 1200.00,
    leads: 156,
    conversions: 45,
    roi: 225.0,
  },
];

// Filter fields
const filterFields = [
  {
    name: 'type',
    label: 'Tipo de Campanha',
    type: 'select' as const,
    options: [
      { label: 'Email Marketing', value: 'Email Marketing' },
      { label: 'Redes Sociais', value: 'Redes Sociais' },
      { label: 'Google Ads', value: 'Google Ads' },
      { label: 'Content Marketing', value: 'Content Marketing' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Ativa', value: 'active' },
      { label: 'Planejada', value: 'planned' },
      { label: 'Concluída', value: 'completed' },
      { label: 'Pausada', value: 'paused' },
    ],
  },
];

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [filteredCampaigns, setFilteredCampaigns] = useState(mockCampaigns);
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
    let filtered = [...campaigns];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (campaign) =>
          campaign.name.toLowerCase().includes(term) ||
          campaign.type.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((campaign) => {
          if (typeof campaign[key as keyof typeof campaign] === 'string') {
            return (campaign[key as keyof typeof campaign] as string).toLowerCase() === value.toLowerCase();
          }
          return campaign[key as keyof typeof campaign] === value;
        });
      }
    });

    setFilteredCampaigns(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredCampaigns(campaigns);
  };

  // Calculate totals
  const totalBudget = filteredCampaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = filteredCampaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalLeads = filteredCampaigns.reduce((sum, c) => sum + c.leads, 0);
  const totalConversions = filteredCampaigns.reduce((sum, c) => sum + c.conversions, 0);
  const avgROI = filteredCampaigns.length > 0 
    ? filteredCampaigns.reduce((sum, c) => sum + c.roi, 0) / filteredCampaigns.length 
    : 0;

  // Table columns
  const columns = [
    {
      header: 'Nome da Campanha',
      accessor: 'name',
    },
    {
      header: 'Tipo',
      accessor: 'type',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'active') return <span className="text-green-500">Ativa</span>;
        if (value === 'planned') return <span className="text-blue-500">Planejada</span>;
        if (value === 'completed') return <span className="text-gray-500">Concluída</span>;
        if (value === 'paused') return <span className="text-yellow-500">Pausada</span>;
        return value;
      },
    },
    {
      header: 'Orçamento',
      accessor: 'budget',
      cell: (value: number) => `€${value.toFixed(2)}`,
    },
    {
      header: 'Gasto',
      accessor: 'spent',
      cell: (value: number) => `€${value.toFixed(2)}`,
    },
    {
      header: 'Leads',
      accessor: 'leads',
    },
    {
      header: 'Conversões',
      accessor: 'conversions',
    },
    {
      header: 'ROI (%)',
      accessor: 'roi',
      cell: (value: number) => (
        <span className={value > 100 ? 'text-green-500' : 'text-red-500'}>
          {value.toFixed(1)}%
        </span>
      ),
    },
  ];

  return (
    <>
      <SlideFrame />
      <Nav />
      <DrawerMenu tabs={MarketingTabs} page="/marketing" />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Dashboard de Marketing</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Nova Campanha
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={20} className="text-violet-400" />
              <h3 className="text-gray-400 text-sm">Orçamento Total</h3>
            </div>
            <p className="text-white text-xl font-bold">€{totalBudget.toFixed(2)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 size={20} className="text-violet-400" />
              <h3 className="text-gray-400 text-sm">Gasto Total</h3>
            </div>
            <p className="text-red-500 text-xl font-bold">€{totalSpent.toFixed(2)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Users size={20} className="text-violet-400" />
              <h3 className="text-gray-400 text-sm">Total de Leads</h3>
            </div>
            <p className="text-blue-500 text-xl font-bold">{totalLeads}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Mail size={20} className="text-violet-400" />
              <h3 className="text-gray-400 text-sm">Conversões</h3>
            </div>
            <p className="text-green-500 text-xl font-bold">{totalConversions}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={20} className="text-violet-400" />
              <h3 className="text-gray-400 text-sm">ROI Médio</h3>
            </div>
            <p className={`text-xl font-bold ${avgROI > 100 ? 'text-green-500' : 'text-red-500'}`}>
              {avgROI.toFixed(1)}%
            </p>
          </div>
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
            placeholder="Pesquisar campanhas..."
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

        {/* Campaigns table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredCampaigns}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </div>
      </div>

      {/* Add Campaign Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Nova Campanha de Marketing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields would go here */}
            <p className="text-gray-400 col-span-full">Formulário para criar nova campanha de marketing</p>
          </div>
        </Modal>
      )}
    </>
  );
}