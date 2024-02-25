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
}

export interface MultipleChoiceSlideOption {
    slideID: Id;
    optionID: Id;
    option: string;

    // display only
    chosenAmount?: number;
}

export type SlideType = 'HEADING' | 'PARAGRAPH' | 'MULTIPLE_CHOICE';
