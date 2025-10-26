
import React, { useRef, useState, useCallback } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  currentImage: string | null;
}

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDragEvents = useCallback((e: React.DragEvent<HTMLDivElement>, dragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
        onImageUpload(file);
    }
  }, [onImageUpload, handleDragEvents]);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-cyan-300">1. Upload Your Product Image</h2>
      <div
        onClick={handleClick}
        onDragEnter={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onDragOver={(e) => handleDragEvents(e, true)}
        onDrop={handleDrop}
        className={`relative group border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 ${isDragging ? 'bg-gray-700 border-cyan-400' : 'hover:border-cyan-500 hover:bg-gray-800'}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {currentImage ? (
          <div className="relative">
            <img src={currentImage} alt="Uploaded product" className="max-h-64 mx-auto rounded-md object-contain" />
             <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                <p className="text-white font-semibold">Click or drop to replace</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-gray-400">
            <UploadIcon className="w-12 h-12 text-gray-500" />
            <p className="font-semibold">
              <span className="text-cyan-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm">PNG, JPG, or WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};
