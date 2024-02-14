import { Id } from '~/types/shared';
import { ParticipantDto } from './participant';

export interface MessageDto {
    participantID: Id;
    messageID: Id;
    sessionID: Id;
    content: string;
    sender: ParticipantDto;
    createdAt: Date;
}
