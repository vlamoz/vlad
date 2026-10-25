import React, { type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import i18n from '../i18n';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const t = (key: string) => i18n.t(`errors.errorBoundary.${key}`, { ns: 'common' });

      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="max-w-md w-full mx-auto p-6 text-center">
            <div className="mb-6">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('description')}
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={this.handleRetry}
                className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
              >
                <RefreshCw className="h-5 w-5" />
                {t('tryAgain')}
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full flex items-center justify-center gap-2 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200"
              >
                {t('refreshPage')}
              </button>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('errorDetails')}
                </summary>
                <pre className="text-xs text-red-600 dark:text-red-400 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;