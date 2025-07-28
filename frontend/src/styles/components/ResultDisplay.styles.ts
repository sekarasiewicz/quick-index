import styled from '@emotion/styled'

export const ResultContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

export const ResultTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3748;
  margin: 0;
`

export const ResultContent = styled.div`
  margin: 1rem 0;
`

export const ResultRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`

export const Label = styled.span`
  font-weight: 600;
  color: #4a5568;
`

export const Value = styled.span`
  color: #2d3748;
`

export const Badge = styled.span<{ variant: 'exact' | 'approximate' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: ${({ variant }) =>
    variant === 'exact' ? '#c6f6d5' : '#fed7d7'};
  color: ${({ variant }) => (variant === 'exact' ? '#22543d' : '#742a2a')};
`

export const ResultMessage = styled.p`
  font-size: 0.875rem;
  color: #718096;
  font-style: italic;
  margin: 0;
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 1rem 0;
`
