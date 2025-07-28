import { useState } from 'react'
import { ErrorDisplay } from './components/ErrorDisplay'
import { ResultDisplay } from './components/ResultDisplay'
import { SearchForm } from './components/SearchForm'
import type { SearchResponse } from './types'
import './App.css'

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
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>Quick Index Search</h1>
          <p>
            Search through 100,000+ sorted numbers with binary search efficiency
          </p>
        </div>

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
