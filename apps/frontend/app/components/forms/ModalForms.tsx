'use client';
import React, { ReactNode, useEffect, useState } from 'react';

type Props = {
    onclick: () => void;
    children: ReactNode;
};

export const ModalForms = ({ onclick, children }: Props) => {
    const [isClosing, setIsClosing] = useState<boolean>(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleClick = () => {
        setIsClosing(true);
        setTimeout(() => {
            onclick();
        }, 300);
    };

    return (
        <>
            <div
                className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50
                ${isClosing ? 'animate-fade-out' : 'animate-showing-up'}
                overflow-y-auto`}
            >
                <div
                    className="bg-base-200 border border-base-300 rounded-box p-6 m-4 
                    w-full max-w-[90vw] max-h-[90vh] overflow-y-auto"
                >
                    <div className="flex flex-col items-center">
                        {children}

                        <div className="w-full flex items-center justify-center mt-5 gap-5">
                            <button className="btn btn-success w-32">Create</button>
                            <button className="btn btn-error w-32" onClick={handleClick}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
