// Fix: Created file content to provide a functional ObjectDisplay component.
import React from 'react';
import { UploadedObject } from '../types';

interface ObjectDisplayProps {
    object: UploadedObject;
}

const ObjectDisplay: React.FC<ObjectDisplayProps> = ({ object }) => {
    return (
        <div className="border rounded-lg p-2">
            <img src={`data:${object.mimeType};base64,${object.data}`} alt={object.name} className="w-full h-auto rounded"/>
            <p className="text-center mt-2 text-sm">{object.name}</p>
        </div>
    );
};

export default ObjectDisplay;
