import { Text } from '@chakra-ui/react'
import { AlertCircle, CheckCircle } from 'lucide-react'
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
} from '@/styles'
import type { SearchResponse } from '@/types'

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
          <Text>{result.value.toLocaleString()}</Text>
        </ResultRow>

        <ResultRow>
          <Label>Index:</Label>
          <Text>{result.index.toLocaleString()}</Text>
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
