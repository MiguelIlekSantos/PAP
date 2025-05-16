import React from 'react'

type AddBtnCardProps = {
    onclick: () => void
}


export const AddBtnCard = ({ onclick }: AddBtnCardProps) => {
    return (
        <>
            <div 
                onClick={onclick}
                className="card bg-base-100 w-96 h-96 shadow-sm flex items-center justify-center border-2 rounded-md animate-card-border transition-transform duration-300 hover:scale-105 cursor-pointer">
                <div className='btn w-full h-full'>
                    <div className='w-32 h-32 rounded-full border-2 flex justify-center items-center animate-card-border transition-transform duration-100 active:scale-110'>
                        <div className='relative w-2/4 h-5 animate-card-sign rounded-lg'></div>
                        <div className='absolute w-1/6 h-5 animate-card-sign rounded-lg rotate-90'></div>
                    </div>
                </div>
            </div>
        </>
    )
}
