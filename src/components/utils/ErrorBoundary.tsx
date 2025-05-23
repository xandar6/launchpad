import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    // You could also log to an error reporting service here
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
            <h2 className="mb-4 text-2xl font-bold text-red-600">
              Something went wrong
            </h2>
            <p className="mb-4 text-gray-700">
              We're sorry, but there was an error loading this component.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700">
              Reload Page
            </button>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="max-w-full p-4 mt-6 overflow-auto text-left bg-gray-100 rounded">
                <p className="font-mono text-sm text-red-500">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
