import { ChartType, FullAuditedTimeDto, HorizontalAlignment, Id, TextSize, VerticalAlignment } from '~/types/shared';

export interface SlideDto extends FullAuditedTimeDto {
    slideID: Id;
    presentationID: Id;
    slideOrder: number;
    type: SlideType;
    horizontalAlignment: HorizontalAlignment;
    verticalAlignment: VerticalAlignment;
    textSize: TextSize;
    textColor: string;
    textBackground: string;
    mediaID?: Id;
    mediaURL?: string;
    layout?: SlideLayout;

    // #region heading
    heading: string;
    subHeading: string;
    // #endregion

    // #region paragraph
    paragraph: string;
    // #endregion

    // #region multiple choice
    question: string;
    chartType: ChartType;
    options: MultipleChoiceSlideOption[];
    // #endregion

    // #region quote
    quote: string;
    author: string;
    // #endregion

    // #region bullets
    items: BulletSlideItem[];
    // #endregion

    // #region word cloud
    words: string[];
    // #endregion
}

export enum SlideLayout {
    Default = 'Default',
    ImageFull = 'ImageFull',
    ImageLeft = 'ImageLeft',
    ImageRight = 'ImageRight',
    ImageTop = 'ImageTop',
    ImageBottom = 'ImageBottom',
    ImageSideLeft = 'ImageSideLeft',
    ImageSideRight = 'ImageSideRight',
}

export interface MultipleChoiceSlideOption {
    slideID: Id;
    optionID: Id;
    option: string;

    // display only
    chosenAmount?: number;
}

export interface BulletSlideItem {
    slideID: Id;
    bulletListSlideItemID: Id;
    value: string;
}

export type SlideType = 'HEADING' | 'PARAGRAPH' | 'MULTIPLE_CHOICE' | 'QUOTE' | 'BULLET_LIST' | 'WORD_CLOUD';
