import { ProjectsDTO } from '@pap/utils'
import { BarChart, Calendar, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    project: ProjectsDTO
}


export const ProjectCard = (props: Props) => {

    // Get status badge color
    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'in_progress':
                return 'bg-blue-500';
            case 'completed':
                return 'bg-green-500';
            case 'at_risk':
                return 'bg-red-500';
            case 'on_hold':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-500';
        }
    };

    // Get status label
    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'in_progress':
                return 'Em Andamento';
            case 'completed':
                return 'Concluído';
            case 'at_risk':
                return 'Em Risco';
            case 'on_hold':
                return 'Em Espera';
            default:
                return status;
        }
    };

    // Get priority badge color
    const getPriorityBadgeColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-500';
            case 'medium':
                return 'bg-yellow-500';
            case 'low':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    };

    // Get priority label
    const getPriorityLabel = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'Alta';
            case 'medium':
                return 'Média';
            case 'low':
                return 'Baixa';
            default:
                return priority;
        }
    };



    return (
        <>
            <Link
                href={`/projects/${props.project.id}`}
                className="relative bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg overflow-hidden shadow-md hover:shadow-violet-900/20"
            >
                <div className="absolute top-2 right-2 flex gap-2">
                    <span className={`${getPriorityBadgeColor(props.project.priority)} text-white text-xs px-2 py-1 rounded-full`}>
                        {getPriorityLabel(props.project.priority)}
                    </span>
                    <span className={`${getStatusBadgeColor(props.project.status)} text-white text-xs px-2 py-1 rounded-full`}>
                        {getStatusLabel(props.project.status)}
                    </span>
                </div>

                <div className="p-4">
                    <h3 className="text-white font-medium text-lg mt-6 mb-2">{props.project.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{props.project.description}</p>

                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-300">
                            <Users size={14} className="text-violet-400" />
                            <span>Cliente: {props.project.clientId}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-300">
                            <BarChart size={14} className="text-violet-400" />
                            <span>Orçamento: €{props.project.budget?.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-800">
                        <div className="mb-2 flex justify-between items-center">
                            <span className="text-gray-400 text-xs">Progresso:</span>
                            <span className="text-gray-300 text-xs">{props.project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${props.project.status === 'completed' ? 'bg-green-500' :
                                    props.project.status === 'at_risk' ? 'bg-red-500' :
                                        'bg-blue-500'
                                    }`}
                                style={{ width: `${props.project.progress}%` }}
                            ></div>
                        </div>

                        {/* <div className="mt-4 flex justify-between items-center">
                            <div className="flex -space-x-2">
                                {props.project.employees.slice(0, 3).map((member, index) => (
                                    <div
                                        key={index}
                                        className="w-8 h-8 rounded-full bg-violet-900/50 border-2 border-[#0d1218] flex items-center justify-center text-xs font-medium"
                                        
                                    >
                                        {member.split(' ').map(n => n[0]).join('')}
                                    </div>
                                ))}
                                {props.project.team.length > 3 && (
                                    <div
                                        className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#0d1218] flex items-center justify-center text-xs font-medium"
                                        title="Mais membros"
                                    >
                                        +{project.team.length - 3}
                                    </div>
                                )}
                            </div>
                            <span className="text-gray-400 text-xs">Gerente: {project.manager}</span>
                        </div> */}
                    </div>
                </div>
            </Link>
        </>
    )
}


