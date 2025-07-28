import { AlertTriangle, CheckCircle } from 'lucide-react'
import type { SearchResponse } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type ResultDisplayProps = {
  result: SearchResponse
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const isExactMatch = result.message.includes('Exact match')

  return (
    <Card
      className={`w-full max-w-md mx-auto ${
        isExactMatch
          ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20'
          : 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20'
      }`}
      data-testid="result-card"
    >
      <CardHeader className="pb-3">
        <CardTitle
          className={`flex items-center gap-2 ${
            isExactMatch
              ? 'text-green-700 dark:text-green-300'
              : 'text-orange-700 dark:text-orange-300'
          }`}
        >
          {isExactMatch ? (
            <CheckCircle
              size={20}
              className="text-green-600 dark:text-green-400"
              data-testid="check-circle-icon"
            />
          ) : (
            <AlertTriangle
              size={20}
              className="text-orange-600 dark:text-orange-400"
              data-testid="alert-triangle-icon"
            />
          )}
          {isExactMatch ? 'Exact Match Found!' : 'Approximate Match Found'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Value:
            </span>
            <span className="font-mono text-lg font-semibold">
              {result.value.toLocaleString('en-US')}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Index:
            </span>
            <span className="font-mono text-lg font-semibold">
              {result.index.toLocaleString('en-US')}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Type:
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                isExactMatch
                  ? 'border-green-200 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'border-orange-200 bg-orange-100 text-orange-800 dark:border-orange-800 dark:bg-orange-900 dark:text-orange-200'
              }`}
            >
              {isExactMatch ? 'Exact Match' : 'Approximate Match'}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p
            className={`text-sm leading-relaxed ${
              isExactMatch
                ? 'text-green-700 dark:text-green-300'
                : 'text-orange-700 dark:text-orange-300'
            }`}
          >
            {result.message}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
