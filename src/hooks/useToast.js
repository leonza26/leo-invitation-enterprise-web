import { useToastStore } from '../stores/toastStore'

export const useToast = () => {
  const { toasts, addToast, removeToast } = useToastStore()
  return {
    toasts,
    toast: (message, type) => addToast(message, type),
    success: (message) => addToast(message, 'success'),
    error: (message) => addToast(message, 'error'),
    warning: (message) => addToast(message, 'warning'),
    info: (message) => addToast(message, 'info'),
    dismiss: (id) => removeToast(id)
  }
}
