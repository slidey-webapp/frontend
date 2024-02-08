import { FullAuditedDto, Id } from '~/types/shared';

export interface PresentationDto extends FullAuditedDto {
    presentationID: Id;
    code:string;
    name:string;
    currentSlideID: Id;
    sessionID?: Id;
}