import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '~/AppStore';
import { ButtonIconBase } from '~/components/buttons/ButtonIconBase';
import BaseGrid, { BaseGridRef } from '~/components/grid/BaseGrid';
import GridToolbar from '~/components/grid/components/GridToolbar';
import { AppContainer } from '~/components/layouts/AppContainer';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';
import { useBaseGrid } from '~/hooks/useBaseGrid';
import { baseDeleteWithoutIdApi, requestApi } from '~/libs/axios';
import NotifyUtil from '~/utils/NotifyUtil';
import { GROUP_DELETE_API, GROUP_INDEX_API, GROUP_LEAVE_API } from './api/group.api';
import GroupForm from './components/GroupForm';
import { groupGridColDef } from './config/colDef';
import { GroupDto } from './types/group';

export interface Props {}

const GroupPage: React.FC<Props> = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalBaseRef>(null);

    const navigate = useNavigate();
    const { authUser } = useAppSelector(x => x.auth);

    const gridController = useBaseGrid<GroupDto>({
        url: GROUP_INDEX_API,
        gridRef: gridRef,
    });

    const handleCreate = () => {
        modalRef.current?.onOpen(
            <GroupForm
                modalType="create"
                onClose={modalRef.current.onClose}
                onSuccess={() => {
                    NotifyUtil.success('Tạo mới nhóm thành công');
                    gridController?.reloadData();
                }}
            />,
            'Tạo mới nhóm',
            '50%',
        );
    };

    const handleUpdate = (data: GroupDto) => {
        modalRef.current?.onOpen(
            <GroupForm
                rowData={data}
                modalType="update"
                onClose={modalRef.current.onClose}
                onSuccess={() => {
                    NotifyUtil.success('Câp nhật nhóm thành công');
                    gridController?.reloadData();
                }}
            />,
            'Cập nhật nhóm',
            '50%',
        );
    };

    const handleDelete = async (data: GroupDto) => {
        await baseDeleteWithoutIdApi(GROUP_DELETE_API, { groupID: data.groupID }, 'post');
        gridController?.reloadData();
    };

    const handleDetail = async (data: GroupDto) => {
        navigate('/dashboard/group/' + data.groupID);
    };

    const handleLeaveGroup = async (data: GroupDto) => {
        gridController.mask();
        const response = await requestApi('post', GROUP_LEAVE_API, {
            groupID: data.groupID,
        });
        gridController?.reloadData();
        gridController.unmask();

        if (response.status === 200) {
            NotifyUtil.success('Rời nhóm thành công');
        }
    };

    return (
        <AppContainer>
            <BaseGrid
                {...gridController}
                columnDefs={groupGridColDef}
                ref={gridRef}
                actionRowsList={{
                    hasEditBtn: (data: GroupDto) => {
                        if (data.createdBy === authUser?.user.accountID) return true;

                        return false;
                    },
                    hasDeleteBtn: (data: GroupDto) => {
                        if (data.createdBy === authUser?.user.accountID) return true;

                        return false;
                    },
                    hasDetailBtn: true,
                    onClickDetailBtn: handleDetail,
                    onClickEditBtn: handleUpdate,
                    onClickDeleteBtn: handleDelete,
                    renderLeftActions: (data: GroupDto) => {
                        if (data.createdBy === authUser?.user.accountID) return <></>;

                        return (
                            <ButtonIconBase
                                icon={'logout'}
                                onClick={() => {
                                    NotifyUtil.confirmDialog('Thông báo', 'Bạn có chắc muốn rời nhóm ?').then(
                                        confirm => {
                                            if (confirm.isConfirmed) handleLeaveGroup(data);
                                        },
                                    );
                                }}
                                tooltip="Rời nhóm"
                                color="warning"
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

export default GroupPage;
