import { ParsedQuestion, Module } from '../types';

export const parseQuestions = (text: string): Module[] => {
  const modules: Module[] = [];
  let currentModule: Module | null = null;
  
  // Split text into lines and process
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if line starts new module
    if (line.startsWith('Module')) {
      if (currentModule) {
        modules.push(currentModule);
      }
      const moduleId = line.split(':')[0].replace('Module ', '');
      const moduleTitle = line.split(':')[1].trim();
      currentModule = {
        id: moduleId,
        title: moduleTitle,
        questions: []
      };
      continue;
    }

    // Process question
    if (line.startsWith('Câu') && currentModule) {
      const questionLines = [];
      let j = i;
      // Collect question text
      while (j < lines.length && !lines[j].startsWith('A.')) {
        if (!lines[j].startsWith('Module')) {
          questionLines.push(lines[j]);
        }
        j++;
      }
      
      // Collect options
      const options = [];
      while (j < lines.length && options.length < 4) {
        if (lines[j].match(/^[A-D]\./)) {
          options.push(lines[j]);
        }
        j++;
      }
      
      if (options.length === 4) {
        const questionText = questionLines
          .join(' ')
          .replace(/Câu \d+:\s*/, '')
          .trim();
          
        currentModule.questions.push({
          id: `q${currentModule.questions.length + 1}`,
          question: questionText,
          options: options,
          correctAnswer: options[0].substring(3).trim(),
          moduleId: currentModule.id
        });
      }
      
      i = j - 1; // Update loop counter
    }
  }
  
  // Add last module
  if (currentModule) {
    modules.push(currentModule);
  }
  
  return modules;
};