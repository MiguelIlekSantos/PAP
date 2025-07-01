import React, { useState } from 'react';
import { Users, ArrowRight, Pencil } from 'lucide-react';
import Link from 'next/link';
import { DepartmentsDTO } from '@pap/utils';

type BranchDepartmentsListProps = {
  departments: DepartmentsDTO[] | null;
  setDptModal: () => void;
};

export const BranchDepartmentsList = (props: BranchDepartmentsListProps) => {


  return (
    <div className="bg-[#11161d] border border-gray-800 rounded-lg p-4">
      <div className='flex justify-between'>
        <h3 className="text-lg font-semibold text-violet-400 mb-4">Departamentos nesta filial</h3>
        <button className='btn' onClick={props.setDptModal}><Pencil size={20} /></button>
      </div>
      <div className="space-y-3">
        {props.departments?.map((dept) => (
          <div 
            key={dept.id} 
            className="flex justify-between items-center p-3 border border-gray-800 rounded-lg hover:border-violet-700 transition-all duration-200"
          >
            <div>
              <h4 className="text-white font-medium">{dept.name}</h4>
              <p className="text-sm text-gray-400">Responsável: {dept.responsible}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-gray-400">
                <Users size={14} className="mr-1" />
                <span className="text-sm">{dept.totalEmployees}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};