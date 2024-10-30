import React, { useState, useEffect } from 'react';
import { Flashcard } from './components/Flashcard';
import { ModuleSelector } from './components/ModuleSelector';
import { QuestionNavigation } from './components/QuestionNavigation';
import { parseQuestions } from './utils/parseQuestions';
import { Module } from './types';
import { BookOpen } from 'lucide-react';

function App() {
  const [modules, setModules] = useState<Module[]>([]);
  const [currentModuleId, setCurrentModuleId] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/questions.txt')
      .then((response) => response.text())
      .then((text) => {
        const parsedModules = parseQuestions(text);
        setModules(parsedModules);
        if (parsedModules.length > 0) {
          setCurrentModuleId(parsedModules[0].id);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading questions:', error);
        setLoading(false);
      });
  }, []);

  const currentModule = modules.find(m => m.id === currentModuleId);
  const questions = currentModule?.questions || [];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleJumpTo = (questionIndex: number) => {
    setCurrentIndex(questionIndex);
  };

  const handleModuleSelect = (moduleId: string) => {
    setCurrentModuleId(moduleId);
    setCurrentIndex(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-pink-pastel" />
            <h1 className="text-2xl font-bold text-gray-900">Flashcards anh làm 💖</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <ModuleSelector
          modules={modules}
          currentModule={currentModuleId}
          onModuleSelect={handleModuleSelect}
        />
        
        {questions.length > 0 && (
          <>
            <QuestionNavigation
              current={currentIndex}
              total={questions.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onJumpTo={handleJumpTo}
            />
            <div className="mt-6">
              <Flashcard
                question={questions[currentIndex]}
                onNext={handleNext}
                onPrevious={handlePrevious}
                total={questions.length}
                current={currentIndex}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;