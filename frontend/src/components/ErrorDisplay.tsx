import { XCircle } from 'lucide-react'

type ErrorDisplayProps = {
  error: string
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div className="error-display">
      <div className="error-header">
        <XCircle size={24} color="red" />
        <h3>Error</h3>
      </div>

      <p className="error-message">{error}</p>
    </div>
  )
}
