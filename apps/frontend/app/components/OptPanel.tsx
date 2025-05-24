import React from 'react'
import { OptBtn } from './OptBtn'
import { Buttons } from "../data/painelBtns"
import { Nav } from './Nav'
import { DrawerMenu } from './DrawerMenu'

export const OptPanel = () => { 




  return (
    <>
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='w-screen pt-20 md:pt-0 md:w-2/3 flex justify-center items-center flex-wrap gap-12 text-center'>
                {
                    Buttons.map((button, i) => (
                        <OptBtn title={button.title} img={button.img} url={button.url} key={i} />
                    ))
                }
            </div>
        </div>
    </>
  )
}
