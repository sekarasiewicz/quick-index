import { AlertCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type ErrorDisplayProps = {
  error: string
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <Card
      className="w-full max-w-md mx-auto border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"
      data-testid="error-card"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
          <XCircle size={20} className="text-red-600 dark:text-red-400" />
          Error Occurred
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-3">
          <AlertCircle
            size={16}
            className="text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0"
            data-testid="alert-circle-icon"
          />
          <p 
            className="text-sm text-red-700 dark:text-red-300 leading-relaxed"
            data-testid="error-message"
          >
            {error}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
