import { AuditedDto, AuditedTimeDto } from '~/types/shared';

export interface GroupDto extends AuditedDto {
    groupID: number;
    name: string;
    code: string;
    description?: string;
}

export type GroupMemberRole = 'OWNER' | 'COOWNER' | 'MEMBER';

export interface GroupMemberDto extends AuditedTimeDto {
    groupMemberID: number;
    groupID: number;
    accountID: number;
    role: GroupMemberRole;
}
