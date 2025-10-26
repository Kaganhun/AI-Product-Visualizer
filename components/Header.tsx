
import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3L9.25 8.75L3.5 10.5L9.25 12.25L12 18L14.75 12.25L20.5 10.5L14.75 8.75L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 19h4" />
    <path d="M17 5h4" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SparklesIcon className="text-cyan-400 h-8 w-8" />
          <h1 className="text-2xl font-bold tracking-tight text-white">
            AI Product Visualizer
          </h1>
        </div>
        <div className="text-sm text-gray-400">Powered by Gemini</div>
      </div>
    </header>
  );
};
