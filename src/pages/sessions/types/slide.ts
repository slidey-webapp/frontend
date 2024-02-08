import { FullAuditedTimeDto, Id } from '~/types/shared';

export interface SlideDto extends FullAuditedTimeDto {
    slideID: Id;
    presentationID: Id;
    slideOrder: number;
    type: SlideType;

    // #region heading
    heading: string;
    subHeading: string;
    // #endregion

    // #region paragraph
    paragraph: string;
    // #endregion

    // #region multiple choice
    question: string;
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
