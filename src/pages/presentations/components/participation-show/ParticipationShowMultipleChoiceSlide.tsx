import clsx from 'clsx';
import { motion } from 'framer-motion';
import _ from 'lodash';
import React, { useState } from 'react';
import BaseIcon from '~/components/icons/BaseIcon';
import { requestApi } from '~/libs/axios';
import { indigo } from '~/themes/colors';
import { Id } from '~/types/shared';
import NotifyUtil from '~/utils/NotifyUtil';
import { SESSION_SLIDE_MULTIPLE_CHOICE_SUBMIT_API } from '../../api/presentation.api';
import { MultipleChoiceSlideOption, SlideDto } from '../../types/slide';
import AlreadyResponse from './AlreadyResponse';
import WaitingNextSlide from './WaitingNextSlide';

interface Props {
    slide: SlideDto;
    sessionID?: Id;
    participantID?: Id;
}

const ParticipationShowMultipleChoiceSlide: React.FC<Props> = ({ slide, participantID, sessionID }) => {
    if (slide.type !== 'MULTIPLE_CHOICE') return null;

    const isAnswered = slide.options?.some(opt =>
        _.get(opt, 'result', [])?.some(x => _.get(x, 'participantID') === participantID),
    );
    const [optSelected, setOptSelected] = useState<MultipleChoiceSlideOption | undefined>();
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (!optSelected) return;

        const response = await requestApi('post', SESSION_SLIDE_MULTIPLE_CHOICE_SUBMIT_API, {
            slideID: slide.slideID,
            option: optSelected.option,
            sessionID,
            participantID,
        });

        if (response.status === 200) {
            setIsSubmitted(true);
            return;
        }

        response.data.message && NotifyUtil.error(response.data.message);
    };

    const renderBody = () => {
        if (isAnswered) return <AlreadyResponse />;
        if (isSubmitted) return <WaitingNextSlide />;

        return (
            <>
                <div className="w-full flex flex-col gap-y-4">
                    {(slide.options || []).map(opt => {
                        const active = opt.optionID === optSelected?.optionID;

                        return (
                            <div
                                key={opt.optionID}
                                className={clsx(
                                    'w-full rounded-full border-2 border-neutral-200 h-16 flex items-center justify-between px-7',
                                    'text-neutral-500 hover:text-indigo-main',
                                    'cursor-pointer transition-all duration-150 ease-in-out hover:border-indigo-main',
                                    {
                                        '!border-indigo-main': active,
                                    },
                                )}
                                onClick={() => setOptSelected(opt)}
                            >
                                <div className="flex-1 line-clamp-1 !text-neutral-700">{opt.option}</div>
                                <div className="">
                                    <BaseIcon
                                        type={active ? 'radio-checked' : 'radio-unchecked'}
                                        size={24}
                                        style={{
                                            color: active ? _.get(indigo, 'main') : 'inherit',
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="w-full mt-7 flex justify-center">
                    <div
                        className={clsx(
                            'h-14 rounded-full flex items-center justify-center bg-neutral-700 text-white font-semibold',
                            'cursor-pointer transition-all duration-300 ease-in-out hover:bg-black',
                        )}
                        style={{
                            width: 100,
                        }}
                        onClick={handleSubmit}
                    >
                        Gửi
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div
                className="text-left mb-7"
                style={{
                    fontSize: 28,
                }}
            >
                {slide.question.split(' ').map((el, i) => (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 1,
                            delay: i / 10,
                        }}
                        key={i}
                    >
                        {el}{' '}
                    </motion.span>
                ))}
            </div>
            {renderBody()}
        </div>
    );
};

export default ParticipationShowMultipleChoiceSlide;
