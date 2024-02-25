import React from 'react';
import LandingFeature from './components/LandingFeature';
import LandingFooter from './components/LandingFooter';
import LandingHeader from './components/LandingHeader';
import LandingHero from './components/LandingHero';
import LandingSection from './components/LandingSection';

interface Props {}

const LandingPage: React.FC<Props> = () => {
    return (
        <div
            className="relative"
            style={{
                width: '100vw',
                height: '100vh',
                overflowX: 'hidden',
                overflowY: 'auto',
            }}
        >
            <LandingHeader />
            <LandingHero /> 
            <LandingFeature />
            <LandingSection />
            <LandingFooter />
        </div>
    );
};

export default LandingPage;
