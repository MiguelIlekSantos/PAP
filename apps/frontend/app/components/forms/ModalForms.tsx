'use client';
import { create, CreateEnterpriseDTO } from '@/lib/api';
import { Enterprise } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';

type Dicitionary<T> = {
    [key: string]: T;
};

type Props = {
    onclick: () => void;
    setInputData: React.Dispatch<React.SetStateAction<Partial<CreateEnterpriseDTO>>>;
    createEnterprise: () => Promise<boolean>;
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

    async function createEnterpriseAndClose() {
        const success = await props.createEnterprise();
        if (success) {
            handleClick();
            window.location.reload()
        }
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
                className={`fixed inset-0 z-50 flex justify-center items-center 
                bg-black/60 backdrop-blur-sm
                ${isClosing ? 'animate-fade-out' : 'animate-showing-up'}
                overflow-y-auto p-4`}
            >
                <div
                    className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl 
                    border border-gray-200 dark:border-gray-700
                    w-full max-w-4xl max-h-[90vh] overflow-y-auto
                    transform transition-all duration-300 ease-out"
                >
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Create New Enterprise
                            </h2>
                            <button 
                                onClick={handleClick}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-8 py-6">
                        <div className="flex flex-col items-center space-y-6">
                            {childrenWithMethods}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
                        <div className="flex items-center justify-end space-x-4">
                            <button 
                                className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 
                                border border-gray-300 dark:border-gray-600 rounded-lg font-medium
                                hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200
                                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" 
                                onClick={handleClick}
                            >
                                Cancel
                            </button>
                            <button 
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium
                                transition-colors duration-200 shadow-lg hover:shadow-xl
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                disabled:opacity-50 disabled:cursor-not-allowed" 
                                onClick={createEnterpriseAndClose}
                            >
                                Create Enterprise
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};



