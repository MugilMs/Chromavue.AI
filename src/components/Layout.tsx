import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Github, Twitter, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Enhance Image", path: "/app" },
    { name: "Premium Features", path: "/premium-features" },
    { name: "Pricing", path: "/pricing" },
    { name: "Sign In", path: "/signin" },
  ];

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className={cn(
        "sticky top-0 z-10 transition-all duration-300",
        scrolled 
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm" 
          : "bg-transparent"
      )}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center">
            {/* Logo with SVG */}
            <Link to="/" className="flex items-center gap-2 mr-10 group">
              <img src="/logo.svg" alt="Chromavue.AI" className="h-8 w-8" />
              <span className="text-xl font-bold">
                Chromavue.AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "font-medium transition-all duration-200 relative py-1 px-1",
                    isActive(item.path)
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  )}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <motion.div 
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      transition={{ type: "spring", bounce: 0.25 }}
                    />
                  )}
                </Link>
              ))}
            </nav>
            
            {/* Spacer to push auth buttons to the right */}
            <div className="flex-grow"></div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="rounded-full px-5 hover:bg-blue-50 hover:text-blue-600">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button className="rounded-full px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-blue-300/50 transition-all duration-300">Sign up</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden py-4 border-t mt-4 overflow-hidden"
              >
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "font-medium transition-colors flex items-center justify-between p-2 rounded-lg",
                        isActive(item.path)
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ))}
                  <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-gray-100">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full rounded-lg">Log in</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600">Sign up</Button>
                    </Link>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200/50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.svg" alt="Chromavue.AI" className="h-7 w-7" />
                <span className="text-lg font-bold">
                  Chromavue.AI
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Professional AI-powered image upscaling and enhancement powered by Venice AI.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <a href="#" className="p-2 rounded-full bg-slate-100 hover:bg-blue-100 transition-colors">
                  <Twitter className="h-4 w-4 text-slate-600" />
                </a>
                <a href="#" className="p-2 rounded-full bg-slate-100 hover:bg-blue-100 transition-colors">
                  <Github className="h-4 w-4 text-slate-600" />
                </a>
                <a href="#" className="p-2 rounded-full bg-slate-100 hover:bg-blue-100 transition-colors">
                  <Linkedin className="h-4 w-4 text-slate-600" />
                </a>
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-sm font-semibold mb-4 text-slate-900 uppercase tracking-wider">Product</h3>
                  <ul className="space-y-3">
                    {navItems.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link to="/app" className="text-slate-600 hover:text-blue-600 transition-colors text-sm">
                        App
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-4 text-slate-900 uppercase tracking-wider">Company</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link to="/about" className="text-slate-600 hover:text-blue-600 transition-colors text-sm">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" className="text-slate-600 hover:text-blue-600 transition-colors text-sm">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link to="/blog" className="text-slate-600 hover:text-blue-600 transition-colors text-sm">
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-4 text-slate-900 uppercase tracking-wider">Legal</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        to="/terms"
                        className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
                      >
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/privacy"
                        className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cookies"
                        className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
                      >
                        Cookie Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Chromavue.AI. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Made with ✨ by the Venice AI team</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
