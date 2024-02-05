import React from 'react';
import { SlideDto } from '../../types/slide';
import { PreviewFontSizeConstant } from '~/configs/constants';

interface Props {
    slide: SlideDto;
}

const PreviewHeadingSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'HEADING') return null;
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div
                className="font-semibold mb-2 text-center"
                style={{
                    fontSize: PreviewFontSizeConstant.HEADING,
                }}
            >
                {slide.heading}
            </div>
            <div
                style={{
                    fontSize: PreviewFontSizeConstant.SUB_HEADING,
                }}
            >
                {slide.subHeading}
            </div>
        </div>
    );
};

export default PreviewHeadingSlide;
