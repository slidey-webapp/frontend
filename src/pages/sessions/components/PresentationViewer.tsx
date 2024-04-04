import { useState } from 'react';
import { PresentationContext } from '~/pages/presentations/PresentationDetailPage';
import PresentationMain from '~/pages/presentations/components/PresentationMain';
import { PresentationDto } from '~/pages/presentations/types/presentation';
import { SlideDto } from '~/pages/presentations/types/slide';
import { Id } from '~/types/shared';
interface PresentationViewerProps {
    presentation: PresentationDto & { slides?: SlideDto[] };
}

const PresentationViewer = ({ presentation }: PresentationViewerProps) => {
    const [currentSlideId, setCurrentSlideId] = useState<Id>(presentation.currentSlideID);
    return (
        <div className="base-grid rounded-none">
            <PresentationContext.Provider
                // @ts-ignore
                value={{
                    presentationID: presentation.presentationID as Id,
                    presentation: presentation,
                    slides: presentation.slides || [],
                    currentSlideId: currentSlideId,
                    collaborations: [],
                    usersOnline: [],
                    setCurrentSlideId: setCurrentSlideId,
                    hover: {} as any,
                    isOwner: true,
                    setHoverState: () => {
                        //
                    },
                    previousRoute: '',
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
                    },
                    onShowPresentation: () => {
                        // do nothing
                    },
                    fetchUpdatePresentation: () => {
                        //
                        return Promise.resolve();
                    },
                }}
            >
                <PresentationMain isReadonly />
            </PresentationContext.Provider>
        </div>
    );
};

export default PresentationViewer;
