'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { Nav } from '../../components/Nav'
import { Table } from '../../components/Table'
import { FilterPanel } from '../../components/FilterPanel'
import { Modal } from '../../components/Modal'
import { Plus, ArrowLeft, Download, FileText, BarChart, Calculator } from 'lucide-react'
import Link from 'next/link'

// Mock data for reports
const mockReports = [
  {
    id: '1',
    name: 'Demonstração de Resultados - Q1 2023',
    type: 'income_statement',
    period: 'Q1 2023',
    createdAt: '15/04/2023',
    createdBy: 'Maria Santos',
    status: 'final',
  },
  {
    id: '2',
    name: 'Balanço Patrimonial - Q1 2023',
    type: 'balance_sheet',
    period: 'Q1 2023',
    createdAt: '15/04/2023',
    createdBy: 'Maria Santos',
    status: 'final',
  },
  {
    id: '3',
    name: 'Fluxo de Caixa - Q1 2023',
    type: 'cash_flow',
    period: 'Q1 2023',
    createdAt: '15/04/2023',
    createdBy: 'Maria Santos',
    status: 'final',
  },
  {
    id: '4',
    name: 'Relatório de Vendas - Março 2023',
    type: 'sales',
    period: 'Março 2023',
    createdAt: '05/04/2023',
    createdBy: 'Carlos Rodrigues',
    status: 'final',
  },
  {
    id: '5',
    name: 'Relatório de Despesas - Março 2023',
    type: 'expenses',
    period: 'Março 2023',
    createdAt: '05/04/2023',
    createdBy: 'António Ferreira',
    status: 'final',
  },
  {
    id: '6',
    name: 'Previsão Financeira - Q2 2023',
    type: 'forecast',
    period: 'Q2 2023',
    createdAt: '20/03/2023',
    createdBy: 'Maria Santos',
    status: 'draft',
  },
];

// Mock data for invoices
const mockInvoices = [
  {
    id: '1',
    number: 'FT 2023/001',
    client: 'Empresa ABC',
    issueDate: '10/03/2023',
    dueDate: '10/04/2023',
    amount: 3899.97,
    status: 'paid',
  },
  {
    id: '2',
    number: 'FT 2023/002',
    client: 'Empresa XYZ',
    issueDate: '15/03/2023',
    dueDate: '15/04/2023',
    amount: 2500.00,
    status: 'paid',
  },
  {
    id: '3',
    number: 'FT 2023/003',
    client: 'Empresa DEF',
    issueDate: '20/03/2023',
    dueDate: '20/04/2023',
    amount: 4200.00,
    status: 'pending',
  },
  {
    id: '4',
    number: 'FT 2023/004',
    client: 'Empresa GHI',
    issueDate: '25/03/2023',
    dueDate: '25/04/2023',
    amount: 1850.50,
    status: 'pending',
  },
  {
    id: '5',
    number: 'FT 2023/005',
    client: 'Empresa JKL',
    issueDate: '30/03/2023',
    dueDate: '30/04/2023',
    amount: 3200.00,
    status: 'pending',
  },
];

// Mock data for taxes
const mockTaxes = [
  {
    id: '1',
    name: 'IVA - Q1 2023',
    type: 'IVA',
    period: 'Q1 2023',
    dueDate: '15/05/2023',
    amount: 12500.00,
    status: 'pending',
  },
  {
    id: '2',
    name: 'IRC - Pagamento por Conta',
    type: 'IRC',
    period: 'Março 2023',
    dueDate: '20/04/2023',
    amount: 5000.00,
    status: 'pending',
  },
  {
    id: '3',
    name: 'IRS - Retenções na Fonte',
    type: 'IRS',
    period: 'Março 2023',
    dueDate: '20/04/2023',
    amount: 3200.00,
    status: 'pending',
  },
  {
    id: '4',
    name: 'Segurança Social',
    type: 'SS',
    period: 'Março 2023',
    dueDate: '20/04/2023',
    amount: 4800.00,
    status: 'pending',
  },
  {
    id: '5',
    name: 'IVA - Fevereiro 2023',
    type: 'IVA',
    period: 'Fevereiro 2023',
    dueDate: '15/03/2023',
    amount: 4200.00,
    status: 'paid',
  },
];

