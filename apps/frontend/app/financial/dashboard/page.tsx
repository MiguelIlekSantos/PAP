'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { Nav } from '../../components/Nav'
import { Table } from '../../components/Table'
import { Modal } from '../../components/Modal'
import { Plus, ArrowLeft, ArrowUp, ArrowDown, Building, CreditCard } from 'lucide-react'
import Link from 'next/link'

// Mock data for bank accounts
const mockBankAccounts = [
  {
    id: '1',
    bank: 'Banco Millennium BCP',
    accountNumber: 'PT50 0033 0000 12345678901 05',
    accountType: 'Conta Corrente',
    balance: 25680.45,
    currency: 'EUR',
    lastUpdate: '15/03/2023',
  },
  {
    id: '2',
    bank: 'Banco Santander',
    accountNumber: 'PT50 0018 0000 98765432101 76',
    accountType: 'Conta Corrente',
    balance: 18320.78,
    currency: 'EUR',
    lastUpdate: '15/03/2023',
  },
  {
    id: '3',
    bank: 'Caixa Geral de Depósitos',
    accountNumber: 'PT50 0035 0000 45678901234 56',
    accountType: 'Conta Poupança',
    balance: 50000.00,
    currency: 'EUR',
    lastUpdate: '10/03/2023',
  },
];

// Mock data for cash flow
const mockCashFlow = [
  { month: 'Jan', income: 28500, expense: 22300 },
  { month: 'Fev', income: 32100, expense: 24500 },
  { month: 'Mar', income: 29800, expense: 23100 },
  { month: 'Abr', income: 31200, expense: 25600 },
  { month: 'Mai', income: 33500, expense: 26200 },
  { month: 'Jun', income: 35800, expense: 27400 },
];

// Mock data for upcoming transactions
const mockUpcomingTransactions = [
  {
    id: '1',
    date: '20/03/2023',
    description: 'Pagamento de Fornecedor - LG Electronics',
    type: 'expense',
    amount: 3850.00,
    account: 'Banco Millennium BCP',
  },
  {
    id: '2',
    date: '22/03/2023',
    description: 'Recebimento de Cliente - Empresa DEF',
    type: 'income',
    amount: 4200.00,
    account: 'Banco Santander',
  },
  {
    id: '3',
    date: '25/03/2023',
    description: 'Pagamento de Serviços - Eletricidade',
    type: 'expense',
    amount: 850.00,
    account: 'Banco Millennium BCP',
  },
  {
    id: '4',
    date: '28/03/2023',
    description: 'Pagamento de Salários',
    type: 'expense',
    amount: 12500.00,
    account: 'Banco Santander',
  },
  {
    id: '5',
    date: '30/03/2023',
    description: 'Recebimento de Cliente - Empresa GHI',
    type: 'income',
    amount: 3600.00,
    account: 'Banco Millennium BCP',
  },
];

export default function FinancialDashboardPage() {
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);

  // Calculate totals
  const totalBalance = mockBankAccounts.reduce((sum, account) => sum + account.balance, 0);
  
  const totalUpcomingIncome = mockUpcomingTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalUpcomingExpense = mockUpcomingTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const projectedBalance = totalBalance + totalUpcomingIncome - totalUpcomingExpense;

  // Bank accounts table columns
  const bankAccountsColumns = [
    {
      header: 'Banco',
      accessor: 'bank',
    },
    {
      header: 'Número da Conta',
      accessor: 'accountNumber',
    },
    {
      header: 'Tipo',
      accessor: 'accountType',
    },
    {
      header: 'Saldo',
      accessor: 'balance',
      cell: (value: number) => `€${value.toFixed(2)}`,
    },
    {
      header: 'Última Atualização',
      accessor: 'lastUpdate',
    },
  ];

  // Upcoming transactions table columns
  const upcomingTransactionsColumns = [
    {
      header: 'Data',
      accessor: 'date',
    },
    {
      header: 'Descrição',
      accessor: 'description',
    },
    {
      header: 'Conta',
      accessor: 'account',
    },
    {
      header: 'Valor',
      accessor: 'amount',
      cell: (value: number, row: any) => {
        const color = row.type === 'income' ? 'text-green-500' : 'text-red-500';
        const prefix = row.type === 'income' ? '+' : '-';
        return <span className={color}>{prefix}€{value.toFixed(2)}</span>;
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
          <h1 className="text-3xl font-bold text-white">Dashboard Financeiro</h1>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Saldo Total</h3>
            <p className="text-white text-2xl font-bold">€{totalBalance.toFixed(2)}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Receitas Previstas</h3>
            <div className="flex items-center gap-2">
              <ArrowUp size={20} className="text-green-500" />
              <p className="text-green-500 text-2xl font-bold">€{totalUpcomingIncome.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Despesas Previstas</h3>
            <div className="flex items-center gap-2">
              <ArrowDown size={20} className="text-red-500" />
              <p className="text-red-500 text-2xl font-bold">€{totalUpcomingExpense.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Saldo Projetado</h3>
            <p className={`text-2xl font-bold ${projectedBalance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              €{projectedBalance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Cash Flow Chart */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Fluxo de Caixa</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-400">Receitas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-400">Despesas</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2">
            {mockCashFlow.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full flex justify-center gap-1 h-52">
                  <div 
                    className="w-6 bg-green-500 rounded-t-sm" 
                    style={{ height: `${(item.income / 40000) * 100}%` }}
                  ></div>
                  <div 
                    className="w-6 bg-red-500 rounded-t-sm" 
                    style={{ height: `${(item.expense / 40000) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bank Accounts */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Contas Bancárias</h2>
            <button
              onClick={() => setShowAddAccountModal(true)}
              className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-3 py-1 rounded-md transition-all duration-200 text-sm"
            >
              <Plus size={16} />
              Adicionar Conta
            </button>
          </div>
          
          <Table
            columns={bankAccountsColumns}
            data={mockBankAccounts}
            onRowClick={(row) => console.log('Bank account clicked:', row)}
          />
        </div>

        {/* Upcoming Transactions */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-bold text-white mb-4">Transações Previstas</h2>
          
          <Table
            columns={upcomingTransactionsColumns}
            data={mockUpcomingTransactions}
            onRowClick={(row) => console.log('Transaction clicked:', row)}
          />
        </div>
      </div>

      {/* Add Bank Account Modal */}
      {showAddAccountModal && (
        <Modal onclick={() => setShowAddAccountModal(false)} isCreate={true} isLarge={false}>
          <h2 className="text-xl font-bold mb-4">Adicionar Nova Conta Bancária</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Banco</label>
              <input
                type="text"
                placeholder="Nome do banco"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Número da Conta</label>
              <input
                type="text"
                placeholder="IBAN"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Tipo de Conta</label>
              <select
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              >
                <option value="Conta Corrente">Conta Corrente</option>
                <option value="Conta Poupança">Conta Poupança</option>
                <option value="Conta Investimento">Conta Investimento</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Saldo Inicial</label>
              <input
                type="number"
                placeholder="0.00"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="flex justify-end mt-2">
              <button
                className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
              >
                <Plus size={18} />
                Adicionar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}