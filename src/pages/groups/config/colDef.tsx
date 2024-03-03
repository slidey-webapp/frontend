import { AvatarGroup } from '@mui/material';
import _ from 'lodash';
import { BaseGridColDef } from '~/components/grid/BaseGrid';
import ComponentUtil from '~/utils/ComponentUtil';
import DateTimeUtil from '~/utils/DateTimeUtil';
import { GroupDto } from '../types/group';

export const groupGridColDef: BaseGridColDef[] = [
    {
        headerName: 'Mã',
        field: nameof.full<GroupDto>(x => x.code),
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
        field: nameof.full<GroupDto>(x => x.name),
        minWidth: 200,
    },
    {
        headerName: 'Mô tả',
        field: nameof.full<GroupDto>(x => x.description),
        minWidth: 200,
    },
    {
        headerName: 'Thành viên',
        field: nameof.full<GroupDto>(x => x.members),
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        resizable: false,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as GroupDto;
            const { members } = data;
            return (
                <AvatarGroup
                    max={5}
                    sx={{
                        '& .MuiAvatar-root': { width: 28, height: 28 },
                    }}
                >
                    {members.map(member => {
                        return ComponentUtil.renderAvatarUser({
                            key: member.groupMemberID,
                            fullName: member.fullname,
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
        headerName: 'Trưởng nhóm',
        field: nameof.full<GroupDto>(x => x.creator),
        width: 100,
        minWidth: 100,
        maxWidth: 100,
        resizable: false,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as GroupDto;
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
        field: nameof.full<GroupDto>(x => x.createdAt),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        resizable: false,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as GroupDto;
            const { createdAt } = data;
            const createdRemoveUtc = DateTimeUtil.convertDateFromUtcDate(createdAt);
            const createdAtFormatted = DateTimeUtil.formatDateTime(createdRemoveUtc, DateTimeUtil.VN_DATE_TIME_FORMAT);
            return <div className="h-full flex items-center justify-center">{createdAtFormatted}</div>;
        },
    },
    {
        headerName: 'Thời gian cập nhật',
        field: nameof.full<GroupDto>(x => x.updatedAt),
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        resizable: false,
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as GroupDto;
            const { updatedAt } = data;
            if (!updatedAt) return <></>;

            const updatedRemoveUtc = DateTimeUtil.convertDateFromUtcDate(updatedAt);
            const updatedAtFormatted = DateTimeUtil.formatDateTime(updatedRemoveUtc, DateTimeUtil.VN_DATE_TIME_FORMAT);
            return <div className="h-full flex items-center justify-center">{updatedAtFormatted}</div>;
        },
    },
];
