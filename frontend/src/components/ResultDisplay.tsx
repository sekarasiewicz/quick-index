import type { SearchResponse } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type ResultDisplayProps = {
  result: SearchResponse
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const isExactMatch = result.message.includes('Exact match')

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Search Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Value:
            </span>
            <span className="font-mono text-lg font-semibold">
              {result.value.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Index:
            </span>
            <span className="font-mono text-lg font-semibold">
              {result.index.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Type:
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                isExactMatch
                  ? 'border-transparent bg-primary text-primary-foreground'
                  : 'border-transparent bg-secondary text-secondary-foreground'
              }`}
            >
              {isExactMatch ? 'Exact Match' : 'Approximate Match'}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {result.message}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
