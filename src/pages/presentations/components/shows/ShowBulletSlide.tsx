import { motion } from 'framer-motion';
import React, { CSSProperties, useMemo } from 'react';
import { ShowFontSizeConstant } from '~/configs/constants';
import { HorizontalAlignment, TextSize, VerticalAlignment } from '~/types/shared';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
}

const ShowBulletSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'BULLET_LIST') return null;

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

        return {
            justifyContent: 'flex-start',
        };
    }, [slide.verticalAlignment]);

    const horizontalAlignment = useMemo<CSSProperties | undefined>(() => {
        const horAlign = slide.horizontalAlignment;

        if (horAlign === HorizontalAlignment.Left)
            return {
                alignItems: 'flex-start',
                textAlign: 'left',
            };

        if (horAlign === HorizontalAlignment.Center)
            return {
                alignItems: 'center',
                textAlign: 'center',
            };

        if (horAlign === HorizontalAlignment.Right)
            return {
                alignItems: 'flex-end',
                textAlign: 'right',
            };

        return {
            textAlign: 'left',
            alignItems: 'flex-start',
        };
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

    return (
        <div
            className="w-full h-full flex flex-col"
            style={{
                color: slide.textColor,
                ...verticalAlignment,
                ...horizontalAlignment,
            }}
        >
            <div
                className={'font-semibold mb-5'}
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
                                fontSize: secondarySize,
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
                                className="list-disc list-inside list"
                                key={index}
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

export default ShowBulletSlide;
