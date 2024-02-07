import { FullAuditedTimeDto, Id } from '~/types/shared';

export type SessionStatus = 'STARTING' | 'STARTED' | 'ENDED';

export interface SessionDto extends FullAuditedTimeDto {
    sessionID: Id;
    presentationID: Id;
    host: Id; // accountID
    status: SessionStatus;
    groupID?: Id;
    name: string;
    code: string;
}
