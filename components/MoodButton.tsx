import React from 'react';
import { MoodConfig } from '../types';

interface MoodButtonProps {
  config: MoodConfig;
  isSelected: boolean;
  onClick: () => void;
}

export const MoodButton: React.FC<MoodButtonProps> = ({ config, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300
        ${isSelected 
          ? 'bg-white shadow-lg scale-105 ring-4 ring-pink-200 translate-y-[-4px]' 
          : 'bg-white/40 hover:bg-white/70 hover:scale-105 shadow-sm'}
      `}
    >
      <span className="text-4xl mb-2 filter drop-shadow-sm">{config.icon}</span>
      <span className={`font-semibold text-sm ${isSelected ? 'text-pink-600' : 'text-gray-600'}`}>
        {config.label}
      </span>
    </button>
  );
};
