
import { useState } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { ParameterControls } from "@/components/ParameterControls";
import { ImagePreview } from "@/components/ImagePreview";
import { VeniceService } from "@/services/veniceService";
import { toast } from "sonner";
import { Loader, Sparkles, Download, RotateCcw } from "lucide-react";
// Removed framer-motion dependency to fix rendering issues
// Simple component replacements
const Button = ({ children, onClick, disabled, className, variant, asChild, ...props }: any) => {
  const Component = asChild ? 'a' : 'button';
  return (
    <Component
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${
        variant === 'outline' ? 'border border-gray-300 bg-white' : 
        variant === 'secondary' ? 'bg-green-100 text-green-700' : 
        'bg-blue-500 text-white'
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

const Card = ({ children, className, ...props }: any) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`} {...props}>{children}</div>
);

const CardContent = ({ children, className, ...props }: any) => (
  <div className={`p-4 ${className}`} {...props}>{children}</div>
);

const Tabs = ({ children, defaultValue, className, ...props }: any) => (
  <div className={`${className}`} {...props}>{children}</div>
);

const TabsList = ({ children, className, ...props }: any) => (
  <div className={`flex gap-2 ${className}`} {...props}>{children}</div>
);

const TabsTrigger = ({ children, value, className, ...props }: any) => (
  <button className={`px-4 py-2 rounded-md ${className}`} {...props}>{children}</button>
);

const TabsContent = ({ children, value, className, ...props }: any) => (
  <div className={`mt-4 ${className}`} {...props}>{children}</div>
);
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                V
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Venice Image Alchemy
            </h1>
            <p className="text-slate-600 mt-3 text-lg">
              Transform your images with AI-powered enhancement technology
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Tabs defaultValue="enhance" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="enhance" className="text-sm sm:text-base">Enhance Image</TabsTrigger>
              <TabsTrigger value="history" className="text-sm sm:text-base">History</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="enhance" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column - Upload and Controls */}
              <Card className="lg:col-span-4 border-slate-200/70 shadow-xl shadow-blue-900/5">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <ImageUploader onImageUpload={handleImageUpload} />
                    
                    <div className="border-t border-slate-200 my-6 pt-6">
                      <ParameterControls
                        params={params}
                        onParamsChange={setParams}
                        onReset={handleReset}
                      />
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-4 pt-2">
                      <Button
                        onClick={handleEnhance}
                        disabled={!originalImage || isProcessing}
                        className={cn(
                          "w-full py-6 rounded-xl font-medium text-base shadow-lg transition-all duration-300",
                          isProcessing ? 
                            "bg-blue-600 text-white" : 
                            "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/20 text-white"
                        )}
                      >
                        {isProcessing ? (
                          <>
                            <Loader className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Enhance Image
                          </>
                        )}
                      </Button>
                      
                      <div className="flex gap-3">
                        <Button
                          onClick={handleReset}
                          variant="outline" 
                          className="flex-1 border-slate-300"
                          disabled={isProcessing}
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                        
                        {enhancedImage && (
                          <Button
                            asChild
                            variant="secondary"
                            className="flex-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                          >
                            <a
                              href={enhancedImage}
                              download="enhanced-image.png"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right Column - Image Preview */}
              <div className="lg:col-span-8">
                <Card className="border-slate-200/70 shadow-xl shadow-blue-900/5 overflow-hidden">
                  <CardContent className="p-0">
                    <ImagePreview
                      originalImage={originalImage}
                      enhancedImage={enhancedImage}
                      isProcessing={isProcessing}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card className="border-slate-200/70 shadow-xl shadow-blue-900/5">
              <CardContent className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="p-4 rounded-full bg-blue-50 mb-4">
                  <Sparkles className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-2">No History Yet</h3>
                <p className="text-slate-500 max-w-md">
                  Your enhanced images will appear here. Start by uploading an image and enhancing it.  
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
