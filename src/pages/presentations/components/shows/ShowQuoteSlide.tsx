import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import _ from 'lodash';
import React, { CSSProperties, useMemo } from 'react';
import { ShowFontSizeConstant } from '~/configs/constants';
import { ReactComponent as QuoteIcon } from '~/images/slide/quote.svg';
import { indigo } from '~/themes/colors';
import { HorizontalAlignment, TextSize, VerticalAlignment } from '~/types/shared';
import { SlideDto } from '../../types/slide';

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

const ShowQuoteSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'QUOTE') return null;

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

        return {
            textAlign: 'left',
        };
    }, [slide.horizontalAlignment]);

    const iconHorizontal = useMemo<CSSProperties | undefined>(() => {
        const horAlign = slide.horizontalAlignment;

        if (horAlign === HorizontalAlignment.Left)
            return {
                left: '20px',
            };

        if (horAlign === HorizontalAlignment.Center)
            return {
                left: 'calc(50% - 75px)',
            };

        if (horAlign === HorizontalAlignment.Right)
            return {
                right: '20px',
            };

        return {
            left: '20px',
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
                        className={'font-semibold z-10 relative'}
                        style={{
                            fontSize: headingSize,
                            ...horizontalAlignment,
                        }}
                    >
                        {slide.quote}
                    </div>

                    <IconContainer>
                        <QuoteIcon
                            className="absolute"
                            style={{
                                top: '-30px',
                                width: '150px',
                                height: '150px',
                                ...iconHorizontal,
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
                                fontSize: secondarySize,
                                ...horizontalAlignment,
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

export default ShowQuoteSlide;
