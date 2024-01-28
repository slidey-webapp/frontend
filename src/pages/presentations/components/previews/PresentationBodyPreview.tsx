import React from 'react';
import { usePresentationContext } from '../../PresentationDetailPage';
import PreviewHeadingSlide from './PreviewHeadingSlide';
import PreviewParagraphSlide from './PreviewParagraphSlide';
import PreviewMultipleChoiceSlide from './PreviewMultipleChoiceSlide';

interface Props {}

const PresentationBodyPreview: React.FC<Props> = () => {
    const { currentSlideId, slides } = usePresentationContext();

    const renderSlide = () => {
        const slide = slides.find(x => x.slideID === currentSlideId);

        switch (slide?.type) {
            case 'HEADING':
                return <PreviewHeadingSlide slide={slide} />;
            case 'MULTIPLE_CHOICE':
                return <PreviewMultipleChoiceSlide slide={slide} />;
            case 'PARAGRAPH':
                return <PreviewParagraphSlide slide={slide} />;
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
                }}
            >
                {renderSlide()}
            </div>
        </div>
    );
};

export default PresentationBodyPreview;
