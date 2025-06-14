
import { Loader, Download } from "lucide-react";

interface ImagePreviewProps {
  originalImage: string | null;
  enhancedImage: string | null;
  isProcessing: boolean;
}

export const ImagePreview = ({ originalImage, enhancedImage, isProcessing }: ImagePreviewProps) => {
  if (!originalImage) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-lg font-medium">No image selected</p>
          <p className="text-sm">Upload an image to see the preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Image Preview</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original Image */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Original</h3>
          </div>
          <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square">
            <img
              src={originalImage}
              alt="Original"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Enhanced Image */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Enhanced</h3>
            {enhancedImage && (
              <a
                href={enhancedImage}
                download="enhanced-image.png"
                className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            )}
          </div>
          <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square">
            {isProcessing ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Loader className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Processing...</p>
                </div>
              </div>
            ) : enhancedImage ? (
              <img
                src={enhancedImage}
                alt="Enhanced"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">Enhanced image will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {enhancedImage && (
        <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-green-700 font-medium">Enhancement completed successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};
