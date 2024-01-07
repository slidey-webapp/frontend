import _ from 'lodash';
import { BaseGridColDef } from '~/components/grid/BaseGrid';
import { GroupDto } from '../types/group';
import DateTimeUtil from '~/utils/DateTimeUtil';

export const groupGridColDef: BaseGridColDef[] = [
    {
        headerName: 'Mã',
        field: nameof.full<GroupDto>(x => x.code),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 150,
    },
    {
        headerName: 'Tên',
        field: nameof.full<GroupDto>(x => x.name),
        minWidth: 200,
    },
    {
        headerName: 'Mô tả',
        field: nameof.full<GroupDto>(x => x.description),
        minWidth: 200,
    },
    {
        headerName: 'Thời gian tạo',
        field: nameof.full<GroupDto>(x => x.createdAt),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 150,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as GroupDto;
            const { createdAt } = data;
            const createdAtFormatted = DateTimeUtil.formatDateTime(createdAt,DateTimeUtil.VN_DATE_TIME_FORMAT );
            return <div className="h-full flex items-center justify-center">{createdAtFormatted}</div>;
        },
    },
    {
        headerName: 'Thời gian cập nhật gần nhất',
        field: nameof.full<GroupDto>(x => x.updatedAt),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 150,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as GroupDto;
            const { updatedAt } = data;
            const updatedAtFormatted = DateTimeUtil.formatDateTime(updatedAt,DateTimeUtil.VN_DATE_TIME_FORMAT );
            return <div className="h-full flex items-center justify-center">{updatedAtFormatted}</div>;
        },
    },
];
