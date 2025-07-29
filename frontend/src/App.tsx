import { useState } from 'react'
import { ColorModeButton } from './components/ColorModeButton'
import { ErrorDisplay } from './components/ErrorDisplay'
import { ResultDisplay } from './components/ResultDisplay'
import { SearchForm } from './components/SearchForm'
import type { LoadingState, SearchResponse } from './types'

function App() {
  const [result, setResult] = useState<SearchResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingState, setLoadingState] = useState<LoadingState>('idle')

  const handleResult = (searchResult: SearchResponse): void => {
    setResult(searchResult)
    setError(null)
    setLoadingState('success')
  }

  const handleError = (errorMessage: string): void => {
    setError(errorMessage)
    setResult(null)
    setLoadingState('error')
  }

  const handleLoadingChange = (isLoading: boolean): void => {
    setLoadingState(isLoading ? 'loading' : 'idle')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ColorModeButton />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Quick Index Search
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search through 100,000+ sorted numbers with binary search efficiency
          </p>
        </header>

        <div className="space-y-6">
          <SearchForm
            onResult={handleResult}
            onError={handleError}
            isLoading={loadingState === 'loading'}
            setIsLoading={handleLoadingChange}
          />

          {result && <ResultDisplay result={result} />}
          {error && <ErrorDisplay error={error} />}
        </div>
      </div>
    </div>
  )
}

export default App
