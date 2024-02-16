import _ from 'lodash';
import { BaseGridColDef } from '~/components/grid/BaseGrid';
import DateTimeUtil from '~/utils/DateTimeUtil';
import { PresentationDto } from '../types/presentation';

export const presentationGridColDef: BaseGridColDef[] = [
    {
        headerName: 'Mã',
        field: nameof.full<PresentationDto>(x => x.code),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 80,
        minWidth: 80,
        maxWidth: 80,
        resizable: false,
    },
    {
        headerName: 'Tên',
        field: nameof.full<PresentationDto>(x => x.name),
        minWidth: 200,
    },
    {
        headerName: 'Thời gian tạo',
        field: nameof.full<PresentationDto>(x => x.createdAt),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        resizable: false,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as PresentationDto;
            const { createdAt } = data;
            const createdAtFormatted = DateTimeUtil.formatDateTime(createdAt, DateTimeUtil.VN_DATE_TIME_FORMAT);
            return <div className="h-full flex items-center justify-center">{createdAtFormatted}</div>;
        },
    },
    {
        headerName: 'Thời gian cập nhật gần nhất',
        field: nameof.full<PresentationDto>(x => x.updatedAt),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        resizable: false,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as PresentationDto;
            const { updatedAt } = data;
            if (!updatedAt) return <></>;

            const updatedAtFormatted = DateTimeUtil.formatDateTime(updatedAt, DateTimeUtil.VN_DATE_TIME_FORMAT);
            return <div className="h-full flex items-center justify-center">{updatedAtFormatted}</div>;
        },
    },
];
