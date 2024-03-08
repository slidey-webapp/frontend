import { FullAuditedDto, Id } from '~/types/shared';

export interface RoleDto extends FullAuditedDto {
    roleID: Id;
    name: string;
    code: string;
    accountRoles: AccountRoleDto[];
}

export interface RoleCreateDto extends Pick<RoleDto, 'code' | 'name'> {}

export interface AccountRoleDto {
    accountRoleID: Id;
    accountID: Id;
    roleID: Id;
}
