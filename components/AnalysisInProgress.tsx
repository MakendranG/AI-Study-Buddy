// Fix: Created file content to provide a functional AnalysisInProgress component.
import React from 'react';
import { LoadingSpinner } from './icons';

const AnalysisInProgress = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 border rounded-lg shadow-md bg-gray-50">
            <LoadingSpinner />
            <p className="mt-4 text-lg text-gray-700">Analyzing your content...</p>
            <p className="text-sm text-gray-500">This might take a moment.</p>
        </div>
    );
};

export default AnalysisInProgress;
