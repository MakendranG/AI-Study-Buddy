import React, { useState } from 'react';

interface NotesInputProps {
    onGenerate: (notes: string) => void;
    isLoading: boolean;
}

const NotesInput: React.FC<NotesInputProps> = ({ onGenerate, isLoading }) => {
    const [notes, setNotes] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate(notes);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Step 1: Enter Your Study Notes</h2>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Paste your notes here... For example: Photosynthesis is the process used by plants, algae, and some bacteria to convert light energy into chemical energy..."
                className="w-full p-4 border border-gray-300 rounded-lg mb-4 h-48 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                disabled={isLoading}
            />
            <button
                type="submit"
                disabled={isLoading || !notes.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
            >
                {isLoading ? 'Generating...' : 'Generate Study Aid'}
            </button>
        </form>
    );
};

export default NotesInput;
