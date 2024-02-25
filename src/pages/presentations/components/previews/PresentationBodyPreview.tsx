import React from 'react';
import { usePresentationContext } from '../../PresentationDetailPage';
import PreviewHeadingSlide from './PreviewHeadingSlide';
import PreviewMultipleChoiceSlide from './PreviewMultipleChoiceSlide';
import PreviewParagraphSlide from './PreviewParagraphSlide';

interface Props {}

const PresentationBodyPreview: React.FC<Props> = () => {
    const { currentSlideId, slides, hover } = usePresentationContext();

    const slide = slides.find(x => x.slideID === currentSlideId);
    const renderSlide = () => {
        switch (slide?.type) {
            case 'HEADING':
                return <PreviewHeadingSlide slide={slide} hover={hover} />;
            case 'MULTIPLE_CHOICE':
                return <PreviewMultipleChoiceSlide slide={slide} hover={hover} />;
            case 'PARAGRAPH':
                return <PreviewParagraphSlide slide={slide} hover={hover} />;
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

export default PresentationBodyPreview;
