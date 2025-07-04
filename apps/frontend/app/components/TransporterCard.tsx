import React from 'react';
import { Truck, Phone, Star, MapPin, Edit, Trash2, User, Building2, Navigation } from 'lucide-react';
import { Transporters } from '@prisma/client';

// Interface para estender o tipo Transporters com propriedades adicionais para a UI
interface TransporterWithUI extends Transporters {
  totalDeliveries?: number;
  lastDelivery?: string;
}

type TransporterCardProps = {
  transporter: TransporterWithUI;
  onClick: (transporter: TransporterWithUI) => void;
  onEdit?: (transporter: TransporterWithUI) => void;
  onDelete?: (transporter: TransporterWithUI) => void;
};

export const TransporterCard = ({ transporter, onClick, onEdit, onDelete }: TransporterCardProps) => {
  const handleClick = () => {
    onClick(transporter);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(transporter);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(transporter);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const getStatusColor = (status: string | null | undefined): string => {
    switch (status?.toLowerCase()) {
      case 'ativo':
      case 'disponível':
        return 'text-green-400';
      case 'ocupado':
      case 'em transporte':
        return 'text-yellow-400';
      case 'inativo':
      case 'indisponível':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-gray-400 text-xs">Sem avaliação</span>;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={12} className="text-yellow-400 fill-current" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" size={12} className="text-yellow-400 fill-current opacity-50" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={12} className="text-gray-600" />);
    }
    
    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="text-xs text-gray-400 ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div 
      className="relative bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg overflow-hidden shadow-md hover:shadow-violet-900/20 cursor-pointer"
      onClick={handleClick}
    >
      {/* Action buttons */}
      {(onEdit || onDelete) && (
        <div className="absolute top-2 right-2 flex gap-1">
          {onEdit && (
            <button
              onClick={handleEdit}
              className="p-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-full transition-colors"
              title="Editar transportador"
            >
              <Edit size={14} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="p-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-full transition-colors"
              title="Excluir transportador"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      )}
      
      <div className="p-4">
        {/* Header with icon and license plate */}
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-violet-900/30 p-2 rounded-full">
            <Truck size={24} className="text-violet-400" />
          </div>
          <div>
            <h3 className="text-white font-medium">{transporter.licensePlate}</h3>
            <p className="text-violet-400 text-sm">
              {transporter.vehicleType || 'Transportador'}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-2 h-2 rounded-full ${
            transporter.status?.toLowerCase() === 'ativo' || transporter.status?.toLowerCase() === 'disponível' 
              ? 'bg-green-400' 
              : transporter.status?.toLowerCase() === 'ocupado' || transporter.status?.toLowerCase() === 'em transporte'
              ? 'bg-yellow-400'
              : 'bg-red-400'
          }`}></div>
          <span className={`text-sm font-medium ${getStatusColor(transporter.status)}`}>
            {transporter.status || 'Status não informado'}
          </span>
        </div>
        
        {/* Contact and details */}
        <div className="space-y-2 text-sm">
          {transporter.representative && (
            <div className="flex items-center gap-2 text-gray-300">
              <User size={14} className="text-violet-400" />
              <span className="truncate">{transporter.representative}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-gray-300">
            <Phone size={14} className="text-violet-400" />
            <span>{transporter.phone || 'Não informado'}</span>
          </div>
          
          {transporter.extEnterprise && (
            <div className="flex items-center gap-2 text-gray-300">
              <Building2 size={14} className="text-violet-400" />
              <span className="truncate">{transporter.extEnterprise}</span>
            </div>
          )}
          
          {transporter.operationArea && (
            <div className="flex items-center gap-2 text-gray-300">
              <Navigation size={14} className="text-violet-400" />
              <span className="truncate">{transporter.operationArea}</span>
            </div>
          )}
        </div>
        
        {/* Rating */}
        {transporter.rating && (
          <div className="mt-3">
            {renderStars(transporter.rating)}
          </div>
        )}
        
        {/* Price and delivery info */}
        <div className="mt-4 pt-4 border-t border-gray-800">
          {transporter.pricePerKm && (
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs">Preço por KM:</span>
              <span className="text-green-500 font-medium">{formatCurrency(transporter.pricePerKm)}</span>
            </div>
          )}
          
          {transporter.totalDeliveries !== undefined && (
            <div className="flex justify-between items-center mt-1">
              <span className="text-gray-400 text-xs">Total de Entregas:</span>
              <span className="text-blue-400 font-medium">{transporter.totalDeliveries}</span>
            </div>
          )}
          
          {transporter.lastDelivery && (
            <div className="flex justify-between items-center mt-1">
              <span className="text-gray-400 text-xs">Última Entrega:</span>
              <span className="text-gray-300 text-xs">{transporter.lastDelivery}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};