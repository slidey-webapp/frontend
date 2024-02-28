import { FormControl, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import { requestApi } from '~/libs/axios';
import { Id } from '~/types/shared';
import NotifyUtil from '~/utils/NotifyUtil';
import { SESSION_SLIDE_MULTIPLE_CHOICE_SUBMIT_API } from '../../api/presentation.api';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
    sessionID?: Id;
    participantID?: Id;
}

const ParticipantShowWordCloudSlide: React.FC<Props> = ({ slide, participantID, sessionID }) => {
    if (slide.type !== 'WORD_CLOUD') return null;

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [value, setValue] = useState<string | null>(null);

    useEffect(() => {
        setIsSubmitted(false);
    }, [slide.slideID]);

    const handleSubmit = async () => {
        if (!value) return;

        const response = await requestApi('post', SESSION_SLIDE_MULTIPLE_CHOICE_SUBMIT_API, {
            slideID: slide.slideID,
            option: value,
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
            <div className="mt-6">
                <TextField
                    variant="outlined"
                    label="Nhập một từ"
                    onChange={event => setValue(event.target.value)}
                    fullWidth
                />
                <div className="w-full mt-4">
                    <ButtonBase
                        className="w-full h-10 flex items-center "
                        title="Gửi"
                        onClick={handleSubmit}
                        disabled={!value}
                    />
                </div>
            </div>
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

export default ParticipantShowWordCloudSlide;
