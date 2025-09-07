// Fix: Created file content to provide a functional ObjectUploader component.
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon } from './icons';
import { UploadedObject } from '../types';

interface ObjectUploaderProps {
    onObjectUpload: (object: UploadedObject) => void;
}

const ObjectUploader: React.FC<ObjectUploaderProps> = ({ onObjectUpload }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                const dataUrl = reader.result as string;
                const base64Data = dataUrl.split(',')[1];
                onObjectUpload({
                    id: crypto.randomUUID(),
                    name: file.name,
                    data: base64Data,
                    mimeType: file.type,
                });
            };
            reader.readAsDataURL(file);
        });
    }, [onObjectUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': []} });

    return (
        <div {...getRootProps()} className="p-8 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors">
            <input {...getInputProps()} />
            <div className="flex flex-col items-center">
                <UploadIcon />
                {isDragActive ?
                    <p className="mt-2 text-gray-600">Drop the object image here ...</p> :
                    <p className="mt-2 text-gray-600">Drag 'n' drop an object image here, or click to select</p>
                }
            </div>
        </div>
    );
};

export default ObjectUploader;
