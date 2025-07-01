'use client'

import React, { useState } from 'react'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'
import { Plus, Search, Users, Shield, Settings, Activity, Database, AlertTriangle } from 'lucide-react'

// Mock data for system users
const mockUsers = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    role: 'Administrador',
    department: 'TI',
    status: 'active',
    lastLogin: '10/04/2024 14:30',
    permissions: ['read', 'write', 'admin'],
    createdDate: '01/01/2024',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@empresa.com',
    role: 'Gestor Financeiro',
    department: 'Financeiro',
    status: 'active',
    lastLogin: '10/04/2024 09:15',
    permissions: ['read', 'write'],
    createdDate: '15/01/2024',
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@empresa.com',
    role: 'Utilizador',
    department: 'Vendas',
    status: 'inactive',
    lastLogin: '05/04/2024 16:45',
    permissions: ['read'],
    createdDate: '20/02/2024',
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@empresa.com',
    role: 'Gestor RH',
    department: 'Recursos Humanos',
    status: 'active',
    lastLogin: '10/04/2024 11:20',
    permissions: ['read', 'write'],
    createdDate: '10/01/2024',
  },
  {
    id: '5',
    name: 'Pedro Ferreira',
    email: 'pedro.ferreira@empresa.com',
    role: 'Utilizador',
    department: 'Marketing',
    status: 'pending',
    lastLogin: '',
    permissions: ['read'],
    createdDate: '08/04/2024',
  },
];

// Mock system stats
const systemStats = {
  totalUsers: 156,
  activeUsers: 142,
  inactiveUsers: 14,
  systemUptime: '99.8%',
  lastBackup: '10/04/2024 02:00',
  storageUsed: '68%',
  securityAlerts: 3,
  systemLoad: '45%',
};

export default function SystemAdminPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter users based on search term
  const filteredUsers = searchTerm
    ? users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : users;

  // Table columns
  const columns = [
    {
      header: 'Nome',
      accessor: 'name',
    },
    {
      header: 'Email',
      accessor: 'email',
    },
    {
      header: 'Função',
      accessor: 'role',
    },
    {
      header: 'Departamento',
      accessor: 'department',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'active') return <span className="text-green-500">Ativo</span>;
        if (value === 'inactive') return <span className="text-gray-500">Inativo</span>;
        if (value === 'pending') return <span className="text-yellow-500">Pendente</span>;
        if (value === 'blocked') return <span className="text-red-500">Bloqueado</span>;
        return value;
      },
    },
    {
      header: 'Último Login',
      accessor: 'lastLogin',
    },
    {
      header: 'Permissões',
      accessor: 'permissions',
      cell: (value: string[]) => (
        <div className="flex gap-1">
          {value.map((perm, index) => (
            <span key={index} className="bg-violet-900/30 text-violet-300 px-2 py-1 rounded text-xs">
              {perm}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Dashboard de Administração</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Novo Utilizador
          </button>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Users size={20} className="text-violet-400" />
              <h3 className="text-gray-400 text-sm">Utilizadores Ativos</h3>
            </div>
            <p className="text-green-500 text-2xl font-bold">{systemStats.activeUsers}</p>
            <p className="text-gray-500 text-sm">de {systemStats.totalUsers} total</p>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Activity size={20} className="text-green-400" />
              <h3 className="text-gray-400 text-sm">Uptime do Sistema</h3>
            </div>
            <p className="text-green-500 text-2xl font-bold">{systemStats.systemUptime}</p>
            <p className="text-gray-500 text-sm">Últimos 30 dias</p>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Database size={20} className="text-blue-400" />
              <h3 className="text-gray-400 text-sm">Armazenamento</h3>
            </div>
            <p className="text-blue-500 text-2xl font-bold">{systemStats.storageUsed}</p>
            <p className="text-gray-500 text-sm">Utilizado</p>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle size={20} className="text-red-400" />
              <h3 className="text-gray-400 text-sm">Alertas de Segurança</h3>
            </div>
            <p className="text-red-500 text-2xl font-bold">{systemStats.securityAlerts}</p>
            <p className="text-gray-500 text-sm">Requerem atenção</p>
          </div>
        </div>

        {/* System Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Database size={20} className="text-violet-400" />
              <h3 className="text-gray-400 text-sm">Último Backup</h3>
            </div>
            <p className="text-white text-lg font-medium">{systemStats.lastBackup}</p>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Activity size={20} className="text-violet-400" />
              <h3 className="text-gray-400 text-sm">Carga do Sistema</h3>
            </div>
            <p className="text-white text-lg font-medium">{systemStats.systemLoad}</p>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Shield size={20} className="text-violet-400" />
              <h3 className="text-gray-400 text-sm">Utilizadores Inativos</h3>
            </div>
            <p className="text-white text-lg font-medium">{systemStats.inactiveUsers}</p>
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
            placeholder="Pesquisar utilizadores..."
            className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 pl-10 pr-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
          />
        </div>



        {/* Users table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredUsers}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Novo Utilizador</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields would go here */}
            <p className="text-gray-400 col-span-full">Formulário para adicionar novo utilizador ao sistema</p>
          </div>
        </Modal>
      )}
    </>
  );
}