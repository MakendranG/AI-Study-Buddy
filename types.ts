export interface StudyAid {
  mindMapImage: string; // base64 encoded image string
  narrationScript: string;
}

// Fix: Add UploadedObject interface for use in ObjectUploader and ObjectDisplay components.
export interface UploadedObject {
    id: string;
    name: string;
    data: string; // base64Data
    mimeType: string;
}

// Fix: Add ConversationMessage interface for use in the ConversationView component.
export interface ConversationMessage {
    id: string;
    sender: 'user' | 'model';
    text: string;
}
