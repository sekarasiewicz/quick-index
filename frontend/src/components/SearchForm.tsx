import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { type SearchFormData, searchSchema } from '@/lib/schemas'
import { ApiService } from '@/services/api'
import type { AppError, SearchResponse } from '@/types'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Form } from './ui/form'
import { SearchInput } from './ui/search-input'

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
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchValue: '',
    },
  })

  const onSubmit = async (data: SearchFormData): Promise<void> => {
    const numValue = parseInt(data.searchValue, 10)

    setIsLoading(true)
    try {
      const result = await ApiService.searchValue(numValue)
      onResult(result)
    } catch (error) {
      let errorMessage = 'An error occurred'

      if (error && typeof error === 'object' && 'type' in error) {
        const appError = error as AppError
        errorMessage = appError.message
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SearchInput control={form.control} disabled={isLoading} />
            <Button type="submit" disabled={isLoading} className="w-full">
              <Search size={20} className="mr-2" />
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
