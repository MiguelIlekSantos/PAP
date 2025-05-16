import React, { useState } from 'react'

type Props = {
    onclick: () => void
}


export const AddEnterpriseModal = ({ onclick }: Props) => {

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
                <div className='w-full md:w-3/4 lg:w-2/3 h-5/6 bg-base-200 border-base-300 rounded-box w-xs border p-4'>
                    <div className='w-full flex items-center justify-center flex-col'>
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Login</legend>

                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email" />

                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Password" />
                        </fieldset>

                        <div className='w-full flex items-center justify-center mt-5 gap-5'>
                            <button className="btn btn-success w-32">Create</button>
                            <button className='btn btn-error w-32' onClick={handleClick}>
                                Cancel
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
