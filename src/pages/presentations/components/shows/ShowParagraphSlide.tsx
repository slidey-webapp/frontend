import React from 'react';
import { ShowFontSizeConstant } from '~/configs/constants';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
}

const ShowParagraphSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'PARAGRAPH') return null;

    const paragraph = slide.paragraph?.replace(/\n/g, '<br>');

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
                className="text-center"
                style={{
                    fontSize: ShowFontSizeConstant.PARAGRAPH,
                }}
                dangerouslySetInnerHTML={{
                    __html: paragraph,
                }}
            />
        </div>
    );
};

export default ShowParagraphSlide;
