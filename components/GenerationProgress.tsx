import React from 'react';
import { LoadingSpinner } from './icons';

interface GenerationProgressProps {
  message: string;
}

const GenerationProgress: React.FC<GenerationProgressProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <LoadingSpinner className="h-12 w-12 text-indigo-500" />
      <p className="mt-4 text-lg font-semibold text-gray-700">{message}</p>
      <p className="text-gray-500">Please wait a moment while the AI processes your request.</p>
    </div>
  );
};

export default GenerationProgress;
