import React, { CSSProperties, useMemo } from 'react';
import { PreviewFontSizeConstant } from '~/configs/constants';
import { HorizontalAlignment, TextSize, VerticalAlignment } from '~/types/shared';
import { IPresentationContext } from '../../PresentationDetailPage';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
    hover?: IPresentationContext['hover'];
}

const PreviewBulletSlide: React.FC<Props> = ({ slide, hover }) => {
    if (slide.type !== 'BULLET_LIST') return null;

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
                {slide.heading}
            </div>
            <ul className="w-fit">
                {slide.items?.map(item => {
                    return (
                        <li
                            key={item.bulletListSlideItemID}
                            style={{
                                fontSize: secondarySize,
                            }}
                            className="list-disc list-inside list"
                        >
                            {item.value}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default PreviewBulletSlide;
