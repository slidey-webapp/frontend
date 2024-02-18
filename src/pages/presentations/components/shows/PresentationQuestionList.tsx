import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import BaseIcon from '~/components/icons/BaseIcon';
import { requestApi } from '~/libs/axios';
import { Id } from '~/types/shared';
import DateTimeUtil from '~/utils/DateTimeUtil';
import NotifyUtil from '~/utils/NotifyUtil';
import { usePresentationShowContext } from '../../PresentationHostShow';
import { SESSION_QUESTION_MARK_AS_SOLVED_API } from '../../api/presentation.api';
import { QuestionDto } from '../../types/question';

interface Props {
    sessionID: Id;
}

const PresentationQuestionList: React.FC<Props> = ({ sessionID }) => {
    const { questions } = usePresentationShowContext();

    const markAsSolved = async ({ questionID, isAnswered }: { questionID: Id; isAnswered: boolean }) => {
        if (isAnswered) return;

        const response = await requestApi<QuestionDto>('post', SESSION_QUESTION_MARK_AS_SOLVED_API, {
            questionID,
            sessionID,
        });

        if (response.status === 200) return;

        response.data.message && NotifyUtil.error(response.data.message);
    };

    return (
        <div className="">
            {questions.map((question, index) => {
                return (
                    <div
                        key={question.questionID}
                        className={clsx({
                            'mb-4': index < questions.length - 1,
                            'text-neutral-500 font-normal': question.isAnswered,
                            'text-indigo-main': !question.isAnswered,
                        })}
                    >
                        <div
                            className={clsx('py-2 px-4 mb-2 flex', {
                                'text-neutral-500 font-normal cursor-default': question.isAnswered,
                                'text-indigo-main cursor-pointer': !question.isAnswered,
                            })}
                            style={{
                                boxShadow: 'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
                                borderRadius: 20,
                            }}
                            onClick={() =>
                                markAsSolved({
                                    isAnswered: question.isAnswered,
                                    questionID: question.questionID,
                                })
                            }
                        >
                            <div className="flex w-9 h-full">
                                <div className="h-fit flex flex-col items-center pt-1">
                                    <BaseIcon type="thumb-up-alt" size={18} />
                                    <span className="text-sm">{question.totalVoted}</span>
                                </div>
                            </div>
                            <div className="flex flex-1">
                                <div className="flex-1">{question.content}</div>
                                {!question.isAnswered && (
                                    <div className="w-5 flex justify-end">
                                        <div className="w-fit h-6">
                                            <BaseIcon type="dot" size={12} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="px-4 text-xs">
                            {moment.utc(question.createdAt, DateTimeUtil.DATE_TIME_FORMAT).fromNow()}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PresentationQuestionList;
