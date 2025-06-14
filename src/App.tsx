import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import components
import Home from "./pages/Home";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import Pricing from "./pages/Pricing";
import PremiumFeatures from "./pages/PremiumFeatures";

// Simple test component to verify React rendering
const TestComponent = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <h1 className="text-2xl font-bold text-center mb-4">React Test Component</h1>
      <p className="text-center mb-4">If you can see this, React is working!</p>
      <div className="flex justify-center">
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Count: {count}
        </button>
      </div>
    </div>
  );
};

// Simple NotFound component
const NotFound = () => (
  <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
    <h1 className="text-2xl font-bold text-center mb-4">404 - Page Not Found</h1>
    <p className="text-center mb-4">The page you're looking for doesn't exist.</p>
    <div className="flex justify-center">
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Go Home
      </Link>
    </div>
  </div>
);

// Error boundary component
type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-100 text-red-700 rounded-xl shadow-md m-4">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="mb-4">Error: {this.state.error?.toString()}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/test" element={<TestComponent />} />
            <Route path="/" element={<Home />} />
            <Route path="/app" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/premium-features" element={<PremiumFeatures />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
