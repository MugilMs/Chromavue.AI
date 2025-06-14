
import { useState, useRef } from "react";
import { Upload, Image } from "lucide-react";
import { toast } from "sonner";

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
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Image</h2>
      
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-purple-500 bg-purple-50/50 scale-105"
            : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/30"
        }`}
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
          <div className={`p-4 rounded-full transition-colors duration-200 ${
            isDragging ? "bg-purple-100" : "bg-gray-100"
          }`}>
            {isDragging ? (
              <Upload className="w-8 h-8 text-purple-600" />
            ) : (
              <Image className="w-8 h-8 text-gray-600" />
            )}
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-700 mb-1">
              {isDragging ? "Drop image here" : "Choose or drag image"}
            </p>
            <p className="text-sm text-gray-500">
              Supports PNG, JPEG, JPG, WebP, HEIC (max 10MB)
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 space-y-1">
        <p>• Minimum: 65,536 total pixels</p>
        <p>• Maximum after scaling: 16,777,216 pixels</p>
      </div>
    </div>
  );
};
