import React from 'react';
import { Package, DollarSign, BarChart3, Tag, Warehouse, AlertTriangle } from 'lucide-react';

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    sku: string;
    category: string;
    price: number | null;
    stock: number | null;
    brand: string;
    warehouse: string;
    status: 'active' | 'low' | 'out' | 'service';
    imageUrl?: string;
  };
  onClick?: () => void;
};

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const statusColors = {
    active: 'bg-green-500',
    low: 'bg-yellow-500',
    out: 'bg-red-500',
    service: 'bg-blue-500',
  };

  const statusLabels = {
    active: 'Em estoque',
    low: 'Estoque baixo',
    out: 'Sem estoque',
    service: 'Serviço',
  };

  const getStockColor = (stock: number | null, status: string) => {
    if (status === 'service') return 'text-blue-400';
    if (!stock || stock === 0) return 'text-red-400';
    if (stock <= 10) return 'text-yellow-400';
    return 'text-green-400';
  };

  const formatPrice = (price: number | null): string => {
    if (!price) return 'N/A';
    return `€${price.toFixed(2)}`;
  };

  return (
    <div 
      className="relative bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg overflow-hidden shadow-md hover:shadow-violet-900/20 cursor-pointer transform hover:scale-105"
      onClick={onClick}
    >
      <div className="absolute top-2 right-2">
        <span className={`${statusColors[product.status]} text-white text-xs px-2 py-1 rounded-full`}>
          {statusLabels[product.status]}
        </span>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-violet-900/30 overflow-hidden flex items-center justify-center">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <Package className="text-violet-400" size={24} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-lg truncate">{product.name}</h3>
            <p className="text-gray-400 text-sm truncate">{product.sku || 'No SKU'}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="text-gray-400" size={16} />
              <span className="text-gray-400 text-sm">Category</span>
            </div>
            <span className="text-white text-sm truncate max-w-[120px]">{product.category || 'Not specified'}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="text-gray-400" size={16} />
              <span className="text-gray-400 text-sm">Price</span>
            </div>
            <span className="text-green-400 font-semibold text-sm">{formatPrice(product.price)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="text-gray-400" size={16} />
              <span className="text-gray-400 text-sm">Stock</span>
            </div>
            <span className={`font-semibold text-sm ${getStockColor(product.stock, product.status)}`}>
              {product.status === 'service' ? 'N/A' : (product.stock || 0)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Warehouse className="text-gray-400" size={16} />
              <span className="text-gray-400 text-sm">Brand</span>
            </div>
            <span className="text-white text-sm truncate max-w-[120px]">{product.brand || 'Not specified'}</span>
          </div>
          
          {product.warehouse && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Warehouse className="text-gray-400" size={16} />
                <span className="text-gray-400 text-sm">Warehouse</span>
              </div>
              <span className="text-white text-sm truncate max-w-[120px]">{product.warehouse}</span>
            </div>
          )}
        </div>
        
        {/* Stock warning */}
        {product.status === 'low' && (
          <div className="mt-3 flex items-center gap-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
            <AlertTriangle className="text-yellow-400" size={16} />
            <span className="text-yellow-400 text-xs">Low stock warning</span>
          </div>
        )}
        
        {product.status === 'out' && (
          <div className="mt-3 flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-md">
            <AlertTriangle className="text-red-400" size={16} />
            <span className="text-red-400 text-xs">Out of stock</span>
          </div>
        )}
      </div>
    </div>
  );
};