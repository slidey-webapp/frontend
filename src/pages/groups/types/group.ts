import { FullAuditedDto, AuditedTimeDto } from '~/types/shared';

export interface GroupDto extends FullAuditedDto {
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
    fullname: string;
    email: string;
}

export interface GroupCreateDto extends Pick<GroupDto, 'name' | 'description'> {}

export interface GroupInvitationDto {
    groupID: number;
    email: string;
}
