import React from 'react';
import { SlideDto } from '../../types/slide';
import paragraphSrc from '~/images/slide/paragraph.svg';

interface Props {
    slide: SlideDto;
}

const OverviewParagraphSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'PARAGRAPH') return null;

    return (
        <div className={'w-full h-full flex flex-col items-center justify-center'}>
            <img src={paragraphSrc} alt={slide.heading} width={20} height={20} />
            <div className="text-10px font-semibold mt-1 line-clamp-1">{slide.heading}</div>
        </div>
    );
};

export default OverviewParagraphSlide;
