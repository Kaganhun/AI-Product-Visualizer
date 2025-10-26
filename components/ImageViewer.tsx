import React from 'react';

interface ImageViewerProps {
  generatedImage: string | null;
  isLoading: boolean;
  loadingText: string;
  mediumName?: string | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
    </div>
);

const ImageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
        <circle cx="9" cy="9" r="2"/>
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
);

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
);


export const ImageViewer: React.FC<ImageViewerProps> = ({ generatedImage, isLoading, loadingText, mediumName }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg flex-grow flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-cyan-300">3. View & Edit Result</h2>
      <div className="aspect-square bg-gray-900/50 rounded-lg flex items-center justify-center flex-grow relative overflow-hidden group">
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4 z-10 p-4 text-center">
            <LoadingSpinner />
            <p className="text-lg font-medium text-gray-300">{loadingText}</p>
          </div>
        )}
        {generatedImage ? (
          <>
            <img src={`data:image/png;base64,${generatedImage}`} alt={mediumName || 'Generated visual'} className="object-contain w-full h-full" />
             {!isLoading && (
                 <a
                    href={`data:image/png;base64,${generatedImage}`}
                    download="ai-visual.png"
                    className="absolute top-3 right-3 bg-gray-900/50 text-white p-2 rounded-full hover:bg-cyan-500/80 transition-all duration-300 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                    title="Download Image"
                    aria-label="Download Image"
                 >
                    <DownloadIcon className="w-5 h-5" />
                 </a>
            )}
          </>
        ) : !isLoading && (
            <div className="flex flex-col items-center gap-4 text-gray-600">
                <ImageIcon className="w-16 h-16" />
                <p className="text-lg font-medium">Your generated image will appear here</p>
            </div>
        )}
      </div>
    </div>
  );
};