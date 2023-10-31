import React, { useRef } from 'react';
import BaseGrid, { BaseGridRef } from '~/components/grid/BaseGrid';
import GridToolbar from '~/components/grid/components/GridToolbar';
import { AppContainer } from '~/components/layouts/AppContainer';
import Loading from '~/components/loadings/Loading';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';
import { useBaseGrid } from '~/hooks/useBaseGrid';
import { baseDeleteApi } from '~/libs/axios';
import NotifyUtil from '~/utils/NotifyUtil';
import { GROUP_DELETE_API, GROUP_INDEX_API } from './api/group.api';
import GroupForm from './components/GroupForm';
import { groupGridColDef } from './config/colDef';
import { GroupDto } from './types/group';

export interface Props {}

const GroupPage: React.FC<Props> = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalBaseRef>(null);

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
                groupID={data.groupID}
                modalType="create"
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

    const handleDelete = (data: Record<string, any>) => {
        baseDeleteApi(GROUP_DELETE_API, data.id, 'post');
        gridController?.reloadData();
    };

    return (
        <AppContainer>
            <BaseGrid
            {...gridController}
                columnDefs={groupGridColDef}
                ref={gridRef}
                actionRowsList={{
                    hasEditBtn: true,
                    hasDeleteBtn: true,
                    onClickEditBtn: handleUpdate,
                    onClickDeleteBtn: handleDelete,
                }}
                defaultColDef={{
                    autoHeight: true,
                }}
                actionRowsWidth={100}
            >
                <GridToolbar
                    hasCreateButton
                    hasRefreshButton
                    onClickCreateButton={handleCreate}
                    onClickRefreshButton={gridController?.reloadData}
                />
            </BaseGrid>
            <ModalBase ref={modalRef} />
        </AppContainer>
    );
};

export default GroupPage;
