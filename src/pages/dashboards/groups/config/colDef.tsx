import _ from 'lodash';
import { BaseGridColDef } from '~/components/grid/BaseGrid';
import { GroupDto } from '../types/group';

export const groupGridColDef: BaseGridColDef[] = [
    {
        headerName: 'Tên',
        field: nameof.full<GroupDto>(x => x.name),
        minWidth: 200,
    },
    {
        headerName: 'Mã',
        field: nameof.full<GroupDto>(x => x.code),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 150,
        maxWidth: 200,
    },
    {
        headerName: 'Mô tả',
        field: nameof.full<GroupDto>(x => x.description),
        minWidth: 200,
        maxWidth: 150,
    },
    {
        headerName: 'Thời gian tạo',
        field: nameof.full<GroupDto>(x => x.createdAt),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 150,
        maxWidth: 150,
    },
    {
        headerName: 'Thời gian cập nhật gần nhất',
        field: nameof.full<GroupDto>(x => x.updatedAt),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 150,
        maxWidth: 150,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as GroupDto;
            const { updatedAt } = data;
            console.log('updatedAt: ', updatedAt)
            return <div className="h-full flex items-center justify-center">{updatedAt.toString()}</div>;
        },
    },
];
