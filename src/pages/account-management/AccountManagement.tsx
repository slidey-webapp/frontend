import React, { useRef } from 'react';
import BaseGrid, { BaseGridRef } from '~/components/grid/BaseGrid';
import GridToolbar from '~/components/grid/components/GridToolbar';
import { AppContainer } from '~/components/layouts/AppContainer';
import { useBaseGrid } from '~/hooks/useBaseGrid';
import { User } from '~/types/auth';
import { ACCOUNT_INDEX_API, ACCOUNT_LOCK_API, ACCOUNT_UN_LOCK_API } from './api/account-management.api';
import { getAccountGridColDef } from './configs/colDef';
import NotifyUtil from '~/utils/NotifyUtil';
import { requestApi } from '~/libs/axios';

interface Props {}

const AccountManagement: React.FC<Props> = () => {
    const gridRef = useRef<BaseGridRef>(null);

    const gridController = useBaseGrid<User>({
        url: ACCOUNT_INDEX_API,
        gridRef: gridRef,
    });

    const handleLockAccount = (user: User, type: 'lock' | 'unlock') => {
        NotifyUtil.confirmDialog(
            'Thông báo',
            type === 'lock' ? 'Bạn có chắc muốn khóa tài khoản này ?' : 'Bạn có chắc muốn mở khóa tài khoản này ?',
        ).then(confirm => {
            if (confirm.isConfirmed) {
                requestApi('post', type === 'lock' ? ACCOUNT_LOCK_API : ACCOUNT_UN_LOCK_API, {
                    accountID: user.accountID,
                }).then(res => {
                    if (res.status !== 200) {
                        NotifyUtil.error(res.data.message || 'Có lỗi xảy ra');
                        return;
                    }

                    NotifyUtil.success(
                        type === 'lock' ? 'Khóa tài khoản thành công!' : 'Mở khóa tài khoản thành công!',
                    );
                    gridController.reloadData();
                });
            }
        });
    };

    return (
        <AppContainer>
            <BaseGrid
                {...gridController}
                columnDefs={getAccountGridColDef(handleLockAccount)}
                ref={gridRef}
                defaultColDef={{
                    autoHeight: true,
                }}
                actionRows={false}
                toolbar={{
                    rightToolbar: (
                        <GridToolbar
                            hasCreateButton={false}
                            hasRefreshButton
                            onClickRefreshButton={gridController?.reloadData}
                        />
                    ),
                }}
            />
        </AppContainer>
    );
};

export default AccountManagement;
