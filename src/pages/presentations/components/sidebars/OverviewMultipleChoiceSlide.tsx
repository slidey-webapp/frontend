import React from 'react';
import multipleChoiceSrc from '~/images/slide/multiple-choice.svg';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
}

const OverviewMultipleChoiceSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'MULTIPLE_CHOICE') return null;

    return (
        <div className={'w-full h-full flex flex-col items-center justify-center'}>
            <img src={multipleChoiceSrc} alt={slide.heading} width={20} height={20} />
            <div className="text-10px font-semibold mt-1 line-clamp-1">{slide.question}</div>
        </div>
    );
};

export default OverviewMultipleChoiceSlide;
