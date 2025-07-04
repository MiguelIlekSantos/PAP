'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { FilterPanel } from '../../components/FilterPanel'
import { Table } from '../../components/Table'
import { Modal } from '../../components/Modal'
import { Plus, Search, ArrowLeft, FileText, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

// Mock data for system logs
const mockLogs = [
  {
    id: '1',
    timestamp: '2024-01-15 09:30:15',
    level: 'info',
    category: 'authentication',
    user: 'joao.silva',
    action: 'Login realizado',
    details: 'Login bem-sucedido do utilizador joao.silva',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    system: 'Sistema ERP',
  },
  {
    id: '2',
    timestamp: '2024-01-15 09:25:42',
    level: 'warning',
    category: 'security',
    user: 'sistema',
    action: 'Tentativa de login falhada',
    details: 'Múltiplas tentativas de login falhadas para utilizador admin',
    ipAddress: '203.0.113.45',
    userAgent: 'curl/7.68.0',
    system: 'Sistema de Autenticação',
  },
  {
    id: '3',
    timestamp: '2024-01-15 09:20:33',
    level: 'error',
    category: 'system',
    user: 'sistema',
    action: 'Erro de conexão à base de dados',
    details: 'Falha na conexão com a base de dados principal - timeout após 30s',
    ipAddress: '192.168.1.10',
    userAgent: 'Sistema Interno',
    system: 'Base de Dados',
  },
  {
    id: '4',
    timestamp: '2024-01-15 09:15:18',
    level: 'info',
    category: 'data',
    user: 'maria.santos',
    action: 'Registo criado',
    details: 'Novo cliente adicionado: Empresa ABC Lda',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    system: 'Sistema CRM',
  },
  {
    id: '5',
    timestamp: '2024-01-15 09:10:07',
    level: 'success',
    category: 'backup',
    user: 'sistema',
    action: 'Backup concluído',
    details: 'Backup automático da base de dados concluído com sucesso',
    ipAddress: '192.168.1.10',
    userAgent: 'Sistema de Backup',
    system: 'Sistema de Backup',
  },
  {
    id: '6',
    timestamp: '2024-01-15 09:05:55',
    level: 'warning',
    category: 'performance',
    user: 'sistema',
    action: 'Alto uso de CPU',
    details: 'Uso de CPU acima de 85% no servidor principal',
    ipAddress: '192.168.1.10',
    userAgent: 'Monitor de Sistema',
    system: 'Servidor Principal',
  },
  {
    id: '7',
    timestamp: '2024-01-15 09:00:12',
    level: 'info',
    category: 'authentication',
    user: 'carlos.rodrigues',
    action: 'Logout realizado',
    details: 'Utilizador carlos.rodrigues terminou sessão',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    system: 'Sistema ERP',
  },
  {
    id: '8',
    timestamp: '2024-01-15 08:55:30',
    level: 'error',
    category: 'email',
    user: 'sistema',
    action: 'Falha no envio de email',
    details: 'Erro ao enviar email de notificação para ana.costa@empresa.pt',
    ipAddress: '192.168.1.15',
    userAgent: 'Sistema de Email',
    system: 'Servidor de Email',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'level',
    label: 'Nível',
    type: 'select' as const,
    options: [
      { label: 'Informação', value: 'info' },
      { label: 'Sucesso', value: 'success' },
      { label: 'Aviso', value: 'warning' },
      { label: 'Erro', value: 'error' },
    ],
  },
  {
    name: 'category',
    label: 'Categoria',
    type: 'select' as const,
    options: [
      { label: 'Autenticação', value: 'authentication' },
      { label: 'Segurança', value: 'security' },
      { label: 'Sistema', value: 'system' },
      { label: 'Dados', value: 'data' },
      { label: 'Backup', value: 'backup' },
      { label: 'Performance', value: 'performance' },
      { label: 'Email', value: 'email' },
    ],
  },
  {
    name: 'system',
    label: 'Sistema',
    type: 'select' as const,
    options: [
      { label: 'Sistema ERP', value: 'Sistema ERP' },
      { label: 'Sistema CRM', value: 'Sistema CRM' },
      { label: 'Base de Dados', value: 'Base de Dados' },
      { label: 'Sistema de Backup', value: 'Sistema de Backup' },
      { label: 'Servidor Principal', value: 'Servidor Principal' },
      { label: 'Servidor de Email', value: 'Servidor de Email' },
    ],
  },
];

export default function LogsPage() {
  const [logs, setLogs] = useState(mockLogs);
  const [filteredLogs, setFilteredLogs] = useState(mockLogs);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any>(null);

  // Handle filter change
  const handleFilterChange = (name: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...logs];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (log) =>
          log.action.toLowerCase().includes(term) ||
          log.details.toLowerCase().includes(term) ||
          log.user.toLowerCase().includes(term) ||
          log.system.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        if (key === 'level') {
          filtered = filtered.filter((log) => log.level === value);
        } else if (key === 'category') {
          filtered = filtered.filter((log) => log.category === value);
        } else if (key === 'system') {
          filtered = filtered.filter((log) => log.system === value);
        }
      }
    });

    setFilteredLogs(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredLogs(logs);
  };

  // Handle log click
  const handleLogClick = (log: any) => {
    setSelectedLog(log);
    setShowLogModal(true);
  };

  // Get level icon and color
  const getLevelInfo = (level: string) => {
    switch (level) {
      case 'info':
        return { 
          icon: <Info size={14} />, 
          color: 'text-blue-500',
          label: 'Informação',
          bgColor: 'bg-blue-900/30'
        };
      case 'success':
        return { 
          icon: <CheckCircle size={14} />, 
          color: 'text-green-500',
          label: 'Sucesso',
          bgColor: 'bg-green-900/30'
        };
      case 'warning':
        return { 
          icon: <AlertTriangle size={14} />, 
          color: 'text-yellow-500',
          label: 'Aviso',
          bgColor: 'bg-yellow-900/30'
        };
      case 'error':
        return { 
          icon: <XCircle size={14} />, 
          color: 'text-red-500',
          label: 'Erro',
          bgColor: 'bg-red-900/30'
        };
      default:
        return { 
          icon: <Info size={14} />, 
          color: 'text-gray-500',
          label: level,
          bgColor: 'bg-gray-900/30'
        };
    }
  };

  // Get category label
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'authentication':
        return 'Autenticação';
      case 'security':
        return 'Segurança';
      case 'system':
        return 'Sistema';
      case 'data':
        return 'Dados';
      case 'backup':
        return 'Backup';
      case 'performance':
        return 'Performance';
      case 'email':
        return 'Email';
      default:
        return category;
    }
  };

  // Table columns
  const columns = [
    {
      header: 'Timestamp',
      accessor: 'timestamp',
      cell: (value: string) => (
        <span className="text-gray-300 text-sm">{value}</span>
      ),
    },
    {
      header: 'Nível',
      accessor: 'level',
      cell: (value: string) => {
        const { icon, color, label } = getLevelInfo(value);
        return (
          <div className={`flex items-center gap-2 ${color}`}>
            {icon}
            <span>{label}</span>
          </div>
        );
      },
    },
    {
      header: 'Categoria',
      accessor: 'category',
      cell: (value: string) => getCategoryLabel(value),
    },
    {
      header: 'Utilizador',
      accessor: 'user',
    },
    {
      header: 'Ação',
      accessor: 'action',
    },
    {
      header: 'Sistema',
      accessor: 'system',
      cell: (value: string) => (
        <span className="text-violet-400">{value}</span>
      ),
    },
  ];

  return (
    <>
      <SlideFrame />
      <div className="min-h-screen bg-base-300 text-white p-6 relative">
        <div className="flex items-center mb-6">
          <Link href="/tecnology" className="mr-4 text-gray-400 hover:text-violet-400 transition-colors duration-200">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-white">Logs de Atividade</h1>
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
            placeholder="Pesquisar logs..."
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

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-900/30 p-2 rounded-lg">
                <Info size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Informação</p>
                <p className="text-white font-medium">{logs.filter(log => log.level === 'info').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-900/30 p-2 rounded-lg">
                <AlertTriangle size={20} className="text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Avisos</p>
                <p className="text-white font-medium">{logs.filter(log => log.level === 'warning').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-900/30 p-2 rounded-lg">
                <XCircle size={20} className="text-red-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Erros</p>
                <p className="text-white font-medium">{logs.filter(log => log.level === 'error').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-900/30 p-2 rounded-lg">
                <CheckCircle size={20} className="text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Sucessos</p>
                <p className="text-white font-medium">{logs.filter(log => log.level === 'success').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Logs table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredLogs}
            onRowClick={handleLogClick}
          />
        </div>
      </div>

      {/* Log Details Modal */}
      {showLogModal && selectedLog && (
        <Modal onclick={() => setShowLogModal(false)} isCreate={false} isLarge={true}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Detalhes do Log</h2>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs ${getLevelInfo(selectedLog.level).bgColor} ${getLevelInfo(selectedLog.level).color}`}>
                {getLevelInfo(selectedLog.level).label}
              </span>
              <span className="bg-violet-900/30 text-violet-400 px-2 py-1 rounded text-xs">
                {getCategoryLabel(selectedLog.category)}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3 flex items-center gap-2">
                  <FileText size={16} />
                  Informações Básicas
                </h3>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Timestamp:</span> {selectedLog.timestamp}</p>
                  <p><span className="text-gray-400">Utilizador:</span> {selectedLog.user}</p>
                  <p><span className="text-gray-400">Sistema:</span> {selectedLog.system}</p>
                  <p><span className="text-gray-400">Ação:</span> {selectedLog.action}</p>
                </div>
              </div>

              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Detalhes</h3>
                <p className="text-gray-300">{selectedLog.details}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Informações Técnicas</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Endereço IP:</span> {selectedLog.ipAddress}</p>
                  <p><span className="text-gray-400">User Agent:</span></p>
                  <p className="text-gray-300 text-sm break-all">{selectedLog.userAgent}</p>
                </div>
              </div>

              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Contexto</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getLevelInfo(selectedLog.level).icon}
                    <span className={getLevelInfo(selectedLog.level).color}>
                      Nível: {getLevelInfo(selectedLog.level).label}
                    </span>
                  </div>
                  <p><span className="text-gray-400">Categoria:</span> {getCategoryLabel(selectedLog.category)}</p>
                  <p><span className="text-gray-400">ID do Log:</span> {selectedLog.id}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowLogModal(false)}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              Fechar
            </button>
            <button
              className="px-4 py-2 bg-violet-700 hover:bg-violet-600 text-white rounded-md transition-all duration-200"
            >
              Exportar
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}