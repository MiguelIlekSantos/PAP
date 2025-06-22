import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
    title: string
}


export const Fieldset = (props: Props) => {
  return (
    <>
        <fieldset className='w-full md:w-3/4 flex flex-col border border-gray-400 rounded-md p-2 md:p-5 mb-3'>
            <legend className='text-lg font-bold p-2'>{props.title}</legend>
            <div className='flex flex-wrap gap-5 lg:gap-y-10 w-full'>
                {props.children}
            </div>
        </fieldset>
    </>
  )
}
