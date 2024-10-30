import React, { useState } from 'react';
import { Question } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashcardProps {
  question: Question;
  onNext: () => void;
  onPrevious: () => void;
  total: number;
  current: number;
}

export const Flashcard: React.FC<FlashcardProps> = ({
  question,
  onNext,
  onPrevious,
  total,
  current
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleFlip = () => {
    if (!isTransitioning) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleNavigation = (direction: 'next' | 'previous') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => {
        direction === 'next' ? onNext() : onPrevious();
        setIsTransitioning(false);
      }, 500);
    } else {
      direction === 'next' ? onNext() : onPrevious();
      setIsTransitioning(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">      
      <div
        className="relative w-full min-h-[500px] cursor-pointer perspective-1000"
        onClick={handleFlip}
      >
        <div
          className={`absolute w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front of card */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg p-8 flex flex-col">
            <div className="flex-grow flex flex-col">
              <div className="text-sm text-blue-600 mb-2">Module {question.moduleId}</div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
                {question.question}
              </h2>
              <div className="space-y-4 mt-auto">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-base md:text-lg"
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Back of card */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg p-8 rotate-y-180 flex flex-col justify-center items-center">
            <h3 className="text-2xl font-bold text-green-600 mb-4">Answer:</h3>
            <p className="text-xl text-gray-800 text-center">{question.correctAnswer}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNavigation('previous');
          }}
          disabled={current === 0 || isTransitioning}
          className={`px-6 py-3 bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2 ${
            current === 0 || isTransitioning
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-300'
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
          Previous
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNavigation('next');
          }}
          disabled={current === total - 1 || isTransitioning}
          className={`px-6 py-3 bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2 ${
            current === total - 1 || isTransitioning
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-blue-700'
          }`}
        >
          Next
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};