import { useState, useRef } from "react";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader = ({ onImageUpload }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImage = (file: File): boolean => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/heic'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (PNG, JPEG, JPG, WebP, HEIC)");
      return false;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image file size must be less than 10MB");
      return false;
    }

    return true;
  };

  const handleFileSelect = (file: File) => {
    if (validateImage(file)) {
      onImageUpload(file);
      toast.success("Image uploaded successfully!");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-slate-900">Upload Image</h2>
      </div>
      
      <div
        className={cn(
          "border-2 border-dashed rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]",
          isDragging 
            ? "border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-500/10" 
            : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
        )}
      >
        <div
          className="p-8 text-center cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div 
              className={cn(
                "p-4 rounded-full transition-all duration-300",
                isDragging 
                  ? "bg-blue-100 shadow-md shadow-blue-200/50 animate-bounce" 
                  : "bg-slate-100"
              )}
            >
              {isDragging ? (
                <Upload className="w-8 h-8 text-blue-600" />
              ) : (
                <Upload className="w-8 h-8 text-blue-600" />
              )}
            </div>
            
            <div>
              <p className="text-lg font-medium text-slate-800 mb-2">
                {isDragging ? "Drop image here" : "Drag and drop or click to upload"}
              </p>
              <p className="text-sm text-slate-500">
                Supports PNG, JPEG, JPG, WebP, HEIC (max 10MB)
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-start gap-2">
        <Upload className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-slate-500 space-y-1">
          <p>Minimum: 65,536 total pixels</p>
          <p>Maximum after scaling: 16,777,216 pixels</p>
        </div>
      </div>
    </div>
  );
};
