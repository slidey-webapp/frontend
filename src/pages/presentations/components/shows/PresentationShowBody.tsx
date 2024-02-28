import React from 'react';
import { usePresentationShowContext } from '../../PresentationHostShow';
import PresentationShowWaiting from './PresentationShowWaiting';
import ShowBulletSlide from './ShowBulletSlide';
import ShowHeadingSlide from './ShowHeadingSlide';
import ShowMultipleChoiceSlide from './ShowMultipleChoiceSlide';
import ShowParagraphSlide from './ShowParagraphSlide';
import ShowQuoteSlide from './ShowQuoteSlide';
import ShowWordCloudSlide from './ShowWordCloudSlide';

interface Props {}

const PresentationShowBody: React.FC<Props> = () => {
    const { currentSlideId, slides, session } = usePresentationShowContext();

    const renderSlide = () => {
        if (session.status === 'STARTING') return <PresentationShowWaiting code={session.code} />;
        const slide = slides.find(x => x.slideID === currentSlideId);

        switch (slide?.type) {
            case 'HEADING':
                return <ShowHeadingSlide slide={slide} />;
            case 'MULTIPLE_CHOICE':
                return <ShowMultipleChoiceSlide slide={slide} />;
            case 'PARAGRAPH':
                return <ShowParagraphSlide slide={slide} />;
            case 'WORD_CLOUD':
                return <ShowWordCloudSlide slide={slide} />;
            case 'QUOTE':
                return <ShowQuoteSlide slide={slide} />;
            case 'BULLET_LIST':
                return <ShowBulletSlide slide={slide} />;
            case null:
            default:
                return null;
        }
    };

    return (
        <div className="w-full flex-1 p-4">
            <div className="w-full h-full px-20 py-5">
                <div className="w-full h-full">{renderSlide()}</div>
            </div>
        </div>
    );
};

export default PresentationShowBody;
