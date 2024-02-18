import { FullAuditedTimeDto, Id } from '~/types/shared';
import { ParticipantDto } from './participant';

export interface MessageDto extends FullAuditedTimeDto {
    messageID: Id;
    sessionID: Id;
    participantID: Id;
    content: string;
    sender: ParticipantDto
}
