import { getResultCardClasses, isExactMatch } from '@/lib/resultUtils'
import type { SearchResponse } from '@/types'
import { ResultHeader } from './ResultHeader'
import { ResultMessage } from './ResultMessage'
import { ResultStats } from './ResultStats'
import { Card, CardContent } from './ui/card'

type ResultDisplayProps = {
  result: SearchResponse
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const exactMatch = isExactMatch(result)

  return (
    <Card
      className={`w-full max-w-md mx-auto ${getResultCardClasses(exactMatch)}`}
      data-testid="result-card"
    >
      <ResultHeader isExactMatch={exactMatch} />
      <CardContent className="space-y-4">
        <ResultStats result={result} isExactMatch={exactMatch} />
        <ResultMessage result={result} isExactMatch={exactMatch} />
      </CardContent>
    </Card>
  )
}
