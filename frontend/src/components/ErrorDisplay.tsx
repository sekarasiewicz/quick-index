import { XCircle } from 'lucide-react'
import { ErrorContainer, ErrorHeader, ErrorMessage, ErrorTitle } from '@/styles'

type ErrorDisplayProps = {
  error: string
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <ErrorContainer>
      <ErrorHeader>
        <XCircle size={24} color="red" />
        <ErrorTitle>Error</ErrorTitle>
      </ErrorHeader>

      <ErrorMessage>{error}</ErrorMessage>
    </ErrorContainer>
  )
}
