import { FullAuditedDto, Id } from '~/types/shared';
import { CollaborationDto } from './collaboration';

export interface PresentationDto extends FullAuditedDto {
    presentationID: Id;
    code:string;
    name:string;
    currentSlideID: Id;
    sessionID?: Id;
    collaborators?: CollaborationDto[]
}