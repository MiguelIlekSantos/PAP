import { Search } from 'lucide-react';
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
}


export const Card = (props: Props) => {

    const { setEnterprise } = useEnterpriseStore()

    return (
        <>
            <div className='w-96 h-96'>
                <div className="bg-gray-700/30 rounded-lg overflow-hidden shadow-sm w-full h-full flex items-center flex-col">
                    <figure className='w-full h-52 flex justify-center items-center'>

                        {props.imgUrl ?
                            <Image
                                src="/logo/logoAIMS.png"
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
