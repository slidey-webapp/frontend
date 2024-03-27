import { Divider } from '@mui/material';
import React, { useRef } from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import ButtonIconBase from '~/components/buttons/ButtonIconBase';
import BaseForm, { BaseFormRef } from '~/components/forms/BaseForm';
import Empty from '~/components/layouts/Empty';
import { requestApi } from '~/libs/axios';
import { Id } from '~/types/shared';
import NotifyUtil from '~/utils/NotifyUtil';
import { usePresentationJoinSessionContext } from '../../PresentationJoinSession';
import { SESSION_QUESTION_SEND_API, SESSION_QUESTION_UPVOTE_API } from '../../api/presentation.api';

interface Props {
    onClose: () => void;
}

const ParticipantSendQuestion: React.FC<Props> = () => {
    const { questions, sessionID, participantID } = usePresentationJoinSessionContext();

    const formRef = useRef<BaseFormRef>(null);

    const handleSubmit = async ({ content }: { content: string }) => {
        const response = await requestApi('post', SESSION_QUESTION_SEND_API, {
            sessionID,
            participantID,
            content,
        });

        if (response.status === 200) {
            formRef.current?.setValue('content', '');
            return;
        }

        response.data.message && NotifyUtil.error(response.data.message);
    };

    const handleUpVote = async (questionID: Id) => {
        const response = await requestApi('post', SESSION_QUESTION_UPVOTE_API, {
            sessionID,
            participantID,
            questionID,
        });

        if (response.status === 200) {
            return;
        }

        response.data.message && NotifyUtil.error(response.data.message);
    };

    const renderBody = () => {
        if (!questions || questions.length === 0) {
            return <Empty className='my-6' />;
        }

        return (
            questions.length > 0 && (
                <div className="flex flex-col gap-y-2 px-6 pt-2">
                    {questions.map((question, index) => {
                        const isVoted = question.votes.some(vote => vote.participantID === participantID);

                        return (
                            <>
                                <div className="flex" key={question.questionID + '-content'}>
                                    <div className="flex-1">
                                        {question.participantID === participantID && (
                                            <div className="mb-1">
                                                <div className="py-1 px-2.5 w-fit rounded-full bg-blue-200 text-xs">
                                                    Câu hỏi của bạn
                                                </div>
                                            </div>
                                        )}
                                        <div>{question.content}</div>
                                    </div>
                                    <div className="w-14 h-fit flex flex-col gap-y-1 items-center">
                                        <ButtonIconBase
                                            icon={isVoted ? 'thumb-up-alt' : 'thumb-up-alt-outlined'}
                                            color={'primary'}
                                            size="medium"
                                            onClick={isVoted ? undefined : () => handleUpVote(question.questionID)}
                                        />
                                        <div>{question.totalVoted}</div>
                                    </div>
                                </div>
                                {index !== questions.length - 1 && <Divider key={question.questionID + '-divider'} />}
                            </>
                        );
                    })}
                </div>
            )
        );
    };

    return (
        <div className="relative">
            {renderBody()}
            <BaseForm
                className="sticky bottom-0 p-6 pt-3 bg-white"
                ref={formRef}
                onSubmit={handleSubmit}
                fields={[
                    {
                        name: 'content',
                        classNameCol: 'col-span-12',
                        label: 'Nội dung câu hỏi',
                        type: 'text',
                        required: true,
                    },
                ]}
                buttons={{
                    submitButton: <ButtonBase type="submit" title="Gửi" startIcon="send" className="!mx-1" />,
                }}
            />
        </div>
    );
};

export default ParticipantSendQuestion;
