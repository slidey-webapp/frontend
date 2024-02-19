import React from 'react';
import { AppContainer } from '~/components/layouts/AppContainer';

import SessionGrid from './components/SessionGrid';

interface Props {}

const SessionDashboardPage: React.FC<Props> = () => {
    return (
        <AppContainer>
            <SessionGrid />
        </AppContainer>
    );
};

export default SessionDashboardPage;
