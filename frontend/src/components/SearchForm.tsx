import { Search } from 'lucide-react'
import { useId, useState } from 'react'
import { ApiService } from '@/services/api'
import type { SearchResponse } from '@/types'
import {
  FormContent,
  FormTitle,
  SearchButton,
  SearchFormContainer,
  StyledInput,
} from '../styles'

type SearchFormProps = {
  onResult: (result: SearchResponse) => void
  onError: (error: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export function SearchForm({
  onResult,
  onError,
  isLoading,
  setIsLoading,
}: SearchFormProps) {
  const [value, setValue] = useState('')
  const searchInputId = useId()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!value.trim()) {
      onError('Please enter a value to search for')
      return
    }

    const numValue = parseInt(value, 10)
    if (Number.isNaN(numValue)) {
      onError('Please enter a valid number')
      return
    }

    setIsLoading(true)
    try {
      const result = await ApiService.searchValue(numValue)
      onResult(result)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred'
      onError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit}>
      <FormContent>
        <FormTitle>Search for a value in the dataset</FormTitle>
        <StyledInput
          id={searchInputId}
          name="searchValue"
          type="number"
          placeholder="Enter a value (0-1000000)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isLoading}
        />
        <SearchButton type="submit" disabled={isLoading}>
          <Search size={20} />
          {isLoading ? 'Searching...' : 'Search'}
        </SearchButton>
      </FormContent>
    </SearchFormContainer>
  )
}
