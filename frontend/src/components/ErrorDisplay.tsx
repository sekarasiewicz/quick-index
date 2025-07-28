type ErrorDisplayProps = {
  error: string
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div className="error-container">
      <div className="error-title">Error</div>
      <p className="error-message">{error}</p>
    </div>
  )
}
