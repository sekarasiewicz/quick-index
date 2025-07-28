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
    <div className="app-container">
      <ColorModeButton />
      <div className="container">
        <header className="header">
          <h1 className="title">Quick Index Search</h1>
          <p className="subtitle">
            Search through 100,000+ sorted numbers with binary search efficiency
          </p>
        </header>

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
  )
}

export default App