// Filter fields for reports
const reportFilterFields = [
  {
    name: 'type',
    label: 'Tipo',
    type: 'select' as const,
    options: [
      { label: 'Demonstração de Resultados', value: 'income_statement' },
      { label: 'Balanço Patrimonial', value: 'balance_sheet' },
      { label: 'Fluxo de Caixa', value: 'cash_flow' },
      { label: 'Vendas', value: 'sales' },
      { label: 'Despesas', value: 'expenses' },
      { label: 'Previsão', value: 'forecast' },
    ],
  },
  {
    name: 'period',
    label: 'Período',
    type: 'select' as const,
    options: [
      { label: 'Q1 2023', value: 'Q1 2023' },
      { label: 'Q2 2023', value: 'Q2 2023' },
      { label: 'Março 2023', value: 'Março 2023' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Final', value: 'final' },
      { label: 'Rascunho', value: 'draft' },
    ],
  },
];

// Filter fields for invoices
const invoiceFilterFields = [
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Pago', value: 'paid' },
      { label: 'Pendente', value: 'pending' },
      { label: 'Vencido', value: 'overdue' },
      { label: 'Cancelado', value: 'cancelled' },
    ],
  },
];

// Filter fields for taxes
const taxFilterFields = [
  {
    name: 'type',
    label: 'Tipo',
    type: 'select' as const,
    options: [
      { label: 'IVA', value: 'IVA' },
      { label: 'IRC', value: 'IRC' },
      { label: 'IRS', value: 'IRS' },
      { label: 'Segurança Social', value: 'SS' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Pago', value: 'paid' },
      { label: 'Pendente', value: 'pending' },
    ],
  },
];

export default function FinancialReportsPage() {
  const [activeTab, setActiveTab] = useState<'reports' | 'invoices' | 'taxes'>('reports');
  
  const [reports, setReports] = useState(mockReports);
  const [filteredReports, setFilteredReports] = useState(mockReports);
  const [reportFilterValues, setReportFilterValues] = useState<Record<string, any>>({});
  
  const [invoices, setInvoices] = useState(mockInvoices);
  const [filteredInvoices, setFilteredInvoices] = useState(mockInvoices);
  const [invoiceFilterValues, setInvoiceFilterValues] = useState<Record<string, any>>({});
  
  const [taxes, setTaxes] = useState(mockTaxes);
  const [filteredTaxes, setFilteredTaxes] = useState(mockTaxes);
  const [taxFilterValues, setTaxFilterValues] = useState<Record<string, any>>({});
  
  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
  const [showAddTaxModal, setShowAddTaxModal] = useState(false);

  // Handle filter change for reports
  const handleReportFilterChange = (name: string, value: any) => {
    setReportFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply report filters
  const applyReportFilters = () => {
    let filtered = [...reports];

    // Apply filters
    Object.entries(reportFilterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((report) => {
          if (typeof report[key as keyof typeof report] === 'string') {
            return (report[key as keyof typeof report] as string).toLowerCase() === value.toLowerCase();
          }
          return report[key as keyof typeof report] === value;
        });
      }
    });

    setFilteredReports(filtered);
  };

  // Reset report filters
  const resetReportFilters = () => {
    setReportFilterValues({});
    setFilteredReports(reports);
  };

  // Handle filter change for invoices
  const handleInvoiceFilterChange = (name: string, value: any) => {
    setInvoiceFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply invoice filters
  const applyInvoiceFilters = () => {
    let filtered = [...invoices];

    // Apply filters
    Object.entries(invoiceFilterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((invoice) => {
          if (typeof invoice[key as keyof typeof invoice] === 'string') {
            return (invoice[key as keyof typeof invoice] as string).toLowerCase() === value.toLowerCase();
          }
          return invoice[key as keyof typeof invoice] === value;
        });
      }
    });

    setFilteredInvoices(filtered);
  };

  // Reset invoice filters
  const resetInvoiceFilters = () => {
    setInvoiceFilterValues({});
    setFilteredInvoices(invoices);
  };

  // Handle filter change for taxes
  const handleTaxFilterChange = (name: string, value: any) => {
    setTaxFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply tax filters
  const applyTaxFilters = () => {
    let filtered = [...taxes];

    // Apply filters
    Object.entries(taxFilterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((tax) => {
          if (typeof tax[key as keyof typeof tax] === 'string') {
            return (tax[key as keyof typeof tax] as string).toLowerCase() === value.toLowerCase();
          }
          return tax[key as keyof typeof tax] === value;
        });
      }
    });

    setFilteredTaxes(filtered);
  };

  // Reset tax filters
  const resetTaxFilters = () => {
    setTaxFilterValues({});
    setFilteredTaxes(taxes);
  };

  // Reports table columns
  const reportsColumns = [
    {
      header: 'Nome',
      accessor: 'name',
    },
    {
      header: 'Tipo',
      accessor: 'type',
      cell: (value: string) => {
        if (value === 'income_statement') return 'Demonstração de Resultados';
        if (value === 'balance_sheet') return 'Balanço Patrimonial';
        if (value === 'cash_flow') return 'Fluxo de Caixa';
        if (value === 'sales') return 'Vendas';
        if (value === 'expenses') return 'Despesas';
        if (value === 'forecast') return 'Previsão';
        return value;
      },
    },
    {
      header: 'Período',
      accessor: 'period',
    },
    {
      header: 'Criado em',
      accessor: 'createdAt',
    },
    {
      header: 'Criado por',
      accessor: 'createdBy',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'final') return <span className="text-green-500">Final</span>;
        if (value === 'draft') return <span className="text-yellow-500">Rascunho</span>;
        return value;
      },
    },
    {
      header: 'Ações',
      accessor: 'id',
      cell: (value: string) => (
        <button className="text-violet-400 hover:text-violet-300 transition-colors duration-200">
          <Download size={18} />
        </button>
      ),
    },
  ];

  // Invoices table columns
  const invoicesColumns = [
    {
      header: 'Número',
      accessor: 'number',
    },
    {
      header: 'Cliente',
      accessor: 'client',
    },
    {
      header: 'Data de Emissão',
      accessor: 'issueDate',
    },
    {
      header: 'Data de Vencimento',
      accessor: 'dueDate',
    },
    {
      header: 'Valor',
      accessor: 'amount',
      cell: (value: number) => `€${value.toFixed(2)}`,
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'paid') return <span className="text-green-500">Pago</span>;
        if (value === 'pending') return <span className="text-yellow-500">Pendente</span>;
        if (value === 'overdue') return <span className="text-red-500">Vencido</span>;
        if (value === 'cancelled') return <span className="text-gray-500">Cancelado</span>;
        return value;
      },
    },
    {
      header: 'Ações',
      accessor: 'id',
      cell: (value: string) => (
        <button className="text-violet-400 hover:text-violet-300 transition-colors duration-200">
          <Download size={18} />
        </button>
      ),
    },
  ];

  // Taxes table columns
  const taxesColumns = [
    {
      header: 'Nome',
      accessor: 'name',
    },
    {
      header: 'Tipo',
      accessor: 'type',
    },
    {
      header: 'Período',
      accessor: 'period',
    },
    {
      header: 'Data de Vencimento',
      accessor: 'dueDate',
    },
    {
      header: 'Valor',
      accessor: 'amount',
      cell: (value: number) => `€${value.toFixed(2)}`,
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'paid') return <span className="text-green-500">Pago</span>;
        if (value === 'pending') return <span className="text-yellow-500">Pendente</span>;
        return value;
      },
    },
  ];

  return (
    <>
      <SlideFrame />
      <Nav />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center mb-6">
          <Link href="/financial" className="mr-4 text-gray-400 hover:text-violet-400 transition-colors duration-200">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-white">Relatórios e Faturação</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'reports'
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-gray-400 hover:text-violet-300'
            }`}
            onClick={() => setActiveTab('reports')}
          >
            <div className="flex items-center gap-2">
              <BarChart size={18} />
              <span>Relatórios</span>
            </div>
          </button>
          
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'invoices'
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-gray-400 hover:text-violet-300'
            }`}
            onClick={() => setActiveTab('invoices')}
          >
            <div className="flex items-center gap-2">
              <FileText size={18} />
              <span>Faturas</span>
            </div>
          </button>
          
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'taxes'
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-gray-400 hover:text-violet-300'
            }`}
            onClick={() => setActiveTab('taxes')}
          >
            <div className="flex items-center gap-2">
              <Calculator size={18} />
              <span>Impostos</span>
            </div>
          </button>
        </div>

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowAddReportModal(true)}
                className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
              >
                <Plus size={18} />
                Gerar Relatório
              </button>
            </div>

            <FilterPanel
              fields={reportFilterFields}
              values={reportFilterValues}
              onChange={handleReportFilterChange}
              onApply={applyReportFilters}
              onReset={resetReportFilters}
            />

            <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
              <Table
                columns={reportsColumns}
                data={filteredReports}
                onRowClick={(row) => console.log('Report clicked:', row)}
              />
            </div>
          </>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowAddInvoiceModal(true)}
                className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
              >
                <Plus size={18} />
                Nova Fatura
              </button>
            </div>

            <FilterPanel
              fields={invoiceFilterFields}
              values={invoiceFilterValues}
              onChange={handleInvoiceFilterChange}
              onApply={applyInvoiceFilters}
              onReset={resetInvoiceFilters}
            />

            <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
              <Table
                columns={invoicesColumns}
                data={filteredInvoices}
                onRowClick={(row) => console.log('Invoice clicked:', row)}
              />
            </div>
          </>
        )}

        {/* Taxes Tab */}
        {activeTab === 'taxes' && (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowAddTaxModal(true)}
                className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
              >
                <Plus size={18} />
                Novo Imposto
              </button>
            </div>

            <FilterPanel
              fields={taxFilterFields}
              values={taxFilterValues}
              onChange={handleTaxFilterChange}
              onApply={applyTaxFilters}
              onReset={resetTaxFilters}
            />

            <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
              <Table
                columns={taxesColumns}
                data={filteredTaxes}
                onRowClick={(row) => console.log('Tax clicked:', row)}
              />
            </div>
          </>
        )}
      </div>

      {/* Add Report Modal */}
      {showAddReportModal && (
        <Modal onclick={() => setShowAddReportModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Gerar Novo Relatório</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields would go here */}
            <p className="text-gray-400 col-span-full">Formulário para gerar novo relatório financeiro</p>
          </div>
        </Modal>
      )}

      {/* Add Invoice Modal */}
      {showAddInvoiceModal && (
        <Modal onclick={() => setShowAddInvoiceModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Criar Nova Fatura</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields would go here */}
            <p className="text-gray-400 col-span-full">Formulário para criar nova fatura</p>
          </div>
        </Modal>
      )}

      {/* Add Tax Modal */}
      {showAddTaxModal && (
        <Modal onclick={() => setShowAddTaxModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Adicionar Novo Imposto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields would go here */}
            <p className="text-gray-400 col-span-full">Formulário para adicionar novo imposto</p>
          </div>
        </Modal>
      )}
    </>
  );
}