'use client'

import React, { useEffect, useState } from 'react'
import { Plus, FileText, Calendar, User, CheckCircle, Clock, AlertTriangle, Edit, Trash2, Euro } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { Filter } from '../../components/Filter'
import { ModalForms } from '../../components/forms/ModalForms'
import { Input } from '../../components/forms/Input'
import { SelectString } from '../../components/forms/SelectString'
import { Fieldset } from '../../components/forms/Fieldset'
import { Pagination } from '../../components/Pagination'
import { Modal } from '../../components/Modal'
import { create, getAll, update, remove, ListResponse, getById } from '@/lib/api'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'
import { Invoices, Clients } from '@prisma/client'
import { CreateInvoicesDTO, UpdateInvoicesDTO } from '@pap/utils'

const APIMODULE = "invoices"

// Interface para estender o tipo Invoices com propriedades adicionais para a UI
interface InvoiceWithRelations extends Invoices {
  Client?: Clients;
}

export default function InvoicesPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [invoices, setInvoices] = useState<ListResponse<InvoiceWithRelations>>();
  const [paginationNum, setPaginationNum] = useState<number>(1);
  const [clients, setClients] = useState<Clients[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceWithRelations | null>(null);

  const [inputDataCreate, setInputDataCreate] = useState<Partial<CreateInvoicesDTO>>({});
  const [inputDataUpdate, setInputDataUpdate] = useState<Partial<UpdateInvoicesDTO>>({});

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { getEnterprise } = useEnterpriseStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const formatDate = (date: Date | string | null | undefined): string => {
    if (!date) return 'Não informado';
    return new Date(date).toLocaleDateString('pt-PT');
  };

  const formatCurrency = (amount: number | null | undefined): string => {
    if (!amount) return 'Não informado';
    return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const loadClients = async () => {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) return;

    try {
      const params = {
        "quantity": 100, 
        "relationFilter": ["enterpriseId", enterpriseId]
      };
      
      const response = await getAll<ListResponse<Clients>>("clients", params);
      setClients(response.data.items);
    } catch (err) {
      console.error('Erro ao carregar clientes:', err);
    }
  };

  const reloadInvoicesList = async () => {
    try {
      const params: any = {
        "page": paginationNum,
        "quantity": 10
      };

      if (debouncedSearchTerm) {
        params.term = debouncedSearchTerm;
      }

      const data = await getAll<ListResponse<InvoiceWithRelations>>(APIMODULE, params);
      
      const enrichedItems = await Promise.all(
        data.data.items.map(async (invoice) => {
          try {
            const fullInvoice = await getById<InvoiceWithRelations>(APIMODULE, invoice.id);
            
            if (fullInvoice.ClientId) {
              const client = clients.find(c => c.id === fullInvoice.ClientId);
              if (client) {
                fullInvoice.Client = client;
              }
            }
            
            return fullInvoice;
          } catch (error) {
            console.error(`Erro ao buscar detalhes da fatura ${invoice.id}:`, error);
            return invoice;
          }
        })
      );
      
      const enrichedData = {
        ...data,
        data: {
          ...data.data,
          items: enrichedItems
        }
      };
      
      let filteredData = enrichedData;
      
      if (statusFilter) {
        const filteredItems = enrichedData.data.items.filter(invoice => invoice.status === statusFilter);
        
        filteredData = {
          ...enrichedData,
          data: {
            ...enrichedData.data,
            items: filteredItems,
            metadata: {
              ...enrichedData.data.metadata,
              total: filteredItems.length,
              last: Math.ceil(filteredItems.length / 10)
            }
          }
        };
      }

      setInvoices(filteredData);
    } catch (err) {
      console.error('Erro ao carregar faturas:', err);
      showError('Erro ao carregar faturas');
    }
  };

  useEffect(() => {
    setLoaded(false);
    loadClients();
    reloadInvoicesList().then(() => {
      setLoaded(true);
    });
  }, [paginationNum, debouncedSearchTerm, statusFilter]);

  function createInvoice(): Promise<boolean> {
    if (!inputDataCreate.number || !inputDataCreate.ClientId) {
      showError('Número da fatura e cliente são obrigatórios');
      return Promise.resolve(false);
    }

    const payload: Partial<CreateInvoicesDTO> = {
      ...inputDataCreate,
      total: inputDataCreate.total || 0,
      registerdate: inputDataCreate.registerdate || new Date(),
      dueDate: inputDataCreate.dueDate || new Date()
    };

    console.log('Payload para criar fatura:', payload);

    return create<CreateInvoicesDTO, Invoices>(APIMODULE, payload as CreateInvoicesDTO)
      .then((data) => {
        console.log('Fatura criada:', data);
        showSuccess('Fatura criada com sucesso!');
        setShowAddModal(false);
        setInputDataCreate({});
        reloadInvoicesList();
        return true;
      })
      .catch(err => {
        console.error('Erro ao criar fatura:', err);
        showError('Erro ao criar fatura');
        return false;
      });
  }

  function updateInvoice(): Promise<boolean> {
    if (!selectedInvoice) {
      showError('Nenhuma fatura selecionada');
      return Promise.resolve(false);
    }

    const payload: Partial<UpdateInvoicesDTO> = { 
      ...inputDataUpdate
    };
    
    // Garantir que as datas sejam tratadas corretamente
    if (payload.registerdate && typeof payload.registerdate === 'string') {
      payload.registerdate = new Date(payload.registerdate);
    }
    if (payload.dueDate && typeof payload.dueDate === 'string') {
      payload.dueDate = new Date(payload.dueDate);
    }
    if (payload.paymentDate && typeof payload.paymentDate === 'string') {
      payload.paymentDate = new Date(payload.paymentDate);
    }
    
    console.log('Payload para atualizar fatura:', payload);

    return update<UpdateInvoicesDTO, Invoices>(APIMODULE, selectedInvoice.id, payload as UpdateInvoicesDTO)
      .then((data) => {
        console.log('Fatura atualizada:', data);
        showSuccess('Fatura atualizada com sucesso!');
        setShowEditModal(false);
        setSelectedInvoice(null);
        setInputDataUpdate({});
        reloadInvoicesList();
        return true;
      })
      .catch(err => {
        console.error('Erro ao atualizar fatura:', err);
        showError('Erro ao atualizar fatura');
        return false;
      });
  }

  const deleteInvoice = async (invoice: InvoiceWithRelations) => {
    if (window.confirm('Tem certeza que deseja excluir esta fatura?')) {
      try {
        await remove(APIMODULE, invoice.id);
        showSuccess('Fatura excluída com sucesso!');
        reloadInvoicesList();
      } catch (err) {
        console.error('Erro ao excluir fatura:', err);
        showError('Erro ao excluir fatura');
      }
    }
  };

  const deleteBulkInvoices = async (selectedIds: number[]) => {
    try {
      const deletePromises = selectedIds.map(id => remove(APIMODULE, id));
      await Promise.all(deletePromises);
      showSuccess(`${selectedIds.length} fatura(s) excluída(s) com sucesso!`);
      reloadInvoicesList();
    } catch (err) {
      console.error('Erro ao excluir faturas:', err);
      showError('Erro ao excluir faturas');
    }
  };

  const handleEditInvoice = async (invoice: InvoiceWithRelations) => {
    try {
      const fullInvoice = await getById<InvoiceWithRelations>(APIMODULE, invoice.id);
      
      if (fullInvoice.ClientId) {
        const client = clients.find(c => c.id === fullInvoice.ClientId);
        if (client) {
          fullInvoice.Client = client;
        }
      }
      
      setSelectedInvoice(fullInvoice);
      
      console.log('Preparando dados para edição:', {
        invoiceId: fullInvoice.id,
        invoice: fullInvoice
      });
      
      // Preparar os dados para edição
      const updateData: Partial<UpdateInvoicesDTO> = {
        number: fullInvoice.number,
        ClientId: fullInvoice.ClientId,
        registerdate: fullInvoice.registerdate ? new Date(fullInvoice.registerdate) : undefined,
        dueDate: fullInvoice.dueDate ? new Date(fullInvoice.dueDate) : undefined,
        paymentDate: fullInvoice.paymentDate ? new Date(fullInvoice.paymentDate) : undefined,
        total: fullInvoice.total,
        status: fullInvoice.status || 'pending'
      };

      console.log('Definindo dados para edição:', updateData);
      
      // Definir os dados e mostrar o modal
      setInputDataUpdate(updateData);
      setShowEditModal(true);
    } catch (err) {
      console.error('Erro ao carregar detalhes da fatura:', err);
      showError('Erro ao carregar detalhes da fatura');
    }
  };

  const handleViewInvoice = async (invoice: InvoiceWithRelations) => {
    try {
      const fullInvoice = await getById<InvoiceWithRelations>(APIMODULE, invoice.id);
      
      if (fullInvoice.ClientId) {
        const client = clients.find(c => c.id === fullInvoice.ClientId);
        if (client) {
          fullInvoice.Client = client;
        }
      }
      
      setSelectedInvoice(fullInvoice);
      setShowDetailsModal(true);
    } catch (err) {
      console.error('Erro ao carregar detalhes da fatura:', err);
      showError('Erro ao carregar detalhes da fatura');
    }
  };

  // Função para resetar filtros
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setPaginationNum(1);
  };

  // Obter o ícone de status
  const getStatusIcon = (status: string | null | undefined) => {
    switch (status) {
      case 'paid':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'overdue':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'cancelled':
        return <AlertTriangle size={16} className="text-gray-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  // Obter o texto de status
  const getStatusText = (status: string | null | undefined) => {
    switch (status) {
      case 'paid':
        return 'Pago';
      case 'pending':
        return 'Pendente';
      case 'overdue':
        return 'Em Atraso';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Não definido';
    }
  };

  // Obter o nome do cliente
  const getClientName = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Cliente não encontrado';
  };

  // Definir colunas para a tabela
  const getInvoiceColumns = () => [
    {
      header: 'Número',
      accessor: 'number',
      cell: (value: any) => <span className="font-medium">{value}</span>,
    },
    {
      header: 'Cliente',
      accessor: 'ClientId',
      cell: (value: any, row: any) => row.Client ? row.Client.name : getClientName(value),
    },
    {
      header: 'Data de Registro',
      accessor: 'registerdate',
      cell: (value: any) => formatDate(value),
    },
    {
      header: 'Data de Vencimento',
      accessor: 'dueDate',
      cell: (value: any) => formatDate(value),
    },
    {
      header: 'Data de Pagamento',
      accessor: 'paymentDate',
      cell: (value: any) => value ? formatDate(value) : <span className="text-gray-500">-</span>,
    },
    {
      header: 'Total',
      accessor: 'total',
      cell: (value: any) => <span className="font-medium text-green-500">{formatCurrency(value)}</span>,
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: any) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(value)}
          <span>{getStatusText(value)}</span>
        </div>
      ),
    },
  ];

  // Opções para os filtros
  const statusOptions = [
    { value: 'pending', label: 'Pendente' },
    { value: 'paid', label: 'Pago' },
    { value: 'overdue', label: 'Em Atraso' },
    { value: 'cancelled', label: 'Cancelado' },
  ];

  const filterFields = [
    {
      name: 'statusFilter',
      label: 'Todos os status',
      type: 'select' as const,
      options: statusOptions,
    },
  ];

  const filterValues = {
    statusFilter,
  };

  const handleFilterChange = (name: string, value: any) => {
    switch (name) {
      case 'statusFilter':
        setStatusFilter(value);
        break;
    }
  };

  const columns = getInvoiceColumns();

  return (
    <>
      <div className="min-h-screen ml-20 bg-base-300 text-white p-10">
        <div className="flex items-center justify-between mb-10 border-b border-violet-900/30 pb-4">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <FileText size={40} className="text-violet-500" />
            💰 Gestão de Faturas
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Adicionar Fatura</span>
          </button>
        </div>

        {/* Filtros */}
        <Filter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Pesquisar faturas por número..."
          fields={filterFields}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />

        {/* Tabela de faturas */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <DataTable
            columns={columns}
            data={loaded && invoices ? invoices.data.items : []}
            onEdit={handleEditInvoice}
            onDelete={deleteInvoice}
            onBulkDelete={deleteBulkInvoices}
            onRowClick={handleViewInvoice}
            selectable={true}
            idField="id"
          />
        </div>

        {/* Paginação */}
        {loaded && invoices && (
          <div className="mt-10">
            <Pagination
              updatePage={setPaginationNum}
              actualPage={paginationNum}
              last={invoices.data.metadata.last ?? 1}
            />
          </div>
        )}
      </div>

      {/* Modal para adicionar fatura */}
      {showAddModal && (
        <ModalForms create={createInvoice} setInputData={setInputDataCreate} onclick={() => setShowAddModal(false)}>
          <Fieldset title='Nova Fatura'>
            <Input 
              nameOnDB='number' 
              name='Número da Fatura *' 
            />
            <SelectString
              nameOnDB='ClientId'
              name='Cliente *'
              options={clients.map(client => ({ 
                value: client.id.toString(), 
                label: client.name 
              }))}
            />
            <Input nameOnDB='registerdate' name='Data de Registro *' type='date' />
            <Input nameOnDB='dueDate' name='Data de Vencimento *' type='date' />
            <Input nameOnDB='paymentDate' name='Data de Pagamento' type='date' />
            <Input nameOnDB='total' name='Total *' type='number' step='0.01' />
            <SelectString
              nameOnDB='status'
              name='Status'
              options={statusOptions}
            />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para editar fatura */}
      {showEditModal && selectedInvoice && (
        <ModalForms
          create={updateInvoice}
          setInputData={setInputDataUpdate}
          onclick={() => setShowEditModal(false)}
          initialData={inputDataUpdate}
        >
          <Fieldset title={`Editar Fatura: ${selectedInvoice.number}`}>
            <Input 
              nameOnDB='number' 
              name='Número da Fatura' 
            />
            <SelectString
              nameOnDB='ClientId'
              name='Cliente'
              options={clients.map(client => ({ 
                value: client.id.toString(), 
                label: client.name 
              }))}
            />
            <Input nameOnDB='registerdate' name='Data de Registro' type='date' />
            <Input nameOnDB='dueDate' name='Data de Vencimento' type='date' />
            <Input nameOnDB='paymentDate' name='Data de Pagamento' type='date' />
            <Input nameOnDB='total' name='Total' type='number' step='0.01' />
            <SelectString
              nameOnDB='status'
              name='Status'
              options={statusOptions}
            />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para visualizar detalhes da fatura */}
      {showDetailsModal && selectedInvoice && (
        <Modal onclick={() => setShowDetailsModal(false)} isCreate={false} isLarge={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Detalhes da Fatura
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Número da Fatura</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedInvoice.number}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <User className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cliente</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {selectedInvoice.Client ? selectedInvoice.Client.name : getClientName(selectedInvoice.ClientId)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Data de Registro</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(selectedInvoice.registerdate)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Data de Vencimento</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(selectedInvoice.dueDate)}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Data de Pagamento</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {selectedInvoice.paymentDate ? formatDate(selectedInvoice.paymentDate) : 'Não pago'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Euro className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                    <p className="font-medium text-gray-900 dark:text-white text-lg">
                      {formatCurrency(selectedInvoice.total)}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedInvoice.status)}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {getStatusText(selectedInvoice.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}