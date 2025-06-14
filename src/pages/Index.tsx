
import { useState } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { ParameterControls } from "@/components/ParameterControls";
import { ImagePreview } from "@/components/ImagePreview";
import { VeniceService } from "@/services/veniceService";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export interface EnhanceParams {
  scale: number;
  enhance: boolean;
  enhanceCreativity: number;
  enhancePrompt: string;
  replication: number;
}

const Index = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [params, setParams] = useState<EnhanceParams>({
    scale: 2,
    enhance: true,
    enhanceCreativity: 0.5,
    enhancePrompt: "",
    replication: 0.35,
  });

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      setEnhancedImage(null); // Clear previous enhancement
    };
    reader.readAsDataURL(file);
  };

  const handleEnhance = async () => {
    if (!originalImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    try {
      const veniceService = new VeniceService();
      const enhancedImageBlob = await veniceService.enhanceImage(originalImage, params);
      
      // Convert blob to data URL for display
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEnhancedImage(result);
        toast.success("Image enhanced successfully!");
      };
      reader.readAsDataURL(enhancedImageBlob);
    } catch (error) {
      console.error("Enhancement failed:", error);
      toast.error("Enhancement failed. Please check your API key and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setParams({
      scale: 2,
      enhance: true,
      enhanceCreativity: 0.5,
      enhancePrompt: "",
      replication: 0.35,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Venice Image Enhancer
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Professional AI-powered image upscaling and enhancement
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload and Controls */}
          <div className="lg:col-span-1 space-y-6">
            <ImageUploader onImageUpload={handleImageUpload} />
            <ParameterControls
              params={params}
              onParamsChange={setParams}
              onReset={handleReset}
            />
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleEnhance}
                disabled={!originalImage || isProcessing}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Enhance Image"
                )}
              </button>
              
              {enhancedImage && (
                <a
                  href={enhancedImage}
                  download="enhanced-image.png"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold text-center block hover:bg-green-700 transition-colors duration-200"
                >
                  Download Enhanced Image
                </a>
              )}
            </div>
          </div>

          {/* Right Column - Image Preview */}
          <div className="lg:col-span-2">
            <ImagePreview
              originalImage={originalImage}
              enhancedImage={enhancedImage}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
