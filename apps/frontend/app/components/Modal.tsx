import React, { ReactNode, useState } from 'react'

type Props = {
    onclick: () => void;
    children: ReactNode;
    isCreate: boolean; 
    isLarge: boolean;
}


export const Modal = ({ onclick, children, isCreate, isLarge }: Props) => {

    const [isClosing, setIsClosing] = useState<boolean>(false);


    const handleClick = () => {
        setIsClosing(true)
        
        setTimeout(() => {
            onclick();
        }, 300)

    }

    return (
        <>
            <div className={`flex justify-center items-center h-full w-screen fixed top-0 z-50 bg-black bg-opacity-50 
                ${isClosing ? "animate-fade-out" : "animate-showing-up"}`}
            >
                <div 
                    className={`w-full bg-base-200 border-base-300 rounded-box w-xs border p-4
                    ${isLarge ? "md:w-3/4 lg:w-2/3 h-5/6" : "md:w-1/2 lg:w-1/4 h-1/2"}`}
                >
                    <div className='w-full flex items-center justify-center flex-col'>
                    
                        {children}
                
                        <div className='w-full flex items-center justify-center mt-5 gap-5 color-bl '>
                            {isCreate ? <button className="btn btn-success w-32">Create</button> : ""}
                            <button className='btn btn-error w-32' onClick={handleClick}>
                                {isCreate ? "Cancel" : "Close"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
