import _ from 'lodash';
import { BaseGridColDef } from '~/components/grid/BaseGrid';
import DateTimeUtil from '~/utils/DateTimeUtil';

import { SessionDto } from '../types/session';

export const sessionGridColDef: BaseGridColDef[] = [
    {
        headerName: 'Mã',
        field: nameof.full<SessionDto>(x => x.code),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 150,
    },
    {
        headerName: 'Tên',
        field: nameof.full<SessionDto>(x => x.name),
        minWidth: 200,
    },
    {
        headerName: 'Thời gian bắt đầu',
        field: nameof.full<SessionDto>(x => x.createdAt),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 150,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as SessionDto;
            const { createdAt } = data;
            const createdAtFormatted = DateTimeUtil.formatDateTime(createdAt, DateTimeUtil.VN_DATE_TIME_FORMAT);
            return <div className="h-full flex items-center justify-center">{createdAtFormatted}</div>;
        },
    },
    {
        headerName: 'Số người tham gia',
        field: nameof.full<SessionDto>(x => x.totalParticipant),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 150,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as SessionDto;
            const { totalParticipant } = data;
            if (!totalParticipant) return <>0</>;
            return <div className="h-full flex items-center justify-center">{totalParticipant}</div>;
        },
    },
    {
        headerName: 'Trạng thái',
        field: nameof.full<SessionDto>(x => x.status),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 150,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as SessionDto;
            const { status } = data;
            if (!status) return <></>;
            switch (status) {
                case 'STARTING':
                    return <>Đang bắt đầu</>;
                case 'STARTED':
                    return <>Đang diễn ra</>;
                case 'ENDED':
                    return <>Đã kết thúc</>;
                default:
                    return <></>;
            }
        },
    },
];
