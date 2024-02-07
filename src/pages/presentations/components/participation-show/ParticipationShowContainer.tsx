import React from 'react';
import { Id } from '~/types/shared';
import { SlideDto } from '../../types/slide';
import ParticipationShowHeadingSlide from './ParticipationShowHeadingSlide';
import ParticipationShowMultipleChoiceSlide from './ParticipationShowMultipleChoiceSlide';
import ParticipationShowParagraphSlide from './ParticipationShowParagraphSlide';

interface Props {
    slide: SlideDto;
    sessionID: Id;
    participantID: Id;
}

const ParticipationShowContainer: React.FC<Props> = ({ sessionID, participantID, slide }) => {
    const renderSlide = () => {
        switch (slide.type) {
            case 'HEADING':
                return <ParticipationShowHeadingSlide slide={slide} />;
            case 'PARAGRAPH':
                return <ParticipationShowParagraphSlide slide={slide} />;
            case 'MULTIPLE_CHOICE':
                return (
                    <ParticipationShowMultipleChoiceSlide
                        slide={slide}
                        participantID={participantID}
                        sessionID={sessionID}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div
            className="h-full"
            style={{
                maxWidth: 600,
                minWidth: 360,
                padding: 16,
            }}
        >
            {renderSlide()}
        </div>
    );
};

export default ParticipationShowContainer;
