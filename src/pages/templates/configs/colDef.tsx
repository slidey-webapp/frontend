import _ from 'lodash';
import { BaseGridColDef } from '~/components/grid/BaseGrid';
import { PresentationDto } from '~/pages/presentations/types/presentation';
import ComponentUtil from '~/utils/ComponentUtil';
import DateTimeUtil from '~/utils/DateTimeUtil';

export const presentationGridColDef: BaseGridColDef[] = [
    {
        headerName: 'Mã',
        field: nameof.full<PresentationDto>(x => x.code),
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
        field: nameof.full<PresentationDto>(x => x.name),
        minWidth: 200,
    },
    {
        headerName: 'Người tạo',
        field: nameof.full<PresentationDto>(x => x.creator),
        width: 100,
        minWidth: 100,
        maxWidth: 100,
        resizable: false,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as PresentationDto;
            const { creator } = data;
            if (!creator) return null;

            return ComponentUtil.renderAvatarUser({
                fullName: creator.fullname,
                size: 28,
                style: {
                    fontSize: 12,
                },
                tooltip: true,
            });
        },
        cellStyle: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
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
            const createdRemoveUtc = DateTimeUtil.convertDateFromUtcDate(createdAt);
            const createdAtFormatted = DateTimeUtil.formatDateTime(createdRemoveUtc, DateTimeUtil.VN_DATE_TIME_FORMAT);
            return <div className="h-full flex items-center justify-center">{createdAtFormatted}</div>;
        },
    },
    {
        headerName: 'Thời gian cập nhật',
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

            const updatedRemoveUtc = DateTimeUtil.convertDateFromUtcDate(updatedAt);
            const updatedAtFormatted = DateTimeUtil.formatDateTime(updatedRemoveUtc, DateTimeUtil.VN_DATE_TIME_FORMAT);
            return <div className="h-full flex items-center justify-center">{updatedAtFormatted}</div>;
        },
    },
];
