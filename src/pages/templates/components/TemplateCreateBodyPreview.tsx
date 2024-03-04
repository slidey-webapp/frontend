import React from 'react';
import PreviewBulletSlide from '~/pages/presentations/components/previews/PreviewBulletSlide';
import PreviewHeadingSlide from '~/pages/presentations/components/previews/PreviewHeadingSlide';
import PreviewMultipleChoiceSlide from '~/pages/presentations/components/previews/PreviewMultipleChoiceSlide';
import PreviewParagraphSlide from '~/pages/presentations/components/previews/PreviewParagraphSlide';
import PreviewQuoteSlide from '~/pages/presentations/components/previews/PreviewQuoteSlide';
import PreviewWordCloudSlide from '~/pages/presentations/components/previews/PreviewWordCloudSlide';
import { useTemplateCreateContext } from '../TemplateCreatePage';

interface Props {}

const TemplateCreateBodyPreview: React.FC<Props> = () => {
    const { currentSlideId, slides, hover } = useTemplateCreateContext();

    const slide = slides.find(x => x.slideID === currentSlideId);
    const renderSlide = () => {
        switch (slide?.type) {
            case 'HEADING':
                return <PreviewHeadingSlide slide={slide} hover={hover} />;
            case 'MULTIPLE_CHOICE':
                return <PreviewMultipleChoiceSlide slide={slide} hover={hover} />;
            case 'PARAGRAPH':
                return <PreviewParagraphSlide slide={slide} hover={hover} />;
            case 'BULLET_LIST':
                return <PreviewBulletSlide slide={slide} hover={hover} />;
            case 'WORD_CLOUD':
                return <PreviewWordCloudSlide slide={slide} hover={hover} />;
            case 'QUOTE':
                return <PreviewQuoteSlide slide={slide} hover={hover} />;
            case null:
            default:
                return null;
        }
    };

    return (
        <div className="flex-1 bg-inherit p-4 flex justify-center">
            <div
                className="flex-1 bg-white rounded-lg p-8"
                style={{
                    aspectRatio: '16 / 9',
                    height: 'fit-content',
                    maxWidth: 960,
                    background: slide?.textBackground,
                }}
            >
                {renderSlide()}
            </div>
        </div>
    );
};

export default TemplateCreateBodyPreview;
