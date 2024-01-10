import clsx from 'clsx';
import _ from 'lodash';
import React, { useContext } from 'react';
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import { IPresentationContext, PresentationContext } from '../PresentationDetailPage';
import { SlideDto } from '../types/slide';
import NewSlidePattern from './NewSlidePattern';

interface Props {}

const reorder = (list: SlideDto[], startIndex: number, endIndex: number) => {
    const slides = _.cloneDeep(list);
    const [removed] = slides.splice(startIndex, 1);
    slides.splice(endIndex, 0, removed);

    return slides.map((slide, index) => ({ ...slide, slideOrder: index + 1 }));
};

const PresentationSidebar: React.FC<Props> = () => {
    const { presentation, slides, onUpdatePresentation } = useContext<IPresentationContext>(PresentationContext);

    const onDragEnd: OnDragEndResponder = result => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const newSlides = reorder(slides, result.source.index, result.destination.index);

        onUpdatePresentation({
            name: presentation.name,
            slides: newSlides,
        });
    };

    return (
        <div className="w-44 h-full overflow-hidden flex flex-col">
            <div className="w-full h-14 flex items-center px-4">
                <NewSlidePattern />
            </div>
            <div className="flex-1 w-full overflow-x-hidden overflow-y-auto pr-4">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {droppableProvided => {
                            return (
                                <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                                    {slides.map((slide, index) => (
                                        <Draggable
                                            key={slide.slideID}
                                            draggableId={slide.slideID.toString()}
                                            index={index}
                                        >
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
                                                            {!snapshot.isDragging && <span>{index + 1}</span>}
                                                        </div>
                                                        <div
                                                            className={clsx(
                                                                'flex-1 h-full border-2 p-2 bg-white flex items-center justify-center border-neutral-100 rounded ',
                                                                'cursor-pointer transition-all duration-200 ease-in-out hover:border-neutral-300',
                                                                {
                                                                    '!border-indigo-main': slide.slideID === 'item-2',
                                                                },
                                                            )}
                                                        >
                                                            {slide.slideID}
                                                        </div>
                                                    </div>
                                                );
                                            }}
                                        </Draggable>
                                    ))}
                                    {droppableProvided.placeholder}
                                </div>
                            );
                        }}
                    </Droppable>
                </DragDropContext>
                {/* {Array(10)
                    .fill(0)
                    .map((x, index) => {
                        const active = index === 2;

                        return (
                            
                        );
                    })} */}
            </div>
        </div>
    );
};

export default PresentationSidebar;
