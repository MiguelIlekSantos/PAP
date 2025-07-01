import { Search, Trash2 } from 'lucide-react';
import { convertISOtoDate } from '@/lib/functions';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store';

type Props = {
    id: number
    name: string | null;
    email?: string | null;
    imgUrl?: string | null;
    foundationDate?: Date | null;
    onDelete?: (enterpriseId: number) => void;
}


export const Card = (props: Props) => {

    const { setEnterprise } = useEnterpriseStore()

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (props.onDelete) {
            props.onDelete(props.id);
        }
    };

    return (
        <>
            <div className='w-96 h-96'>
                <div className="bg-gray-700/30 rounded-lg overflow-hidden shadow-sm w-full h-full flex items-center flex-col relative">
                    {/* Botão de deletar no canto superior direito */}
                    {props.onDelete && (
                        <button
                            onClick={handleDeleteClick}
                            className="absolute top-3 right-3 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-200 z-10"
                            title="Deletar empresa"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                    
                    <figure className='w-full h-52 flex justify-center items-center'>

                        {props.imgUrl ?
                            <Image
                                src={props.imgUrl}
                                alt="Logo"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: 'auto', height: '100%' }}
                            />
                            :
                            <div className='flex flex-col items-center justify-center gap-5'>
                                <Search className="w-15 h-15 text-gray-500" />
                                <p>Logo not added yet!</p>
                            </div>
                        }

                    </figure>
                    <div className="card-body w-full">
                        <h2 className="card-title">{props.name}</h2>
                        <p>{props.email}</p>
                        <p>{convertISOtoDate(props.foundationDate?.toString())}</p>
                        <div className="card-actions justify-end">
                            <Link href={"/details"} onClick={() => setEnterprise(props.id)}>
                                <button className="btn btn-primary hover:border hover:border-purple-500">Open</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
