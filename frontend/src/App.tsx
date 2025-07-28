import { useState } from 'react'
import { ColorModeButton } from './components/ColorModeButton'
import { ErrorDisplay } from './components/ErrorDisplay'
import { ResultDisplay } from './components/ResultDisplay'
import { SearchForm } from './components/SearchForm'
import type { SearchResponse } from './types'

function App() {
  const [result, setResult] = useState<SearchResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleResult = (searchResult: SearchResponse) => {
    setResult(searchResult)
    setError(null)
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
    setResult(null)
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
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />

          {result && <ResultDisplay result={result} />}
          {error && <ErrorDisplay error={error} />}
        </div>
      </div>
    </div>
  )
}

export default App
