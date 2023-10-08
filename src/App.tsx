import React from 'react';
import { Provider } from 'react-redux';
import '~/mocks/mock';
import './App.scss';
import store from './AppStore';
import { AppProvider } from './providers/AppProvider';
import AppRoute from './routes/AppRoute';

const App = () => {
    return (
        <React.Fragment>
            <Provider store={store}>
                <AppProvider>
                    <AppRoute />
                </AppProvider>
            </Provider>
        </React.Fragment>
    );
};

export default App;
