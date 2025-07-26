import { CheckCircle, AlertCircle } from 'lucide-react';
import type { SearchResponse } from '../types';

interface ResultDisplayProps {
  result: SearchResponse;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const isExactMatch = result.message.includes('Exact match');
  
  return (
    <div className="result-display">
      <div className="result-header">
        {isExactMatch ? (
          <CheckCircle size={24} color="green" />
        ) : (
          <AlertCircle size={24} color="orange" />
        )}
        <h3>Search Result</h3>
      </div>
      
      <hr />
      
      <div className="result-content">
        <div className="result-row">
          <span className="label">Value:</span>
          <span className="value">{result.value.toLocaleString()}</span>
        </div>
        
        <div className="result-row">
          <span className="label">Index:</span>
          <span className="value">{result.index.toLocaleString()}</span>
        </div>
        
        <div className="result-row">
          <span className="label">Type:</span>
          <span className={`badge ${isExactMatch ? 'exact' : 'approximate'}`}>
            {isExactMatch ? 'Exact Match' : 'Approximate Match'}
          </span>
        </div>
      </div>
      
      <hr />
      
      <p className="result-message">{result.message}</p>
    </div>
  );
} 