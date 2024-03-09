import _ from 'lodash';
import { BaseGridColDef } from '~/components/grid/BaseGrid';
import BaseIcon from '~/components/icons/BaseIcon';
import { User } from '~/types/auth';

export const getAccountGridColDef = (
    onLockAccount: (user: User, type: 'lock' | 'unlock') => void,
): BaseGridColDef[] => [
    {
        headerName: 'Tên người dùng',
        field: nameof.full<User>(x => x.fullname),
        minWidth: 200,
        resizable: false,
    },
    {
        headerName: 'Email',
        field: nameof.full<User>(x => x.email),
        minWidth: 200,
    },
    {
        headerName: 'Trạng thái',
        field: nameof.full<User>(x => x.status),
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        resizable: false,
        cellStyle: {
            display: 'flex',
        },
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as User;
            const { status } = data;
            if (!status) return <></>;
            switch (status) {
                case 'ACTIVE':
                    return (
                        <div
                            className="rounded-sm px-3 h-7 flex items-center w-fit border"
                            style={{
                                background: '#f6ffed',
                                color: '#52c41a',
                                borderColor: '#b7eb8f',
                            }}
                        >
                            Đã xác minh
                        </div>
                    );
                case 'UNVERIFIED':
                default:
                    return (
                        <div
                            className="rounded-sm px-3 h-7 flex items-center w-fit border"
                            style={{
                                background: '#fff2f0',
                                color: '#ff4d4f',
                                borderColor: '#ffccc7',
                            }}
                        >
                            Chưa xác minh
                        </div>
                    );
            }
        },
    },
    {
        headerName: 'Khóa?',
        field: nameof.full<User>(x => x.isBlocked),
        width: 80,
        minWidth: 80,
        maxWidth: 80,
        resizable: false,
        cellStyle: {
            display: 'flex',
            justifyContent: 'center',
        },
        cellRenderer: (params: any) => {
            const data = _.get(params, 'data') as User;
            const { isBlocked } = data;
            if (isBlocked) {
                return (
                    <div
                        className="w-full h-full flex items-center justify-center cursor-pointer"
                        onClick={() => onLockAccount(data, 'unlock')}
                    >
                        <div
                            className="w-6 h-6 rounded flex items-center justify-center"
                            style={{
                                background: '#F04438',
                                color: '#fff',
                            }}
                        >
                            <BaseIcon type="lock-outlined" size={14} />
                        </div>
                    </div>
                );
            } else {
                return (
                    <div
                        className="w-full h-full flex items-center justify-center cursor-pointer"
                        onClick={() => onLockAccount(data, 'lock')}
                    >
                        <div
                            className="w-6 h-6 rounded flex items-center justify-center"
                            style={{
                                background: '#10B981',
                                color: '#fff',
                            }}
                        >
                            <BaseIcon type="unlock-outlined" size={14} />
                        </div>
                    </div>
                );
            }
        },
    },
];
