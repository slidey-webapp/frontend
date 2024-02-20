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
        width: 100,
        minWidth: 100,
        maxWidth: 100,
        resizable: false,
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
        minWidth: 150,
        maxWidth: 150,
        resizable: false,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as SessionDto;
            const { createdAt } = data;
            const createdRemoveUtc = DateTimeUtil.convertDateFromUtcDate(createdAt);
            const createdAtFormatted = DateTimeUtil.formatDateTime(createdRemoveUtc, DateTimeUtil.VN_DATE_TIME_FORMAT);
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
        minWidth: 150,
        maxWidth: 150,
        resizable: false,
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
        minWidth: 150,
        maxWidth: 150,
        resizable: false,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as SessionDto;
            const { status } = data;
            if (!status) return <></>;
            switch (status) {
                case 'STARTING':
                    return (
                        <div
                            className="rounded-full px-3 h-7 flex items-center w-fit"
                            style={{
                                background: '#10b9811f',
                                color: '#0b815a',
                            }}
                        >
                            Đang bắt đầu
                        </div>
                    );
                case 'STARTED':
                    return (
                        <div
                            className="rounded-full px-3 h-7 flex items-center w-fit"
                            style={{
                                background: '#f790091f',
                                color: '#b54708',
                            }}
                        >
                            Đang diễn ra
                        </div>
                    );
                case 'ENDED':
                    return (
                        <div
                            className="rounded-full px-3 h-7 flex items-center w-fit"
                            style={{
                                background: '#f044381f',
                                color: '#b42318',
                            }}
                        >
                            Đã kết thúc
                        </div>
                    );
                default:
                    return <></>;
            }
        },
    },
];
