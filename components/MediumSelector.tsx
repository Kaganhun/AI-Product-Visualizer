
import React from 'react';
import type { Medium } from '../types';

interface MediumSelectorProps {
  mediums: Medium[];
  onSelect: (medium: Medium) => void;
  currentMedium: Medium | null;
  isDisabled: boolean;
}

export const MediumSelector: React.FC<MediumSelectorProps> = ({ mediums, onSelect, currentMedium, isDisabled }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-cyan-300">2. Choose a Medium</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {mediums.map((medium) => (
          <button
            key={medium.id}
            onClick={() => onSelect(medium)}
            disabled={isDisabled}
            className={`
              flex flex-col items-center justify-center gap-2 p-4 border rounded-lg 
              transition-all duration-200 transform
              ${currentMedium?.id === medium.id 
                ? 'bg-cyan-500 border-cyan-400 text-white shadow-cyan-500/30 shadow-lg' 
                : 'bg-gray-700/50 border-gray-600 hover:border-cyan-500 hover:bg-gray-700 hover:-translate-y-1'
              }
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <span className="text-3xl">{medium.icon}</span>
            <span className="font-semibold text-sm">{medium.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
