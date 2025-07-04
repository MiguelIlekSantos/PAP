import React from 'react';
import { User, Building, Phone, Mail, MapPin, Edit, Trash2 } from 'lucide-react';
import { Clients } from '@prisma/client';

// Interface para estender o tipo Clients com propriedades adicionais para a UI
interface ClientWithUI extends Clients {
  totalPurchases?: number;
  lastPurchase?: string;
}

type ClientCardProps = {
  client: ClientWithUI;
  onClick: (client: ClientWithUI) => void;
  onEdit?: (client: ClientWithUI) => void;
  onDelete?: (client: ClientWithUI) => void;
};

export const ClientCard = ({ client, onClick, onEdit, onDelete }: ClientCardProps) => {
  const handleClick = () => {
    onClick(client);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(client);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(client);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
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
              title="Editar cliente"
            >
              <Edit size={14} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="p-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-full transition-colors"
              title="Excluir cliente"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      )}
      
      <div className="p-4">
        {/* Header with icon and name */}
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-violet-900/30 p-2 rounded-full">
            {client.type === 'company' ? (
              <Building size={24} className="text-violet-400" />
            ) : (
              <User size={24} className="text-violet-400" />
            )}
          </div>
          <div>
            <h3 className="text-white font-medium">{client.name}</h3>
            <p className="text-violet-400 text-sm">{client.type === 'company' ? 'Empresa' : 'Individual'}</p>
          </div>
        </div>
        
        {/* Contact information */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <Mail size={14} className="text-violet-400" />
            <span className="truncate">{client.email || 'Não informado'}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300">
            <Phone size={14} className="text-violet-400" />
            <span>{client.phone || 'Não informado'}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin size={14} className="text-violet-400" />
            <span className="truncate">{client.address || 'Não informado'}</span>
          </div>
        </div>
        
        {/* Purchase information */}
        {client.totalPurchases !== undefined && (
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs">Total de Compras:</span>
              <span className="text-green-500 font-medium">{formatCurrency(client.totalPurchases)}</span>
            </div>
            {client.lastPurchase && (
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-400 text-xs">Última Compra:</span>
                <span className="text-gray-300 text-xs">{client.lastPurchase}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};