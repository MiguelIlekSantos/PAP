'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Nav } from '../components/Nav'
import { FilterPanel } from '../components/FilterPanel'
import { Modal } from '../components/Modal'
import { Plus, Search, Truck, MapPin, Package, Calendar, Clock, User, Building } from 'lucide-react'

// Mock data for deliveries
const mockDeliveries = [
    {
        id: '1',
        trackingNumber: 'TRK-2023-001',
        customer: 'Empresa ABC',
        customerAddress: 'Av. da Liberdade 123, 1250-096 Lisboa',
        carrier: 'Transportes Rápidos',
        status: 'delivered',
        scheduledDate: '15/03/2023',
        deliveredDate: '15/03/2023',
        items: [
            { name: 'Laptop Dell XPS 13', quantity: 2 },
            { name: 'Monitor LG 27"', quantity: 3 },
        ],
        totalValue: 4899.97,
        notes: 'Entrega realizada com sucesso',
    },
    {
        id: '2',
        trackingNumber: 'TRK-2023-002',
        customer: 'Empresa XYZ',
        customerAddress: 'Rua de Santa Catarina 456, 4000-446 Porto',
        carrier: 'Transportes Rápidos',
        status: 'in_transit',
        scheduledDate: '20/03/2023',
        deliveredDate: null,
        items: [
            { name: 'Teclado Mecânico Logitech', quantity: 5 },
            { name: 'Mouse Wireless Microsoft', quantity: 5 },
            { name: 'Headset Bluetooth Sony', quantity: 2 },
        ],
        totalValue: 1199.85,
        notes: 'Entrega em trânsito',
    },
    {
        id: '3',
        trackingNumber: 'TRK-2023-003',
        customer: 'António Ferreira',
        customerAddress: 'Av. Central 789, 4710-229 Braga',
        carrier: 'CTT Expresso',
        status: 'scheduled',
        scheduledDate: '25/03/2023',
        deliveredDate: null,
        items: [
            { name: 'Webcam Logitech HD', quantity: 1 },
        ],
        totalValue: 79.99,
        notes: 'Entrega agendada',
    },
    {
        id: '4',
        trackingNumber: 'TRK-2023-004',
        customer: 'Empresa DEF',
        customerAddress: 'Rua de Santo António 101, 8000-283 Faro',
        carrier: 'CTT Expresso',
        status: 'pending',
        scheduledDate: null,
        deliveredDate: null,
        items: [
            { name: 'Laptop Dell XPS 13', quantity: 1 },
            { name: 'Teclado Mecânico Logitech', quantity: 1 },
            { name: 'Mouse Wireless Microsoft', quantity: 1 },
        ],
        totalValue: 1439.97,
        notes: 'Aguardando processamento',
    },
    {
        id: '5',
        trackingNumber: 'TRK-2023-005',
        customer: 'Carlos Rodrigues',
        customerAddress: 'Rua da Boavista 234, 4050-107 Porto',
        carrier: 'Transportes Rápidos',
        status: 'cancelled',
        scheduledDate: '10/03/2023',
        deliveredDate: null,
        items: [
            { name: 'Monitor LG 27"', quantity: 1 },
        ],
        totalValue: 299.99,
        notes: 'Entrega cancelada pelo cliente',
    },
    {
        id: '6',
        trackingNumber: 'TRK-2023-006',
        customer: 'Empresa GHI',
        customerAddress: 'Av. da República 567, 1050-191 Lisboa',
        carrier: 'CTT Expresso',
        status: 'delivered',
        scheduledDate: '12/03/2023',
        deliveredDate: '13/03/2023',
        items: [
            { name: 'Headset Bluetooth Sony', quantity: 3 },
            { name: 'Webcam Logitech HD', quantity: 3 },
        ],
        totalValue: 629.94,
        notes: 'Entrega realizada com sucesso',
    },
];

