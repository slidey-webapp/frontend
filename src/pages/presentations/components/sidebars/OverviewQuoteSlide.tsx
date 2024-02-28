import React from 'react';
import quoteSrc from '~/images/slide/quote.svg';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
}
const OverviewQuoteSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'QUOTE') return null;

    return (
        <div className={'w-full h-full flex flex-col items-center justify-center'}>
            <img src={quoteSrc} alt={slide.quote} width={20} height={20} />
            <div className="text-10px font-semibold mt-1 line-clamp-1">{slide.quote}</div>
        </div>
    );
};

export default OverviewQuoteSlide;
