import React from 'react';
import { User, Phone, Mail, Calendar, Clock, Award, MapPin } from 'lucide-react';

type EmployeeCardProps = {
  employee: {
    id: string;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    joinDate: string;
    schedule: string;
    status: 'active' | 'vacation' | 'leave' | 'terminated';
    location: string;
    photo?: string;
  };
  onClick?: () => void;
};

export const EmployeeCard = ({ employee, onClick }: EmployeeCardProps) => {
  const statusColors = {
    active: 'bg-green-500',
    vacation: 'bg-blue-500',
    leave: 'bg-yellow-500',
    terminated: 'bg-red-500',
  };

  const statusLabels = {
    active: 'Ativo',
    vacation: 'Férias',
    leave: 'Licença',
    terminated: 'Desligado',
  };

  return (
    <div 
      className="relative bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg overflow-hidden shadow-md hover:shadow-violet-900/20 cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute top-2 right-2">
        <span className={`${statusColors[employee.status]} text-white text-xs px-2 py-1 rounded-full`}>
          {statusLabels[employee.status]}
        </span>
      </div>
      
      <div className="p-4 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-violet-900/30 mb-3 overflow-hidden flex items-center justify-center">
          {employee.photo ? (
            <img src={employee.photo} alt={employee.name} className="w-full h-full object-cover" />
          ) : (
            <User size={40} className="text-violet-300" />
          )}
        </div>
        
        <h3 className="text-white font-medium text-lg">{employee.name}</h3>
        <p className="text-violet-400 text-sm">{employee.position}</p>
        <p className="text-gray-400 text-xs mb-4">{employee.department}</p>
        
        <div className="w-full grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <Mail size={14} className="text-violet-400" />
            <span className="truncate">{employee.email}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300">
            <Phone size={14} className="text-violet-400" />
            <span>{employee.phone}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar size={14} className="text-violet-400" />
            <span>Desde {employee.joinDate}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300">
            <Clock size={14} className="text-violet-400" />
            <span>{employee.schedule}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin size={14} className="text-violet-400" />
            <span>{employee.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};