
import { EnhanceParams } from "@/pages/Index";
import { toast } from "sonner";

export class VeniceService {
  private apiKey: string | null = null;

  constructor() {
    // Get API key from localStorage (temporary solution)
    this.apiKey = localStorage.getItem('venice_api_key');
  }

  private async getApiKey(): Promise<string> {
    if (this.apiKey) {
      return this.apiKey;
    }

    // Prompt user for API key if not found
    const key = prompt(
      "Please enter your Venice AI API key:\n\n" +
      "You can find your API key at:\n" +
      "https://venice.ai/dashboard/api-keys\n\n" +
      "Your key will be stored locally for this session."
    );

    if (!key) {
      throw new Error("API key is required");
    }

    this.apiKey = key.trim();
    localStorage.setItem('venice_api_key', this.apiKey);
    return this.apiKey;
  }

  async enhanceImage(imageDataUrl: string, params: EnhanceParams): Promise<Blob> {
    const apiKey = await this.getApiKey();
    
    // Convert data URL to base64 string (remove data:image/...;base64, prefix)
    const base64Image = imageDataUrl.split(',')[1];

    const requestBody = {
      image: base64Image,
      scale: params.scale,
      enhance: params.enhance,
      enhanceCreativity: params.enhanceCreativity,
      enhancePrompt: params.enhancePrompt || "",
      replication: params.replication,
    };

    try {
      const response = await fetch('https://api.venice.ai/api/v1/image/upscale', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          // If response is not JSON, use the status text
        }

        if (response.status === 401) {
          // Clear stored API key on authentication error
          localStorage.removeItem('venice_api_key');
          this.apiKey = null;
          errorMessage = "Invalid API key. Please check your Venice AI API key.";
        } else if (response.status === 429) {
          errorMessage = "Rate limit exceeded. Please wait before making another request.";
        } else if (response.status === 400) {
          errorMessage = "Invalid request. Please check your image and parameters.";
        } else if (response.status >= 500) {
          errorMessage = "Venice AI service is temporarily unavailable. Please try again later.";
        }

        throw new Error(errorMessage);
      }

      // The API returns the enhanced image as a PNG blob
      const imageBlob = await response.blob();
      
      if (imageBlob.size === 0) {
        throw new Error("Received empty response from Venice AI");
      }

      return imageBlob;
    } catch (error) {
      console.error('Venice API error:', error);
      
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Failed to connect to Venice AI. Please check your internet connection.");
      }
    }
  }

  // Method to clear stored API key (for settings/logout functionality)
  clearApiKey(): void {
    localStorage.removeItem('venice_api_key');
    this.apiKey = null;
  }

  // Method to check if API key is stored
  hasApiKey(): boolean {
    return !!localStorage.getItem('venice_api_key');
  }
}
