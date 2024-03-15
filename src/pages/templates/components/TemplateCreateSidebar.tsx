import { Divider } from '@mui/material';
import clsx from 'clsx';
import _ from 'lodash';
import React from 'react';
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import BaseIcon from '~/components/icons/BaseIcon';
import OverviewBulletSlide from '~/pages/presentations/components/sidebars/OverviewBulletSlide';
import OverviewHeadingSlide from '~/pages/presentations/components/sidebars/OverviewHeadingSlide';
import OverviewMultipleChoiceSlide from '~/pages/presentations/components/sidebars/OverviewMultipleChoiceSlide';
import OverviewParagraphSlide from '~/pages/presentations/components/sidebars/OverviewParagraphSlide';
import OverviewQuoteSlide from '~/pages/presentations/components/sidebars/OverviewQuoteSlide';
import OverviewWordCloudSlide from '~/pages/presentations/components/sidebars/OverviewWordCloudSlide';
import { SlideDto, SlideLayout } from '~/pages/presentations/types/slide';
import NotifyUtil from '~/utils/NotifyUtil';
import { useTemplateCreateContext } from '../TemplateCreatePage';
import TemplateCreateNewSlidePattern from './TemplateCreateNewSlidePattern';

interface Props {}

const reorder = (list: SlideDto[], startIndex: number, endIndex: number) => {
    const slides = _.cloneDeep(list);
    const [removed] = slides.splice(startIndex, 1);
    slides.splice(endIndex, 0, removed);

    return slides.map((slide, index) => ({ ...slide, slideOrder: index + 1 }));
};

