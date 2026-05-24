import React from 'react'
import { useToastStore } from '../../stores/toastStore'
import { X, CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react'

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
          error: <AlertCircle className="w-5 h-5 text-rose-500" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
          info: <Info className="w-5 h-5 text-gold-500" />
        }

        const borderColors = {
          success: 'border-emerald-500/20 dark:border-emerald-500/30',
          error: 'border-rose-500/20 dark:border-rose-500/30',
          warning: 'border-amber-500/20 dark:border-amber-500/30',
          info: 'border-gold-500/20 dark:border-gold-500/30'
        }

        return (
          <div
            key={toast.id}
            className={`
              flex items-center gap-3 p-4 rounded-lg shadow-xl border
              glass-panel-light dark:glass-panel-dark animate-slide-in
              ${borderColors[toast.type] || borderColors.info}
            `}
          >
            <div className="flex-shrink-0">
              {icons[toast.type] || icons.info}
            </div>
            <div className="flex-1 text-sm font-medium text-stone-700 dark:text-stone-200">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-stone-600 dark:text-zinc-500 dark:hover:text-gold-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
