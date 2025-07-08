'use client'

import React, { useEffect, useState } from 'react'
import { Plus, Users, Building, Phone, Mail, MapPin, CreditCard, User, CheckCircle, AlertTriangle } from 'lucide-react'
import { Filter } from '../../components/Filter'
import { ModalForms } from '../../components/forms/ModalForms'
import { Input } from '../../components/forms/Input'
import { SelectString } from '../../components/forms/SelectString'
import { Fieldset } from '../../components/forms/Fieldset'
import { Pagination } from '../../components/Pagination'
import { Modal } from '../../components/Modal'
import { create, getAll, update, remove, ListResponse } from '@/lib/api'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'
import { ClientCard } from '../../components/ClientCard'
import { Clients } from '@prisma/client'
import { CreateClientsDTO, UpdateClientsDTO } from '@pap/utils'

const APIMODULE = "clients"

// Interface para estender o tipo Clients com propriedades adicionais para a UI
interface ClientWithUI extends Clients {
  totalPurchases?: number;
  lastPurchase?: string;
}

export default function ClientsPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [clients, setClients] = useState<ListResponse<ClientWithUI>>();
  const [paginationNum, setPaginationNum] = useState<number>(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientWithUI | null>(null);

  const [inputDataCreate, setInputDataCreate] = useState<Partial<CreateClientsDTO>>({});
  const [inputDataUpdate, setInputDataUpdate] = useState<Partial<UpdateClientsDTO>>({});

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { getEnterprise } = useEnterpriseStore();

  // Debounce para o termo de busca
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Formatação de moeda
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  // Função para carregar a lista de clientes
  const reloadClientsList = async () => {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) return;

    try {
      const params: any = {
        "page": paginationNum,
        "quantity": 8,
        "relationFilter": ["enterpriseId", enterpriseId]
      };

      if (debouncedSearchTerm) {
        params.term = debouncedSearchTerm;
      }

      const data = await getAll<ListResponse<ClientWithUI>>(APIMODULE, params);
      
      // Aplicar filtros no frontend
      let filteredData = data;
      
      // Filtro por tipo
      if (typeFilter) {
        const filteredItems = data.data.items.filter(client => client.type === typeFilter);
        
        filteredData = {
          ...data,
          data: {
            ...data.data,
            items: filteredItems,
            metadata: {
              ...data.data.metadata,
              total: filteredItems.length,
              last: Math.ceil(filteredItems.length / 8)
            }
          }
        };
      }
      
      // Enriquecer os dados com informações adicionais para UI
      const enhancedItems = filteredData.data.items.map(client => {
        // Aqui podemos adicionar lógica para calcular totalPurchases e lastPurchase
        // quando tivermos acesso a esses dados do backend
        return {
          ...client,
          totalPurchases: 0, // Valor padrão até termos dados reais
          lastPurchase: undefined
        };
      });
      
      filteredData = {
        ...filteredData,
        data: {
          ...filteredData.data,
          items: enhancedItems
        }
      };

      setClients(filteredData);
    } catch (err) {
      console.error('Erro ao carregar clientes:', err);
      showError('Erro ao carregar clientes');
    }
  };

  // Carregar clientes quando a página carrega ou quando os filtros mudam
  useEffect(() => {
    setLoaded(false);
    reloadClientsList().then(() => {
      setLoaded(true);
    });
  }, [paginationNum, debouncedSearchTerm, typeFilter]);

  // Função para criar um novo cliente
  function createClient(): Promise<boolean> {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) {
      showError('Empresa não selecionada');
      return Promise.resolve(false);
    }

    if (!inputDataCreate.name) {
      showError('Nome é obrigatório');
      return Promise.resolve(false);
    }

    const payload: Partial<CreateClientsDTO> = {
      ...inputDataCreate,
      enterpriseId: enterpriseId
    };

    console.log('Payload para criar cliente:', payload);

    return create<CreateClientsDTO, Clients>(APIMODULE, payload as CreateClientsDTO)
      .then((data) => {
        console.log('Cliente criado:', data);
        showSuccess('Cliente criado com sucesso!');
        setShowAddModal(false);
        setInputDataCreate({});
        reloadClientsList();
        return true;
      })
      .catch(err => {
        console.error('Erro ao criar cliente:', err);
        showError('Erro ao criar cliente');
        return false;
      });
  }

  // Função para atualizar um cliente existente
  function updateClient(): Promise<boolean> {
    if (!selectedClient) {
      showError('Nenhum cliente selecionado');
      return Promise.resolve(false);
    }

    const payload: Partial<UpdateClientsDTO> = { ...inputDataUpdate };
    
    console.log('Payload para atualizar cliente:', payload);

    return update<UpdateClientsDTO, Clients>(APIMODULE, selectedClient.id, payload as UpdateClientsDTO)
      .then((data) => {
        console.log('Cliente atualizado:', data);
        showSuccess('Cliente atualizado com sucesso!');
        setShowEditModal(false);
        setSelectedClient(null);
        setInputDataUpdate({});
        reloadClientsList();
        return true;
      })
      .catch(err => {
        console.error('Erro ao atualizar cliente:', err);
        showError('Erro ao atualizar cliente');
        return false;
      });
  }

  // Função para deletar um cliente
  const deleteClient = async (client: ClientWithUI) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await remove(APIMODULE, client.id);
        showSuccess('Cliente excluído com sucesso!');
        reloadClientsList();
      } catch (err) {
        console.error('Erro ao excluir cliente:', err);
        showError('Erro ao excluir cliente');
      }
    }
  };

  // Função para deletar múltiplos clientes
  const deleteBulkClients = async (selectedIds: number[]) => {
    try {
      const deletePromises = selectedIds.map(id => remove(APIMODULE, id));
      await Promise.all(deletePromises);
      showSuccess(`${selectedIds.length} cliente(s) excluído(s) com sucesso!`);
      reloadClientsList();
    } catch (err) {
      console.error('Erro ao excluir clientes:', err);
      showError('Erro ao excluir clientes');
    }
  };

  // Função para editar um cliente
  const handleEditClient = (client: ClientWithUI) => {
    setSelectedClient(client);
    
    const updateData: Partial<UpdateClientsDTO> = {
      name: client.name,
      type: client.type ?? undefined,
      email: client.email ?? undefined,
      phone: client.phone ?? undefined,
      address: client.address ?? undefined
    };

    setInputDataUpdate(updateData);
    setShowEditModal(true);
  };

  // Função para visualizar detalhes de um cliente
  const handleViewClient = (client: ClientWithUI) => {
    setSelectedClient(client);
    setShowDetailsModal(true);
  };

  // Função para resetar filtros
  const resetFilters = () => {
    setSearchTerm('');
    setTypeFilter('');
    setPaginationNum(1);
  };

  // Calcular estatísticas de clientes
  const totalClients = clients?.data.items.length || 0;
  const companyClients = clients?.data.items.filter(client => client.type === 'company').length || 0;
  const individualClients = clients?.data.items.filter(client => client.type === 'individual').length || 0;
  const totalPurchases = clients?.data.items.reduce((sum, client) => sum + (client.totalPurchases || 0), 0) || 0;

  // Opções para os filtros
  const typeOptions = [
    { value: 'company', label: 'Empresa' },
    { value: 'individual', label: 'Individual' },
  ];

  const filterFields = [
    {
      name: 'typeFilter',
      label: 'Todos os tipos',
      type: 'select' as const,
      options: typeOptions,
    }
  ];

  const filterValues = {
    typeFilter
  };

  const handleFilterChange = (name: string, value: any) => {
    switch (name) {
      case 'typeFilter':
        setTypeFilter(value);
        break;
    }
  };

  return (
    <>
      <div className="min-h-screen ml-20 bg-base-300 text-white p-10">
        <div className="flex items-center justify-between mb-10 border-b border-violet-900/30 pb-4">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <Users size={40} className="text-violet-500" />
            Gestão de Clientes
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Adicionar Cliente</span>
          </button>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total de Clientes</h3>
            <p className="text-white text-xl font-bold">{totalClients}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Empresas</h3>
            <p className="text-blue-500 text-xl font-bold">{companyClients}</p>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Individuais</h3>
            <p className="text-violet-500 text-xl font-bold">{individualClients}</p>
          </div>
        </div>

        {/* Filtros */}
        <Filter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Pesquisar clientes por nome, email, telefone..."
          fields={filterFields}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />

        {/* Lista de clientes em cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {loaded && clients && clients.data.items.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onClick={handleViewClient}
              onEdit={handleEditClient}
              onDelete={deleteClient}
            />
          ))}
          {loaded && clients && clients.data.items.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
              Nenhum cliente encontrado com os filtros aplicados.
            </div>
          )}
        </div>

        {/* Paginação */}
        {loaded && clients && (
          <div className="mt-10">
            <Pagination
              updatePage={setPaginationNum}
              actualPage={paginationNum}
              last={clients.data.metadata.last ?? 1}
            />
          </div>
        )}
      </div>

      {/* Modal para adicionar cliente */}
      {showAddModal && (
        <ModalForms create={createClient} setInputData={setInputDataCreate} onclick={() => setShowAddModal(false)}>
          <Fieldset title='Novo Cliente'>
            <Input 
              nameOnDB='name' 
              name='Nome *' 
            />
            <SelectString
              nameOnDB='type'
              name='Tipo'
              options={[
                { value: 'company', label: 'Empresa' },
                { value: 'individual', label: 'Individual' }
              ]}
            />
            <Input nameOnDB='email' name='Email' type='email' />
            <Input nameOnDB='phone' name='Telefone' />
            <Input nameOnDB='address' name='Endereço' />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para editar cliente */}
      {showEditModal && selectedClient && (
        <ModalForms
          create={updateClient}
          setInputData={setInputDataUpdate}
          onclick={() => setShowEditModal(false)}
          initialData={inputDataUpdate}
        >
          <Fieldset title={`Editar Cliente: ${selectedClient.name}`}>
            <Input 
              nameOnDB='name' 
              name='Nome' 
            />
            <SelectString
              nameOnDB='type'
              name='Tipo'
              options={[
                { value: 'company', label: 'Empresa' },
                { value: 'individual', label: 'Individual' }
              ]}
            />
            <Input nameOnDB='email' name='Email' type='email' />
            <Input nameOnDB='phone' name='Telefone' />
            <Input nameOnDB='address' name='Endereço' />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para visualizar detalhes do cliente */}
      {showDetailsModal && selectedClient && (
        <Modal onclick={() => setShowDetailsModal(false)} isCreate={false} isLarge={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Detalhes do Cliente
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {selectedClient.type === 'company' ? (
                    <Building className="text-violet-500" size={20} />
                  ) : (
                    <User className="text-violet-500" size={20} />
                  )}
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Nome</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedClient.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedClient.email || 'Não informado'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Telefone</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedClient.phone || 'Não informado'}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Endereço</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedClient.address || 'Não informado'}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tipo</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-blue-500 flex items-center gap-1 font-medium">
                      {selectedClient.type === 'company' ? (
                        <>
                          <Building size={16} />
                          Empresa
                        </>
                      ) : (
                        <>
                          <User size={16} />
                          Individual
                        </>
                      )}
                    </span>
                  </div>
                </div>
                
                {selectedClient.totalPurchases !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total de Compras</p>
                    <p className="font-medium text-gray-900 dark:text-white text-2xl">{formatCurrency(selectedClient.totalPurchases)}</p>
                  </div>
                )}
              </div>
            </div>
            
            {selectedClient.lastPurchase && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Última Compra</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedClient.lastPurchase}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}