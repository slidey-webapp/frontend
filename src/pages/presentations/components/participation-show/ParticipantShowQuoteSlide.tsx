import { motion } from 'framer-motion';
import React from 'react';
import { SlideDto } from '../../types/slide';
import { styled } from '@mui/material/styles';
import _ from 'lodash';
import { indigo } from '~/themes/colors';
import { ReactComponent as QuoteIcon } from '~/images/slide/quote.svg';

interface Props {
    slide: SlideDto;
}

const IconContainer = styled('div')({
    '& svg': {
        '& path': {
            fill: `${_.get(indigo, 'main', '#000000')}60`,
        },
    },
});

const ParticipantShowQuoteSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'QUOTE') return null;

    return (
        <div
            className="w-full h-full flex flex-col"
            style={{
                color: slide.textColor,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div className="w-fit h-fit overflow-hidden pt-10">
                <motion.div
                    className="relative"
                    initial={{
                        bottom: -300,
                        left: -200,
                        opacity: 0,
                    }}
                    animate={{
                        bottom: 0,
                        left: 0,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                >
                    <div
                        className={'font-semibold z-10 relative text-center'}
                        style={{
                            fontSize: 28,
                        }}
                    >
                        {slide.quote}
                    </div>
                    <IconContainer>
                        <QuoteIcon
                            className="absolute"
                            style={{
                                top: '-20px',
                                width: '80px',
                                height: '80px',
                                left: 'calc(50% - 40px)',
                            }}
                        />
                    </IconContainer>
                </motion.div>
            </div>
            <div className="h-fit overflow-hidden">
                {slide.author && (
                    <motion.div
                        className="relative"
                        initial={{
                            bottom: -100,
                            opacity: 0,
                        }}
                        animate={{
                            bottom: 0,
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                    >
                        <div
                            className="z-10 relative mt-10 italic"
                            style={{
                                fontSize: 18,
                            }}
                        >
                            -{slide.author}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ParticipantShowQuoteSlide;
