
import React, { useState } from 'react';

interface ImageEditorProps {
  onSubmit: (prompt: string) => void;
  isDisabled: boolean;
}

const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        <path d="m15 5 4 4"/>
    </svg>
);


export const ImageEditor: React.FC<ImageEditorProps> = ({ onSubmit, isDisabled }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
      setPrompt('');
    }
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-3 text-cyan-300 flex items-center gap-2">
        <EditIcon className="w-5 h-5" />
        Edit with a Prompt
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Add a retro filter' or 'Change background to a beach'"
          disabled={isDisabled}
          className="flex-grow bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
        />
        <button
          type="submit"
          disabled={isDisabled || !prompt.trim()}
          className="bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-600"
        >
          Apply Edit
        </button>
      </form>
    </div>
  );
};
