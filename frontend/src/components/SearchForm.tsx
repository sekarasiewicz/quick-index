import { Search } from 'lucide-react'
import { useId, useState } from 'react'
import { ApiService } from '../services/api'
import type { SearchResponse } from '../types'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'

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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Search for a value in the dataset</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={searchInputId}>Search Value</Label>
            <Input
              id={searchInputId}
              name="searchValue"
              type="number"
              placeholder="Enter a value (0-1000000)"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            <Search size={20} className="mr-2" />
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
