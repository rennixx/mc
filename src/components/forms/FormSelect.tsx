import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
  label?: string
  errorId?: string
  labelId?: string
  options: Array<{ value: string; label: string; disabled?: boolean }>
}

/**
 * Accessible Form Select component
 * Includes proper ARIA attributes and error state handling
 */
export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      className,
      error = false,
      label,
      errorId,
      labelId,
      id,
      options,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <select
        ref={ref}
        id={id}
        className={cn(
          'form-input cursor-pointer',
          error && 'border-red-400 focus:border-red-400',
          className
        )}
        aria-invalid={error}
        aria-describedby={error ? errorId : undefined}
        aria-labelledby={labelId}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
        {children}
      </select>
    )
  }
)

FormSelect.displayName = 'FormSelect'
