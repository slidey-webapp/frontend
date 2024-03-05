import { BaseGridColDef } from '~/components/grid/BaseGrid';
import { RoleDto } from '../types/role';

export const roleGridColDef: BaseGridColDef[] = [
    {
        headerName: 'Mã vai trò',
        field: nameof.full<RoleDto>(x => x.code),
        width: 200,
        minWidth: 200,
        maxWidth: 200,
        resizable: false,
    },
    {
        headerName: 'Tên vai trò',
        field: nameof.full<RoleDto>(x => x.name),
        minWidth: 200,
    },
];
