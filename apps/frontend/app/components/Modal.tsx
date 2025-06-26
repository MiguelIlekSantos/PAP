import React, { ReactNode, useState, useEffect } from 'react'

type Props = {
    onclick: () => void;
    children: ReactNode;
    isCreate: boolean; 
    isLarge: boolean;
    title?: string;
}


export const Modal = ({ onclick, children, isCreate, isLarge, title }: Props) => {

    const [isClosing, setIsClosing] = useState<boolean>(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleClick = () => {
        setIsClosing(true)
        
        setTimeout(() => {
            onclick();
        }, 300)
    }

    return (
        <>
            <div className={`fixed inset-0 z-50 flex justify-center items-center 
                bg-black/60 backdrop-blur-sm overflow-y-auto p-4
                ${isClosing ? "animate-fade-out" : "animate-showing-up"}`}
            >
                <div 
                    className={`bg-white dark:bg-gray-900 shadow-2xl rounded-2xl 
                    border border-gray-200 dark:border-gray-700
                    transform transition-all duration-300 ease-out
                    ${isLarge 
                        ? "w-full max-w-6xl max-h-[90vh]" 
                        : "w-full max-w-2xl max-h-[80vh]"
                    } overflow-hidden`}
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {title || (isCreate ? "Create New Item" : "Details")}
                            </h2>
                            <button 
                                onClick={handleClick}
                                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full 
                                transition-colors duration-200 group"
                            >
                                <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" 
                                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`px-6 py-6 overflow-y-auto ${isLarge ? "max-h-[calc(90vh-140px)]" : "max-h-[calc(80vh-140px)]"}`}>
                        <div className='w-full flex items-center justify-center flex-col space-y-6'>
                            {children}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <div className='w-full flex items-center justify-end space-x-3'>
                            {isCreate && (
                                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                                font-medium transition-colors duration-200 shadow-lg hover:shadow-xl
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                disabled:opacity-50 disabled:cursor-not-allowed">
                                    Create
                                </button>
                            )}
                            <button 
                                className="px-6 py-2.5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 
                                border border-gray-300 dark:border-gray-600 rounded-lg font-medium
                                hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200
                                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" 
                                onClick={handleClick}
                            >
                                {isCreate ? "Cancel" : "Close"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
