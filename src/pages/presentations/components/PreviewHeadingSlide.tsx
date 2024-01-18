import React from 'react';
import { SlideDto } from '../types/slide';

interface Props {
    slide: SlideDto;
}

const PreviewHeadingSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'HEADING') return null;
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div
                className="font-semibold mb-2"
                style={{
                    fontSize: '3cqw',
                }}
            >
                {slide.heading}
            </div>
            <div
                style={{
                    fontSize: '1.25cqw',
                }}
            >
                {slide.subHeading}
            </div>
        </div>
    );
};

export default PreviewHeadingSlide;
