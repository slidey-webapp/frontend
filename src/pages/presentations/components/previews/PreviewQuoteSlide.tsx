import { styled } from '@mui/material/styles';
import _ from 'lodash';
import React, { CSSProperties, useMemo } from 'react';
import { PreviewFontSizeConstant } from '~/configs/constants';
import { ReactComponent as QuoteIcon } from '~/images/slide/quote.svg';
import { indigo } from '~/themes/colors';
import { HorizontalAlignment, TextSize, VerticalAlignment } from '~/types/shared';
import { IPresentationContext } from '../../PresentationDetailPage';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
    hover?: IPresentationContext['hover'];
}
const IconContainer = styled('div')({
    '& svg': {
        '& path': {
            fill: `${_.get(indigo, 'main', '#000000')}60`,
        },
    },
});

const PreviewQuoteSlide: React.FC<Props> = ({ slide, hover }) => {
    if (slide.type !== 'QUOTE') return null;

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
            };

        if (horAlign === HorizontalAlignment.Center)
            return {
                textAlign: 'center',
            };

        if (horAlign === HorizontalAlignment.Right)
            return {
                textAlign: 'right',
            };

        return {
            textAlign: 'left',
        };
    }, [slide.horizontalAlignment, hover]);

    const iconHorizontal = useMemo<CSSProperties | undefined>(() => {
        const horAlign = hover?.horizontalAlignment || slide.horizontalAlignment;

        if (horAlign === HorizontalAlignment.Left)
            return {
                left: '1.5cqw',
            };

        if (horAlign === HorizontalAlignment.Center)
            return {
                left: 'calc(50% - 2.5cqw)',
            };

        if (horAlign === HorizontalAlignment.Right)
            return {
                right: '1.5cqw',
            };

        return {
            left: '1.5cqw',
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
            <div className="relative">
                <div
                    className={'font-semibold z-10 relative'}
                    style={{
                        fontSize: headingSize,
                        ...horizontalAlignment,
                    }}
                >
                    {slide.quote}
                </div>
                {slide.author && (
                    <div
                        className="z-10 relative mt-10 italic"
                        style={{
                            fontSize: secondarySize,
                            ...horizontalAlignment,
                        }}
                    >
                        -{slide.author}
                    </div>
                )}
                <IconContainer>
                    <QuoteIcon
                        className="absolute"
                        style={{
                            top: '-1cqw',
                            width: '5cqw',
                            height: '5cqw',
                            ...iconHorizontal,
                        }}
                    />
                </IconContainer>
            </div>
        </div>
    );
};

export default PreviewQuoteSlide;
