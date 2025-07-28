import { z } from 'zod'

// Search form validation schema
export const searchSchema = z.object({
  searchValue: z
    .string()
    .min(1, 'Please enter a value to search for')
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: 'Please enter a valid number',
    })
    .refine(
      (val) => {
        const num = parseInt(val, 10)
        return num >= 0 && num <= 1000000
      },
      {
        message: 'Value must be between 0 and 1,000,000',
      }
    ),
})

export type SearchFormData = z.infer<typeof searchSchema>
