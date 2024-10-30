import React from 'react';
import { Module } from '../types';
import { BookOpen } from 'lucide-react';

interface ModuleSelectorProps {
  modules: Module[];
  currentModule: string;
  onModuleSelect: (moduleId: string) => void;
}

export const ModuleSelector: React.FC<ModuleSelectorProps> = ({
  modules,
  currentModule,
  onModuleSelect,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Modules</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleSelect(module.id)}
            className={`p-4 rounded-lg transition-all duration-200 text-left ${
              currentModule === module.id
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
            }`}
          >
            <div className="font-medium">Module {module.id}</div>
            <div className={`text-sm ${
              currentModule === module.id ? 'text-blue-100' : 'text-gray-600'
            }`}>
              {module.title}
            </div>
            <div className={`text-xs mt-2 ${
              currentModule === module.id ? 'text-blue-200' : 'text-gray-500'
            }`}>
              {module.questions.length} questions
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};