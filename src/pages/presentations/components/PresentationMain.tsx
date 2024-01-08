import React from 'react';
import PresentationBody from './PresentationBody';
import PresentationSidebar from './PresentationSidebar';

interface Props {}

const PresentationMain: React.FC<Props> = props => {
    return (
        <div
            className="w-full flex"
            style={{
                height: 'calc(100% - 56px)',
                minHeight: 'calc(100% - 56px)',
                maxHeight: 'calc(100% - 56px)',
            }}
        >
            <PresentationSidebar />
            <PresentationBody />
        </div>
    );
};

export default PresentationMain;
