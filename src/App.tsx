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
import InternalServerError from './components/errors/InternalServerError';
import { AuthProvider } from './providers/AuthProvider';
import SocketProvider from './providers/SocketProvider';
import AppRoute from './routes/AppRoute';

const App = () => {
    const theme = createTheme();

    return (
        <React.Fragment>
            <Provider store={store}>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_GOOGLE_CLIENT_ID as string}>
                    <ErrorBoundary FallbackComponent={InternalServerError}>
                        <QueryClientProvider client={queryClient}>
                            <BrowserRouter>
                                <SocketProvider>
                                    <ThemeProvider theme={theme}>
                                        <AuthProvider>
                                            <CssBaseline />
                                            <AppRoute />
                                        </AuthProvider>
                                    </ThemeProvider>
                                </SocketProvider>
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
