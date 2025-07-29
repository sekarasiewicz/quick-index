import { getResultTypeClasses } from '@/lib/resultUtils'
import type { SearchResponse } from '@/types'

type ResultStatsProps = {
  result: SearchResponse
  isExactMatch: boolean
}

export function ResultStats({ result, isExactMatch }: ResultStatsProps) {
  return (
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
        <span className="text-sm font-medium text-muted-foreground">Type:</span>
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getResultTypeClasses(
            isExactMatch
          )}`}
        >
          {isExactMatch ? 'Exact Match' : 'Approximate Match'}
        </span>
      </div>
    </div>
  )
}
