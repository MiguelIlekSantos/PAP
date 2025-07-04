'use client'

import React, { useState, useEffect, useRef, use } from 'react'
import { getById, getAll, create } from '@/lib/api'
import { ProjectsDTO, ChatsDTO, MessagesDTO, CreateChatsDTO, CreateMessagesDTO } from '@pap/utils'
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
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'chat' | 'documents'>('overview');
  
  // Estados para modais
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  
  // Estados para chat
  const [chat, setChat] = useState<ChatsDTO | null>(null);
  const [messages, setMessages] = useState<MessagesDTO[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loadingChat, setLoadingChat] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  
  // Estados para tarefas e documentos (seriam carregados dinamicamente)
  const [tasks, setTasks] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);

  // Ref para auto-scroll das mensagens
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Carregar dados do projeto
  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const projectData = await getById<ProjectsDTO>(APIMODULE, Number(id));
        setProject(projectData);
        
        // Carregar chat existente se houver
        await loadChat();
        
        // Aqui você poderia carregar tarefas e documentos relacionados
        // const tasksData = await getAll("tasks", { relationFilter: ["projectId", id] });
        // const documentsData = await getAll("documents", { relationFilter: ["projectId", id] });
        
      } catch (error) {
        console.error('Erro ao carregar projeto:', error);
        showError('Erro ao carregar projeto');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

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

  // Carregar chat e mensagens
  const loadChat = async () => {
    try {
      setLoadingChat(true);
      
      // Buscar chat do projeto
      console.log('Buscando chat para projeto:', id);
      const chats = await getAll<ChatsDTO[]>("chats", { 
        projectId: Number(id)
      });
      
      console.log('Chats encontrados:', chats);
      
      if (Array.isArray(chats) && chats.length > 0) {
        const projectChat = chats[0];
        setChat(projectChat);
        
        // Carregar mensagens do chat
        console.log('Carregando mensagens para chat:', projectChat.id);
        const chatMessages = await getAll<MessagesDTO[]>("messages", { 
          chatId: projectChat.id
        });
        
        console.log('Mensagens carregadas:', chatMessages);
        if (Array.isArray(chatMessages)) {
          setMessages(chatMessages);
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
      const existingChats = await getAll<ChatsDTO[]>("chats", { 
        projectId: Number(id)
      });
      
      let chatToUse: ChatsDTO;
      
      if (Array.isArray(existingChats) && existingChats.length > 0) {
        // Se já existe um chat, usar o existente
        chatToUse = existingChats[0];
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
      const chatMessages = await getAll<MessagesDTO[]>("messages", { 
        chatId: chatToUse.id
      });
      
      if (Array.isArray(chatMessages) && chatMessages.length > 0) {
        setMessages(chatMessages);
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

  // Colunas para tabela de tarefas (quando implementar)
  const taskColumns = [
    { header: 'Tarefa', accessor: 'name' },
    { header: 'Responsável', accessor: 'assignedTo' },
    { header: 'Status', accessor: 'status' },
    { header: 'Prazo', accessor: 'dueDate' },
    { 
      header: 'Ações', 
      accessor: 'id',
      cell: () => (
        <div className="flex gap-2">
          <button className="text-violet-400 hover:text-violet-300 transition-colors duration-200">
            <Edit size={16} />
          </button>
          <button className="text-red-400 hover:text-red-300 transition-colors duration-200">
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
            className={`px-4 py-2 font-medium ${activeTab === 'documents'
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-gray-400 hover:text-violet-300'
              }`}
            onClick={() => setActiveTab('documents')}
          >
            Documentos
          </button>
        </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
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
                    <p className="text-white">{project.clientId}</p>
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
      )}

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
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
      )}

      {/* Chat Tab */}
      {activeTab === 'chat' && (
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
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            message.sender === 'Sistema' ? 'bg-gray-600' : 'bg-violet-900/50'
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
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowAddDocumentModal(true)}
              className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
            >
              <Plus size={18} />
              Novo Documento
            </button>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-6">
            {documents.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <FileText size={48} className="mx-auto mb-4 text-gray-600" />
                <p>Nenhum documento encontrado para este projeto.</p>
              </div>
            ) : (
              <Table
                columns={documentColumns}
                data={documents}
                onRowClick={(row) => console.log('Document clicked:', row)}
              />
            )}
          </div>
        </div>
      )}

      {/* Modais */}
      {showAddTaskModal && (
        <Modal onclick={() => setShowAddTaskModal(false)} isCreate={true} isLarge={true}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Nova Tarefa</h2>
            <p className="text-gray-400">Funcionalidade em desenvolvimento...</p>
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