const TemplateCreateSidebar: React.FC<Props> = () => {
    const { slides, onUpdatePresentation, currentSlideId, setCurrentSlideId } = useTemplateCreateContext();

    const onDragEnd: OnDragEndResponder = async result => {
        if (!result.destination || result.destination?.index === result.source.index) return;

        const newSlides = reorder(slides, result.source.index, result.destination.index);

        onUpdatePresentation({
            slides: newSlides,
        });
    };

    const renderOverviewSlideType = (slide: SlideDto) => {
        switch (slide?.type) {
            case 'HEADING':
                return <OverviewHeadingSlide slide={slide} key={slide.slideID} />;
            case 'PARAGRAPH':
                return <OverviewParagraphSlide slide={slide} key={slide.slideID} />;
            case 'MULTIPLE_CHOICE':
                return <OverviewMultipleChoiceSlide slide={slide} key={slide.slideID} />;
            case 'BULLET_LIST':
                return <OverviewBulletSlide slide={slide} key={slide.slideID} />;
            case 'QUOTE':
                return <OverviewQuoteSlide slide={slide} key={slide.slideID} />;
            case 'WORD_CLOUD':
                return <OverviewWordCloudSlide slide={slide} key={slide.slideID} />;
            case null:
            default:
                return null;
        }
    };

    const renderOverviewSlide = (slide: SlideDto) => {
        const overviewSlide = renderOverviewSlideType(slide);

        if (!slide?.mediaURL || !slide.layout || slide.layout === SlideLayout.Default) {
            return <div className="w-full h-full p-2">{overviewSlide}</div>;
        }

        switch (slide.layout) {
            case SlideLayout.ImageFull:
                return (
                    <div className="w-full h-full relative overflow-hidden rounded-sm">
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
                        <div className="w-full h-full p-2 z-10 relative">{overviewSlide}</div>
                    </div>
                );
            case SlideLayout.ImageSideLeft:
                return (
                    <div className="w-full h-full relative p-2 flex gap-x-1 rounded-sm overflow-hidden">
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
                        <div className="flex-1 h-full">{overviewSlide}</div>
                    </div>
                );
            case SlideLayout.ImageSideRight:
                return (
                    <div className="w-full h-full relative p-2 flex gap-x-1 rounded-sm overflow-hidden">
                        <div className="flex-1 h-full">{overviewSlide}</div>
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
                    <div className="w-full h-full relative flex gap-x-1 rounded-sm overflow-hidden">
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
                        <div className="flex-1 h-full p-2 pl-0">{overviewSlide}</div>
                    </div>
                );
            case SlideLayout.ImageRight:
                return (
                    <div className="w-full h-full relative flex gap-x-1 rounded-sm overflow-hidden">
                        <div className="flex-1 h-full p-2 pr-0">{overviewSlide}</div>
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
                    <div className="w-full h-full flex flex-col gap-y-1 rounded-sm overflow-hidden">
                        <div
                            className="flex-1 w-full"
                            style={{
                                maxHeight: '35%',
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
                        <div className="flex-1 w-full p-2 pt-0">{overviewSlide}</div>
                    </div>
                );
            case SlideLayout.ImageBottom:
                return (
                    <div className="w-full h-full flex flex-col gap-y-1 rounded-sm overflow-hidden">
                        <div className="flex-1 w-full p-2 pb-0">{overviewSlide}</div>
                        <div
                            className="flex-1 w-full"
                            style={{
                                maxHeight: '35%',
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

    const handleDeleteSlide = async (slide: SlideDto) => {
        const confirm = await NotifyUtil.confirmDialog('Bạn có chắc muốn xóa?');

        if (confirm.isDismissed) return;

        const newSlides = _.cloneDeep(slides);
        const slideIndex = newSlides.findIndex(x => x.slideID === slide.slideID);

        newSlides.splice(slideIndex, 1);

        onUpdatePresentation({
            slides: newSlides,
        });

        if (slide.slideID !== currentSlideId) return;

        if (slideIndex === 0) {
            setCurrentSlideId(newSlides[0]?.slideID);
        } else {
            setCurrentSlideId(newSlides[slideIndex - 1]?.slideID);
        }
    };

    const handleDuplicateSlide = async (slide: SlideDto) => {
        onUpdatePresentation({
            slides: [
                ...slides,
                {
                    ...slide,
                    slideID: Math.random(),
                    slideOrder: slides.length + 1,
                } as SlideDto,
            ],
        });
    };

    return (
        <div className="w-44 h-full overflow-hidden flex flex-col">
            <div className="w-full h-14 flex items-center px-4">
                <TemplateCreateNewSlidePattern />{' '}
            </div>
            <div className="flex-1 w-full overflow-x-hidden overflow-y-auto pr-4">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {droppableProvided => {
                            return (
                                <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                                    {slides.map((slide, index) => {
                                        const active = slide.slideID === currentSlideId;
                                        return (
                                            <>
                                                {/* @ts-ignore */}
                                                <ContextMenuTrigger
                                                    id={'menu-context-' + slide.slideID}
                                                    key={`${slide.slideID} ${slide.mediaID}`}
                                                >
                                                    <Draggable draggableId={slide.slideID.toString()} index={index}>
                                                        {(provided, snapshot) => {
                                                            return (
                                                                <div
                                                                    className="w-full h-18 flex items-center mb-4"
                                                                    key={index}
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <div className="w-8 h-full flex items-center justify-center">
                                                                        {!snapshot.isDragging && (
                                                                            <span>{index + 1}</span>
                                                                        )}
                                                                    </div>
                                                                    <div
                                                                        className={clsx(
                                                                            'flex-1 h-full border-2 p-2 bg-white flex items-center justify-center border-neutral-100 rounded ',
                                                                            'cursor-pointer transition-all duration-200 ease-in-out hover:border-neutral-300',
                                                                            {
                                                                                '!border-indigo-main': active,
                                                                            },
                                                                        )}
                                                                        onClick={() => setCurrentSlideId(slide.slideID)}
                                                                        style={{
                                                                            color: slide.textColor,
                                                                            background: slide.textBackground,
                                                                        }}
                                                                    >
                                                                        {renderOverviewSlide(slide)}
                                                                    </div>
                                                                </div>
                                                            );
                                                        }}
                                                    </Draggable>
                                                </ContextMenuTrigger>
                                                {/* @ts-ignore */}
                                                <ContextMenu id={'menu-context-' + slide.slideID}>
                                                    {/* @ts-ignore */}
                                                    <MenuItem onClick={() => handleDuplicateSlide(slide)}>
                                                        <BaseIcon type="duplicate" />
                                                        <div className="ml-3">Nhân đôi slide</div>
                                                    </MenuItem>
                                                    <Divider style={{ margin: '4px 0' }} />
                                                    {/* @ts-ignore */}
                                                    <MenuItem onClick={() => handleDeleteSlide(slide)}>
                                                        <BaseIcon type="delete-outlined" />
                                                        <div className="ml-3">Xóa slide</div>
                                                    </MenuItem>
                                                </ContextMenu>
                                            </>
                                        );
                                    })}
                                    {droppableProvided.placeholder}
                                </div>
                            );
                        }}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};

export default TemplateCreateSidebar;
