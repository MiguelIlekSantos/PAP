import React from 'react'

export const MenuBtn = () => {
    return (
        <div className='flex flex-row items-center gap-2 justify-center w-full h-full'>
            <div className='flex flex-col items-center justify-center gap-2'>
                <div className='rounded-md w-5 h-5 bg-purple-900'></div>
                <div className='rounded-md w-5 h-5 bg-purple-900'></div>
            </div>
            <div className='flex flex-col items-center justify-center gap-2'>
                <div className='rounded-md w-5 h-5 bg-purple-900'></div>
                <div className='rounded-md w-5 h-5 bg-purple-900'></div>
            </div>
        </div>
    )
}
