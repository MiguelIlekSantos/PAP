'use client';
import { create, CreateEnterpriseDTO } from '@/lib/api';
import { Enterprise } from '@prisma/client';
import React, { ReactNode, useEffect, useState } from 'react';

type Dicitionary<T> = {
    [key: string]: T;
};

type Props = {
    onclick: () => void;
    setInputData: React.Dispatch<React.SetStateAction<Partial<CreateEnterpriseDTO>>>;
    createEnterprise: () => void;
    children: ReactNode;
};

export const ModalForms = (props: Props) => {

    const [isClosing, setIsClosing] = useState<boolean>(false);

    function changeData<Key extends keyof CreateEnterpriseDTO>(
        key: Key,
        value: string
    ) {
        props.setInputData((prev) => ({
            ...prev,
            [key]: key === 'foundationDate'
                ? (new Date(value) as any)    
                : (value as any),
        }))
    }


    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleClick = () => {
        setIsClosing(true);
        setTimeout(() => {
            props.onclick();
        }, 300);
    };

    const childrenWithMethods = React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
                changeData: changeData
            })
        }
        return child;
    })

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
                        {childrenWithMethods}

                        <div className="w-full flex items-center justify-center mt-5 gap-5">
                            <button className="btn btn-success w-32" onClick={props.createEnterprise}>Create</button>
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



