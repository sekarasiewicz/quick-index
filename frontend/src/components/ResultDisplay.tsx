import { AlertCircle, CheckCircle } from 'lucide-react'
import type { SearchResponse } from '@/types'
import {
  Badge,
  Divider,
  Label,
  ResultContainer,
  ResultContent,
  ResultHeader,
  ResultMessage,
  ResultRow,
  ResultTitle,
  Value,
} from '../styles'

type ResultDisplayProps = {
  result: SearchResponse
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const isExactMatch = result.message.includes('Exact match')

  return (
    <ResultContainer>
      <ResultHeader>
        {isExactMatch ? (
          <CheckCircle size={24} color="green" />
        ) : (
          <AlertCircle size={24} color="orange" />
        )}
        <ResultTitle>Search Result</ResultTitle>
      </ResultHeader>

      <Divider />

      <ResultContent>
        <ResultRow>
          <Label>Value:</Label>
          <Value>{result.value.toLocaleString()}</Value>
        </ResultRow>

        <ResultRow>
          <Label>Index:</Label>
          <Value>{result.index.toLocaleString()}</Value>
        </ResultRow>

        <ResultRow>
          <Label>Type:</Label>
          <Badge variant={isExactMatch ? 'exact' : 'approximate'}>
            {isExactMatch ? 'Exact Match' : 'Approximate Match'}
          </Badge>
        </ResultRow>
      </ResultContent>

      <Divider />

      <ResultMessage>{result.message}</ResultMessage>
    </ResultContainer>
  )
}
