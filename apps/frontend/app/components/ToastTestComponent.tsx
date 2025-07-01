'use client'

import React from 'react'
import toast from 'react-hot-toast'
import { showSuccess, showError } from '../../lib/utils/toastHelpers'
import { getAll } from '../../lib/api/genericRequests'

export const ToastTestComponent: React.FC = () => {
  
  const testApiError = async () => {
    try {
      await getAll('endpoint-inexistente')
    } catch (error) {
      console.log('Erro capturado no componente')
    }
  }

  const testSuccessToast = () => {
    showSuccess('Operação realizada com sucesso!')
  }

  const testErrorToast = () => {
    showError('Este é um erro de teste!')
  }

  const testMultipleErrors = () => {
    showError(['Primeiro erro', 'Segundo erro', 'Terceiro erro'])
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Teste do Sistema de Toast
      </h2>
      
      <div className="space-y-3">
        <button 
          onClick={testApiError}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Testar Erro de API
        </button>
        
        <button 
          onClick={testSuccessToast}
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Testar Toast de Sucesso
        </button>
        
        <button 
          onClick={testErrorToast}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Testar Toast de Erro
        </button>
        
        <button 
          onClick={testMultipleErrors}
          className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Testar Múltiplos Erros
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Como usar:</h3>
        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <p>• <code>showSuccess(mensagem)</code> - Toast de sucesso</p>
          <p>• <code>showError(mensagem)</code> - Toast de erro</p>
          <p>• <code>showError([erro1, erro2])</code> - Múltiplos erros</p>
        </div>
      </div>
    </div>
  )
}