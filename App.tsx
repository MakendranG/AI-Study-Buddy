import React, { useState } from 'react';
import NotesInput from './components/NotesInput';
import StudyAidDisplay from './components/StudyAidDisplay';
import GenerationProgress from './components/GenerationProgress';
import { StudyAid } from './types';
import { generateStudyAid } from './services/geminiService';
import { APP_TITLE } from './constants';
import { BookOpenIcon } from './components/icons';

function App() {
    const [studyAid, setStudyAid] = useState<StudyAid | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (notes: string) => {
        if (!notes.trim()) {
            setError("Please enter your study notes.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setStudyAid(null);
        try {
            const result = await generateStudyAid(notes);
            setStudyAid(result);
        } catch (e) {
            console.error(e);
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
            setError(`Failed to generate study aid. ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartOver = () => {
        setStudyAid(null);
        setError(null);
    };

    const renderContent = () => {
        if (isLoading) {
            return <GenerationProgress message="Your AI study buddy is hard at work..." />;
        }
        if (studyAid) {
            return <StudyAidDisplay studyAid={studyAid} onStartOver={handleStartOver} />;
        }
        return <NotesInput onGenerate={handleGenerate} isLoading={isLoading} />;
    };

    return (
        <div className="container mx-auto p-4 font-sans max-w-4xl">
            <header className="text-center my-8">
                <div className="flex justify-center items-center gap-4">
                    <BookOpenIcon className="h-12 w-12 text-indigo-500" />
                    <h1 className="text-5xl font-bold text-gray-800">{APP_TITLE}</h1>
                </div>
                <p className="text-xl text-gray-600 mt-2">Transform your notes into visual and auditory learning aids.</p>
            </header>
            
            <main className="bg-white p-8 rounded-2xl shadow-lg min-h-[400px] flex flex-col justify-center">
                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                  </div>
                )}
                {renderContent()}
            </main>
        </div>
    );
}

export default App;
