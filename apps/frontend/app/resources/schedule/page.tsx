import { Schedule } from '@/app/components/Schedule'
import React from 'react'

export default function page(){


  return (
    <>
        <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
            <h1 className='text-3xl font-bold text-white mb-10'>Horários por filial</h1>

            <Schedule department='a' />

        </div>
    </>
  )
}

