import React, { useState, useEffect, useRef } from 'react';
import { StudyAid } from '../types';
import { AudioWaveIcon, PlayIcon, PauseIcon, StopIcon } from './icons';

interface StudyAidDisplayProps {
    studyAid: StudyAid;
    onStartOver: () => void;
}

const StudyAidDisplay: React.FC<StudyAidDisplayProps> = ({ studyAid, onStartOver }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Effect for speech synthesis setup and cleanup
    useEffect(() => {
        if (!('speechSynthesis' in window)) {
            setIsSupported(false);
            return;
        }

        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(studyAid.narrationScript);
        utteranceRef.current = u;

        u.onend = () => {
            setIsPlaying(false);
            setIsPaused(false);
        };
        
        return () => {
            synth.cancel();
        };
    }, [studyAid.narrationScript]);

    // Effect for closing modal with Escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsModalOpen(false);
            }
        };
        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);

    const handlePlay = () => {
        if (!utteranceRef.current) return;
        const synth = window.speechSynthesis;
        if (isPaused) {
            synth.resume();
        } else {
            synth.speak(utteranceRef.current);
        }
        setIsPlaying(true);
        setIsPaused(false);
    };

    const handlePause = () => {
        const synth = window.speechSynthesis;
        synth.pause();
        setIsPlaying(false);
        setIsPaused(true);
    };
    
    const handleStop = () => {
        const synth = window.speechSynthesis;
        synth.cancel();
        setIsPlaying(false);
        setIsPaused(false);
    };

    return (
        <>
            <div className="flex flex-col gap-8">
                <div>
                    <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Your AI-Generated Study Aid</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                        <h3 className="text-xl font-semibold mb-2 text-gray-700">Visual Mind Map</h3>
                        <div 
                            className="border rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                            onClick={() => setIsModalOpen(true)}
                            role="button"
                            aria-label="View larger mind map"
                        >
                            <img src={`data:image/jpeg;base64,${studyAid.mindMapImage}`} alt="Generated mind map" className="w-full h-auto"/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                         <h3 className="text-xl font-semibold mb-2 text-gray-700">Audio Narration Script</h3>
                         <div className="bg-gray-50 p-4 rounded-lg border h-full flex flex-col">
                            <div className="flex-grow space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 rounded-full">
                                        <AudioWaveIcon className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-600">Narration Player</h4>
                                </div>
                                
                                {isSupported ? (
                                    <div className="flex items-center justify-center gap-4 my-2">
                                        <button onClick={handlePlay} disabled={isPlaying} className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 disabled:bg-gray-200 disabled:text-gray-400 text-indigo-600 transition-colors">
                                            <PlayIcon className="h-8 w-8" />
                                        </button>
                                        <button onClick={handlePause} disabled={!isPlaying} className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 disabled:bg-gray-200 disabled:text-gray-400 text-indigo-600 transition-colors">
                                            <PauseIcon className="h-8 w-8" />
                                        </button>
                                        <button onClick={handleStop} disabled={!isPlaying && !isPaused} className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 disabled:bg-gray-200 disabled:text-gray-400 text-indigo-600 transition-colors">
                                            <StopIcon className="h-8 w-8" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-xs text-red-500 text-center p-2 bg-red-50 rounded-md">
                                        Your browser does not support audio synthesis.
                                    </div>
                                )}

                                <p className="text-gray-700 whitespace-pre-wrap flex-grow italic bg-white p-3 rounded-md border h-48 overflow-y-auto">{studyAid.narrationScript}</p>
                            </div>
                         </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                     <button
                        onClick={onStartOver}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                        Create Another
                    </button>
                </div>
            </div>
            
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
                    onClick={() => setIsModalOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div className="relative bg-white p-2 rounded-lg shadow-2xl max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                        <h3 id="modal-title" className="sr-only">Maximized Mind Map Image</h3>
                        <img
                            src={`data:image/jpeg;base64,${studyAid.mindMapImage}`}
                            alt="Maximized mind map"
                            className="w-full h-auto object-contain max-h-[90vh]"
                        />
                         <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute -top-2 -right-2 p-2 bg-white text-gray-700 rounded-full shadow-lg hover:bg-gray-200 transition-colors"
                            aria-label="Close image view"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default StudyAidDisplay;