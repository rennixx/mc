import { useTranslation } from 'react-i18next'
import { AlertCircle, X } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface FormErrorsProps {
  errors: Record<string, string>
  title?: string
  className?: string
  onDismiss?: () => void
}

/**
 * FormErrors Component
 * Displays a summary of form validation errors
 * Fully accessible with ARIA attributes
 *
 * @example
 * <FormErrors
 *   errors={{ name: 'Name is required', email: 'Invalid email' }}
 *   title="Please fix the following errors:"
 * />
 */
export const FormErrors = ({
  errors,
  title,
  className,
  onDismiss,
}: FormErrorsProps) => {
  const { t } = useTranslation('common')
  const errorEntries = Object.entries(errors)
  const errorCount = errorEntries.length

  if (errorCount === 0) return null

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn(
        'bg-red-500/20 border border-red-400 p-4 rounded mb-4',
        'animate-in slide-in-from-top-2 duration-300',
        className
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" aria-hidden="true" />
          <h3 className="font-bold text-red-400">
            {title || t('errors.formErrors', {
              count: errorCount,
              defaultValue: 'Please fix the following errors:',
            })}
          </h3>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="text-red-400 hover:text-red-300 transition-colors"
            aria-label={t('common.dismiss', { defaultValue: 'Dismiss errors' })}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      <ul className="list-disc list-inside space-y-1 mt-2">
        {errorEntries.map(([field, message]) => (
          <li key={field} className="text-red-300">
            <a
              href={`#${field}-input`}
              className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(`${field}-input`)?.focus()
              }}
            >
              {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
