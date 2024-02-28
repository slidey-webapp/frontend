import { motion } from 'framer-motion';
import React, { CSSProperties, useMemo } from 'react';
import { PreviewFontSizeConstant } from '~/configs/constants';
import { HorizontalAlignment, TextSize, VerticalAlignment } from '~/types/shared';
import { IPresentationContext } from '../../PresentationDetailPage';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
    hover?: IPresentationContext['hover'];
}

const PreviewWordCloudSlide: React.FC<Props> = ({ slide, hover }) => {
    if (slide.type !== 'WORD_CLOUD') return null;

    const verticalAlignment = useMemo<CSSProperties | undefined>(() => {
        const verAlign = hover?.verticalAlignment || slide.verticalAlignment;

        if (verAlign === VerticalAlignment.Top)
            return {
                justifyContent: 'flex-start',
            };

        if (verAlign === VerticalAlignment.Middle)
            return {
                justifyContent: 'center',
            };

        if (verAlign === VerticalAlignment.Bottom)
            return {
                justifyContent: 'flex-end',
            };

        return {
            justifyContent: 'flex-start',
        };
    }, [slide.verticalAlignment, hover]);

    const horizontalAlignment = useMemo<CSSProperties | undefined>(() => {
        const horAlign = hover?.horizontalAlignment || slide.horizontalAlignment;

        if (horAlign === HorizontalAlignment.Left)
            return {
                textAlign: 'left',
                justifyContent: 'flex-start',
            };

        if (horAlign === HorizontalAlignment.Center)
            return {
                textAlign: 'center',
                justifyContent: 'center',
            };

        if (horAlign === HorizontalAlignment.Right)
            return {
                textAlign: 'right',
                justifyContent: 'flex-end',
            };

        return {
            textAlign: 'left',
            justifyContent: 'flex-start',
        };
    }, [slide.horizontalAlignment, hover]);

    const { headingSize, secondarySize } = useMemo<{
        headingSize: string;
        secondarySize: string;
    }>(() => {
        switch (slide.textSize) {
            case TextSize.ExtraSmall:
                return {
                    headingSize: PreviewFontSizeConstant.HEADING_EXTRA_SMALL,
                    secondarySize: PreviewFontSizeConstant.SECONDARY_EXTRA_SMALL,
                };
            case TextSize.Small:
                return {
                    headingSize: PreviewFontSizeConstant.HEADING_SMALL,
                    secondarySize: PreviewFontSizeConstant.SECONDARY_SMALL,
                };
            case TextSize.Large:
                return {
                    headingSize: PreviewFontSizeConstant.HEADING_LARGE,
                    secondarySize: PreviewFontSizeConstant.SECONDARY_LARGE,
                };
            case TextSize.ExtraLarge:
                return {
                    headingSize: PreviewFontSizeConstant.HEADING_EXTRA_LARGE,
                    secondarySize: PreviewFontSizeConstant.SECONDARY_EXTRA_LARGE,
                };
            case TextSize.Medium:
            default:
                return {
                    headingSize: PreviewFontSizeConstant.HEADING_MEDIUM,
                    secondarySize: PreviewFontSizeConstant.SECONDARY_MEDIUM,
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
            <div
                className={'font-semibold mb-2'}
                style={{
                    fontSize: headingSize,
                    ...horizontalAlignment,
                }}
            >
                {slide.question.split(' ').map((el, i) => (
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
            <div
                style={{
                    fontSize: secondarySize,
                    ...horizontalAlignment,
                }}
                className="flex items-center"
            >
                <span className="mr-1">Chờ câu trả lời</span>
                <div className="dot-wave">
                    <span className="dot text-indigo-500">.</span>
                    <span className="dot text-indigo-500">.</span>
                    <span className="dot text-indigo-500">.</span>
                </div>
            </div>
        </div>
    );
};

export default PreviewWordCloudSlide;
