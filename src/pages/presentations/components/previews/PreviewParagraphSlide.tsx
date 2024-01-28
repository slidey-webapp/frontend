import React from 'react';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
}

const PreviewParagraphSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'PARAGRAPH') return null;

    const paragraph = slide.paragraph?.replace(/\n/g, '<br>');

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
                className="text-center"
                style={{
                    fontSize: '1.25cqw',
                }}
                dangerouslySetInnerHTML={{
                    __html: paragraph,
                }}
            />
        </div>
    );
};

export default PreviewParagraphSlide;
