import { Id } from '~/types/shared';

export interface CollaborationDto {
    collaborationID: Id;
    accountID: Id;
    presentationID: Id;
    fullname: string;
    email: string;
}
