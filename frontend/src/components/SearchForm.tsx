import { useState } from 'react';
import { Search } from 'lucide-react';
import { ApiService } from '../services/api';
import type { SearchResponse } from '../types';

type SearchFormProps = {
  onResult: (result: SearchResponse) => void;
  onError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export function SearchForm({ onResult, onError, isLoading, setIsLoading }: SearchFormProps) {
  const [value, setValue] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!value.trim()) {
      onError('Please enter a value to search for');
      return;
    }

    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      onError('Please enter a valid number');
      return;
    }

    setIsLoading(true);
    try {
      const result = await ApiService.searchValue(numValue);
      onResult(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-content">
        <h2>Search for a value in the dataset</h2>
        <input
          type="number"
          placeholder="Enter a value (0-1000000)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isLoading}
          className="search-input"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="search-button"
        >
          <Search size={20} />
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
} 