import styled from '@emotion/styled'

export const ErrorContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
  border: 1px solid #feb2b2;
  background-color: #fff3f3;
  border-radius: 0.5rem;
`

export const ErrorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

export const ErrorTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #c53030;
  margin: 0;
`

export const ErrorMessage = styled.p`
  color: #742a2a;
  font-size: 1rem;
  margin: 0;
`
