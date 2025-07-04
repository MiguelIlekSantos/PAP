import React from 'react';
import { Package, User, Truck, Calendar, Clock, MapPin, Edit, Trash2, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

type DeliveryCardProps = {
  delivery: any;
  onClick: (delivery: any) => void;
  onEdit?: (delivery: any) => void;
  onDelete?: (delivery: any) => void;
};

export const DeliveryCard = ({ delivery, onClick, onEdit, onDelete }: DeliveryCardProps) => {
  const handleClick = () => {
    onClick(delivery);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(delivery);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(delivery);
    }
  };

  const formatDate = (date: Date | string | null | undefined): string => {
    if (!date) return 'Não definido';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pendente':
        return 'text-yellow-400';
      case 'em_transito':
      case 'em transito':
        return 'text-blue-400';
      case 'entregue':
        return 'text-green-400';
      case 'cancelado':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pendente':
        return <Clock size={16} className="text-yellow-400" />;
      case 'em_transito':
      case 'em transito':
        return <Truck size={16} className="text-blue-400" />;
      case 'entregue':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'cancelado':
        return <XCircle size={16} className="text-red-400" />;
      default:
        return <AlertTriangle size={16} className="text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pendente':
        return 'Pendente';
      case 'em_transito':
      case 'em transito':
        return 'Em Trânsito';
      case 'entregue':
        return 'Entregue';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status || 'Desconhecido';
    }
  };

  const isLate = delivery.expectedDate && delivery.status?.toLowerCase() !== 'entregue' && 
                 new Date(delivery.expectedDate) < new Date();

  return (
    <div 
      className={`relative bg-[#0d1218] border ${isLate ? 'border-red-700' : 'border-gray-800'} hover:border-violet-700 transition-all duration-300 rounded-lg overflow-hidden shadow-md hover:shadow-violet-900/20 cursor-pointer`}
      onClick={handleClick}
    >
      {/* Action buttons */}
      {(onEdit || onDelete) && (
        <div className="absolute top-2 right-2 flex gap-1">
          {onEdit && (
            <button
              onClick={handleEdit}
              className="p-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-full transition-colors"
              title="Editar entrega"
            >
              <Edit size={14} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="p-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-full transition-colors"
              title="Excluir entrega"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      )}

      {/* Late indicator */}
      {isLate && (
        <div className="absolute top-2 left-2 bg-red-600/20 text-red-400 px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <AlertTriangle size={12} />
          Atrasado
        </div>
      )}
      
      <div className="p-4 pt-10">
        {/* Header with icon and status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-violet-900/30 p-2 rounded-full">
              <Package size={24} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-white font-medium">Entrega #{delivery.id}</h3>
              <div className="flex items-center gap-1">
                {getStatusIcon(delivery.status)}
                <span className={`text-sm ${getStatusColor(delivery.status)}`}>
                  {getStatusText(delivery.status)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Client and Transporter information */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <User size={14} className="text-violet-400" />
            <span className="truncate">{delivery.Client?.name || 'Cliente não informado'}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300">
            <Truck size={14} className="text-violet-400" />
            <span className="truncate">
              {delivery.Transporter?.licensePlate || 'Transportador não informado'}
              {delivery.Transporter?.representative && ` - ${delivery.Transporter.representative}`}
            </span>
          </div>
        </div>
        
        {/* Dates information */}
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="flex items-center gap-1 text-gray-400 mb-1">
                <Calendar size={12} />
                <span>Data Prevista:</span>
              </div>
              <span className="text-gray-300">{formatDate(delivery.expectedDate)}</span>
            </div>
            
            <div>
              <div className="flex items-center gap-1 text-gray-400 mb-1">
                <CheckCircle size={12} />
                <span>Data Entrega:</span>
              </div>
              <span className="text-gray-300">{formatDate(delivery.deliveryDate)}</span>
            </div>
          </div>
        </div>

        {/* Additional information */}
        {(delivery.totalProducts !== undefined || delivery.totalWeight !== undefined) && (
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="flex justify-between items-center text-xs">
              {delivery.totalProducts !== undefined && (
                <div>
                  <span className="text-gray-400">Produtos: </span>
                  <span className="text-violet-400 font-medium">{delivery.totalProducts}</span>
                </div>
              )}
              {delivery.totalWeight !== undefined && (
                <div>
                  <span className="text-gray-400">Peso: </span>
                  <span className="text-violet-400 font-medium">{delivery.totalWeight}kg</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};