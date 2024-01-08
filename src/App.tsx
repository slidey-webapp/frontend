import { CssBaseline, ThemeProvider } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { queryClient } from '~/libs/react-query';
import '~/mocks/mock';
import { createTheme } from '~/themes';
import './App.scss';
import store from './AppStore';
import { AuthProvider } from './providers/AuthProvider';
import AppRoute from './routes/AppRoute';

const ErrorFallback = () => {
    return (
        <div className="text-red-500 w-screen h-screen flex flex-col justify-center items-center" role="alert">
            error fallback
        </div>
    );
};

const App = () => {
    const theme = createTheme();

    return (
        <React.Fragment>
            <Provider store={store}>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_GOOGLE_CLIENT_ID as string}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <QueryClientProvider client={queryClient}>
                            <BrowserRouter>
                                <ThemeProvider theme={theme}>
                                    <AuthProvider>
                                        <CssBaseline />
                                        <AppRoute />
                                    </AuthProvider>
                                </ThemeProvider>
                            </BrowserRouter>
                        </QueryClientProvider>
                    </ErrorBoundary>
                </GoogleOAuthProvider>
            </Provider>
            <ToastContainer />
        </React.Fragment>
    );
};

export default App;
