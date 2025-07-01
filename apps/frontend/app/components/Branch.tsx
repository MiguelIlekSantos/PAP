import React, { useEffect, useState } from 'react'
import { InfoCard } from './InfoCard'
import { BranchDepartmentsList } from './BranchDepartmentsList'
import { Branches, Departments } from '@prisma/client'
import { getAll, getById, ListResponse } from '@/lib/api'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { BranchesWithDepartments, EnterpriseWithBranches } from '@pap/utils'
import { Trash2 } from 'lucide-react'

type BranchProps = {
    id: number
    idOfEnterprise?: number
    address: string
    phone?: string | null
    email?: string | null
    purpose?: string | null
    setDptModal: () => void
    onDelete?: (branchId: number) => void
}

const APIMODULE = "departments"

export const Branch = (props: BranchProps) => {
    const [branches, setBranches] = useState<BranchesWithDepartments>()
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        getById<BranchesWithDepartments>("branches", props.id)
            .then((data) => {
                setLoaded(true)
                setBranches(data)
            })
    }, [])

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (props.onDelete) {
            props.onDelete(props.id);
        }
    };


    return (
        <div className="bg-[#11161d] border border-gray-800 hover:border-violet-700 rounded-xl p-6 shadow-lg transition-all duration-300 h-full relative">
            {/* Botão de deletar no canto superior direito */}
            {props.onDelete && (
                <button
                    onClick={handleDeleteClick}
                    className="absolute top-3 right-3 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-200"
                    title="Deletar filial"
                >
                    <Trash2 size={16} />
                </button>
            )}
            
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-violet-400">Filial #{props.idOfEnterprise}</h2>
            </div>
            
            <div className='mt-7'></div>

            <div className="grid grid-cols-1 gap-3 mb-6">
                <InfoCard elementId={props.id} module="branches" name='address' label="Endereço completo" value={props.address} />
                <InfoCard elementId={props.id} module="branches" name='phone' label="Telefone" value={props.phone || "N/A"} />
                <InfoCard elementId={props.id} module="branches" name='email' label="Email de contato" value={props.email || "N/A"} isEmail />
                <InfoCard elementId={props.id} module="branches" name='purpose' label="Função da unidade" value={props.purpose || "N/A"} />
            </div>

            {/* Lista de departamentos na filial */}
            <div className="mt-6">
                <BranchDepartmentsList departments={branches?.departments ?? null} setDptModal={props.setDptModal}/>
            </div>
        </div>
    )
}