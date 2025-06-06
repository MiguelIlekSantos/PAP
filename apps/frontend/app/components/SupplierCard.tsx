import { Building, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

type supplier = {
  id: string;
  name: string;
  type: 'hardware' | 'software' | 'services' | 'office';
  contact: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  status: string;
  totalOrders: number;
  lastOrder: string;
  paymentTerms: string;
  products: string[];
};


// 'hardware' | 'software' | 'services' | 'office'
// 'active' | 'inactive'


type Props = {
    supplier: supplier
}


export const SupplierCard = (props: Props) => {


  return (
    <>
            <div 
              key={props.supplier.id}
              className="relative bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg overflow-hidden shadow-md hover:shadow-violet-900/20 cursor-pointer"
            >
              <div className="absolute top-2 right-2">
                <span className={`${props.supplier.status === 'active' ? 'bg-green-500' : 'bg-gray-500'} text-white text-xs px-2 py-1 rounded-full`}>
                  {props.supplier.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-violet-900/30 p-2 rounded-full">
                    <Building size={24} className="text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{props.supplier.name}</h3>
                    <p className="text-violet-400 text-sm">
                      {props.supplier.type === 'hardware' && 'Hardware'}
                      {props.supplier.type === 'software' && 'Software'}
                      {props.supplier.type === 'services' && 'Serviços'}
                      {props.supplier.type === 'office' && 'Material de Escritório'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <User size={14} className="text-violet-400" />
                    <span>{props.supplier.contact}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail size={14} className="text-violet-400" />
                    <span className="truncate">{props.supplier.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone size={14} className="text-violet-400" />
                    <span>{props.supplier.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin size={14} className="text-violet-400" />
                    <span className="truncate">{props.supplier.address}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Total de Pedidos:</span>
                    <span className="text-green-500 font-medium">€{props.supplier.totalOrders.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-400 text-xs">Último Pedido:</span>
                    <span className="text-gray-300 text-xs">{props.supplier.lastOrder}</span>
                  </div>
                </div>
              </div>
            </div>
    
    </>
  )
}
