import React from 'react';
import PreviewBulletSlide from '~/pages/presentations/components/previews/PreviewBulletSlide';
import PreviewHeadingSlide from '~/pages/presentations/components/previews/PreviewHeadingSlide';
import PreviewMultipleChoiceSlide from '~/pages/presentations/components/previews/PreviewMultipleChoiceSlide';
import PreviewParagraphSlide from '~/pages/presentations/components/previews/PreviewParagraphSlide';
import PreviewQuoteSlide from '~/pages/presentations/components/previews/PreviewQuoteSlide';
import PreviewWordCloudSlide from '~/pages/presentations/components/previews/PreviewWordCloudSlide';
import { SlideLayout } from '~/pages/presentations/types/slide';
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

    const renderBody = () => {
        if (!slide?.mediaURL || !slide.layout || slide.layout === SlideLayout.Default) {
            return <div className="w-full h-full p-8">{renderSlide()}</div>;
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
                            <div
                                className="absolute w-full h-full top-0 left-0"
                                style={{
                                    zIndex: 1,
                                    background: 'rgba(255, 255, 255, 0.45)',
                                }}
                            />
                        </div>
                        <div className="w-full h-full p-8 z-10 relative">{renderSlide()}</div>
                    </div>
                );
            case SlideLayout.ImageSideLeft:
                return (
                    <div className="w-full h-full relative p-8 flex gap-x-4">
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
                    <div className="w-full h-full relative p-8 flex gap-x-4">
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
                    <div className="w-full h-full relative flex gap-x-4">
                        <div className="flex-1 h-full">
                            <img
                                src={slide.mediaURL}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                        <div className="flex-1 h-full p-8 pl-0">{renderSlide()}</div>
                    </div>
                );
            case SlideLayout.ImageRight:
                return (
                    <div className="w-full h-full relative flex gap-x-4">
                        <div className="flex-1 h-full p-8 pr-0">{renderSlide()}</div>
                        <div className="flex-1 h-full">
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
                );
            case SlideLayout.ImageTop:
                return (
                    <div className="w-full h-full flex flex-col gap-y-4">
                        <div
                            className="flex-1 w-full"
                            style={{
                                maxHeight: 'calc(50% - 8px)',
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
                        <div className="flex-1 w-full p-8 pt-0">{renderSlide()}</div>
                    </div>
                );
            case SlideLayout.ImageBottom:
                return (
                    <div className="w-full h-full flex flex-col gap-y-4">
                        <div className="flex-1 w-full p-8 pb-0">{renderSlide()}</div>
                        <div
                            className="flex-1 w-full"
                            style={{
                                maxHeight: 'calc(50% - 8px)',
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
                );
        }
    };

    return (
        <div className="flex-1 bg-inherit p-4 flex justify-center">
            <div
                className="flex-1 bg-white rounded-lg relative overflow-hidden"
                style={{
                    aspectRatio: '16 / 9',
                    height: 'fit-content',
                    maxWidth: 960,
                    background: slide?.textBackground,
                }}
            >
                {renderBody()}
            </div>
        </div>
    );
};

export default TemplateCreateBodyPreview;
