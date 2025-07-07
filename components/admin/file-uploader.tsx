"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  onImageChange: (file: File | null) => void;
  label?: string;
  currentImageUrl?: string;
}

export function FileUploader({ 
  onImageChange,
  label = "Upload Image",
  currentImageUrl
}: FileUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    
    setIsUploading(true);
    setFileName(file.name);
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
    
    // Pass the file to the parent component
    onImageChange(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImageChange(null);
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div 
          className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <Upload className="h-10 w-10 text-slate-500 mb-2" />
          <p className="text-sm font-medium mb-1">{label}</p>
          <p className="text-xs text-muted-foreground">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            SVG, PNG, JPG or GIF
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="rounded-lg overflow-hidden border border-slate-700">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            <Button 
              size="icon" 
              variant="destructive"
              className="h-7 w-7 rounded-full opacity-80 hover:opacity-100"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {fileName && (
            <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-green-500" />
              {fileName}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
