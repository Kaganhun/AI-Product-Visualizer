
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { MediumSelector } from './components/MediumSelector';
import { ImageViewer } from './components/ImageViewer';
import { ImageEditor } from './components/ImageEditor';
import { Header } from './components/Header';
import { generateImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import type { Medium } from './types';
import { MEDIUMS } from './constants';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageBase64, setOriginalImageBase64] = useState<string | null>(null);
  const [generatedImageBase64, setGeneratedImageBase64] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [currentMedium, setCurrentMedium] = useState<Medium | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      setError(null);
      setGeneratedImageBase64(null);
      setCurrentMedium(null);
      setOriginalImage(file);
      const base64 = await fileToBase64(file);
      setOriginalImageBase64(base64);
    } catch (err) {
      setError('Failed to process image file. Please try another one.');
      console.error(err);
    }
  }, []);

  const handleMediumSelect = useCallback(async (medium: Medium) => {
    if (!originalImageBase64 || !originalImage) return;

    setIsLoading(true);
    setLoadingText(`Placing your product on a ${medium.name.toLowerCase()}...`);
    setError(null);
    setCurrentMedium(medium);

    try {
      const result = await generateImage(originalImageBase64, originalImage.type, medium.prompt);
      setGeneratedImageBase64(result);
    } catch (err) {
      console.error(err);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImageBase64, originalImage]);

  const handleEditSubmit = useCallback(async (prompt: string) => {
    if (!generatedImageBase64) return;

    setIsLoading(true);
    setLoadingText('Applying your edits...');
    setError(null);

    try {
       // Gemini API expects a MIME type for the image data. Since the generated image is PNG, we use 'image/png'.
      const result = await generateImage(generatedImageBase64, 'image/png', prompt);
      setGeneratedImageBase64(result);
    } catch (err) {
      console.error(err);
      setError('Failed to edit image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [generatedImageBase64]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <ImageUploader onImageUpload={handleImageUpload} currentImage={originalImageBase64} />
            {originalImageBase64 && (
              <MediumSelector 
                mediums={MEDIUMS} 
                onSelect={handleMediumSelect}
                currentMedium={currentMedium}
                isDisabled={isLoading}
              />
            )}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            <ImageViewer 
              generatedImage={generatedImageBase64} 
              isLoading={isLoading} 
              loadingText={loadingText}
              mediumName={currentMedium?.name}
            />
            {generatedImageBase64 && !isLoading && (
              <ImageEditor onSubmit={handleEditSubmit} isDisabled={isLoading} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
