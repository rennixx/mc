import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  label?: string
  errorId?: string
  labelId?: string
}

/**
 * Accessible Form Textarea component
 * Includes proper ARIA attributes and error state handling
 */
export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, error = false, label, errorId, labelId, id, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={cn(
          'form-input min-h-[100px] resize-y',
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

FormTextarea.displayName = 'FormTextarea'
