import React from 'react';
import headingSrc from '~/images/slide/heading.svg';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
}

const OverviewHeadingSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'HEADING') return null;

    return (
        <div className={'w-full h-full flex flex-col items-center justify-center'}>
            <img src={headingSrc} alt={slide.heading} width={20} height={20} />
            <div className="text-10px font-semibold mt-1 line-clamp-1">{slide.heading}</div>
        </div>
    );
};

export default OverviewHeadingSlide;
