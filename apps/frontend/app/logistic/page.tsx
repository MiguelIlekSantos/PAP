'use client'

import React, { useEffect, useState } from 'react'
import { Plus, Package, Truck, Calendar, Clock, CheckCircle, AlertTriangle, User, MapPin } from 'lucide-react'
import { Filter } from '../components/Filter'
import { ModalForms } from '../components/forms/ModalForms'
import { Input } from '../components/forms/Input'
import { SelectString } from '../components/forms/SelectString'
import { Select } from '../components/forms/Select'
import { MultiSelect } from '../components/forms/MultiSelect'
import { Fieldset } from '../components/forms/Fieldset'
import { Pagination } from '../components/Pagination'
import { Modal } from '../components/Modal'
import { create, getAll, getById, update, remove, ListResponse } from '@/lib/api'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'
import { DeliveryCard } from '../components/DeliveryCard'
import { Delivery } from '@prisma/client'
import { CreateDeliveryDto, UpdateDeliveryDto } from '@pap/utils'

const APIMODULE = "delivery"

export default function LogisticPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [deliveries, setDeliveries] = useState<ListResponse<any>>();
  const [detailedDeliveries, setDetailedDeliveries] = useState<any[]>([]);
  const [paginationNum, setPaginationNum] = useState<number>(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);

  const [inputDataCreate, setInputDataCreate] = useState<Partial<CreateDeliveryDto>>({});
  const [inputDataUpdate, setInputDataUpdate] = useState<Partial<UpdateDeliveryDto>>({});

  const [statusFilter, setStatusFilter] = useState('');
  const [dateOrderFilter, setDateOrderFilter] = useState('desc'); // 'asc' ou 'desc'

  // Estados para as opções dos selects
  const [clientOptions, setClientOptions] = useState<Array<{value: number, label: string}>>([]);
  const [transporterOptions, setTransporterOptions] = useState<Array<{value: number, label: string}>>([]);
  const [productOptions, setProductOptions] = useState<Array<{value: string, label: string}>>([]);

  const { getEnterprise } = useEnterpriseStore();

  // Formatação de data
  const formatDate = (date: Date | string | null | undefined): string => {
    if (!date) return 'Não definido';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Função para carregar as opções dos selects
  const loadSelectOptions = async () => {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) return;

    try {
      // Carregar clientes
      const clientsData = await getAll<ListResponse<any>>("clients", {
        relationFilter: ["enterpriseId", enterpriseId],
        quantity: 100 // Carregar muitos para ter todas as opções
      });
      
      const clientOpts = clientsData.data.items.map(client => ({
        value: client.id,
        label: client.name
      }));
      setClientOptions(clientOpts);

      // Carregar transportadores
      const transportersData = await getAll<ListResponse<any>>("transporters", {
        relationFilter: ["enterpriseId", enterpriseId],
        quantity: 100
      });
      
      const transporterOpts = transportersData.data.items.map(transporter => ({
        value: transporter.id,
        label: `${transporter.licensePlate} - ${transporter.representative || 'Sem representante'}`
      }));
      setTransporterOptions(transporterOpts);

      // Carregar produtos
      const productsData = await getAll<ListResponse<any>>("products", {
        quantity: 100
      });
      
      const productOpts = productsData.data.items.map(product => ({
        value: product.id.toString(),
        label: product.name
      }));
      setProductOptions(productOpts);

    } catch (error) {
      console.error('Erro ao carregar opções dos selects:', error);
    }
  };

  // Função para carregar a lista de entregas
  const reloadDeliveriesList = async () => {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) return;

    try {
      setLoaded(false);
      
      // Primeiro, obter a lista básica de entregas
      const params: any = {
        "page": paginationNum,
        "quantity": 8
      };

      const data = await getAll<ListResponse<any>>(APIMODULE, params);
      setDeliveries(data);
      
      // Depois, obter detalhes completos de cada entrega usando getById
      const detailedPromises = data.data.items.map(async (delivery: any) => {
        try {
          const detailedDelivery = await getById<any>(APIMODULE, delivery.id);
          return detailedDelivery;
        } catch (error) {
          console.error(`Erro ao carregar detalhes da entrega ${delivery.id}:`, error);
          return delivery; // Retorna dados básicos se não conseguir carregar os detalhes
        }
      });

      const detailedResults = await Promise.all(detailedPromises);
      
      // Aplicar filtros no frontend
      let filteredResults = detailedResults;
      
      // Filtro por status
      if (statusFilter) {
        filteredResults = detailedResults.filter(delivery => 
          delivery.status?.toLowerCase() === statusFilter.toLowerCase()
        );
      }
      
      // Aplicar ordenação por data prevista
      filteredResults = filteredResults.sort((a, b) => {
        const dateA = a.expectedDate ? new Date(a.expectedDate).getTime() : 0;
        const dateB = b.expectedDate ? new Date(b.expectedDate).getTime() : 0;
        
        if (dateOrderFilter === 'asc') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
      
      // Enriquecer os dados com informações adicionais para UI
      const enhancedItems = filteredResults.map(delivery => {
        return {
          ...delivery,
          totalProducts: delivery.products?.length || 0,
          totalWeight: 0 // Calcular peso total quando tivermos essa informação
        };
      });

      setDetailedDeliveries(enhancedItems);
    } catch (err) {
      console.error('Erro ao carregar entregas:', err);
      showError('Erro ao carregar entregas');
    } finally {
      setLoaded(true);
    }
  };

  // Carregar entregas quando a página carrega ou quando os filtros mudam
  useEffect(() => {
    reloadDeliveriesList();
  }, [paginationNum, statusFilter, dateOrderFilter]);

  // Carregar opções dos selects quando a página carrega
  useEffect(() => {
    loadSelectOptions();
  }, []);

  // Função para criar uma nova entrega
  function createDelivery(): Promise<boolean> {
    if (!inputDataCreate.clientId) {
      showError('Cliente é obrigatório');
      return Promise.resolve(false);
    }

    if (!inputDataCreate.transporterId) {
      showError('Transportador é obrigatório');
      return Promise.resolve(false);
    }

    if (!inputDataCreate.status) {
      showError('Status é obrigatório');
      return Promise.resolve(false);
    }

    const payload: Partial<CreateDeliveryDto> = {
      ...inputDataCreate,
      clientId: Number(inputDataCreate.clientId),
      transporterId: Number(inputDataCreate.transporterId),
      expectedDate: inputDataCreate.expectedDate ? new Date(inputDataCreate.expectedDate) : undefined,
      deliveryDate: inputDataCreate.deliveryDate ? new Date(inputDataCreate.deliveryDate) : undefined,
      products: inputDataCreate.products || []
    };

    console.log('Payload para criar entrega:', payload);

    return create<CreateDeliveryDto, Delivery>(APIMODULE, payload as CreateDeliveryDto)
      .then((data) => {
        console.log('Entrega criada:', data);
        showSuccess('Entrega criada com sucesso!');
        setShowAddModal(false);
        setInputDataCreate({});
        reloadDeliveriesList();
        return true;
      })
      .catch(err => {
        console.error('Erro ao criar entrega:', err);
        showError('Erro ao criar entrega');
        return false;
      });
  }

  // Função para atualizar uma entrega existente
  function updateDelivery(): Promise<boolean> {
    if (!selectedDelivery) {
      showError('Nenhuma entrega selecionada');
      return Promise.resolve(false);
    }

    const payload: Partial<UpdateDeliveryDto> = {
      ...inputDataUpdate,
      clientId: inputDataUpdate.clientId ? Number(inputDataUpdate.clientId) : undefined,
      transporterId: inputDataUpdate.transporterId ? Number(inputDataUpdate.transporterId) : undefined,
      expectedDate: inputDataUpdate.expectedDate ? new Date(inputDataUpdate.expectedDate) : undefined,
      deliveryDate: inputDataUpdate.deliveryDate ? new Date(inputDataUpdate.deliveryDate) : undefined,
      products: inputDataUpdate.products || []
    };
    
    console.log('Payload para atualizar entrega:', payload);

    return update<UpdateDeliveryDto, Delivery>(APIMODULE, selectedDelivery.id, payload as UpdateDeliveryDto)
      .then((data) => {
        console.log('Entrega atualizada:', data);
        showSuccess('Entrega atualizada com sucesso!');
        setShowEditModal(false);
        setSelectedDelivery(null);
        setInputDataUpdate({});
        reloadDeliveriesList();
        return true;
      })
      .catch(err => {
        console.error('Erro ao atualizar entrega:', err);
        showError('Erro ao atualizar entrega');
        return false;
      });
  }

  // Função para deletar uma entrega
  const deleteDelivery = async (delivery: any) => {
    if (window.confirm('Tem certeza que deseja excluir esta entrega?')) {
      try {
        await remove(APIMODULE, delivery.id);
        showSuccess('Entrega excluída com sucesso!');
        reloadDeliveriesList();
      } catch (err) {
        console.error('Erro ao excluir entrega:', err);
        showError('Erro ao excluir entrega');
      }
    }
  };

  // Função para editar uma entrega
  const handleEditDelivery = (delivery: any) => {
    setSelectedDelivery(delivery);
    
    const updateData: Partial<UpdateDeliveryDto> = {
      expectedDate: delivery.expectedDate ? new Date(delivery.expectedDate) : undefined,
      deliveryDate: delivery.deliveryDate ? new Date(delivery.deliveryDate) : undefined,
      status: delivery.status,
      clientId: delivery.clientId,
      transporterId: delivery.transporterId,
      products: delivery.products?.map((p: any) => (typeof p === 'object' ? p.id : p)) || []
    };

    setInputDataUpdate(updateData);
    setShowEditModal(true);
  };

  // Função para visualizar detalhes de uma entrega
  const handleViewDelivery = (delivery: any) => {
    setSelectedDelivery(delivery);
    setShowDetailsModal(true);
  };

  // Função para resetar filtros
  const resetFilters = () => {
    setStatusFilter('');
    setDateOrderFilter('desc');
    setPaginationNum(1);
  };

  // Calcular estatísticas de entregas
  const totalDeliveries = detailedDeliveries.length || 0;
  const pendingDeliveries = detailedDeliveries.filter(d => d.status?.toLowerCase() === 'pendente').length || 0;
  const inTransitDeliveries = detailedDeliveries.filter(d => d.status?.toLowerCase() === 'em_transito' || d.status?.toLowerCase() === 'em transito').length || 0;
  const completedDeliveries = detailedDeliveries.filter(d => d.status?.toLowerCase() === 'entregue').length || 0;
  const lateDeliveries = detailedDeliveries.filter(d => 
    d.expectedDate && d.status?.toLowerCase() !== 'entregue' && 
    new Date(d.expectedDate) < new Date()
  ).length || 0;

  // Opções para os filtros
  const statusOptions = [
    { value: 'pendente', label: 'Pendente' },
    { value: 'em_transito', label: 'Em Trânsito' },
    { value: 'entregue', label: 'Entregue' },
    { value: 'cancelado', label: 'Cancelado' },
  ];

  const dateOrderOptions = [
    { value: 'desc', label: 'Mais recente primeiro' },
    { value: 'asc', label: 'Mais antigo primeiro' },
  ];

  const filterFields = [
    {
      name: 'statusFilter',
      label: 'Todos os status',
      type: 'select' as const,
      options: statusOptions,
    },
    {
      name: 'dateOrderFilter',
      label: 'Ordenar por data prevista',
      type: 'select' as const,
      options: dateOrderOptions,
    }
  ];

  const filterValues = {
    statusFilter,
    dateOrderFilter
  };

  const handleFilterChange = (name: string, value: any) => {
    switch (name) {
      case 'statusFilter':
        setStatusFilter(value);
        break;
      case 'dateOrderFilter':
        setDateOrderFilter(value);
        break;
    }
  };

  return (
    <>
      <div className="min-h-screen ml-20 bg-base-300 text-white p-10">
        <div className="flex items-center justify-between mb-10 border-b border-violet-900/30 pb-4">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <Package size={40} className="text-violet-500" />
            📦 Gestão Logística
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Adicionar Entrega</span>
          </button>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total de Entregas</h3>
            <p className="text-white text-xl font-bold">{totalDeliveries}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Pendentes</h3>
            <p className="text-yellow-500 text-xl font-bold">{pendingDeliveries}</p>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Em Trânsito</h3>
            <p className="text-blue-500 text-xl font-bold">{inTransitDeliveries}</p>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Entregues</h3>
            <p className="text-green-500 text-xl font-bold">{completedDeliveries}</p>
          </div>

          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Atrasadas</h3>
            <p className="text-red-500 text-xl font-bold">{lateDeliveries}</p>
          </div>
        </div>

        {/* Filtros */}
        <Filter
          fields={filterFields}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />

        {/* Lista de entregas em cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {loaded && detailedDeliveries.map((delivery) => (
            <DeliveryCard
              key={delivery.id}
              delivery={delivery}
              onClick={handleViewDelivery}
              onEdit={handleEditDelivery}
              onDelete={deleteDelivery}
            />
          ))}
          {loaded && detailedDeliveries.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
              Nenhuma entrega encontrada com os filtros aplicados.
            </div>
          )}
          {!loaded && (
            <div className="col-span-full text-center py-10 text-gray-400">
              Carregando entregas...
            </div>
          )}
        </div>

        {/* Paginação */}
        {loaded && deliveries && (
          <div className="mt-10">
            <Pagination
              updatePage={setPaginationNum}
              actualPage={paginationNum}
              last={deliveries.data.metadata.last ?? 1}
            />
          </div>
        )}
      </div>

      {/* Modal para adicionar entrega */}
      {showAddModal && (
        <ModalForms create={createDelivery} setInputData={setInputDataCreate} onclick={() => setShowAddModal(false)}>
          <Fieldset title='Nova Entrega'>
            <Select
              nameOnDB='clientId'
              name='Cliente *'
              options={clientOptions}
              placeholder='Selecione um cliente'
              required
            />
            <Select
              nameOnDB='transporterId'
              name='Transportador *'
              options={transporterOptions}
              placeholder='Selecione um transportador'
              required
            />
            <SelectString
              nameOnDB='status'
              name='Status *'
              options={statusOptions}
            />
            <MultiSelect
              nameOnDB='products'
              name='Produtos'
              options={productOptions}
              type='number'
            />
            <Input 
              nameOnDB='expectedDate' 
              name='Data Prevista' 
              type='date'
            />
            <Input 
              nameOnDB='deliveryDate' 
              name='Data de Entrega' 
              type='date'
            />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para editar entrega */}
      {showEditModal && selectedDelivery && (
        <ModalForms
          create={updateDelivery}
          setInputData={setInputDataUpdate}
          onclick={() => setShowEditModal(false)}
          initialData={inputDataUpdate}
        >
          <Fieldset title='Editar Entrega'>
            <Select
              nameOnDB='clientId'
              name='Cliente *'
              options={clientOptions}
              placeholder='Selecione um cliente'
              required
            />
            <Select
              nameOnDB='transporterId'
              name='Transportador *'
              options={transporterOptions}
              placeholder='Selecione um transportador'
              required
            />
            <SelectString
              nameOnDB='status'
              name='Status *'
              options={statusOptions}
            />
            <MultiSelect
              nameOnDB='products'
              name='Produtos'
              options={productOptions}
              type='number'
            />
            <Input 
              nameOnDB='expectedDate' 
              name='Data Prevista' 
              type='date'
            />
            <Input 
              nameOnDB='deliveryDate' 
              name='Data de Entrega' 
              type='date'
            />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para visualizar detalhes */}
      {showDetailsModal && selectedDelivery && (
        <Modal onclick={() => setShowDetailsModal(false)} isCreate={true} isLarge={false}>
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Package size={24} className="text-violet-400" />
              Detalhes da Entrega #{selectedDelivery.id}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Informações Gerais</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-white">{selectedDelivery.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data Prevista:</span>
                    <span className="text-white">{formatDate(selectedDelivery.expectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data de Entrega:</span>
                    <span className="text-white">{formatDate(selectedDelivery.deliveryDate)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Cliente e Transportador</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cliente:</span>
                    <span className="text-white">{selectedDelivery.Client?.name || 'Não informado'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transportador:</span>
                    <span className="text-white">{selectedDelivery.Transporter?.licensePlate || 'Não informado'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Responsável:</span>
                    <span className="text-white">{selectedDelivery.Transporter?.representative || 'Não informado'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-3">Produtos</h3>
              <div className="text-sm text-gray-300">
                {selectedDelivery.totalProducts ? 
                  `${selectedDelivery.totalProducts} produto(s) na entrega` : 
                  'Nenhum produto associado'
                }
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}