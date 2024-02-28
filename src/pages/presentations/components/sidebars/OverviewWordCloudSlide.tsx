import React from 'react';
import wordCloudSrc from '~/images/slide/word-cloud.svg';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
}
const OverviewWordCloudSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'WORD_CLOUD') return null;

    return (
        <div className={'w-full h-full flex flex-col items-center justify-center'}>
            <img src={wordCloudSrc} alt={slide.question} width={20} height={20} />
            <div className="text-10px font-semibold mt-1 line-clamp-1">{slide.question}</div>
        </div>
    );
};

export default OverviewWordCloudSlide;
