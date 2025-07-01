'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Nav } from '../components/Nav'
import { DrawerMenu } from '../components/DrawerMenu'
import { FilterPanel } from '../components/FilterPanel'
import { Modal } from '../components/Modal'
import { Plus, Search, Calendar, Clock, Users, CheckCircle, AlertCircle, BarChart } from 'lucide-react'
import Link from 'next/link'

// Mock data for projects
const mockProjects = [
  {
    id: '1',
    name: 'Desenvolvimento de Website E-commerce',
    description: 'Criação de uma plataforma de e-commerce completa com integração de pagamentos e gestão de inventário.',
    client: 'Empresa ABC',
    manager: 'João Silva',
    team: ['João Silva', 'Maria Santos', 'António Ferreira', 'Ana Oliveira'],
    startDate: '15/01/2023',
    deadline: '30/04/2023',
    status: 'in_progress',
    progress: 65,
    priority: 'high',
    budget: 15000.00,
    spent: 9750.00,
  },
  {
    id: '2',
    name: 'Migração para Cloud',
    description: 'Migração da infraestrutura local para serviços em nuvem da AWS.',
    client: 'Empresa XYZ',
    manager: 'Carlos Rodrigues',
    team: ['Carlos Rodrigues', 'Sofia Costa', 'Pedro Ferreira'],
    startDate: '01/02/2023',
    deadline: '15/03/2023',
    status: 'completed',
    progress: 100,
    priority: 'medium',
    budget: 8000.00,
    spent: 7500.00,
  },
  {
    id: '3',
    name: 'Aplicativo Mobile',
    description: 'Desenvolvimento de aplicativo mobile para iOS e Android para gestão de tarefas.',
    client: 'Empresa DEF',
    manager: 'Ana Oliveira',
    team: ['Ana Oliveira', 'João Silva', 'Miguel Santos'],
    startDate: '10/03/2023',
    deadline: '20/06/2023',
    status: 'in_progress',
    progress: 30,
    priority: 'high',
    budget: 12000.00,
    spent: 3600.00,
  },
  {
    id: '4',
    name: 'Implementação de CRM',
    description: 'Implementação e configuração de sistema CRM para equipe de vendas.',
    client: 'Empresa GHI',
    manager: 'Maria Santos',
    team: ['Maria Santos', 'Carlos Rodrigues', 'Joana Almeida'],
    startDate: '05/02/2023',
    deadline: '15/04/2023',
    status: 'at_risk',
    progress: 45,
    priority: 'medium',
    budget: 6500.00,
    spent: 4200.00,
  },
  {
    id: '5',
    name: 'Redesign de Interface',
    description: 'Redesign completo da interface do usuário do sistema principal.',
    client: 'Empresa JKL',
    manager: 'Sofia Costa',
    team: ['Sofia Costa', 'Ana Oliveira', 'Pedro Ferreira'],
    startDate: '20/02/2023',
    deadline: '10/04/2023',
    status: 'in_progress',
    progress: 80,
    priority: 'low',
    budget: 5000.00,
    spent: 4000.00,
  },
  {
    id: '6',
    name: 'Auditoria de Segurança',
    description: 'Auditoria completa de segurança da infraestrutura e aplicações.',
    client: 'Empresa MNO',
    manager: 'António Ferreira',
    team: ['António Ferreira', 'Carlos Rodrigues'],
    startDate: '01/03/2023',
    deadline: '01/04/2023',
    status: 'on_hold',
    progress: 20,
    priority: 'high',
    budget: 4500.00,
    spent: 900.00,
  },
];


export default function ProjectsPage() {
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);


  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'at_risk':
        return 'bg-red-500';
      case 'on_hold':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'Em Andamento';
      case 'completed':
        return 'Concluído';
      case 'at_risk':
        return 'Em Risco';
      case 'on_hold':
        return 'Em Espera';
      default:
        return status;
    }
  };

  // Get priority badge color
  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get priority label
  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return priority;
    }
  };

  return (
    <>
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Projetos</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Novo Projeto
          </button>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link 
              key={project.id}
              href={`/projects/${project.id}`}
              className="relative bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg overflow-hidden shadow-md hover:shadow-violet-900/20"
            >
              <div className="absolute top-2 right-2 flex gap-2">
                <span className={`${getPriorityBadgeColor(project.priority)} text-white text-xs px-2 py-1 rounded-full`}>
                  {getPriorityLabel(project.priority)}
                </span>
                <span className={`${getStatusBadgeColor(project.status)} text-white text-xs px-2 py-1 rounded-full`}>
                  {getStatusLabel(project.status)}
                </span>
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-medium text-lg mt-6 mb-2">{project.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users size={14} className="text-violet-400" />
                    <span>Cliente: {project.client}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar size={14} className="text-violet-400" />
                    <span>Prazo: {project.deadline}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <BarChart size={14} className="text-violet-400" />
                    <span>Orçamento: €{project.budget.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Progresso:</span>
                    <span className="text-gray-300 text-xs">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        project.status === 'completed' ? 'bg-green-500' : 
                        project.status === 'at_risk' ? 'bg-red-500' : 
                        'bg-blue-500'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, index) => (
                        <div 
                          key={index} 
                          className="w-8 h-8 rounded-full bg-violet-900/50 border-2 border-[#0d1218] flex items-center justify-center text-xs font-medium"
                          title={member}
                        >
                          {member.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                      {project.team.length > 3 && (
                        <div 
                          className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#0d1218] flex items-center justify-center text-xs font-medium"
                          title="Mais membros"
                        >
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-gray-400 text-xs">Gerente: {project.manager}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
              Nenhum projeto encontrado com os filtros aplicados.
            </div>
          )}
        </div>
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
            <p>a</p>
        </Modal>
      )}
    </>
  );
}