// Filter fields
const filterFields = [
    {
        name: 'status',
        label: 'Status',
        type: 'select' as const,
        options: [
            { label: 'Entregue', value: 'delivered' },
            { label: 'Em Trânsito', value: 'in_transit' },
            { label: 'Agendado', value: 'scheduled' },
            { label: 'Pendente', value: 'pending' },
            { label: 'Cancelado', value: 'cancelled' },
        ],
    },
    {
        name: 'carrier',
        label: 'Transportadora',
        type: 'select' as const,
        options: [
            { label: 'Transportes Rápidos', value: 'Transportes Rápidos' },
            { label: 'CTT Expresso', value: 'CTT Expresso' },
        ],
    },
];

export default function LogisticPage() {
    const [deliveries, setDeliveries] = useState(mockDeliveries);
    const [filteredDeliveries, setFilteredDeliveries] = useState(mockDeliveries);
    const [filterValues, setFilterValues] = useState<Record<string, any>>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeliveryModal, setShowDeliveryModal] = useState(false);
    const [selectedDelivery, setSelectedDelivery] = useState<any>(null);


    // Get status badge color
    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-500';
            case 'in_transit':
                return 'bg-blue-500';
            case 'scheduled':
                return 'bg-yellow-500';
            case 'pending':
                return 'bg-purple-500';
            case 'cancelled':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    // Get status label
    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'Entregue';
            case 'in_transit':
                return 'Em Trânsito';
            case 'scheduled':
                return 'Agendado';
            case 'pending':
                return 'Pendente';
            case 'cancelled':
                return 'Cancelado';
            default:
                return status;
        }
    };

    return (
        <>
            <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-white">Logística e Expedição</h1>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
                    >
                        <Plus size={18} />
                        Nova Entrega
                    </button>
                </div>


                {/* Delivery cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDeliveries.map((delivery) => (
                        <div
                            key={delivery.id}
                            className="relative bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg overflow-hidden shadow-md hover:shadow-violet-900/20 cursor-pointer"
                        >
                            <div className="absolute top-2 right-2">
                                <span className={`${getStatusBadgeColor(delivery.status)} text-white text-xs px-2 py-1 rounded-full`}>
                                    {getStatusLabel(delivery.status)}
                                </span>
                            </div>

                            <div className="p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-violet-900/30 p-2 rounded-full">
                                        <Package size={24} className="text-violet-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">{delivery.trackingNumber}</h3>
                                        <p className="text-violet-400 text-sm">{delivery.carrier}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-gray-300">
                                        {delivery.customer.includes('Empresa') ? (
                                            <Building size={14} className="text-violet-400" />
                                        ) : (
                                            <User size={14} className="text-violet-400" />
                                        )}
                                        <span>{delivery.customer}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-300">
                                        <MapPin size={14} className="text-violet-400" />
                                        <span className="truncate">{delivery.customerAddress}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-300">
                                        <Calendar size={14} className="text-violet-400" />
                                        <span>
                                            {delivery.scheduledDate ?
                                                `Agendado para: ${delivery.scheduledDate}` :
                                                'Não agendado'}
                                        </span>
                                    </div>

                                    {delivery.deliveredDate && (
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Clock size={14} className="text-violet-400" />
                                            <span>Entregue em: {delivery.deliveredDate}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-800">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 text-xs">Itens:</span>
                                        <span className="text-gray-300 text-xs">{delivery.items.reduce((sum, item) => sum + item.quantity, 0)} produtos</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-gray-400 text-xs">Valor Total:</span>
                                        <span className="text-green-500 font-medium">€{delivery.totalValue.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredDeliveries.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-400">
                            Nenhuma entrega encontrada com os filtros aplicados.
                        </div>
                    )}
                </div>
            </div>

            {/* Add Delivery Modal */}
            {showAddModal && (
                <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
                    <p>a</p>
                </Modal>
            )}

            {/* Delivery Details Modal */}
            {showDeliveryModal && selectedDelivery && (
                <Modal onclick={() => setShowDeliveryModal(false)} isCreate={false} isLarge={true}>
                    <p>a</p>
                </Modal>
            )}
        </>
    );
}