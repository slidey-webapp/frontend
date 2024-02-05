import React from 'react';
import { SlideDto } from '../../types/slide';
import { ShowFontSizeConstant } from '~/configs/constants';

interface Props {
    slide: SlideDto;
}

const ShowHeadingSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'HEADING') return null;
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div
                className="font-semibold mb-2 text-center"
                style={{
                    fontSize: ShowFontSizeConstant.HEADING,
                }}
            >
                {slide.heading}
            </div>
            <div
                style={{
                    fontSize: ShowFontSizeConstant.SUB_HEADING,
                }}
            >
                {slide.subHeading}
            </div>
        </div>
    );
};

export default ShowHeadingSlide;
