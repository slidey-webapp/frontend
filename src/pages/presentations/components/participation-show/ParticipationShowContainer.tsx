import clsx from 'clsx';
import React, { useRef } from 'react';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';
import logoSrc from '~/images/logo.png';
import { usePresentationJoinSessionContext } from '../../PresentationJoinSession';
import ParticipantSendMessage from './ParticipantSendMessage';
import ParticipantSendQuestion from './ParticipantSendQuestion';
import ParticipantShowBulletSlide from './ParticipantShowBulletSlide';
import ParticipantShowQuoteSlide from './ParticipantShowQuoteSlide';
import ParticipantShowWordCloudSlide from './ParticipantShowWordCloudSlide';
import ParticipationShowHeadingSlide from './ParticipationShowHeadingSlide';
import ParticipationShowMultipleChoiceSlide from './ParticipationShowMultipleChoiceSlide';
import ParticipationShowParagraphSlide from './ParticipationShowParagraphSlide';

interface Props {}

const ParticipationShowContainer: React.FC<Props> = () => {
    const { sessionID, participantID, slide } = usePresentationJoinSessionContext();
    const modalRef = useRef<ModalBaseRef>(null);

    const renderSlide = () => {
        if (!slide) return null;

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
                        key={slide.slideID}
                    />
                );
            case 'QUOTE':
                return <ParticipantShowQuoteSlide slide={slide} />;
            case 'WORD_CLOUD':
                return (
                    <ParticipantShowWordCloudSlide slide={slide} participantID={participantID} sessionID={sessionID} />
                );
            case 'BULLET_LIST':
                return <ParticipantShowBulletSlide slide={slide} />;
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
        <div className="w-full h-full flex flex-col">
            <div className="w-full mt-6 mb-8 flex items-center justify-center">
                <img
                    src={logoSrc}
                    style={{
                        objectFit: 'cover',
                        height: 40,
                    }}
                />
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex justify-center">
                <div
                    className="h-full"
                    style={{
                        width: 600,
                        padding: 16,
                    }}
                >
                    <div className="h-full w-full flex flex-col gap-y-6">
                        {slide?.mediaURL && (
                            <div
                                className="w-full aspect-square rounded-lg overflow-hidden"
                                style={{
                                    minHeight: 350,
                                }}
                            >
                                <img
                                    src={slide?.mediaURL}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                    }}
                                />
                            </div>
                        )}
                        <div className="w-full h-fit">{renderSlide()}</div>
                        <div className="flex-1 flex flex-col justify-end items-center">
                            <div className="w-full">
                                <div
                                    className={clsx(
                                        'mb-4 w-full h-14 flex items-center justify-center rounded-full bg-neutral-50 text-neutral-600 font-semibold',
                                        'cursor-pointer transition-all duration-300 ease-in-out hover:bg-neutral-100',
                                    )}
                                    onClick={handleOpenMessageList}
                                >
                                    Gửi tin nhắn
                                </div>
                                <div
                                    className={clsx(
                                        'w-full h-14 flex items-center justify-center rounded-full bg-neutral-50 text-neutral-600 font-semibold',
                                        'cursor-pointer transition-all duration-300 ease-in-out hover:bg-neutral-100',
                                    )}
                                    onClick={handleOpenQuestionList}
                                >
                                    Mở Q&A
                                </div>
                            </div>
                            <div className="mt-6 text-neutral-500 text-center">
                                Tạo bài trình chiếu của riêng bạn tại{' '}
                                <a
                                    href={`${window.location.origin}/dashboard/presentation`}
                                    target="_blank"
                                    className={clsx(
                                        'border-b border-neutral-700 text-neutral-700',
                                        'transition-all duration-300 ease-in-out hover:text-neutral-500 hover:border-neutral-500',
                                    )}
                                >
                                    {window.location.origin}
                                </a>
                            </div>
                            <div className="w-full h-10" />
                        </div>
                    </div>
                    <ModalBase ref={modalRef} className="!p-0" />
                </div>
            </div>
        </div>
    );
};

export default ParticipationShowContainer;
