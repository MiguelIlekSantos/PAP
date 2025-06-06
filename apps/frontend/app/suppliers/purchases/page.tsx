'use client'

import React, { useState } from 'react'
import { Plus, Search, User, Building, Phone, Mail, MapPin, Package, Truck } from 'lucide-react'
import { Modal } from '@/app/components/Modal';


// Filter fields
const filterFields = [
  {
    name: 'type',
    label: 'Tipo',
    type: 'select' as const,
    options: [
      { label: 'Hardware', value: 'hardware' },
      { label: 'Software', value: 'software' },
      { label: 'Serviços', value: 'services' },
      { label: 'Material de Escritório', value: 'office' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Ativo', value: 'active' },
      { label: 'Inativo', value: 'inactive' },
    ],
  },
];

export default function SuppliersPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  return (
    <>
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Compras</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Adicionar Fornecedor
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          

        </div>
      </div>

      {/* Add Supplier Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <p>aaaa</p>
        </Modal>
      )}

      {/* Supplier Details Modal */}
      {showSupplierModal && selectedSupplier && (
        <Modal onclick={() => setShowSupplierModal(false)} isCreate={false} isLarge={true}>
          <p>aaaa</p>
        </Modal>
      )}
    </>
  );
}