import React from "react";
import { SimpleLayout } from "@/components/SimpleLayout";
import { ArrowRight, Zap, Shield, Award, Star, Sparkles, Image, Layers, Palette } from "lucide-react";
import { Link } from "react-router-dom";

// Simple button component to match the app's styling
const Button = ({ children, size, className, variant, ...props }: any) => (
  <button
    className={`px-4 py-2 rounded-md ${variant === 'outline' ? 'border border-gray-300 bg-white' : 'bg-blue-500 text-white'} ${className}`}
    {...props}
  >
    {children}
  </button>
);

const PremiumFeature = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
    <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const BeforeAfterComparison = ({ title, beforeSrc, afterSrc }: { title: string, beforeSrc: string, afterSrc: string }) => (
  <div className="mb-12">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-lg overflow-hidden shadow-md">
        <div className="bg-gray-800 text-white py-2 px-4 text-sm">Before</div>
        <img src={beforeSrc} alt="Before enhancement" className="w-full h-auto" />
      </div>
      <div className="rounded-lg overflow-hidden shadow-md">
        <div className="bg-blue-600 text-white py-2 px-4 text-sm">After (Premium)</div>
        <img src={afterSrc} alt="After enhancement" className="w-full h-auto" />
      </div>
    </div>
  </div>
);

const PremiumFeatures = () => {
  // Placeholder image URLs - replace with actual before/after images
  const placeholderImage = "/placeholder.svg";
  
  const premiumFeatures = [
    {
      icon: Sparkles,
      title: "AI-Powered Detail Enhancement",
      description: "Our advanced AI algorithms restore lost details and enhance fine textures in your images."
    },
    {
      icon: Layers,
      title: "Smart Upscaling",
      description: "Upscale images up to 16x their original size without losing quality or introducing artifacts."
    },
    {
      icon: Palette,
      title: "Professional Color Grading",
      description: "Apply industry-standard color grading presets or create your own custom looks."
    },
    {
      icon: Shield,
      title: "Noise Reduction",
      description: "Intelligently remove noise while preserving important details and textures."
    },
    {
      icon: Image,
      title: "Background Replacement",
      description: "Automatically detect and replace backgrounds with custom scenes or gradients."
    },
    {
      icon: Star,
      title: "Client Presentation Mode",
      description: "Create beautiful side-by-side comparisons to showcase your work to clients."
    }
  ];

  return (
    <SimpleLayout>
      <div className="py-12 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Premium Features That Pay For Themselves</h1>
            <p className="text-xl text-gray-600 mb-8">
              Chromavue.AI's premium features deliver results that clients will happily pay for. 
              Charge more for your services and recoup your subscription cost with just one client project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                  View Pricing Plans
                </Button>
              </Link>
              <Link to="/app">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3">
                  Try Basic Features Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Premium Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {premiumFeatures.map((feature, index) => (
              <PremiumFeature
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          {/* Before/After Comparisons */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">See The Difference</h2>
            
            <BeforeAfterComparison 
              title="Portrait Enhancement" 
              beforeSrc={placeholderImage} 
              afterSrc={placeholderImage} 
            />
            
            <BeforeAfterComparison 
              title="Landscape Enhancement" 
              beforeSrc={placeholderImage} 
              afterSrc={placeholderImage} 
            />
            
            <BeforeAfterComparison 
              title="Product Photography Enhancement" 
              beforeSrc={placeholderImage} 
              afterSrc={placeholderImage} 
            />
          </div>

          {/* Testimonials */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">What Professionals Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                    JD
                  </div>
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-sm text-gray-500">Professional Photographer</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I've increased my rates by 30% since using Chromavue.AI. Clients are amazed by the quality improvement and are happy to pay premium prices."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                    JS
                  </div>
                  <div>
                    <h4 className="font-semibold">Jane Smith</h4>
                    <p className="text-sm text-gray-500">Wedding Photographer</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The detail enhancement feature has saved me countless hours of manual retouching. My clients are willing to pay extra for the premium quality."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                    RJ
                  </div>
                  <div>
                    <h4 className="font-semibold">Robert Johnson</h4>
                    <p className="text-sm text-gray-500">E-commerce Studio Owner</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "We process hundreds of product images daily. Chromavue.AI's batch processing has increased our output by 5x while improving quality."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ROI Calculator */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">Calculate Your Return on Investment</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              If you charge just $50 extra per project for enhanced images, you'll recover your monthly subscription cost after just a few clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing">
                <Button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 font-medium">
                  See Our Plans <ArrowRight className="ml-2 h-5 w-5 inline" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SimpleLayout>
  );
};

export default PremiumFeatures;
