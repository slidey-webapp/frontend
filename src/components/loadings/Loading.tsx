import React from 'react';

interface Props {}

const Loading: React.FC<Props> = () => {
    return (
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-white z-999">
            <div className="inline-block relative w-20 aspect-square">
                <div className="absolute opacity-1 rounded-full animate-loading-ripple border-4 border-solid border-red-500" />
                <div className="absolute opacity-1 rounded-full animate-loading-ripple border-4 border-solid border-red-500 -animation-delay-500" />
            </div>
        </div>
    );
};

export default Loading;
