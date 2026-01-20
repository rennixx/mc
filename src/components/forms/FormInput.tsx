import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  label?: string
  errorId?: string
  labelId?: string
}

/**
 * Accessible Form Input component
 * Includes proper ARIA attributes and error state handling
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, error = false, label, errorId, labelId, id, ...props }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        className={cn(
          'form-input',
          error && 'border-red-400 focus:border-red-400',
          className
        )}
        aria-invalid={error}
        aria-describedby={error ? errorId : undefined}
        aria-labelledby={labelId}
        {...props}
      />
    )
  }
)

FormInput.displayName = 'FormInput'
