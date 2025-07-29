import { getResultMessageClasses } from '@/lib/resultUtils'
import type { SearchResponse } from '@/types'

type ResultMessageProps = {
  result: SearchResponse
  isExactMatch: boolean
}

export function ResultMessage({ result, isExactMatch }: ResultMessageProps) {
  return (
    <div className="pt-4 border-t">
      <p
        className={`text-sm leading-relaxed ${getResultMessageClasses(isExactMatch)}`}
      >
        {result.message}
      </p>
    </div>
  )
}
