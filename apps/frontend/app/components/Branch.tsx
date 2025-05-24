import React from 'react'
import { Pencil } from 'lucide-react'
import { InfoCard } from '@/app/components/InfoCard'

type BranchProps = {
  name: string
  address: string
  manager: string
  phone: string
  email: string
  function: string
  inauguratedAt: string
  employeesCount: string
  workingHours: string
  onEdit?: () => void
}

export const Branch = ({
  name,
  address,
  manager,
  phone,
  email,
  function: branchFunction,
  inauguratedAt,
  employeesCount,
  workingHours,
  onEdit = () => alert(`Editar filial ${name}`)
}: BranchProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-violet-400">{name}</h2>
        <button 
          onClick={onEdit}
          className="bg-[#11161d] text-violet-400 hover:text-violet-300 px-4 py-2 rounded-lg border border-gray-800 hover:border-violet-700 transition-all duration-300 flex items-center gap-2"
        >
          <Pencil size={16} />
          <span>Editar filial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard 
          label="Nome da filial" 
          value={name} 
          onEdit={() => alert(`Editar nome da filial ${name}`)} 
        />
        <InfoCard 
          label="Endereço completo" 
          value={address} 
          onEdit={() => alert(`Editar endereço de ${name}`)} 
        />
        <InfoCard 
          label="Responsável local" 
          value={manager} 
          onEdit={() => alert(`Editar responsável de ${name}`)} 
        />
        <InfoCard 
          label="Telefone" 
          value={phone} 
          onEdit={() => alert(`Editar telefone de ${name}`)} 
        />
        <InfoCard 
          label="Email" 
          value={email} 
          isEmail 
          onEdit={() => alert(`Editar email de ${name}`)} 
        />
        <InfoCard 
          label="Função da unidade" 
          value={branchFunction} 
          onEdit={() => alert(`Editar função de ${name}`)} 
        />
        <InfoCard 
          label="Data de inauguração" 
          value={inauguratedAt} 
          onEdit={() => alert(`Editar data de inauguração de ${name}`)} 
        />
        <InfoCard 
          label="Número de funcionários" 
          value={employeesCount} 
          onEdit={() => alert(`Editar número de funcionários de ${name}`)} 
        />
        <InfoCard 
          label="Horário de funcionamento" 
          value={workingHours} 
          onEdit={() => alert(`Editar horário de ${name}`)} 
        />
      </div>
    </div>
  )
}