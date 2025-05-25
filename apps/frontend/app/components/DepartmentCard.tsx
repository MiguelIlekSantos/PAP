import React from 'react';
import { ArrowRight, Users, DollarSign, MapPin, Pencil } from 'lucide-react';
import Link from 'next/link';

type DepartmentCardProps = {
  id: string;
  name: string;
  manager: string;
  employeeCount: number;
  budget: {
    total: number;
    used: number;
    currency: string;
  };
  location: string;
  onClick: (departmentId: string) => void;
};

export const DepartmentCard = (props: DepartmentCardProps) => {
  const budgetPercentage = Math.min(Math.round((props.budget.used / props.budget.total) * 100), 100);
 
  const getProgressColor = () => {
    if (budgetPercentage < 60) return 'bg-green-500';
    if (budgetPercentage < 85) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que o clique se propague para elementos pai
    props.onClick(props.id);
  };

  return (
    <div className="bg-[#11161d] border border-gray-800 hover:border-violet-700 rounded-xl p-5 shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-violet-400">{props.name}</h3>
        <div className="text-gray-400 hover:text-violet-400 transition-colors duration-200 cursor-pointer">
          <Pencil onClick={handleEditClick} />
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm">
          <span className="text-gray-400 mr-2">Responsável:</span>
          <span className="text-white">{props.manager}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <Users size={16} className="text-gray-400 mr-2" />
          <span className="text-white">{props.employeeCount} funcionários</span>
        </div>
        
        <div className="flex items-center text-sm">
          <MapPin size={16} className="text-gray-400 mr-2" />
          <span className="text-white">{props.location}</span>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center text-sm mb-1">
          <span className="text-gray-400">Orçamento:</span>
          <span className="text-white">
            {props.budget.used.toLocaleString('pt-PT')} / {props.budget.total.toLocaleString('pt-PT')} {props.budget.currency}
          </span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${getProgressColor()}`} 
            style={{ width: `${budgetPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};