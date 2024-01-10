import { FullAuditedDto, Id } from '~/types/shared';

export interface PresentationDto extends FullAuditedDto {
    presentationID: Id;
    code:string;
    name:string;
    currentSlideID: Id;
    // todo: not working with session
    sessionID: Id;
}