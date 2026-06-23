import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0A0A0F] text-[#F4F4F8] p-6">
          <div className="max-w-md w-full bg-[#18181F] rounded-2xl border border-[rgba(255,255,255,0.1)] p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-[#FF4D6D] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-[#FF4D6D]" />
            </div>
            <h1 className="text-2xl font-bold font-display mb-3">Something went wrong</h1>
            <p className="text-[#9898A8] mb-8">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 bg-[#6C63FF] hover:bg-[#5b54d6] text-white py-3 px-6 rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <RefreshCcw className="w-5 h-5" />
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
