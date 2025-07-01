import toast from 'react-hot-toast'

// Helpers simples para mostrar toasts de sucesso e erro

export const showSuccess = (message: string) => toast.success(message)

export const showError = (message: string | string[]) => {
  if (Array.isArray(message)) {
    message.forEach(msg => toast.error(msg))
  } else {
    toast.error(message)
  }
}