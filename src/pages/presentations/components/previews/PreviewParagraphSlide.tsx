import clsx from 'clsx';
import React, { CSSProperties, useMemo } from 'react';
import { PreviewFontSizeConstant } from '~/configs/constants';
import { HorizontalAlignment, TextSize, VerticalAlignment } from '~/types/shared';
import { IPresentationContext } from '../../PresentationDetailPage';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
    hover?: IPresentationContext['hover'];
}

const PreviewParagraphSlide: React.FC<Props> = ({ slide, hover }) => {
    if (slide.type !== 'PARAGRAPH') return null;

    const paragraph = slide.paragraph?.replace(/\n/g, '<br>');

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

        return undefined;
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

        return undefined;
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
                className={clsx('font-semibold mb-2', {})}
                style={{
                    fontSize: headingSize,
                    ...horizontalAlignment,
                }}
            >
                {slide.heading}
            </div>
            <div
                style={{
                    fontSize: secondarySize,
                    ...horizontalAlignment,
                }}
                dangerouslySetInnerHTML={{
                    __html: paragraph,
                }}
            />
        </div>
    );
};

export default PreviewParagraphSlide;
