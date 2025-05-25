'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Nav } from '../components/Nav'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'
import { Plus, Search, Globe, Server, Lock, FileText } from 'lucide-react'
import Link from 'next/link'

export default function TechnologyPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <SlideFrame />
      <Nav />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Tecnologia / TI</h1>
        </div>

        {/* Navigation cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Link href="/tecnology/domains" className="bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg p-4 flex items-center gap-4">
            <div className="bg-violet-900/30 p-3 rounded-lg">
              <Globe size={24} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-white font-medium">Domínios e Sites</h3>
              <p className="text-gray-400 text-sm">Gerenciar domínios e websites</p>
            </div>
          </Link>
          
          <Link href="/tecnology/systems" className="bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg p-4 flex items-center gap-4">
            <div className="bg-violet-900/30 p-3 rounded-lg">
              <Server size={24} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-white font-medium">Sistemas Internos</h3>
              <p className="text-gray-400 text-sm">Gerenciar sistemas e aplicações</p>
            </div>
          </Link>
          
          <Link href="/tecnology/access" className="bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg p-4 flex items-center gap-4">
            <div className="bg-violet-900/30 p-3 rounded-lg">
              <Lock size={24} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-white font-medium">Contas e Permissões</h3>
              <p className="text-gray-400 text-sm">Gerenciar acessos e permissões</p>
            </div>
          </Link>
          
          <Link href="/tecnology/logs" className="bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg p-4 flex items-center gap-4">
            <div className="bg-violet-900/30 p-3 rounded-lg">
              <FileText size={24} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-white font-medium">Logs de Atividade</h3>
              <p className="text-gray-400 text-sm">Visualizar logs do sistema</p>
            </div>
          </Link>
        </div>

        {/* Overview section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-violet-400 font-medium mb-3">Resumo de Infraestrutura</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Servidores Ativos</span>
                <span className="text-white font-medium">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Domínios Registrados</span>
                <span className="text-white font-medium">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Sistemas Internos</span>
                <span className="text-white font-medium">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Usuários Ativos</span>
                <span className="text-white font-medium">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Tickets de Suporte Abertos</span>
                <span className="text-white font-medium">7</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-violet-400 font-medium mb-3">Status dos Serviços</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-300">Website Principal</span>
                </div>
                <span className="text-green-500">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-300">Email Corporativo</span>
                </div>
                <span className="text-green-500">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-300">Sistema ERP</span>
                </div>
                <span className="text-green-500">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span className="text-gray-300">Sistema CRM</span>
                </div>
                <span className="text-yellow-500">Degradado</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-300">Banco de Dados</span>
                </div>
                <span className="text-green-500">Online</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-violet-400 font-medium mb-3">Atividades Recentes</h3>
            <div className="space-y-3">
              <div className="border-l-2 border-violet-500 pl-3">
                <p className="text-white">Atualização do Sistema ERP</p>
                <p className="text-gray-400 text-sm">Hoje, 09:45 - João Silva</p>
              </div>
              <div className="border-l-2 border-red-500 pl-3">
                <p className="text-white">Alerta de Segurança: Tentativas de Login</p>
                <p className="text-gray-400 text-sm">Ontem, 18:30 - Sistema</p>
              </div>
              <div className="border-l-2 border-green-500 pl-3">
                <p className="text-white">Backup Completo Realizado</p>
                <p className="text-gray-400 text-sm">Ontem, 02:00 - Sistema</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-3">
                <p className="text-white">Novo Usuário Criado: Maria Santos</p>
                <p className="text-gray-400 text-sm">15/03/2023, 14:20 - Carlos Rodrigues</p>
              </div>
              <div className="border-l-2 border-yellow-500 pl-3">
                <p className="text-white">Manutenção Programada: Sistema CRM</p>
                <p className="text-gray-400 text-sm">15/03/2023, 10:15 - Ana Oliveira</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-violet-400 font-medium mb-3">Próximas Manutenções</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white">Atualização de Segurança</p>
                  <p className="text-gray-400 text-sm">Todos os servidores</p>
                </div>
                <p className="text-yellow-500">20/03/2023</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white">Migração de Banco de Dados</p>
                  <p className="text-gray-400 text-sm">Sistema CRM</p>
                </div>
                <p className="text-yellow-500">25/03/2023</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white">Backup Completo</p>
                  <p className="text-gray-400 text-sm">Todos os sistemas</p>
                </div>
                <p className="text-yellow-500">01/04/2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}