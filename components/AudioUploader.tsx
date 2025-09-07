// Fix: Created file content to provide a functional AudioUploader component.
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon } from './icons';

interface AudioUploaderProps {
    onAudioUpload: (audio: { data: string, mimeType: string }) => void;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ onAudioUpload }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                const dataUrl = reader.result as string;
                const base64Data = dataUrl.split(',')[1];
                onAudioUpload({
                    data: base64Data,
                    mimeType: file.type,
                });
            };
            reader.readAsDataURL(file);
        }
    }, [onAudioUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'audio/*': []}, multiple: false });

    return (
        <div {...getRootProps()} className="p-8 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors">
            <input {...getInputProps()} />
            <div className="flex flex-col items-center">
                <UploadIcon />
                {isDragActive ?
                    <p className="mt-2 text-gray-600">Drop the audio file here ...</p> :
                    <p className="mt-2 text-gray-600">Drag 'n' drop an audio file here, or click to select</p>
                }
            </div>
        </div>
    );
};

export default AudioUploader;
