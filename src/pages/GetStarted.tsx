import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Upload, Zap, Download, Settings, Key } from "lucide-react";

const GetStarted = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Getting Started with Venice Image Alchemy</h1>
            <p className="text-xl text-gray-600">
              Follow these simple steps to enhance your images with our AI-powered tools
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="mb-16 relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-200 hidden md:block"></div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-16 flex-shrink-0 flex items-start justify-center">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold z-10">
                    1
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8 flex-grow">
                  <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
                  <p className="text-gray-600 mb-6">
                    Sign up for a free account to get started with Venice Image Alchemy. You'll get 10 free image enhancements per month with the free plan.
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <Key className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Get Your API Key</h3>
                      <p className="text-sm text-gray-500">
                        After signing up, you'll receive an API key that you can use to access our services.
                      </p>
                    </div>
                  </div>
                  <Link to="/signup">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                      Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mb-16 relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-200 hidden md:block"></div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-16 flex-shrink-0 flex items-start justify-center">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold z-10">
                    2
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8 flex-grow">
                  <h2 className="text-2xl font-bold mb-4">Upload Your Image</h2>
                  <p className="text-gray-600 mb-6">
                    Upload the image you want to enhance. We support JPG, PNG, and WebP formats up to 10MB in size.
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <Upload className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Supported Formats</h3>
                      <p className="text-sm text-gray-500">
                        JPG, PNG, WebP up to 10MB
                      </p>
                    </div>
                  </div>
                  <img 
                    src="/upload-example.jpg" 
                    alt="Upload Example" 
                    className="rounded-lg shadow-sm mb-6 w-full max-w-md mx-auto"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x300/e2e8f0/64748b?text=Upload+Example";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-16 relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-200 hidden md:block"></div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-16 flex-shrink-0 flex items-start justify-center">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold z-10">
                    3
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8 flex-grow">
                  <h2 className="text-2xl font-bold mb-4">Configure Enhancement Settings</h2>
                  <p className="text-gray-600 mb-6">
                    Adjust the enhancement parameters to get the results you want. You can control upscaling factor, enhancement level, and more.
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <Settings className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Customizable Parameters</h3>
                      <p className="text-sm text-gray-500">
                        Scale, enhancement level, creativity, and more
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <pre className="text-sm overflow-x-auto">
{`{
  "scale": 2,
  "enhance": true,
  "enhanceCreativity": 0.5,
  "enhancePrompt": "Improve details and colors",
  "replication": "fast"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="mb-16 relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-200 hidden md:block"></div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-16 flex-shrink-0 flex items-start justify-center">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold z-10">
                    4
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8 flex-grow">
                  <h2 className="text-2xl font-bold mb-4">Process and Enhance</h2>
                  <p className="text-gray-600 mb-6">
                    Click the "Enhance Image" button to start the AI processing. This typically takes 10-30 seconds depending on the image size and selected options.
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <Zap className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">AI Processing</h3>
                      <p className="text-sm text-gray-500">
                        Our advanced AI models will enhance your image based on your settings
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-16 flex-shrink-0 flex items-start justify-center">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold z-10">
                    5
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8 flex-grow">
                  <h2 className="text-2xl font-bold mb-4">Download Your Enhanced Image</h2>
                  <p className="text-gray-600 mb-6">
                    Once processing is complete, you can preview and download your enhanced image. The result will be available in high-quality PNG format.
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <Download className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">High-Quality Results</h3>
                      <p className="text-sm text-gray-500">
                        Download your enhanced image in PNG format
                      </p>
                    </div>
                  </div>
                  <Link to="/app">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                      Try It Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Images?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Start enhancing your images today with our powerful AI tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/app">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  Try It Now
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GetStarted;
