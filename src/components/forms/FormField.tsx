import { useTranslation } from 'react-i18next'
import { type LucideIcon } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface FormFieldProps {
  label: string
  icon?: LucideIcon
  error?: string
  required?: boolean
  htmlFor: string
  className?: string
  children: React.ReactNode
}

/**
 * Reusable FormField component
 * Provides consistent label, error display, and accessibility
 */
export const FormField = ({
  label,
  icon: Icon,
  error,
  required = false,
  htmlFor,
  className,
  children,
}: FormFieldProps) => {
  const { t } = useTranslation()

  return (
    <div className={cn('mb-4', className)}>
      <label
        htmlFor={htmlFor}
        id={`${htmlFor}-label`}
        className="flex items-center gap-2 text-cream-200 font-sans font-semibold mb-2"
      >
        {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
        {label}
        {required && (
          <span className="text-gold-400" aria-label={t('common.required')}>
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="text-red-400 text-sm font-sans mt-1"
        >
          {error}
        </p>
      )}
    </div>
  )
}
