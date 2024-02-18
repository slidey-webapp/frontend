import React, { useRef } from 'react';
import ButtonIconBase from '~/components/buttons/ButtonIconBase';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';
import { usePresentationJoinSessionContext } from '../../PresentationJoinSession';
import ParticipantSendMessage from './ParticipantSendMessage';
import ParticipantSendQuestion from './ParticipantSendQuestion';
import ParticipationShowHeadingSlide from './ParticipationShowHeadingSlide';
import ParticipationShowMultipleChoiceSlide from './ParticipationShowMultipleChoiceSlide';
import ParticipationShowParagraphSlide from './ParticipationShowParagraphSlide';

interface Props {}

const ParticipationShowContainer: React.FC<Props> = () => {
    const { sessionID, participantID ,slide} = usePresentationJoinSessionContext();
    const modalRef = useRef<ModalBaseRef>(null);

    const renderSlide = () => {
        if (!slide )return null;

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

    const handleOpenQuestionList = () => {
        modalRef.current?.onOpen(
            <ParticipantSendQuestion onClose={() => modalRef.current?.onClose()} />,
            'Câu hỏi từ người tham gia',
            '50%',
        );
    };

    const handleOpenMessageList = () => {
        modalRef.current?.onOpen(
            <ParticipantSendMessage onClose={() => modalRef.current?.onClose()} />,
            'Gửi tin nhắn',
            '50%',
        );
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
            <div className="h-full w-full flex flex-col">
                <div className="w-full h-fit">{renderSlide()}</div>
                <div className="flex-1 flex flex-col justify-end items-center">
                    <div className="flex items-center justify-center gap-x-2" style={{ minHeight: 80 }}>
                        <ButtonIconBase
                            icon={'message-outlined'}
                            tooltip="Gửi tin nhắn"
                            color={'primary'}
                            size="large"
                            onClick={handleOpenMessageList}
                        />
                        <ButtonIconBase
                            icon={'question-answer'}
                            tooltip="Mở Q&A"
                            color={'primary'}
                            size="large"
                            onClick={handleOpenQuestionList}
                        />
                    </div>
                </div>
            </div>
            <ModalBase ref={modalRef} className="!p-0" />
        </div>
    );
};

export default ParticipationShowContainer;
