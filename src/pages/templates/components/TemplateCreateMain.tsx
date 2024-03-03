import React from 'react';
import TemplateCreateBodyEditor from './TemplateCreateBodyEditor';
import TemplateCreateBodyPreview from './TemplateCreateBodyPreview';
import TemplateCreateSidebar from './TemplateCreateSidebar';

interface Props {}

const TemplateCreateMain: React.FC<Props> = () => {
    return (
        <div
            className="w-full flex"
            style={{
                height: 'calc(100% - 56px)',
                minHeight: 'calc(100% - 56px)',
                maxHeight: 'calc(100% - 56px)',
            }}
        >
            <TemplateCreateSidebar />
            <div className="flex-1 h-full bg-neutral-100 flex">
                <TemplateCreateBodyPreview />
                <TemplateCreateBodyEditor />
            </div>
        </div>
    );
};

export default TemplateCreateMain;
