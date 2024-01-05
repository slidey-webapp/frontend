import React, { useRef } from 'react';
import BaseGrid, { BaseGridRef } from '~/components/grid/BaseGrid';
import GridToolbar from '~/components/grid/components/GridToolbar';
import { AppContainer } from '~/components/layouts/AppContainer';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';
import { useBaseGrid } from '~/hooks/useBaseGrid';
import { baseDeleteWithoutIdApi, requestApi } from '~/libs/axios';
import NotifyUtil from '~/utils/NotifyUtil';
import { GROUP_DELETE_API, GROUP_GET_MEMBERS_API, GROUP_INDEX_API } from './api/group.api';
import GroupForm from './components/GroupForm';
import GroupMemberForm from './components/GroupMemberForm';
import GroupSendInvitationForm from './components/GroupSendInvitationForm';
import { groupGridColDef } from './config/colDef';
import { GroupDto, GroupMemberDto } from './types/group';

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
                rowData={data}
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

    const handleDelete = async (data: GroupDto) => {
        await baseDeleteWithoutIdApi(GROUP_DELETE_API, { groupID: data.groupID }, 'post');
        gridController?.reloadData();
    };

    const handleDetail = async (data: GroupDto) => {
        window.open('/dashboard/group/' + data.groupID, '_blank');
    };

    const handleSendInvitation = async (data: GroupDto) => {
        modalRef.current?.onOpen(
            <GroupSendInvitationForm
                rowData={data}
                onClose={modalRef.current.onClose}
                onSuccess={() => {
                    NotifyUtil.success('Mời thành viên vào nhóm thành công');
                }}
            />,
            'Mời thành viên vào nhóm',
            '50%',
        );
    };

    const getGroupMembers = async (data: GroupDto) => {
        const response = await requestApi<{
            members: GroupMemberDto[];
        }>('get', GROUP_GET_MEMBERS_API, { groupID: data.groupID });

        const members = response.data?.result?.members || [];

        modalRef.current?.onOpen(
            <GroupMemberForm members={members} onClose={modalRef.current?.onClose} />,
            `Thành viên trong nhóm ${data.name}`,
            '50%',
        );
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
                    hasDetailBtn: true,
                    onClickDetailBtn: handleDetail,
                    onClickEditBtn: handleUpdate,
                    onClickDeleteBtn: handleDelete,
                    // renderLeftActions: (data: GroupDto) => {
                    //     return (
                    //         <>
                    //             <ButtonIconBase
                    //                 icon={'group'}
                    //                 color={'primary'}
                    //                 onClick={() => {
                    //                     getGroupMembers(data);
                    //                 }}
                    //                 tooltip="Xem thành viên"
                    //             />
                    //             <ButtonIconBase
                    //                 icon={'email'}
                    //                 color={'warning'}
                    //                 onClick={() => {
                    //                     handleSendInvitation(data);
                    //                 }}
                    //                 tooltip="Mời vào nhóm"
                    //             />
                    //         </>
                    //     );
                    // },
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
