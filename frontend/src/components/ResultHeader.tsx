import { AlertTriangle, CheckCircle } from 'lucide-react'
import { getResultIconClasses, getResultTitleClasses } from '@/lib/resultUtils'
import { CardHeader, CardTitle } from './ui/card'

type ResultHeaderProps = {
  isExactMatch: boolean
}

export function ResultHeader({ isExactMatch }: ResultHeaderProps) {
  return (
    <CardHeader className="pb-3">
      <CardTitle
        className={`flex items-center gap-2 ${getResultTitleClasses(isExactMatch)}`}
      >
        {isExactMatch ? (
          <CheckCircle
            size={20}
            className={getResultIconClasses(isExactMatch)}
            data-testid="check-circle-icon"
          />
        ) : (
          <AlertTriangle
            size={20}
            className={getResultIconClasses(isExactMatch)}
            data-testid="alert-triangle-icon"
          />
        )}
        {isExactMatch ? 'Exact Match Found!' : 'Approximate Match Found'}
      </CardTitle>
    </CardHeader>
  )
}
