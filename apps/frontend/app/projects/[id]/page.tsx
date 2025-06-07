'use client'

import React, { useState, useEffect } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { Nav } from '../../components/Nav'
import { Modal } from '../../components/Modal'
import { Table } from '../../components/Table'
import { 
  ArrowLeft, 
  Plus, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  BarChart, 
  FileText, 
  MessageSquare, 
  Send,
  CheckSquare,
  Edit,
  Trash
} from 'lucide-react'
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
];

// Mock data for tasks
const mockTasks = [
  {
    id: '1',
    projectId: '1',
    name: 'Design da interface do usuário',
    assignedTo: 'Ana Oliveira',
    status: 'completed',
    priority: 'high',
    dueDate: '15/02/2023',
    completedDate: '14/02/2023',
    estimatedHours: 40,
    actualHours: 38,
  },
  {
    id: '2',
    projectId: '1',
    name: 'Desenvolvimento do backend',
    assignedTo: 'João Silva',
    status: 'in_progress',
    priority: 'high',
    dueDate: '15/03/2023',
    completedDate: null,
    estimatedHours: 80,
    actualHours: 60,
  },
  {
    id: '3',
    projectId: '1',
    name: 'Integração de pagamentos',
    assignedTo: 'Maria Santos',
    status: 'in_progress',
    priority: 'medium',
    dueDate: '30/03/2023',
    completedDate: null,
    estimatedHours: 30,
    actualHours: 15,
  },
  {
    id: '4',
    projectId: '1',
    name: 'Testes de integração',
    assignedTo: 'António Ferreira',
    status: 'not_started',
    priority: 'medium',
    dueDate: '15/04/2023',
    completedDate: null,
    estimatedHours: 40,
    actualHours: 0,
  },
  {
    id: '5',
    projectId: '1',
    name: 'Documentação do sistema',
    assignedTo: 'Maria Santos',
    status: 'not_started',
    priority: 'low',
    dueDate: '25/04/2023',
    completedDate: null,
    estimatedHours: 20,
    actualHours: 0,
  },
];

// Mock data for messages
const mockMessages = [
  {
    id: '1',
    projectId: '1',
    sender: 'João Silva',
    content: 'Olá equipe, vamos iniciar o desenvolvimento do website e-commerce. Alguma dúvida inicial?',
    timestamp: '15/01/2023 09:00',
  },
  {
    id: '2',
    projectId: '1',
    sender: 'Ana Oliveira',
    content: 'Já comecei a trabalhar nos wireframes da interface. Devo compartilhar com o cliente antes de finalizar?',
    timestamp: '15/01/2023 10:30',
  },
  {
    id: '3',
    projectId: '1',
    sender: 'João Silva',
    content: 'Sim, por favor. Quanto antes tivermos feedback do cliente, melhor.',
    timestamp: '15/01/2023 11:15',
  },
  {
    id: '4',
    projectId: '1',
    sender: 'Maria Santos',
    content: 'Estou analisando as opções de gateway de pagamento. Precisamos suportar PayPal e cartões de crédito.',
    timestamp: '16/01/2023 14:20',
  },
  {
    id: '5',
    projectId: '1',
    sender: 'António Ferreira',
    content: 'Vou começar a preparar o ambiente de testes para quando o desenvolvimento estiver mais avançado.',
    timestamp: '17/01/2023 09:45',
  },
];

