'use client'

import React, { useState, useEffect, useRef, use } from 'react'
import { getById, getAll, create, update, remove, ListResponse } from '@/lib/api'
import { ProjectsDTO, ChatsDTO, MessagesDTO, CreateChatsDTO, CreateMessagesDTO, TasksDTO, CreateTasksDTO, EmployeesDTO, UpdateProjectsDTO } from '@pap/utils'
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
import { showSuccess, showError } from '@/lib/utils/toastHelpers'

const APIMODULE = "projects"



export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const { id } = use(params);
  const [project, setProject] = useState<ProjectsDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'chat' | 'team'>('overview');

  // Estados para modais
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<TasksDTO | null>(null);

  // Estados para chat
  const [chat, setChat] = useState<ChatsDTO | null>(null);
  const [messages, setMessages] = useState<MessagesDTO[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loadingChat, setLoadingChat] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  // Estados para tarefas e documentos (seriam carregados dinamicamente)
  const [tasks, setTasks] = useState<TasksDTO[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [employees, setEmployees] = useState<EmployeesDTO[]>([]);
  const [projectEmployees, setProjectEmployees] = useState<EmployeesDTO[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  // Estados para formulários
  const [taskForm, setTaskForm] = useState({
    name: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending'
  });

  const [editProjectForm, setEditProjectForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: '',
    priority: '',
    progress: 0,
    manager: ''
  });

  // Ref para auto-scroll das mensagens
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Carregar dados do projeto
  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const projectData = await getById<ProjectsDTO>(APIMODULE, Number(id));
        setProject(projectData);

        // Preencher formulário de edição
        setEditProjectForm({
          name: projectData.name || '',
          description: projectData.description || '',
          startDate: projectData.startDate ? new Date(projectData.startDate).toISOString().split('T')[0] : '',
          endDate: projectData.endDate ? new Date(projectData.endDate).toISOString().split('T')[0] : '',
          status: projectData.status || '',
          priority: projectData.priority || '',
          progress: projectData.progress || 0,
          manager: projectData.manager || ''
        });

        // Carregar chat existente se houver
        await loadChat();

        // Carregar tarefas do projeto
        await loadTasks();

        // Carregar funcionários
        await loadEmployees();

        // Carregar funcionários do projeto (só depois que o projeto foi carregado)
        // loadProjectEmployees será chamado depois que o projeto for carregado

      } catch (error) {
        console.error('Erro ao carregar projeto:', error);
        showError('Erro ao carregar projeto');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  // Carregar funcionários do projeto quando o projeto for carregado
  useEffect(() => {
    if (project) {
      if (project.Employees && project.Employees.length > 0) {
        loadProjectEmployees();
      } else {
        setProjectEmployees([]);
      }
    }
  }, [project?.Employees]);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Recarregar mensagens periodicamente quando o chat está ativo
  // Removido temporariamente para evitar erros de API constantes
  /*
  useEffect(() => {
    if (!chat) return;

    const interval = setInterval(async () => {
      try {
        const chatMessages = await getAll<MessagesDTO[]>("messages", { 
          chatId: chat.id
        });
        
        // Só atualizar se houver novas mensagens
        if (chatMessages.length > messages.length) {
          setMessages(chatMessages);
        }
      } catch (error) {
        console.error('Erro ao recarregar mensagens:', error);
      }
    }, 5000); // Recarregar a cada 5 segundos

    return () => clearInterval(interval);
  }, [chat, messages.length]);
  */

  // Carregar tarefas do projeto
  const loadTasks = async () => {
    try {
      const response = await getAll<ListResponse<TasksDTO>>("tasks", {
        "relationFilter": ["projectId", Number(id)]
      });

      if (response && response.data && response.data.items) {
        setTasks(response.data.items);
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  // Carregar funcionários
  const loadEmployees = async () => {
    try {
      const response = await getAll<ListResponse<EmployeesDTO>>("employees");

      if (response && response.data && response.data.items) {
        setEmployees(response.data.items);
      }
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
    }
  };

  // Carregar funcionários do projeto
  const loadProjectEmployees = async () => {
    try {
      setLoadingEmployees(true);
      console.log('Carregando funcionários do projeto:', {
        project: project,
        employees: project?.Employees
      });
      
      if (project && project.Employees && project.Employees.length > 0) {
        // Verificar se Employees já são objetos completos ou apenas IDs
        const firstEmployee = project.Employees[0];
        if (typeof firstEmployee === 'object' && firstEmployee.id) {
          // Se já são objetos completos, usar diretamente
          console.log('Funcionários já são objetos completos:', project.Employees);
          setProjectEmployees(project.Employees as EmployeesDTO[]);
        } else {
          // Se são apenas IDs, buscar os objetos completos
          const projectEmployeePromises = project.Employees.map(async (EmployeeId) => {
            try {
              return await getById<EmployeesDTO>("employees", EmployeeId);
            } catch (error) {
              console.error(`Erro ao carregar funcionário ${EmployeeId}:`, error);
              return null;
            }
          });
          const projectEmployeeData = await Promise.all(projectEmployeePromises);
          const validEmployees = projectEmployeeData.filter(emp => emp !== null) as EmployeesDTO[];
          console.log('Funcionários carregados:', validEmployees);
          setProjectEmployees(validEmployees);
        }
      } else {
        console.log('Nenhum funcionário encontrado no projeto');
        setProjectEmployees([]);
      }
    } catch (error) {
      console.error('Erro ao carregar funcionários do projeto:', error);
      setProjectEmployees([]);
    } finally {
      setLoadingEmployees(false);
    }
  };

  // Carregar chat e mensagens
  const loadChat = async () => {
    try {
      setLoadingChat(true);

      // Buscar chat do projeto
      console.log('Buscando chat para projeto:', id);
      const response = await getAll<ListResponse<ChatsDTO>>("chats", {
        "relationFilter": ["projectId", Number(id)]
      });

      console.log('Resposta de chats:', response);

      if (response && response.data && response.data.items && response.data.items.length > 0) {
        const projectChat = response.data.items[0];
        setChat(projectChat);

        // Carregar mensagens do chat
        console.log('Carregando mensagens para chat:', projectChat.id);
        const messagesResponse = await getAll<ListResponse<MessagesDTO>>("messages", {
          "relationFilter": ["chatId", projectChat.id]
        });

        console.log('Resposta de mensagens:', messagesResponse);
        if (messagesResponse && messagesResponse.data && messagesResponse.data.items) {
          setMessages(messagesResponse.data.items);
        }
      } else {
        console.log('Nenhum chat encontrado para o projeto');
      }
    } catch (error) {
      console.error('Erro ao carregar chat:', error);
    } finally {
      setLoadingChat(false);
    }
  };

  // Função para iniciar chat
  const startChat = async () => {
    try {
      setLoadingChat(true);

      // Primeiro verificar se já existe um chat para o projeto
      const existingChatsResponse = await getAll<ListResponse<ChatsDTO>>("chats", {
        "relationFilter": ["projectId", Number(id)]
      });

      let chatToUse: ChatsDTO;

      if (existingChatsResponse && existingChatsResponse.data && existingChatsResponse.data.items && existingChatsResponse.data.items.length > 0) {
        // Se já existe um chat, usar o existente
        chatToUse = existingChatsResponse.data.items[0];
        console.log('Chat existente encontrado:', chatToUse);
      } else {
        // Se não existe, criar um novo
        console.log('Criando novo chat para projeto:', id);
        chatToUse = await create<CreateChatsDTO, ChatsDTO>("chats", {
          projectId: Number(id),
          messages: []
        });
        console.log('Novo chat criado:', chatToUse);
      }

      setChat(chatToUse);

      // Carregar mensagens existentes do chat
      const messagesResponse = await getAll<ListResponse<MessagesDTO>>("messages", {
        "relationFilter": ["chatId", chatToUse.id]
      });

      if (messagesResponse && messagesResponse.data && messagesResponse.data.items && messagesResponse.data.items.length > 0) {
        setMessages(messagesResponse.data.items);
      } else {
        // Se não há mensagens, criar mensagem inicial do sistema
        const systemMessage = await create<CreateMessagesDTO, MessagesDTO>("messages", {
          chatId: chatToUse.id,
          content: 'Chat do projeto iniciado. Bem-vindos à equipe!',
          sender: 'Sistema',
          createdAt: new Date()
        });

        setMessages([systemMessage]);
      }

      showSuccess('Chat carregado com sucesso!');

    } catch (error) {
      console.error('Erro ao iniciar chat:', error);
      showError('Erro ao iniciar chat');
    } finally {
      setLoadingChat(false);
    }
  };

  // Função para editar projeto
  const handleEditProject = async () => {
    try {
      const updatedProject = await update<UpdateProjectsDTO, ProjectsDTO>(
        APIMODULE,
        Number(id),
        {
          name: editProjectForm.name,
          description: editProjectForm.description,
          startDate: editProjectForm.startDate ? new Date(editProjectForm.startDate) : undefined,
          endDate: editProjectForm.endDate ? new Date(editProjectForm.endDate) : undefined,
          status: editProjectForm.status,
          priority: editProjectForm.priority,
          progress: editProjectForm.progress,
          manager: editProjectForm.manager
        }
      );

      if (updatedProject) {
        setProject(updatedProject);
        showSuccess('Projeto atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao editar projeto:', error);
      showError('Erro ao atualizar projeto');
    }
  };

  // Função para adicionar tarefa
  const handleAddTask = async () => {
    if (!taskForm.name || !taskForm.description) {
      showError('Por favor, preencha os campos obrigatórios');
      return;
    }

    try {
      const taskData: CreateTasksDTO = {
        name: taskForm.name,
        description: taskForm.description,
        assignedTo: taskForm.assignedTo || 'Não atribuído',
        dueDate: taskForm.dueDate ? new Date(taskForm.dueDate).toISOString() : new Date().toISOString(),
        priority: taskForm.priority,
        status: taskForm.status,
        projectId: Number(id),
        responsible: 1, // Temporário - deveria ser o ID do usuário logado
        employees: [],
        completed: false
      };

      console.log('Enviando dados da tarefa:', taskData);
      const newTask = await create<CreateTasksDTO, TasksDTO>("tasks", taskData);

      if (newTask) {
        setTasks([...tasks, newTask]);
        setTaskForm({
          name: '',
          description: '',
          assignedTo: '',
          dueDate: '',
          priority: 'medium',
          status: 'pending'
        });
        showSuccess('Tarefa criada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      showError('Erro ao criar tarefa');
    }
  };

  // Função para adicionar funcionário ao projeto
  const handleAddEmployeeToProject = async (employeeId: number) => {
    try {
      if (!project) return;

      // Verificar se o funcionário já não está no projeto
      const currentEmployeeIds = project.Employees ? 
        project.Employees.map(emp => typeof emp === 'object' ? emp.id : emp) : [];
      
      if (currentEmployeeIds.includes(employeeId)) {
        showError('Funcionário já está no projeto!');
        return;
      }

      const updatedEmployees = [...currentEmployeeIds, employeeId];

      console.log('Adicionando funcionário ao projeto:', {
        employeeId,
        currentEmployees: project.Employees,
        updatedEmployees
      });

      const updatedProject = await update<UpdateProjectsDTO, ProjectsDTO>(
        APIMODULE,
        Number(id),
        {
          Employees: updatedEmployees
        }
      );

      if (updatedProject) {
        setProject(updatedProject);
        // Recarregar funcionários do projeto de forma segura
        setTimeout(async () => {
          await loadProjectEmployees();
        }, 500);
        showSuccess('Funcionário adicionado ao projeto!');
      }
    } catch (error) {
      console.error('Erro ao adicionar funcionário:', error);
      showError(`Erro ao adicionar funcionário: ${error.message || 'Erro desconhecido'}`);
    }
  };

  // Função para remover funcionário do projeto
  const handleRemoveEmployee = async (employeeId: number) => {
    try {
      if (!project) return;

      const currentEmployeeIds = project.Employees ? 
        project.Employees.map(emp => typeof emp === 'object' ? emp.id : emp) : [];
      const updatedEmployees = currentEmployeeIds.filter(id => id !== employeeId);

      const updatedProject = await update<UpdateProjectsDTO, ProjectsDTO>(
        APIMODULE,
        Number(id),
        {
          Employees: updatedEmployees
        }
      );

      if (updatedProject) {
        setProject(updatedProject);
        // Recarregar funcionários do projeto de forma segura
        setTimeout(async () => {
          await loadProjectEmployees();
        }, 500);
        showSuccess('Funcionário removido do projeto!');
      }
    } catch (error) {
      console.error('Erro ao remover funcionário:', error);
      showError('Erro ao remover funcionário');
    }
  };

  // Função para editar tarefa
  const handleEditTask = (task: TasksDTO) => {
    setEditingTask(task);
    setTaskForm({
      name: task.name,
      description: task.description,
      assignedTo: task.assignedTo,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      priority: task.priority,
      status: task.status
    });
    setShowEditTaskModal(true);
  };

  // Função para salvar edição da tarefa
  const handleSaveEditTask = async () => {
    if (!editingTask) return;

    try {
      console.log('Atualizando tarefa:', editingTask.id, {
        name: taskForm.name,
        description: taskForm.description,
        assignedTo: taskForm.assignedTo || 'Não atribuído',
        dueDate: taskForm.dueDate ? new Date(taskForm.dueDate).toISOString() : editingTask.dueDate,
        priority: taskForm.priority,
        status: taskForm.status
      });

      const updatedTask = await update<any, TasksDTO>(
        "tasks",
        editingTask.id,
        {
          name: taskForm.name,
          description: taskForm.description,
          assignedTo: taskForm.assignedTo || 'Não atribuído',
          dueDate: taskForm.dueDate ? new Date(taskForm.dueDate).toISOString() : editingTask.dueDate,
          priority: taskForm.priority,
          status: taskForm.status
        }
      );

      if (updatedTask) {
        setTasks(tasks.map(task => task.id === editingTask.id ? updatedTask : task));
        setTaskForm({
          name: '',
          description: '',
          assignedTo: '',
          dueDate: '',
          priority: 'medium',
          status: 'pending'
        });
        setEditingTask(null);
        showSuccess('Tarefa atualizada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      showError('Erro ao atualizar tarefa');
    }
  };

  // Função para deletar tarefa
  const handleDeleteTask = async (taskId: number) => {
    if (!confirm('Tem certeza que deseja deletar esta tarefa?')) return;

    try {
      console.log('Deletando tarefa:', taskId);
      
      // Usando a função remove da API lib
      await remove('tasks', taskId);
      
      setTasks(tasks.filter(task => task.id !== taskId));
      showSuccess('Tarefa deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      showError(`Erro ao deletar tarefa: ${error.message}`);
    }
  };

  // Função para enviar mensagem
  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !chat || sendingMessage) return;

    const messageContent = newMessage.trim();
    setNewMessage(''); // Limpar input imediatamente para melhor UX
    setSendingMessage(true);

    try {
      // Criar mensagem no backend
      const messageData = await create<CreateMessagesDTO, MessagesDTO>("messages", {
        chatId: chat.id,
        content: messageContent,
        sender: 'Usuário Atual', // TODO: Pegar do contexto de auth
        createdAt: new Date()
      });

      // Atualizar lista de mensagens
      setMessages(prevMessages => [...prevMessages, messageData]);

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      showError('Erro ao enviar mensagem');
      // Restaurar mensagem no input em caso de erro
      setNewMessage(messageContent);
    } finally {
      setSendingMessage(false);
    }
  };

  // Função para formatar data
  const formatDate = (date: Date | string | null | undefined): string => {
    if (!date) return 'Não definido';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Função para formatar data e hora da mensagem
  const formatMessageTimestamp = (timestamp: string | Date): string => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    return date.toLocaleString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Funções para badges de status
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

  // Colunas para tabela de tarefas
  const taskColumns = [
    { header: 'Tarefa', accessor: 'name' },
    { header: 'Responsável', accessor: 'assignedTo' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row: TasksDTO) => (
        <span className={`px-2 py-1 text-xs rounded-full ${row.status === 'completed' ? 'bg-green-500 text-white' :
          row.status === 'in_progress' ? 'bg-blue-500 text-white' :
            row.status === 'pending' ? 'bg-yellow-500 text-white' :
              'bg-gray-500 text-white'
          }`}>
          {row.status === 'completed' ? 'Concluída' :
            row.status === 'in_progress' ? 'Em Andamento' :
              row.status === 'pending' ? 'Pendente' :
                row.status}
        </span>
      )
    },
    {
      header: 'Prioridade',
      accessor: 'priority',
      cell: (row: TasksDTO) => (
        <span className={`px-2 py-1 text-xs rounded-full ${row.priority === 'high' ? 'bg-red-500 text-white' :
          row.priority === 'medium' ? 'bg-yellow-500 text-white' :
            'bg-green-500 text-white'
          }`}>
          {row.priority === 'high' ? 'Alta' :
            row.priority === 'medium' ? 'Média' :
              'Baixa'}
        </span>
      )
    },
    {
      header: 'Prazo',
      accessor: 'dueDate',
      cell: (row: TasksDTO) => row.dueDate ? formatDate(row.dueDate) : 'Sem prazo'
    },
    {
      header: 'Ações',
      accessor: 'id',
      cell: (row: TasksDTO) => (
        <div className="flex gap-2">
          <button 
            onClick={() => handleEditTask(row)}
            className="text-violet-400 hover:text-violet-300 transition-colors duration-200"
            title="Editar tarefa"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={() => handleDeleteTask(row.id)}
            className="text-red-400 hover:text-red-300 transition-colors duration-200"
            title="Deletar tarefa"
          >
            <Trash size={16} />
          </button>
        </div>
      )
    }
  ];

  // Colunas para tabela de documentos (quando implementar)
  const documentColumns = [
    { header: 'Nome', accessor: 'name' },
    { header: 'Tipo', accessor: 'type' },
    { header: 'Enviado por', accessor: 'uploadedBy' },
    { header: 'Data', accessor: 'uploadDate' },
    {
      header: 'Ações',
      accessor: 'id',
      cell: () => (
        <div className="flex gap-2">
          <button className="text-violet-400 hover:text-violet-300 transition-colors duration-200">
            <FileText size={16} />
          </button>
          <button className="text-red-400 hover:text-red-300 transition-colors duration-200">
            <Trash size={16} />
          </button>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative flex items-center justify-center">
        <p className="text-gray-400">Carregando projeto...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Projeto não encontrado</p>
          <Link href="/projects" className="text-violet-400 hover:text-violet-300 transition-colors duration-200">
            Voltar para Projetos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-20 min-h-screen bg-base-300 text-white p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/projects" className="text-violet-400 hover:text-violet-300 transition-colors duration-200">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-white">{project.name}</h1>
        </div>
      </div>

      {/* Badges */}
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
          className={`px-4 py-2 font-medium ${activeTab === 'overview'
            ? 'text-violet-400 border-b-2 border-violet-400'
            : 'text-gray-400 hover:text-violet-300'
            }`}
          onClick={() => setActiveTab('overview')}
        >
          Visão Geral
        </button>

        <button
          className={`px-4 py-2 font-medium ${activeTab === 'tasks'
            ? 'text-violet-400 border-b-2 border-violet-400'
            : 'text-gray-400 hover:text-violet-300'
            }`}
          onClick={() => setActiveTab('tasks')}
        >
          Tarefas
        </button>

        <button
          className={`px-4 py-2 font-medium ${activeTab === 'chat'
            ? 'text-violet-400 border-b-2 border-violet-400'
            : 'text-gray-400 hover:text-violet-300'
            }`}
          onClick={() => setActiveTab('chat')}
        >
          Chat da Equipe
        </button>

        <button
          className={`px-4 py-2 font-medium ${activeTab === 'team'
            ? 'text-violet-400 border-b-2 border-violet-400'
            : 'text-gray-400 hover:text-violet-300'
            }`}
          onClick={() => setActiveTab('team')}
        >
          Equipe
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' &&
        <>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowEditProjectModal(true)}
              className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
            >
              <Edit size={18} />
              Editar Projeto
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detalhes do Projeto */}
            <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
              <h3 className="text-violet-400 font-medium mb-3">Detalhes do Projeto</h3>
              <div className="space-y-3">
                <p className="text-gray-300">{project.description}</p>

                <div className="pt-3 border-t border-gray-800">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-gray-400 text-sm">Cliente:</p>
                      <p className="text-white">Cliente ID: {project.clientId}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Data de Início:</p>
                      <p className="text-white">{formatDate(project.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Data de Fim:</p>
                      <p className="text-white">{formatDate(project.endDate)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progresso e Orçamento */}
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
                      className={`h-2 rounded-full ${project.status === 'completed' ? 'bg-green-500' :
                        project.status === 'at_risk' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-800">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-gray-400 text-sm">Orçamento Total:</p>
                      <p className="text-white">€{project.budget?.toFixed(2) || '0.00'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Prioridade:</p>
                      <p className="text-white">{getPriorityLabel(project.priority)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
      }

          {/* Tasks Tab */}
          {activeTab === 'tasks' && 
            <div>
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setShowAddTaskModal(true)}
                  className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
                >
                  <Plus size={18} />
                  Nova Tarefa
                </button>
              </div>

              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-6">
                {tasks.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    <CheckSquare size={48} className="mx-auto mb-4 text-gray-600" />
                    <p>Nenhuma tarefa encontrada para este projeto.</p>
                  </div>
                ) : (
                  <Table
                    columns={taskColumns}
                    data={tasks}
                    onRowClick={(row) => console.log('Task clicked:', row)}
                  />
                )}
              </div>
            </div>
          }

          {/* Chat Tab */}
          {activeTab === 'chat' && 
            <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4 h-[calc(100vh-240px)] flex flex-col">
              {loadingChat ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-400">Carregando chat...</p>
                </div>
              ) : !chat ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare size={48} className="mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400 mb-4">O chat ainda não foi carregado para este projeto.</p>
                    <button
                      onClick={startChat}
                      className="bg-violet-700 hover:bg-violet-600 text-white px-6 py-3 rounded-md transition-all duration-200 flex items-center gap-2 mx-auto disabled:opacity-50"
                      disabled={loadingChat}
                    >
                      <MessageSquare size={18} />
                      {loadingChat ? 'Carregando...' : 'Carregar Chat'}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto mb-4 pr-2">
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400">Nenhuma mensagem ainda. Seja o primeiro a enviar uma mensagem!</p>
                      </div>
                    ) : (
                      <>
                        {messages.map((message) => (
                          <div key={message.id} className="mb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${message.sender === 'Sistema' ? 'bg-gray-600' : 'bg-violet-900/50'
                                }`}>
                                {message.sender === 'Sistema' ? 'S' : message.sender.split(' ').map((n: string) => n[0]).join('')}
                              </div>
                              <div>
                                <span className="text-white font-medium">{message.sender}</span>
                                <span className="text-gray-400 text-xs ml-2">
                                  {formatMessageTimestamp(message.createdAt)}
                                </span>
                              </div>
                            </div>
                            <div className="pl-10">
                              <p className="text-gray-300">{message.content}</p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </>
                    )}
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
                        className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!newMessage.trim() || sendingMessage}
                      >
                        {sendingMessage ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <Send size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          }

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div>
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setShowAddEmployeeModal(true)}
                  className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
                >
                  <Plus size={18} />
                  Adicionar Funcionário
                </button>
              </div>

              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-6">
                {!projectEmployees || projectEmployees.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    <Users size={48} className="mx-auto mb-4 text-gray-600" />
                    <p>Nenhum funcionário associado a este projeto.</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-medium text-white mb-4">Membros da Equipe</h3>

                    {loadingEmployees ? (
                      <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto"></div>
                        <p className="text-gray-400 mt-2">Carregando funcionários...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projectEmployees.map((employee) => (
                        <div key={employee.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <p className="text-white font-medium">{employee.name}</p>
                            <p className="text-gray-400 text-sm">{employee.position || 'Sem cargo'}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveEmployee(employee.id)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                            title="Remover do projeto"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Modais */}
          {showEditProjectModal && (
            <Modal 
              onclick={() => setShowEditProjectModal(false)} 
              isCreate={true} 
              isLarge={true}
              title="Editar Projeto"
              createFunction={handleEditProject}
            >
              <div className="w-full space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                    <input
                      type="text"
                      value={editProjectForm.name}
                      onChange={(e) => setEditProjectForm({ ...editProjectForm, name: e.target.value })}
                      className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
                    <textarea
                      value={editProjectForm.description}
                      onChange={(e) => setEditProjectForm({ ...editProjectForm, description: e.target.value })}
                      className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Data de Início</label>
                      <input
                        type="date"
                        value={editProjectForm.startDate}
                        onChange={(e) => setEditProjectForm({ ...editProjectForm, startDate: e.target.value })}
                        className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Data de Fim</label>
                      <input
                        type="date"
                        value={editProjectForm.endDate}
                        onChange={(e) => setEditProjectForm({ ...editProjectForm, endDate: e.target.value })}
                        className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                      <select
                        value={editProjectForm.status}
                        onChange={(e) => setEditProjectForm({ ...editProjectForm, status: e.target.value })}
                        className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                      >
                        <option value="in_progress">Em Andamento</option>
                        <option value="completed">Concluído</option>
                        <option value="at_risk">Em Risco</option>
                        <option value="on_hold">Em Espera</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Prioridade</label>
                      <select
                        value={editProjectForm.priority}
                        onChange={(e) => setEditProjectForm({ ...editProjectForm, priority: e.target.value })}
                        className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                      >
                        <option value="low">Baixa</option>
                        <option value="medium">Média</option>
                        <option value="high">Alta</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Progresso (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={editProjectForm.progress}
                        onChange={(e) => setEditProjectForm({ ...editProjectForm, progress: Number(e.target.value) })}
                        className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Gestor</label>
                      <input
                        type="text"
                        value={editProjectForm.manager}
                        onChange={(e) => setEditProjectForm({ ...editProjectForm, manager: e.target.value })}
                        className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                      />
                    </div>
                  </div>
              </div>
            </Modal>
          )}

          {showAddTaskModal && (
            <Modal 
              onclick={() => setShowAddTaskModal(false)} 
              isCreate={true} 
              isLarge={true}
              title="Nova Tarefa"
              createFunction={handleAddTask}
            >
              <div className="w-full space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nome da Tarefa</label>
                  <input
                    type="text"
                    value={taskForm.name}
                    onChange={(e) => setTaskForm({ ...taskForm, name: e.target.value })}
                    className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
                  <textarea
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                    className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Responsável</label>
                    <select
                      value={taskForm.assignedTo}
                      onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })}
                      className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                    >
                      <option value="">Selecione um funcionário</option>
                      {projectEmployees.map((employee) => (
                        <option key={employee.id} value={employee.name}>
                          {employee.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Data de Entrega</label>
                    <input
                      type="date"
                      value={taskForm.dueDate}
                      onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                      className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Prioridade</label>
                    <select
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                      className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                    >
                      <option value="low">Baixa</option>
                      <option value="medium">Média</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                    <select
                      value={taskForm.status}
                      onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
                      className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                    >
                      <option value="pending">Pendente</option>
                      <option value="in_progress">Em Andamento</option>
                      <option value="completed">Concluída</option>
                      <option value="cancelled">Cancelada</option>
                    </select>
                  </div>
                </div>
              </div>
            </Modal>
          )}

          {showAddEmployeeModal && (
            <Modal 
              onclick={() => setShowAddEmployeeModal(false)} 
              isCreate={false} 
              isLarge={true}
              title="Adicionar Funcionário"
            >
              <div className="w-full space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Selecione um funcionário:</label>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {employees.filter(emp => {
                    const currentEmployeeIds = project?.Employees ? 
                      project.Employees.map(e => typeof e === 'object' ? e.id : e) : [];
                    return !currentEmployeeIds.includes(emp.id);
                  }).map((employee) => (
                      <div
                        key={employee.id}
                        className="flex items-center justify-between p-3 bg-[#161f2c] border border-gray-700 rounded-md hover:border-violet-500 transition-all duration-200"
                      >
                        <div>
                          <p className="text-white font-medium">{employee.name}</p>
                          <p className="text-gray-400 text-sm">{employee.position || 'Sem cargo'}</p>
                        </div>
                        <button
                          onClick={() => handleAddEmployeeToProject(employee.id)}
                          className="px-3 py-1 bg-violet-700 hover:bg-violet-600 text-white text-sm rounded-md transition-all duration-200"
                        >
                          Adicionar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Modal>
          )}

          {showEditTaskModal && (
            <Modal 
              onclick={() => {
                setShowEditTaskModal(false);
                setEditingTask(null);
                setTaskForm({
                  name: '',
                  description: '',
                  assignedTo: '',
                  dueDate: '',
                  priority: 'medium',
                  status: 'pending'
                });
              }} 
              isCreate={true} 
              isLarge={true}
              title="Editar Tarefa"
              createFunction={handleSaveEditTask}
            >
              <div className="w-full space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nome da Tarefa</label>
                  <input
                    type="text"
                    value={taskForm.name}
                    onChange={(e) => setTaskForm({ ...taskForm, name: e.target.value })}
                    className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
                  <textarea
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                    className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Responsável</label>
                    <select
                      value={taskForm.assignedTo}
                      onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })}
                      className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                    >
                      <option value="">Selecione um funcionário</option>
                      {projectEmployees.map((employee) => (
                        <option key={employee.id} value={employee.name}>
                          {employee.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Data de Entrega</label>
                    <input
                      type="date"
                      value={taskForm.dueDate}
                      onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                      className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Prioridade</label>
                    <select
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                      className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                    >
                      <option value="low">Baixa</option>
                      <option value="medium">Média</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                    <select
                      value={taskForm.status}
                      onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
                      className="w-full bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
                    >
                      <option value="pending">Pendente</option>
                      <option value="in_progress">Em Andamento</option>
                      <option value="completed">Concluída</option>
                      <option value="cancelled">Cancelada</option>
                    </select>
                  </div>
                </div>
              </div>
            </Modal>
          )}

          {showAddDocumentModal && (
            <Modal onclick={() => setShowAddDocumentModal(false)} isCreate={true} isLarge={true}>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Novo Documento</h2>
                <p className="text-gray-400">Funcionalidade em desenvolvimento...</p>
              </div>
            </Modal>
          )}
      </div>
    
  );
}

