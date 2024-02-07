import { Id } from '~/types/shared';

export interface ParticipantDto {
    participantID: Id;
    sessionID: Id;
    accountID?: Id;
    name: string;
}
