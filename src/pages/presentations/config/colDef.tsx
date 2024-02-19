import { AvatarGroup } from '@mui/material';
import _ from 'lodash';
import { BaseGridColDef } from '~/components/grid/BaseGrid';
import ComponentUtil from '~/utils/ComponentUtil';
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
        headerName: 'Thành viên',
        field: nameof.full<PresentationDto>(x => x.collaborators),
        width: 150,
        minWidth: 150,
        resizable: false,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as PresentationDto;
            const { collaborators } = data;
            return (
                <AvatarGroup
                    max={5}
                    sx={{
                        '& .MuiAvatar-root': { width: 28, height: 28 },
                    }}
                >
                    {collaborators?.map(collaborator => {
                        return ComponentUtil.renderAvatarUser({
                            key: collaborator.collaborationID,
                            fullName: collaborator.fullname,
                            size: 28,
                            style: {
                                fontSize: 12,
                            },
                            tooltip: true,
                        });
                    })}
                </AvatarGroup>
            );
        },
        cellStyle: {
            display: 'flex',
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
