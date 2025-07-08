'use client'

import React, { useEffect, useState } from 'react'
import { Plus, ShoppingCart, Calendar, Package, User, CheckCircle, Clock, AlertTriangle, Edit, Trash2 } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { Filter } from '../../components/Filter'
import { ModalForms } from '../../components/forms/ModalForms'
import { Input } from '../../components/forms/Input'
import { SelectString } from '../../components/forms/SelectString'
import { MultiSelect } from '../../components/forms/MultiSelect'
import { Fieldset } from '../../components/forms/Fieldset'
import { Pagination } from '../../components/Pagination'
import { Modal } from '../../components/Modal'
import { create, getAll, update, remove, ListResponse, getById } from '@/lib/api'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'
import { Requests, Clients, Products } from '@prisma/client'
import { CreateRequestsDTO, UpdateRequestsDTO } from '@pap/utils'

const APIMODULE = "requests"

// Interface para estender o tipo Requests com propriedades adicionais para a UI
interface RequestWithRelations extends Requests {
  Client?: Clients;
  products?: Products[];
}

export default function OrdersPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [orders, setOrders] = useState<ListResponse<RequestWithRelations>>();
  const [paginationNum, setPaginationNum] = useState<number>(1);
  const [clients, setClients] = useState<Clients[]>([]);
  const [products, setProducts] = useState<Products[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<RequestWithRelations | null>(null);

  const [inputDataCreate, setInputDataCreate] = useState<Partial<CreateRequestsDTO>>({});
  const [inputDataUpdate, setInputDataUpdate] = useState<Partial<UpdateRequestsDTO>>({});

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

  const loadProducts = async () => {
    try {
      const params = {
        "quantity": 100 
      };
      
      const response = await getAll<ListResponse<Products>>("products", params);
      setProducts(response.data.items);
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
    }
  };

  const reloadOrdersList = async () => {
    try {
      const params: any = {
        "page": paginationNum,
        "quantity": 10
      };

      if (debouncedSearchTerm) {
        params.term = debouncedSearchTerm;
      }

      const data = await getAll<ListResponse<RequestWithRelations>>(APIMODULE, params);
      
      const enrichedItems = await Promise.all(
        data.data.items.map(async (order) => {
          try {
            const fullOrder = await getById<RequestWithRelations>(APIMODULE, order.id);
            
            if (fullOrder.clientId) {
              const client = clients.find(c => c.id === fullOrder.clientId);
              if (client) {
                fullOrder.Client = client;
              }
            }
            
            return fullOrder;
          } catch (error) {
            console.error(`Erro ao buscar detalhes do pedido ${order.id}:`, error);
            return order;
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
        const filteredItems = enrichedData.data.items.filter(order => order.status === statusFilter);
        
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

      setOrders(filteredData);
    } catch (err) {
      console.error('Erro ao carregar pedidos:', err);
      showError('Erro ao carregar pedidos');
    }
  };

  useEffect(() => {
    setLoaded(false);
    loadClients();
    loadProducts();
    reloadOrdersList().then(() => {
      setLoaded(true);
    });
  }, [paginationNum, debouncedSearchTerm, statusFilter]);

  function createOrder(): Promise<boolean> {
    if (!inputDataCreate.number || !inputDataCreate.clientId) {
      showError('Número do pedido e cliente são obrigatórios');
      return Promise.resolve(false);
    }

    // Garantir que products seja um array
    const payload: Partial<CreateRequestsDTO> = {
      ...inputDataCreate,
      products: Array.isArray(inputDataCreate.products) ? inputDataCreate.products : []
    };

    console.log('Payload para criar pedido:', payload);

    return create<CreateRequestsDTO, Requests>(APIMODULE, payload as CreateRequestsDTO)
      .then((data) => {
        console.log('Pedido criado:', data);
        showSuccess('Pedido criado com sucesso!');
        setShowAddModal(false);
        setInputDataCreate({});
        reloadOrdersList();
        return true;
      })
      .catch(err => {
        console.error('Erro ao criar pedido:', err);
        showError('Erro ao criar pedido');
        return false;
      });
  }

  function updateOrder(): Promise<boolean> {
    if (!selectedOrder) {
      showError('Nenhum pedido selecionado');
      return Promise.resolve(false);
    }

    // Garantir que products seja um array
    const payload: Partial<UpdateRequestsDTO> = { 
      ...inputDataUpdate,
      products: Array.isArray(inputDataUpdate.products) ? inputDataUpdate.products : []
    };
    
    // Garantir que a data seja tratada corretamente
    if (payload.deliveryDate && typeof payload.deliveryDate === 'string') {
      payload.deliveryDate = new Date(payload.deliveryDate);
    }
    
    console.log('Payload para atualizar pedido:', payload);

    return update<UpdateRequestsDTO, Requests>(APIMODULE, selectedOrder.id, payload as UpdateRequestsDTO)
      .then((data) => {
        console.log('Pedido atualizado:', data);
        showSuccess('Pedido atualizado com sucesso!');
        setShowEditModal(false);
        setSelectedOrder(null);
        setInputDataUpdate({});
        reloadOrdersList();
        return true;
      })
      .catch(err => {
        console.error('Erro ao atualizar pedido:', err);
        showError('Erro ao atualizar pedido');
        return false;
      });
  }

  const deleteOrder = async (order: RequestWithRelations) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      try {
        await remove(APIMODULE, order.id);
        showSuccess('Pedido excluído com sucesso!');
        reloadOrdersList();
      } catch (err) {
        console.error('Erro ao excluir pedido:', err);
        showError('Erro ao excluir pedido');
      }
    }
  };

  const deleteBulkOrders = async (selectedIds: number[]) => {
    try {
      const deletePromises = selectedIds.map(id => remove(APIMODULE, id));
      await Promise.all(deletePromises);
      showSuccess(`${selectedIds.length} pedido(s) excluído(s) com sucesso!`);
      reloadOrdersList();
    } catch (err) {
      console.error('Erro ao excluir pedidos:', err);
      showError('Erro ao excluir pedidos');
    }
  };

  const handleEditOrder = async (order: RequestWithRelations) => {
    try {
      const fullOrder = await getById<RequestWithRelations>(APIMODULE, order.id);
      
      if (fullOrder.clientId) {
        const client = clients.find(c => c.id === fullOrder.clientId);
        if (client) {
          fullOrder.Client = client;
        }
      }
      
      try {
        // Usar a relação 'requests' em vez de 'requestId'
        const productsResponse = await getAll<ListResponse<Products>>("products", {
          relationFilter: ["requests", order.id]
        });
        
        if (productsResponse && productsResponse.data.items.length > 0) {
          fullOrder.products = productsResponse.data.items;
        }
      } catch (productErr) {
        console.error('Erro ao buscar produtos do pedido:', productErr);
      }
      
      setSelectedOrder(fullOrder);
      
      // Extrair os IDs dos produtos para o formulário de edição
      const productIds = fullOrder.products?.map(product => product.id) || [];
      
      console.log('Preparando dados para edição:', {
        orderId: fullOrder.id,
        productIds,
        products: fullOrder.products
      });
      
      // Preparar os dados para edição
      const updateData: Partial<UpdateRequestsDTO> = {
        number: fullOrder.number,
        clientId: fullOrder.clientId,
        deliveryDate: fullOrder.deliveryDate ? new Date(fullOrder.deliveryDate) : undefined,
        status: fullOrder.status || 'pending',
        products: productIds
      };

      console.log('Definindo dados para edição:', updateData);
      
      // Definir os dados e mostrar o modal
      setInputDataUpdate(updateData);
      setShowEditModal(true);
    } catch (err) {
      console.error('Erro ao carregar detalhes do pedido:', err);
      showError('Erro ao carregar detalhes do pedido');
    }
  };

  const handleViewOrder = async (order: RequestWithRelations) => {
    try {
      const fullOrder = await getById<RequestWithRelations>(APIMODULE, order.id);
      
      if (fullOrder.clientId) {
        const client = clients.find(c => c.id === fullOrder.clientId);
        if (client) {
          fullOrder.Client = client;
        }
      }
    
      try {
        // Usar a relação 'requests' em vez de 'requestId'
        const productsResponse = await getAll<ListResponse<Products>>("products", {
          relationFilter: ["requests", order.id]
        });
        
        if (productsResponse && productsResponse.data.items.length > 0) {
          fullOrder.products = productsResponse.data.items;
        }
      } catch (productErr) {
        console.error('Erro ao buscar produtos do pedido:', productErr);
      }
      
      setSelectedOrder(fullOrder);
      setShowDetailsModal(true);
    } catch (err) {
      console.error('Erro ao carregar detalhes do pedido:', err);
      showError('Erro ao carregar detalhes do pedido');
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
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'processing':
        return <Clock size={16} className="text-blue-500" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'cancelled':
        return <AlertTriangle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  // Obter o texto de status
  const getStatusText = (status: string | null | undefined) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'processing':
        return 'Em Processamento';
      case 'pending':
        return 'Pendente';
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
  const getOrderColumns = () => [
    {
      header: 'Número',
      accessor: 'number',
      cell: (value: any) => <span className="font-medium">{value}</span>,
    },
    {
      header: 'Cliente',
      accessor: 'clientId',
      cell: (value: any, row: any) => row.Client ? row.Client.name : getClientName(value),
    },
    {
      header: 'Data de Entrega',
      accessor: 'deliveryDate',
      cell: (value: any) => formatDate(value),
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
    { value: 'processing', label: 'Em Processamento' },
    { value: 'completed', label: 'Concluído' },
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

  const columns = getOrderColumns();

  return (
    <>
      <div className="min-h-screen ml-20 bg-base-300 text-white p-10">
        <div className="flex items-center justify-between mb-10 border-b border-violet-900/30 pb-4">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <ShoppingCart size={40} className="text-violet-500" />
            Gestão de Pedidos
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Adicionar Pedido</span>
          </button>
        </div>

        {/* Filtros */}
        <Filter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Pesquisar pedidos por número..."
          fields={filterFields}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />

        {/* Tabela de pedidos */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <DataTable
            columns={columns}
            data={loaded && orders ? orders.data.items : []}
            onEdit={handleEditOrder}
            onDelete={deleteOrder}
            onBulkDelete={deleteBulkOrders}
            onRowClick={handleViewOrder}
            selectable={true}
            idField="id"
          />
        </div>

        {/* Paginação */}
        {loaded && orders && (
          <div className="mt-10">
            <Pagination
              updatePage={setPaginationNum}
              actualPage={paginationNum}
              last={orders.data.metadata.last ?? 1}
            />
          </div>
        )}
      </div>

      {/* Modal para adicionar pedido */}
      {showAddModal && (
        <ModalForms create={createOrder} setInputData={setInputDataCreate} onclick={() => setShowAddModal(false)}>
          <Fieldset title='Novo Pedido'>
            <Input 
              nameOnDB='number' 
              name='Número do Pedido *' 
            />
            <SelectString
              nameOnDB='clientId'
              name='Cliente *'
              options={clients.map(client => ({ 
                value: client.id.toString(), 
                label: client.name 
              }))}
            />
            <Input nameOnDB='deliveryDate' name='Data de Entrega' type='date' />
            <SelectString
              nameOnDB='status'
              name='Status'
              options={statusOptions}
            />
            <MultiSelect
              nameOnDB='products'
              name='Produtos'
              options={products.map(product => ({ 
                value: product.id.toString(), 
                label: `${product.name} ${product.price ? `(${new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(product.price)})` : ''}` 
              }))}
              type="number"
            />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para editar pedido */}
      {showEditModal && selectedOrder && (
        <ModalForms
          create={updateOrder}
          setInputData={setInputDataUpdate}
          onclick={() => setShowEditModal(false)}
          initialData={inputDataUpdate}
        >
          <Fieldset title={`Editar Pedido: ${selectedOrder.number}`}>
            <Input 
              nameOnDB='number' 
              name='Número do Pedido' 
            />
            <SelectString
              nameOnDB='clientId'
              name='Cliente'
              options={clients.map(client => ({ 
                value: client.id.toString(), 
                label: client.name 
              }))}
            />
            <Input nameOnDB='deliveryDate' name='Data de Entrega' type='date' />
            <SelectString
              nameOnDB='status'
              name='Status'
              options={statusOptions}
            />
            <MultiSelect
              nameOnDB='products'
              name='Produtos'
              options={products.map(product => ({ 
                value: product.id.toString(), 
                label: `${product.name} ${product.price ? `(${new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(product.price)})` : ''}` 
              }))}
              type="number"
            />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para visualizar detalhes do pedido */}
      {showDetailsModal && selectedOrder && (
        <Modal onclick={() => setShowDetailsModal(false)} isCreate={false} isLarge={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Detalhes do Pedido
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Número do Pedido</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.number}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <User className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cliente</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {selectedOrder.Client ? selectedOrder.Client.name : getClientName(selectedOrder.clientId)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Data de Entrega</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(selectedOrder.deliveryDate)}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedOrder.status)}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lista de produtos */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Produtos</h3>
              
              {selectedOrder.products && selectedOrder.products.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nome</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Categoria</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Preço</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                      {selectedOrder.products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{product.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.category || 'Não categorizado'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {product.price ? new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(product.price) : 'Não informado'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300">
                  Nenhum produto associado a este pedido.
                </p>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}