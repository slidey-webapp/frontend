import { FullAuditedDto, Id } from '~/types/shared';

export interface RoleDto extends FullAuditedDto {
    roleID: Id;
    name: string;
    code: string;
}

export interface RoleCreateDto extends Pick<RoleDto, 'code' | 'name'> {}
