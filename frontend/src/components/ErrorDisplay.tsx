import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type ErrorDisplayProps = {
  error: string
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <Card className="w-full max-w-md mx-auto border-destructive/50 bg-destructive/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle size={20} />
          Error
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">{error}</p>
      </CardContent>
    </Card>
  )
}
