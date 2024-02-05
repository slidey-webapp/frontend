import React from 'react';
import { SlideDto } from '../../types/slide';
import { PreviewFontSizeConstant } from '~/configs/constants';

interface Props {
    slide: SlideDto;
}

const PreviewParagraphSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'PARAGRAPH') return null;

    const paragraph = slide.paragraph?.replace(/\n/g, '<br>');

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
                className="text-center"
                style={{
                    fontSize: PreviewFontSizeConstant.PARAGRAPH,
                }}
                dangerouslySetInnerHTML={{
                    __html: paragraph,
                }}
            />
        </div>
    );
};

export default PreviewParagraphSlide;
