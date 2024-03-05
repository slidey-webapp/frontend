import _ from 'lodash';
import React, { useRef } from 'react';
import BaseGrid, { BaseGridRef } from '~/components/grid/BaseGrid';
import GridToolbar from '~/components/grid/components/GridToolbar';
import { AppContainer } from '~/components/layouts/AppContainer';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';
import { Permission } from '~/configs/constants';
import { useBaseGrid } from '~/hooks/useBaseGrid';
import { baseDeleteWithoutIdApi } from '~/libs/axios';
import NotifyUtil from '~/utils/NotifyUtil';
import { PermissionUtil } from '~/utils/PermissionUtil';
import { ROLE_DELETE_API, ROLE_INDEX_API } from './api/role.api';
import RoleForm from './components/RoleForm';
import { roleGridColDef } from './configs/colDef';
import { RoleDto } from './types/role';
import ButtonIconBase from '~/components/buttons/ButtonIconBase';

export interface Props {}

const RolePage: React.FC<Props> = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalBaseRef>(null);

    const gridController = useBaseGrid<any>({
        url: ROLE_INDEX_API,
        gridRef: gridRef,
        customData: (roles: RoleDto[]) => {
            const rolesCloned = _.cloneDeep(roles);
            const adminRole = rolesCloned.find(x => x.code === Permission.SystemAdmin);
            const adminRoleIndex = rolesCloned.findIndex(x => x.code === Permission.SystemAdmin);

            if (!adminRole) return roles;

            rolesCloned.splice(adminRoleIndex, 1);
            rolesCloned.unshift(adminRole);

            return rolesCloned;
        },
    });

    const handleCreate = () => {
        modalRef.current?.onOpen(
            <RoleForm
                modalType="create"
                onClose={modalRef.current.onClose}
                onSuccess={() => {
                    NotifyUtil.success('Tạo mới vai trò thành công');
                    gridController?.reloadData();
                }}
            />,
            'Tạo mới vai trò',
            '50%',
        );
    };

    const handleUpdate = (data: RoleDto) => {
        modalRef.current?.onOpen(
            <RoleForm
                rowData={data}
                modalType="update"
                onClose={modalRef.current.onClose}
                onSuccess={() => {
                    NotifyUtil.success('Câp nhật vai trò thành công');
                    gridController?.reloadData();
                }}
            />,
            'Cập nhật vai trò',
            '50%',
        );
    };

    const handleDelete = async (data: RoleDto) => {
        await baseDeleteWithoutIdApi(ROLE_DELETE_API, { roleID: data.roleID }, 'post');
        gridController?.reloadData();
    };

    return (
        <AppContainer>
            <BaseGrid
                {...gridController}
                columnDefs={roleGridColDef}
                ref={gridRef}
                actionRowsList={{
                    hasEditBtn: true,
                    hasDeleteBtn: (data: RoleDto) => {
                        // Không thể xóa role admin
                        if (data.code === Permission.SystemAdmin) return false;

                        return PermissionUtil.checkPermission(Permission.SystemAdmin);
                    },
                    onClickEditBtn: handleUpdate,
                    onClickDeleteBtn: handleDelete,
                    renderLeftActions: (data: RoleDto) => {
                        return (
                            <ButtonIconBase
                                icon={'person-add-outlined'}
                                onClick={() => {
                                    //
                                    NotifyUtil.warn('Tính năng này đang được phát triển!');
                                }}
                                tooltip="Gán phân quyền"
                                color="primary"
                            />
                        );
                    },
                }}
                defaultColDef={{
                    autoHeight: true,
                }}
                actionRowsWidth={150}
                toolbar={{
                    rightToolbar: (
                        <GridToolbar
                            hasCreateButton
                            hasRefreshButton
                            onClickCreateButton={handleCreate}
                            onClickRefreshButton={gridController?.reloadData}
                        />
                    ),
                }}
            />
            <ModalBase ref={modalRef} />
        </AppContainer>
    );
};

export default RolePage;
