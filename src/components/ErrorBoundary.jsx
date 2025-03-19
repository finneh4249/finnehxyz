import React, { Component } from 'react';
import { motion } from 'framer-motion';

// Default fallback component with nice styling
const DefaultErrorFallback = ({ error, resetError, componentName }) => (
  <motion.div
    className="my-8 px-4 py-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 max-w-4xl mx-auto"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-start">
      <div className="flex-shrink-0 mt-1">
        <svg className="w-6 h-6 text-red-500 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <div className="ml-3 flex-1">
        <h3 className="text-lg font-medium text-red-800 dark:text-red-300">
          {componentName ? `Error in ${componentName}` : 'Something went wrong'}
        </h3>
        
        <div className="mt-2 text-sm text-red-700 dark:text-red-200">
          <p>We've encountered an unexpected error. Our team has been notified.</p>
          
          <details className="mt-3 bg-red-100/50 dark:bg-red-900/30 p-2 rounded">
            <summary className="cursor-pointer text-red-800 dark:text-red-300 font-medium">
              Error details
            </summary>
            <p className="mt-2 px-2 py-1 bg-white dark:bg-gray-800 rounded font-mono text-xs overflow-x-auto">
              {error.toString()}
            </p>
          </details>
          
          <div className="mt-4">
            <button
              onClick={resetError}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Try again
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="ml-3 px-4 py-2 bg-white border border-red-300 dark:bg-gray-700 dark:border-red-600 text-red-700 dark:text-red-300 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Reload page
            </button>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

/**
 * ErrorBoundary component to catch JavaScript errors in child components
 * Displays a fallback UI instead of crashing the app
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // This lifecycle is invoked after an error has been thrown by a descendant component
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  // This lifecycle is invoked after an error has been thrown by a descendant component
  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    this.logErrorToService(error, errorInfo);
    this.setState({ errorInfo });
  }

  // Method to log errors to an analytics/error tracking service
  logErrorToService(error, errorInfo) {
    // In a real app, you would send this to your error tracking service
    // Example: Sentry, LogRocket, etc.
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo?.componentStack);
    
    // If you have an error reporting service, uncomment and implement this
    /*
    if (window.errorReportingService) {
      window.errorReportingService.captureException(error, { 
        extra: { componentStack: errorInfo?.componentStack } 
      });
    }
    */
  }

  // Method to reset the error state - allows for recovery
  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    const { hasError, error } = this.state;
    const { 
      children, 
      fallback: CustomFallback,
      componentName = this.props.componentName || 'component'
    } = this.props;

    if (hasError) {
      // Render custom fallback or default one
      const FallbackComponent = CustomFallback || DefaultErrorFallback;
      return (
        <FallbackComponent 
          error={error} 
          resetError={this.resetError}
          componentName={componentName}
        />
      );
    }

    // When there's no error, render children normally
    return children;
  }
}

export default ErrorBoundary;
