import type { SearchResponse } from '../types'

type ResultDisplayProps = {
  result: SearchResponse
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const isExactMatch = result.message.includes('Exact match')

  return (
    <div className="result-container">
      <h2 className="result-title">Search Result</h2>

      <div className="result-content">
        <div className="result-item">
          <span className="result-label">Value:</span>
          <span className="result-value">{result.value.toLocaleString()}</span>
        </div>

        <div className="result-item">
          <span className="result-label">Index:</span>
          <span className="result-value">{result.index.toLocaleString()}</span>
        </div>

        <div className="result-item">
          <span className="result-label">Type:</span>
          <span className="badge">
            {isExactMatch ? 'Exact Match' : 'Approximate Match'}
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--color-border-secondary)',
        }}
      >
        <p
          style={{
            margin: 0,
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          {result.message}
        </p>
      </div>
    </div>
  )
}
