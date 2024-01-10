import { FullAuditedTimeDto, Id } from '~/types/shared';

export interface SlideDto extends FullAuditedTimeDto {
    slideID: Id;
    presentationID: Id;
    slideOrder: number;
    type: SlideType;
}

export type SlideType = 'HEADING' | 'PARAGRAPH' | 'MULTIPLE_CHOICE';
