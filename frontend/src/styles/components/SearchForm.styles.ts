import { Button, Input } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const SearchFormContainer = styled.form`
  margin-bottom: 2rem;
`

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 500px;
  margin: 0 auto;
`

export const FormTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  color: #2d3748;
`

export const StyledInput = styled(Input)`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }

  &:disabled {
    background-color: #f7fafc;
    cursor: not-allowed;
  }
`

export const SearchButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: #3182ce;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #2c5aa0;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`
