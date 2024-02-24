import { motion } from 'framer-motion';
import React, { CSSProperties, useMemo } from 'react';
import { ShowFontSizeConstant } from '~/configs/constants';
import { HorizontalAlignment, TextSize, VerticalAlignment } from '~/types/shared';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
}

const ShowParagraphSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'PARAGRAPH') return null;

    const verticalAlignment = useMemo<CSSProperties | undefined>(() => {
        if (slide.verticalAlignment === VerticalAlignment.Top)
            return {
                justifyContent: 'flex-start',
            };

        if (slide.verticalAlignment === VerticalAlignment.Middle)
            return {
                justifyContent: 'center',
            };

        if (slide.verticalAlignment === VerticalAlignment.Bottom)
            return {
                justifyContent: 'flex-end',
            };

        return undefined;
    }, [slide.verticalAlignment]);

    const horizontalAlignment = useMemo<CSSProperties | undefined>(() => {
        if (slide.horizontalAlignment === HorizontalAlignment.Left)
            return {
                textAlign: 'left',
            };

        if (slide.horizontalAlignment === HorizontalAlignment.Center)
            return {
                textAlign: 'center',
            };

        if (slide.horizontalAlignment === HorizontalAlignment.Right)
            return {
                textAlign: 'right',
            };

        return undefined;
    }, [slide.horizontalAlignment]);

    const { headingSize, secondarySize } = useMemo<{
        headingSize: string;
        secondarySize: string;
    }>(() => {
        switch (slide.textSize) {
            case TextSize.ExtraSmall:
                return {
                    headingSize: ShowFontSizeConstant.HEADING_EXTRA_SMALL,
                    secondarySize: ShowFontSizeConstant.SECONDARY_EXTRA_SMALL,
                };
            case TextSize.Small:
                return {
                    headingSize: ShowFontSizeConstant.HEADING_SMALL,
                    secondarySize: ShowFontSizeConstant.SECONDARY_SMALL,
                };
            case TextSize.Large:
                return {
                    headingSize: ShowFontSizeConstant.HEADING_LARGE,
                    secondarySize: ShowFontSizeConstant.SECONDARY_LARGE,
                };
            case TextSize.ExtraLarge:
                return {
                    headingSize: ShowFontSizeConstant.HEADING_EXTRA_LARGE,
                    secondarySize: ShowFontSizeConstant.SECONDARY_EXTRA_LARGE,
                };
            case TextSize.Medium:
            default:
                return {
                    headingSize: ShowFontSizeConstant.HEADING_MEDIUM,
                    secondarySize: ShowFontSizeConstant.SECONDARY_MEDIUM,
                };
        }
    }, [slide.textSize]);

    const paragraph = slide.paragraph?.replace(/\n/g, '<br>');

    return (
        <div
            className="w-full h-full flex flex-col"
            style={{
                color: slide.textColor,
                ...verticalAlignment,
            }}
        >
            <div
                className={'font-semibold mb-2'}
                style={{
                    fontSize: headingSize,
                    ...horizontalAlignment,
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
                    fontSize: secondarySize,
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
