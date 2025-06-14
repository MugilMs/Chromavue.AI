
import { EnhanceParams } from "@/pages/Index";
import { toast } from "sonner";

export class VeniceService {
  private apiKey: string | null = null;
  // Venice AI API key - updated with new key
  private defaultApiKey: string = 'ALaIbjl6QTC4m0hmRLCpin8CE5OHwtPJ3v1gYop2oy';

  constructor() {
    try {
      // Clear any existing API key in localStorage
      localStorage.removeItem('venice_api_key');
      
      // Make sure the default API key is properly formatted
      const cleanKey = this.defaultApiKey.trim();
      
      // Set and store the default API key
      this.apiKey = cleanKey;
      localStorage.setItem('venice_api_key', cleanKey);
      
      console.log('API key set:', this.apiKey ? `Key is present (${this.apiKey.length} chars)` : 'No key');
    } catch (error) {
      console.error('Error initializing API key:', error);
    }
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
    
    console.log('Using API key (first 5 chars):', apiKey.substring(0, 5) + '...');
    
    // Convert data URL to base64 string (remove data:image/...;base64, prefix)
    const base64Image = imageDataUrl.split(',')[1];

    // Make sure all required fields are included
    const requestBody = {
      image: base64Image,
      scale: params.scale || 2,  // Default to 2x if not provided
      enhance: params.enhance !== undefined ? params.enhance : true,  // Default to true if not provided
      enhanceCreativity: params.enhanceCreativity || 0.5,  // Default to 0.5 if not provided
      enhancePrompt: params.enhancePrompt || "",
      replication: params.replication || "fast",  // Default to "fast" if not provided
    };

    console.log('Request parameters:', { 
      scale: requestBody.scale,
      enhance: requestBody.enhance,
      enhanceCreativity: requestBody.enhanceCreativity,
      hasPrompt: !!requestBody.enhancePrompt,
      replication: requestBody.replication,
      imageProvided: !!requestBody.image
    });

    // Create an AbortController to handle timeout - defined outside try block for proper scope
    const controller = new AbortController();
    let timeoutId: number | undefined = undefined;

    try {
      console.log('Making API request to Venice AI...');
      // Make sure the API key is properly trimmed and formatted
      const cleanApiKey = apiKey.trim();
      console.log('Clean API key length:', cleanApiKey.length);
      
      // Set timeout to abort after 60 seconds
      timeoutId = window.setTimeout(() => {
        controller.abort();
        toast.error('Request is taking too long. Processing will continue in the background.');
      }, 60000); // 60 second timeout
      
      toast.info('Processing image... This may take a moment.');
      
      // Make the API request with timeout
      const response = await fetch('https://api.venice.ai/api/v1/image/upscale', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cleanApiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });
      
      // Clear the timeout since the request completed
      if (timeoutId) clearTimeout(timeoutId);
      
      console.log('API response status:', response.status, response.statusText);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        let errorDetails = '';
        try {
          const errorData = await response.json();
          errorDetails = JSON.stringify(errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;
          console.error('Full error response:', errorData);
        } catch (jsonErr) {
          errorDetails = 'No JSON error body.';
          console.error('Failed to parse error response as JSON');
        }
        // Log detailed error
        console.error('Venice API error:', errorMessage, errorDetails);
        toast.error(`API Error: ${errorMessage}`);
        throw new Error(`Venice API error: ${errorMessage} | Details: ${errorDetails}`);
      }

      // The API returns the enhanced image as a PNG blob
      toast.success('Image processed successfully!');
      const imageBlob = await response.blob();
      
      if (imageBlob.size === 0) {
        throw new Error("Received empty response from Venice AI");
      }

      return imageBlob;
    } catch (error) {
      // Clear the timeout if there was an error
      if (timeoutId) clearTimeout(timeoutId);
      
      // Log the error object for debugging
      console.error('Network or fetch error when calling Venice AI:', error);
      
      // Handle specific error types
      if (error instanceof DOMException && error.name === 'AbortError') {
        toast.error('The image enhancement request timed out. Please try again with a smaller image or different settings.');
        throw new Error('Venice API request timed out after 60 seconds');
      }
      
      toast.error('Failed to process image. Please try again later.');
      throw new Error('Failed to fetch from Venice AI: ' + (error instanceof Error ? error.message : String(error)));
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
