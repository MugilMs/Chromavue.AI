import { Link } from "react-router-dom";
import { ArrowRight, Image, Zap, Shield, Star } from "lucide-react";

// Simple button component to replace the shadcn button
const Button = ({ children, size, className, variant, ...props }: any) => (
  <button
    className={`px-4 py-2 rounded-md ${variant === 'outline' ? 'border border-gray-300 bg-white' : 'bg-blue-500 text-white'} ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Chromavue.AI" className="h-8 w-8" />
            <span className="text-xl font-bold text-blue-600">Chromavue.AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <Link to="/app" className="text-gray-600 hover:text-blue-600">Enhance Image</Link>
            <Link to="/premium-features" className="text-gray-600 hover:text-blue-600">Premium Features</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
            <Link to="/signin" className="text-gray-600 hover:text-blue-600">Sign In</Link>
          </nav>
        </div>
      </header>
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Transform Your Images with{" "}
                <span className="text-blue-500">
                  AI Magic
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Chromavue.AI uses cutting-edge AI to enhance, upscale, and transform your images with professional quality results in seconds. Our premium features deliver results that clients will happily pay for.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/app">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-lg px-8 py-6 h-auto">
                    Enhance Image <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/premium-features">
                  <Button size="lg" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto">
                    Premium Features <Star className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/get-started">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <img
                  src="/hero-image.jpg"
                  alt="AI Enhanced Image Example"
                  className="rounded-xl shadow-lg w-full"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/64748b?text=Venice+Image+Alchemy";
                  }}
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-blue-500 text-white rounded-lg shadow-lg p-5">
                <div className="text-sm font-medium text-blue-100">Enhanced with AI</div>
                <div className="text-lg font-bold">2x Resolution</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">Powerful Image Enhancement Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered tools give you professional results with just a few clicks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Image className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Super Resolution</h3>
              <p className="text-gray-700">
                Upscale your images up to 4x while preserving details and enhancing quality.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI Enhancement</h3>
              <p className="text-gray-700">
                Automatically fix noise, artifacts, and improve colors with our advanced AI models.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Privacy First</h3>
              <p className="text-gray-700">
                Your images are processed securely and never stored permanently on our servers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl p-10 md:p-16 text-white text-center shadow-xl">
            <h2 className="text-4xl font-bold mb-6">Ready to transform your images?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of photographers, designers, and creators who use Chromavue.AI to deliver premium results their clients love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 h-auto">
                  Sign Up Free
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 h-auto">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
