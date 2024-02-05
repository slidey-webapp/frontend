import { motion } from 'framer-motion';
import React from 'react';
import { ShowFontSizeConstant } from '~/configs/constants';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
}

const ShowParagraphSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'PARAGRAPH') return null;

    const paragraph = slide.paragraph?.replace(/\n/g, '<br>');

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div
                className="font-semibold mb-2 text-center"
                style={{
                    fontSize: ShowFontSizeConstant.HEADING,
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
                className="text-center"
                style={{
                    fontSize: ShowFontSizeConstant.PARAGRAPH,
                }}
            >
                {paragraph.split('<br>').map((el, i) => (
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

export default ShowParagraphSlide;
