import { useState } from 'react'
import { ErrorDisplay } from './components/ErrorDisplay'
import { ResultDisplay } from './components/ResultDisplay'
import { SearchForm } from './components/SearchForm'
import { AppContainer, Container, Header, Subtitle, Title } from './styles'
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
    <AppContainer>
      <Container>
        <Header>
          <Title>Quick Index Search</Title>
          <Subtitle>
            Search through 100,000+ sorted numbers with binary search efficiency
          </Subtitle>
        </Header>

        <SearchForm
          onResult={handleResult}
          onError={handleError}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

        {result && <ResultDisplay result={result} />}
        {error && <ErrorDisplay error={error} />}
      </Container>
    </AppContainer>
  )
}

export default App
