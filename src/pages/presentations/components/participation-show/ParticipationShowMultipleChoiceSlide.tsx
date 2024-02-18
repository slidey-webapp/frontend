import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import { requestApi } from '~/libs/axios';
import { Id } from '~/types/shared';
import NotifyUtil from '~/utils/NotifyUtil';
import { SESSION_SLIDE_MULTIPLE_CHOICE_SUBMIT_API } from '../../api/presentation.api';
import { MultipleChoiceSlideOption, SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
    sessionID?: Id;
    participantID?: Id;
}

const ParticipationShowMultipleChoiceSlide: React.FC<Props> = ({ slide, participantID, sessionID }) => {
    if (slide.type !== 'MULTIPLE_CHOICE') return null;

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
        if (isSubmitted)
            return (
                <div
                    className="mt-6 text-lg"
                    style={{
                        textShadow: '0px 2px 4px #000000',
                    }}
                >
                    Câu trả lời của bạn đã được ghi lại!
                </div>
            );

        return (
            <>
                <FormControl className="mt-6">
                    <RadioGroup>
                        {(slide.options || []).map(opt => {
                            return (
                                <FormControlLabel
                                    onChange={() => setOptSelected(opt)}
                                    key={opt.optionID}
                                    value={opt.optionID}
                                    control={<Radio />}
                                    label={opt.option}
                                />
                            );
                        })}
                    </RadioGroup>
                </FormControl>
                <ButtonBase
                    className="w-full h-10 flex items-center"
                    title="Gửi"
                    onClick={handleSubmit}
                    disabled={!optSelected}
                />
            </>
        );
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div
                className="text-left"
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