// Mock data for documents
const mockDocuments = [
  {
    id: '1',
    projectId: '1',
    name: 'Especificação de Requisitos',
    type: 'document',
    uploadedBy: 'João Silva',
    uploadDate: '15/01/2023',
    size: '2.5 MB',
  },
  {
    id: '2',
    projectId: '1',
    name: 'Wireframes da Interface',
    type: 'image',
    uploadedBy: 'Ana Oliveira',
    uploadDate: '20/01/2023',
    size: '5.8 MB',
  },
  {
    id: '3',
    projectId: '1',
    name: 'Diagrama de Banco de Dados',
    type: 'document',
    uploadedBy: 'João Silva',
    uploadDate: '25/01/2023',
    size: '1.2 MB',
  },
  {
    id: '4',
    projectId: '1',
    name: 'Contrato Assinado',
    type: 'pdf',
    uploadedBy: 'Maria Santos',
    uploadDate: '15/01/2023',
    size: '3.1 MB',
  },
];

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'chat' | 'documents'>('overview');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch project data
    const projectData = mockProjects.find(p => p.id === params.id);
    if (projectData) {
      setProject(projectData);
    }

    // Fetch tasks
    const projectTasks = mockTasks.filter(t => t.projectId === params.id);
    setTasks(projectTasks);

    // Fetch messages
    const projectMessages = mockMessages.filter(m => m.projectId === params.id);
    setMessages(projectMessages);

    // Fetch documents
    const projectDocuments = mockDocuments.filter(d => d.projectId === params.id);
    setDocuments(projectDocuments);
  }, [params.id]);

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

  // Get task status badge color
  const getTaskStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'not_started':
        return 'bg-gray-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'blocked':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get task status label
  const getTaskStatusLabel = (status: string) => {
    switch (status) {
      case 'not_started':
        return 'Não Iniciada';
      case 'in_progress':
        return 'Em Andamento';
      case 'completed':
        return 'Concluída';
      case 'blocked':
        return 'Bloqueada';
      default:
        return status;
    }
  };

  // Handle send message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMessageObj = {
      id: `${messages.length + 1}`,
      projectId: params.id,
      sender: 'João Silva', // Assuming current user
      content: newMessage,
      timestamp: new Date().toLocaleString('pt-BR'),
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  // Task table columns
  const taskColumns = [
    {
      header: 'Tarefa',
      accessor: 'name',
    },
    {
      header: 'Responsável',
      accessor: 'assignedTo',
    },
    {
      header: 'Prazo',
      accessor: 'dueDate',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => (
        <span className={`${getTaskStatusBadgeColor(value)} text-white text-xs px-2 py-1 rounded-full`}>
          {getTaskStatusLabel(value)}
        </span>
      ),
    },
    {
      header: 'Prioridade',
      accessor: 'priority',
      cell: (value: string) => (
        <span className={`${getPriorityBadgeColor(value)} text-white text-xs px-2 py-1 rounded-full`}>
          {getPriorityLabel(value)}
        </span>
      ),
    },
    {
      header: 'Horas',
      accessor: 'estimatedHours',
      cell: (value: number, row: any) => `${row.actualHours}/${value}`,
    },
    {
      header: 'Ações',
      accessor: 'id',
      cell: (value: string) => (
        <div className="flex gap-2">
          <button className="text-violet-400 hover:text-violet-300 transition-colors duration-200">
            <Edit size={16} />
          </button>
          <button className="text-red-400 hover:text-red-300 transition-colors duration-200">
            <Trash size={16} />
          </button>
        </div>
      ),
    },
  ];

  // Document table columns
  const documentColumns = [
    {
      header: 'Nome',
      accessor: 'name',
    },
    {
      header: 'Tipo',
      accessor: 'type',
      cell: (value: string) => {
        if (value === 'document') return 'Documento';
        if (value === 'image') return 'Imagem';
        if (value === 'pdf') return 'PDF';
        return value;
      },
    },
    {
      header: 'Enviado por',
      accessor: 'uploadedBy',
    },
    {
      header: 'Data',
      accessor: 'uploadDate',
    },
    {
      header: 'Tamanho',
      accessor: 'size',
    },
    {
      header: 'Ações',
      accessor: 'id',
      cell: (value: string) => (
        <div className="flex gap-2">
          <button className="text-violet-400 hover:text-violet-300 transition-colors duration-200">
            <FileText size={16} />
          </button>
          <button className="text-red-400 hover:text-red-300 transition-colors duration-200">
            <Trash size={16} />
          </button>
        </div>
      ),
    },
  ];

  if (!project) {
    return (
      <>
        <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative flex items-center justify-center">
          <p className="text-gray-400">Projeto não encontrado</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-base-300 text-white p-6 relative">
        <div className="flex items-center mb-6">
          <Link href="/projects" className="mr-4 text-gray-400 hover:text-violet-400 transition-colors duration-200">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-white">{project.name}</h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className={`${getPriorityBadgeColor(project.priority)} text-white text-xs px-2 py-1 rounded-full`}>
            {getPriorityLabel(project.priority)}
          </span>
          <span className={`${getStatusBadgeColor(project.status)} text-white text-xs px-2 py-1 rounded-full`}>
            {getStatusLabel(project.status)}
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'overview'
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-gray-400 hover:text-violet-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Visão Geral
          </button>
          
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'tasks'
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-gray-400 hover:text-violet-300'
            }`}
            onClick={() => setActiveTab('tasks')}
          >
            Tarefas
          </button>
          
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'chat'
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-gray-400 hover:text-violet-300'
            }`}
            onClick={() => setActiveTab('chat')}
          >
            Chat da Equipe
          </button>
          
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'documents'
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-gray-400 hover:text-violet-300'
            }`}
            onClick={() => setActiveTab('documents')}
          >
            Documentos
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
              <h3 className="text-violet-400 font-medium mb-3">Detalhes do Projeto</h3>
              <div className="space-y-3">
                <p className="text-gray-300">{project.description}</p>
                
                <div className="pt-3 border-t border-gray-800">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-gray-400 text-sm">Cliente:</p>
                      <p className="text-white">{project.client}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Gerente:</p>
                      <p className="text-white">{project.manager}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Data de Início:</p>
                      <p className="text-white">{project.startDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Prazo:</p>
                      <p className="text-white">{project.deadline}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
              <h3 className="text-violet-400 font-medium mb-3">Progresso e Orçamento</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-400 text-sm">Progresso:</span>
                    <span className="text-white">{project.progress}%</span>
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
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-400 text-sm">Orçamento Gasto:</span>
                    <span className="text-white">€{project.spent.toFixed(2)} / €{project.budget.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        (project.spent / project.budget) > 0.9 ? 'bg-red-500' : 
                        (project.spent / project.budget) > 0.7 ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}
                      style={{ width: `${(project.spent / project.budget) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-800">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-gray-400 text-sm">Orçamento Total:</p>
                      <p className="text-white">€{project.budget.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Gasto Atual:</p>
                      <p className="text-white">€{project.spent.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Restante:</p>
                      <p className="text-white">€{(project.budget - project.spent).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">% do Orçamento:</p>
                      <p className="text-white">{((project.spent / project.budget) * 100).toFixed(2)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
              <h3 className="text-violet-400 font-medium mb-3">Equipe do Projeto</h3>
              <div className="space-y-3">
                {project.team.map((member: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-900/50 flex items-center justify-center text-xs font-medium">
                      {member.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-white">{member}</span>
                    {member === project.manager && (
                      <span className="text-xs text-violet-400 bg-violet-900/30 px-2 py-1 rounded-full">Gerente</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
              <h3 className="text-violet-400 font-medium mb-3">Resumo de Tarefas</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#161f2c] rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-white">{tasks.length}</p>
                    <p className="text-gray-400 text-sm">Total de Tarefas</p>
                  </div>
                  <div className="bg-[#161f2c] rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-green-500">
                      {tasks.filter(t => t.status === 'completed').length}
                    </p>
                    <p className="text-gray-400 text-sm">Concluídas</p>
                  </div>
                  <div className="bg-[#161f2c] rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-blue-500">
                      {tasks.filter(t => t.status === 'in_progress').length}
                    </p>
                    <p className="text-gray-400 text-sm">Em Andamento</p>
                  </div>
                  <div className="bg-[#161f2c] rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-gray-500">
                      {tasks.filter(t => t.status === 'not_started').length}
                    </p>
                    <p className="text-gray-400 text-sm">Não Iniciadas</p>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-800">
                  <p className="text-gray-400 text-sm mb-2">Próximas Tarefas:</p>
                  <div className="space-y-2">
                    {tasks
                      .filter(t => t.status !== 'completed')
                      .sort((a, b) => new Date(a.dueDate.split('/').reverse().join('-')).getTime() - new Date(b.dueDate.split('/').reverse().join('-')).getTime())
                      .slice(0, 3)
                      .map(task => (
                        <div key={task.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getTaskStatusBadgeColor(task.status)}`}></div>
                            <span className="text-white">{task.name}</span>
                          </div>
                          <span className="text-gray-400 text-xs">{task.dueDate}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowAddTaskModal(true)}
                className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
              >
                <Plus size={18} />
                Nova Tarefa
              </button>
            </div>
            
            <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
              <Table
                columns={taskColumns}
                data={tasks}
                onRowClick={(row) => console.log('Task clicked:', row)}
              />
            </div>
          </>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4 h-[calc(100vh-240px)] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 pr-2">
              {messages.map((message) => (
                <div key={message.id} className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-violet-900/50 flex items-center justify-center text-xs font-medium">
                      {message.sender.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                      <span className="text-white font-medium">{message.sender}</span>
                      <span className="text-gray-400 text-xs ml-2">{message.timestamp}</span>
                    </div>
                  </div>
                  <div className="pl-10">
                    <p className="text-gray-300">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-800 pt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowAddDocumentModal(true)}
                className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
              >
                <Plus size={18} />
                Novo Documento
              </button>
            </div>
            
            <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
              <Table
                columns={documentColumns}
                data={documents}
                onRowClick={(row) => console.log('Document clicked:', row)}
              />
            </div>
          </>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <Modal onclick={() => setShowAddTaskModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Nova Tarefa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full">
              <label className="text-sm text-gray-400 mb-1 block">Nome da Tarefa</label>
              <input
                type="text"
                placeholder="Nome da tarefa"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Responsável</label>
              <select
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              >
                <option value="">Selecione um responsável</option>
                {project.team.map((member: string, index: number) => (
                  <option key={index} value={member}>{member}</option>
                ))}
              </select>
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Status</label>
              <select
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              >
                <option value="not_started">Não Iniciada</option>
                <option value="in_progress">Em Andamento</option>
                <option value="completed">Concluída</option>
                <option value="blocked">Bloqueada</option>
              </select>
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Prioridade</label>
              <select
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              >
                <option value="high">Alta</option>
                <option value="medium">Média</option>
                <option value="low">Baixa</option>
              </select>
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Prazo</label>
              <input
                type="date"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Horas Estimadas</label>
              <input
                type="number"
                placeholder="0"
                min="0"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="col-span-full">
              <label className="text-sm text-gray-400 mb-1 block">Descrição</label>
              <textarea
                placeholder="Descrição da tarefa"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500 h-24"
              ></textarea>
            </div>
            
            <div className="col-span-full flex justify-end mt-2">
              <button
                className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
              >
                <Plus size={18} />
                Criar Tarefa
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Document Modal */}
      {showAddDocumentModal && (
        <Modal onclick={() => setShowAddDocumentModal(false)} isCreate={true} isLarge={false}>
          <h2 className="text-xl font-bold mb-4">Novo Documento</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Nome do Documento</label>
              <input
                type="text"
                placeholder="Nome do documento"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Tipo</label>
              <select
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              >
                <option value="document">Documento</option>
                <option value="image">Imagem</option>
                <option value="pdf">PDF</option>
                <option value="spreadsheet">Planilha</option>
                <option value="presentation">Apresentação</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Arquivo</label>
              <div className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-6 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500 border-dashed text-center">
                <p className="text-gray-400">Arraste e solte um arquivo ou</p>
                <button className="mt-2 px-4 py-2 bg-violet-700 hover:bg-violet-600 text-white rounded-md transition-all duration-200 text-sm">
                  Selecionar Arquivo
                </button>
              </div>
            </div>
            
            <div className="flex justify-end mt-2">
              <button
                className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
              >
                <Plus size={18} />
                Adicionar Documento
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}