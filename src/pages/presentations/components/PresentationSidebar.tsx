import clsx from 'clsx';
import React, { CSSProperties, useState } from 'react';
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import { ButtonBase } from '~/components/buttons/ButtonBase';

interface Props {}

interface Item {
    id: string;
    content: string;
}

const getItems = (count: number): Item[] =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`,
    }));

const reorder = (list: Item[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const PresentationSidebar: React.FC<Props> = props => {
    const handleCreateSlide = () => {
        console.log('handleCreateSlide');
    };

    const [items, setItems] = useState<Item[]>(getItems(5));

    const onDragEnd: OnDragEndResponder = result => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const newItems = reorder(items, result.source.index, result.destination.index);

        setItems(newItems);
    };

    return (
        <div className="w-44 h-full overflow-hidden flex flex-col">
            <div className="w-full h-14 flex items-center px-4">
                <ButtonBase
                    onClick={handleCreateSlide}
                    color={'success'}
                    title="Tạo mới"
                    startIcon={'add'}
                    className="w-full"
                />
            </div>
            <div className="flex-1 w-full overflow-x-hidden overflow-y-auto pr-4">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(droppableProvided) => {
                            return (
                                <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                                    {items.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
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
                                                                    '!border-indigo-main': item.id === 'item-2',
                                                                },
                                                            )}
                                                        >
                                                            {item.content}
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
