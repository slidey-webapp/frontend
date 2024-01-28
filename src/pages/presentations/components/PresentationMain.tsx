import React from 'react';
import PresentationBodyEditor from './editors/PresentationBodyEditor';
import PresentationBodyPreview from './previews/PresentationBodyPreview';
import PresentationSidebar from './sidebars/PresentationSidebar';

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
            <div className="flex-1 h-full bg-neutral-100 flex">
                <PresentationBodyPreview />
                <PresentationBodyEditor />
            </div>
        </div>
    );
};

export default PresentationMain;
