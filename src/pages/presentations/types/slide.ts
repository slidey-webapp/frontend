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

     // #region heading
     paragraph: string;
     // #endregion
}

export type SlideType = 'HEADING' | 'PARAGRAPH' | 'MULTIPLE_CHOICE';
