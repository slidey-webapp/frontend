import { useState } from 'react';
import PresentationMain from '~/pages/presentations/components/PresentationMain';
import { PresentationContext } from '~/pages/presentations/PresentationDetailPage';
import { Id } from '~/types/shared';
import { SlideDto } from '~/pages/presentations/types/slide';
import { PresentationDto } from '~/pages/presentations/types/presentation';
interface PresentationViewerProps {
    presentation: PresentationDto & { slides?: SlideDto[] };
}

const PresentationViewer = ({ presentation }: PresentationViewerProps) => {
    const [currentSlideId, setCurrentSlideId] = useState<Id>(presentation.currentSlideID);
    return (
        <div className="base-grid rounded-none">
            <PresentationContext.Provider
                value={{
                    presentationID: presentation.presentationID as Id,
                    presentation: presentation,
                    slides: presentation.slides || [],
                    currentSlideId: currentSlideId,
                    collaborations: [],
                    usersOnline: [],
                    setCurrentSlideId: setCurrentSlideId,
                    backStep: 1,
                    hover: {} as any,
                    isOwner: true,
                    setHoverState: () => {
                        //
                    },
                    increaseBackStep: () => {
                        //
                    },
                    setState: () => {
                        //
                    },
                    mask: () => {
                        // do nothing
                    },
                    unmask: () => {
                        // do nothing
                    },
                    onUpdatePresentation: () => {
                        // do nothing
                        return new Promise(resolve => resolve());
                    },
                    onShowPresentation: () => {
                        // do nothing
                    },
                }}
            >
                <PresentationMain isReadonly />
            </PresentationContext.Provider>
        </div>
    );
};

export default PresentationViewer;
