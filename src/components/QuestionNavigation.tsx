import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuestionNavigationProps {
  current: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  onJumpTo: (questionNumber: number) => void;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  current,
  total,
  onPrevious,
  onNext,
  onJumpTo,
}) => {
  const [jumpToNumber, setJumpToNumber] = useState('');

  const handleJumpTo = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpToNumber);
    if (num >= 1 && num <= total) {
      onJumpTo(num - 1);
      setJumpToNumber('');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevious}
          disabled={current === 0}
          className={`p-2 rounded-lg transition-colors ${
            current === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label="Previous question"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-gray-600">
          Question {current + 1} of {total}
        </span>
        <button
          onClick={onNext}
          disabled={current === total - 1}
          className={`p-2 rounded-lg transition-colors ${
            current === total - 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label="Next question"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      <form onSubmit={handleJumpTo} className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          max={total}
          value={jumpToNumber}
          onChange={(e) => setJumpToNumber(e.target.value)}
          placeholder="Go to question..."
          className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go
        </button>
      </form>
    </div>
  );
};