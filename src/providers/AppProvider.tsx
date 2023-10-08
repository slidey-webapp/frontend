import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { queryClient } from '~/libs/react-query';
import { AuthProvider } from './AuthProvider';

const ErrorFallback = () => {
    const navigate = useNavigate();
    return (
        <div className="text-red-500 w-screen h-screen flex flex-col justify-center items-center" role="alert">
            error fallback
        </div>
    );
};

type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <React.Suspense>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <Router>{children}</Router>
                    </AuthProvider>
                </QueryClientProvider>
            </ErrorBoundary>
        </React.Suspense>
    );
};
