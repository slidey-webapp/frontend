import React, { CSSProperties, useState } from 'react';
import {
    DragDropContext,
    Draggable,
    Droppable,
    OnDragEndResponder
} from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import PresentationHeader from './components/PresentationHeader';
import PresentationMain from './components/PresentationMain';

interface Props {}



// a little function to help us with reordering the result




const PresentationDetailPage: React.FC<Props> = () => {
    const { presentationID }  = useParams<{presentationID:string}>();

  
    return (
        <div className='w-screen h-screen overflow-hidden flex flex-col select-none' style={{
            maxWidth: '100vw',
            maxHeight: '100vh'
        }}> 
            <PresentationHeader />
            <PresentationMain />

        </div>  
        // <div className='overflow-auto max-h-full'>
        //     <DragDropContext onDragEnd={onDragEnd}>
        //     <Droppable droppableId="droppable">
        //         {(provided, snapshot) => (
        //             <div
        //                 {...provided.droppableProps}
        //                 ref={provided.innerRef}
        //                 style={getListStyle(snapshot.isDraggingOver)}
        //             >
        //                 {items.map((item, index) => (
        //                     <Draggable key={item.id} draggableId={item.id} index={index}>
        //                         {(provided, snapshot) => (
        //                             <div
        //                                 ref={provided.innerRef}
        //                                 {...provided.draggableProps}
        //                                 {...provided.dragHandleProps}
        //                                 style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        //                             >
        //                                 {item.content}
        //                             </div>
        //                         )}
        //                     </Draggable>
        //                 ))}
        //                 {provided.placeholder}
        //             </div>
        //         )}
        //     </Droppable>
        // </DragDropContext>
        // </div>
    );
};

export default PresentationDetailPage;
