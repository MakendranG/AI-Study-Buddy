// Fix: Created file content to provide a functional LanguageSelector component.
import React from 'react';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  languages: string[];
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange, languages }) => {
  return (
    <select value={selectedLanguage} onChange={(e) => onLanguageChange(e.target.value)} className="p-2 border rounded">
      {languages.map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;
