import React, { CSSProperties } from 'react';
import { usePresentationShowContext } from '../../PresentationHostShow';
import PresentationShowWaiting from './PresentationShowWaiting';
import ShowBulletSlide from './ShowBulletSlide';
import ShowHeadingSlide from './ShowHeadingSlide';
import ShowMultipleChoiceSlide from './ShowMultipleChoiceSlide';
import ShowParagraphSlide from './ShowParagraphSlide';
import ShowQuoteSlide from './ShowQuoteSlide';
import ShowWordCloudSlide from './ShowWordCloudSlide';
import { SlideLayout } from '../../types/slide';
import { checkEmptyContent } from '../previews/PresentationBodyPreview';

interface Props {
    style?: CSSProperties;
}

const PresentationShowBody: React.FC<Props> = ({ style }) => {
    const { currentSlideId, slides, session } = usePresentationShowContext();
    const slide = slides.find(x => x.slideID === currentSlideId);

    if (session.status === 'STARTING')
        return (
            <div className="w-full flex-1 px-20 py-5">
                <PresentationShowWaiting code={session.code} />
            </div>
        );

    const renderSlide = () => {
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

    const renderBody = () => {
        if (!slide?.mediaURL || !slide.layout || slide.layout === SlideLayout.Default) {
            return <div className="w-full h-full px-20 py-5">{renderSlide()}</div>;
        }
        switch (slide.layout) {
            case SlideLayout.ImageFull:
                return (
                    <div className="w-full h-full relative overflow-hidden">
                        <div className="absolute w-full h-full top-0 left-0">
                            <img
                                src={slide.mediaURL}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                            {!checkEmptyContent(slide) && (
                                <div
                                    className="absolute w-full h-full top-0 left-0"
                                    style={{
                                        zIndex: 1,
                                        background: 'rgba(255, 255, 255, 0.45)',
                                    }}
                                />
                            )}
                        </div>
                        {!checkEmptyContent(slide) && (
                            <div className="w-full h-full p-8 z-10 relative">{renderSlide()}</div>
                        )}
                    </div>
                );
            case SlideLayout.ImageSideLeft:
                return (
                    <div className="w-full h-full flex gap-x-6 px-20 py-5">
                        <div className="flex-1 h-full">
                            <img
                                src={slide.mediaURL}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        </div>
                        <div className="flex-1 h-full">{renderSlide()}</div>
                    </div>
                );
            case SlideLayout.ImageSideRight:
                return (
                    <div className="w-full h-full flex gap-x-6 px-20 py-5">
                        <div className="flex-1 h-full">{renderSlide()}</div>
                        <div className="flex-1 h-full">
                            <img
                                src={slide.mediaURL}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        </div>
                    </div>
                );
            case SlideLayout.ImageLeft:
                return (
                    <div className="w-full h-full flex gap-x-6">
                        <div className="flex-1 h-full">
                            <div
                                className=" h-full absolute top-0 left-0"
                                style={{
                                    width: 'calc(50% - 12px)',
                                }}
                            >
                                <img
                                    src={slide.mediaURL}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        </div>
                        <div
                            className="flex-1 h-full "
                            style={{
                                width: 'calc(50% - 12px)',
                            }}
                        >
                            <div className="w-full h-full py-5 pr-20 pl-0">{renderSlide()}</div>
                        </div>
                    </div>
                );
            case SlideLayout.ImageRight:
                return (
                    <div className="w-full h-full flex gap-x-6">
                        <div
                            className="flex-1 h-full "
                            style={{
                                width: 'calc(50% - 12px)',
                            }}
                        >
                            <div className="w-full h-full py-5 pl-20 pr-0">{renderSlide()}</div>
                        </div>
                        <div className="flex-1 h-full">
                            <div
                                className=" h-full absolute top-0 right-0"
                                style={{
                                    width: 'calc(50% - 12px)',
                                }}
                            >
                                <img
                                    src={slide.mediaURL}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                );
            case SlideLayout.ImageTop:
                return (
                    <div className="w-full h-full flex flex-col gap-y-6">
                        <div className="flex-1 w-full">
                            <div
                                className="w-full absolute top-0 right-0"
                                style={{
                                    height: 'calc(50% - 12px)',
                                }}
                            >
                                <img
                                    src={slide.mediaURL}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        </div>
                        <div
                            className="flex-1 w-full"
                            style={{
                                height: 'calc(50% - 12px)',
                            }}
                        >
                            <div className="w-full h-full pb-5 px-20">{renderSlide()}</div>
                        </div>
                    </div>
                );
            case SlideLayout.ImageBottom:
                return (
                    <div className="w-full h-full flex flex-col gap-y-6">
                        <div
                            className="flex-1 w-full"
                            style={{
                                height: 'calc(50% - 12px)',
                            }}
                        >
                            <div className="w-full h-full pb-5 px-20">{renderSlide()}</div>
                        </div>
                        <div className="flex-1 w-full">
                            <div
                                className="w-full absolute bottom-0 right-0"
                                style={{
                                    height: 'calc(50% - 12px)',
                                }}
                            >
                                <img
                                    src={slide.mediaURL}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="w-full flex-1 max-h-full" style={style}>
            {renderBody()}
        </div>
    );
};

export default PresentationShowBody;
