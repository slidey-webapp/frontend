import { motion } from 'framer-motion';
import React from 'react';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
}

const ParticipantShowBulletSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'BULLET_LIST') return null;

    return (
        <div
            className="w-full h-full flex flex-col"
            style={{
                color: slide.textColor,
            }}
        >
            <div
                className={'font-semibold mb-5'}
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
                            delay: i / 20,
                        }}
                        key={i}
                    >
                        {el}{' '}
                    </motion.span>
                ))}
            </div>
            <div className="w-fit">
                {slide.items?.map((item, index) => {
                    return (
                        <div
                            key={item.bulletListSlideItemID}
                            style={{
                                fontSize: 18,
                            }}
                            className="flex items-center"
                        >
                            <motion.li
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 2,
                                    delay: index / 3,
                                }}
                                key={index}
                                className="list-disc list-inside list"
                            >
                                {item.value}
                            </motion.li>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ParticipantShowBulletSlide;
