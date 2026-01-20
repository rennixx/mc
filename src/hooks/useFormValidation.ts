import { useState, useCallback, useRef } from 'react'
import type { z } from 'zod'

interface UseFormValidationProps<T extends z.ZodRawShape> {
  schema: z.ZodObject<T>
  initialValues: z.infer<z.ZodObject<T>>
  /**
   * Callback when form data changes
   */
  onDataChange?: (data: z.infer<z.ZodObject<T>>) => void
  /**
   * Callback when validation state changes
   */
  onValidationChange?: (isValid: boolean, errors: Partial<Record<keyof z.infer<z.ZodObject<T>>, string>>) => void
}

interface UseFormValidationReturn<T extends z.ZodRawShape> {
  data: z.infer<z.ZodObject<T>>
  errors: Partial<Record<keyof z.infer<z.ZodObject<T>>, string>>
  isValid: boolean
  isDirty: boolean
  touchedFields: Set<keyof z.infer<z.ZodObject<T>>>
  updateField: <K extends keyof z.infer<z.ZodObject<T>>>(field: K, value: z.infer<z.ZodObject<T>>[K]) => void
  updateFields: (fields: Partial<z.infer<z.ZodObject<T>>>) => void
  validate: (field?: keyof z.infer<z.ZodObject<T>>) => boolean
  validateAll: () => boolean
  reset: () => void
  resetField: (field: keyof z.infer<z.ZodObject<T>>) => void
  setErrors: (errors: Partial<Record<keyof z.infer<z.ZodObject<T>>, string>>) => void
  clearErrors: () => void
  setData: (data: z.infer<z.ZodObject<T>>) => void
  markTouched: (field: keyof z.infer<z.ZodObject<T>>) => void
}

/**
 * Custom hook for form validation with Zod schemas
 * Provides type-safe form state management and validation
 *
 * @example
 * const { data, errors, updateField, validate } = useFormValidation({
 *   schema: bookingFormSchema,
 *   initialValues: { name: '', email: '' },
 * })
 */
export function useFormValidation<T extends z.ZodRawShape>({
  schema,
  initialValues,
  onDataChange,
  onValidationChange,
}: UseFormValidationProps<T>): UseFormValidationReturn<T> {
  type DataType = z.infer<z.ZodObject<T>>
  const [data, setData] = useState<DataType>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof DataType, string>>>({})
  const [isDirty, setIsDirty] = useState(false)
  const touchedFieldsRef = useRef<Set<keyof DataType>>(new Set())

  const updateField = useCallback(
    <K extends keyof DataType>(field: K, value: DataType[K]) => {
      setData((prev) => {
        const newData = { ...prev, [field]: value }
        onDataChange?.(newData)
        return newData
      })

      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[field]
          return newErrors
        })
      }

      setIsDirty(true)
    },
    [errors, onDataChange]
  )

  const updateFields = useCallback(
    (fields: Partial<DataType>) => {
      setData((prev) => {
        const newData = { ...prev, ...fields }
        onDataChange?.(newData)
        return newData
      })
      setIsDirty(true)
    },
    [onDataChange]
  )

  const validate = useCallback(
    (field?: keyof DataType): boolean => {
      try {
        if (field) {
          // Single field validation - access shape via cast
          const shape = (schema as any).shape
          const fieldSchema = shape[field]
          if (!fieldSchema) return true

          const result = fieldSchema.safeParse(data[field])
          if (!result.success) {
            const errorMessage = result.error.issues[0]?.message || 'Invalid value'
            setErrors((prev) => ({ ...prev, [field]: errorMessage }))
            onValidationChange?.(false, { ...errors, [field]: errorMessage })
            return false
          }

          // Clear error for this field
          if (errors[field]) {
            setErrors((prev) => {
              const newErrors = { ...prev }
              delete newErrors[field]
              return newErrors
            })
          }
        } else {
          // Full form validation
          const result = schema.safeParse(data)
          if (!result.success) {
            const newErrors: Partial<Record<keyof DataType, string>> = {}
            result.error.issues.forEach((err) => {
              if (err.path[0]) {
                newErrors[err.path[0] as keyof DataType] = err.message
              }
            })
            setErrors(newErrors)
            onValidationChange?.(false, newErrors)
            return false
          }

          // Clear all errors
          if (Object.keys(errors).length > 0) {
            setErrors({})
          }
        }

        // Check if there are any remaining errors
        const hasErrors = Object.keys(errors).some((key) => key !== field)
        onValidationChange?.(!hasErrors, errors)
        return true
      } catch (error) {
        console.error('Validation error:', error)
        return false
      }
    },
    [data, schema, errors, onValidationChange]
  )

  const validateAll = useCallback((): boolean => {
    return validate()
  }, [validate])

  const reset = useCallback(() => {
    setData(initialValues)
    setErrors({})
    setIsDirty(false)
    touchedFieldsRef.current.clear()
  }, [initialValues])

  const resetField = useCallback((field: keyof DataType) => {
    setData((prev) => ({ ...prev, [field]: initialValues[field] }))
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
    touchedFieldsRef.current.delete(field)
  }, [initialValues])

  const clearErrors = useCallback(() => {
    setErrors({})
    onValidationChange?.(true, {})
  }, [onValidationChange])

  const markTouched = useCallback((field: keyof DataType) => {
    touchedFieldsRef.current.add(field)
  }, [])

  const isValid = Object.keys(errors).length === 0

  return {
    data,
    errors,
    isValid,
    isDirty,
    touchedFields: touchedFieldsRef.current,
    updateField,
    updateFields,
    validate,
    validateAll,
    reset,
    resetField,
    setErrors,
    clearErrors,
    setData,
    markTouched,
  }
}
