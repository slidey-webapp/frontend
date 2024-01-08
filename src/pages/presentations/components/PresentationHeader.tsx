import React from 'react';

interface Props {}

const PresentationHeader: React.FC<Props> = props => {
    return (
        <div
            className="w-full flex items-center bg-blue-200 px-2.5"
            style={{
                minHeight: 56,
                maxHeight: 56,
                height: 56,
            }}
        >
            this is header
        </div>
    );
};

export default PresentationHeader;
