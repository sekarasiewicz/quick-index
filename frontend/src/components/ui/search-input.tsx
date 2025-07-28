import type { Control } from 'react-hook-form'
import type { SearchFormData } from '@/lib/schemas'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'
import { Input } from './input'

type SearchInputProps = {
  control: Control<SearchFormData>
  disabled?: boolean
}

export function SearchInput({ control, disabled = false }: SearchInputProps) {
  return (
    <FormField
      control={control}
      name="searchValue"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Search Value</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Enter a value (0-1000000)"
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
