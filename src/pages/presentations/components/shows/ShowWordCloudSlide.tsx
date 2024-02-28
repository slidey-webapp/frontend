import React, { CSSProperties, useMemo } from 'react';
import ReactWordcloud from 'react-wordcloud';
import { ShowFontSizeConstant } from '~/configs/constants';
import { HorizontalAlignment, TextSize, VerticalAlignment } from '~/types/shared';
import { SlideDto } from '../../types/slide';
import _ from 'lodash';

interface Props {
    slide: SlideDto;
}

const ShowWordCloudSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'WORD_CLOUD') return null;

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

    const renderWordCloud = () => {
        if (!slide.words || slide.words.length === 0)
            return (
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
            );

        const wordGrouped: Record<string, number> = _.reduce(
            slide.words,
            (acc, val) => {
                // @ts-ignore
                acc[val] = (acc[val] || 0) + 1;
                return acc;
            },
            {},
        );

        const words = Object.keys(wordGrouped).map(key => {
            return {
                text: key,
                value: wordGrouped[key],
            };
        });

        return (
            <div className="flex-1 h-full">
                <ReactWordcloud
                    words={words}
                    options={{
                        fontSizes: [28, 72],
                    }}
                />
            </div>
        );
    };

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
                {slide.question}
            </div>
            {renderWordCloud()}
        </div>
    );
};

export default ShowWordCloudSlide;
