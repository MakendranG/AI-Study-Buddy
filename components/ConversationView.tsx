// Fix: Created file content to provide a functional ConversationView component.
import React from 'react';
import { ConversationMessage } from '../types';

interface ConversationViewProps {
    messages: ConversationMessage[];
}

const ConversationView: React.FC<ConversationViewProps> = ({ messages }) => {
    return (
        <div className="flex flex-col space-y-2 p-4 border rounded-lg h-96 overflow-y-auto">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-2 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        {msg.text}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ConversationView;
