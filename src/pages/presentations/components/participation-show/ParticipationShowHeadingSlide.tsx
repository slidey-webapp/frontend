import { motion } from 'framer-motion';
import React from 'react';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
}

const ParticipationShowHeadingSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'HEADING') return null;

    const subHeading = slide.subHeading?.replace(/\n/g, '<br>');

    return (
        <div className="w-full h-full flex flex-col">
            <div
                className="text-left"
                style={{
                    fontSize: 28,
                }}
            >
                {slide.heading.split(' ').map((el, i) => (
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
            <div
                style={{
                    fontSize: 18,
                }}
                className="mt-6"
            >
                {subHeading.split('<br>').map((el, i) => (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.1,
                            delay: i / 10,
                        }}
                        key={i}
                    >
                        {el}
                        <br />
                    </motion.span>
                ))}
            </div>
        </div>
    );
};

export default ParticipationShowHeadingSlide;
