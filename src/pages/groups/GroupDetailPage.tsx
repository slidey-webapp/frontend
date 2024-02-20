import { AvatarGroup, Box, Divider, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BreadcrumbRef } from '~/components/bread-crumb/BreadCrumb';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import ButtonIconBase from '~/components/buttons/ButtonIconBase';
import Dropdown from '~/components/dropdowns/Dropdown';
import BaseForm, { BaseFormRef } from '~/components/forms/BaseForm';
import { AppContainer } from '~/components/layouts/AppContainer';
import Loading from '~/components/loadings/Loading';
import { ComboOptionConstant } from '~/configs/constants';
import { requestApi } from '~/libs/axios';
import { Id } from '~/types/shared';
import ComponentUtil from '~/utils/ComponentUtil';
import NotifyUtil from '~/utils/NotifyUtil';
import SessionGrid from '../sessions/components/SessionGrid';
import { GROUP_REMOVE_MEMBER_API, GROUP_SEND_INVITATION_API, GROUP_UPDATE_MEMBER_ROLE_API } from './api/group.api';
import { useGroupDetail } from './api/useGroupDetail';
import { useGroupMembers } from './api/useGroupMembers';
import { GroupMemberDto, GroupMemberRole } from './types/group';

interface Props {}

const GroupDetailPage: React.FC<Props> = () => {
    const breadcrumbRef = useRef<BreadcrumbRef>(null);
    const formRef = useRef<BaseFormRef>(null);

    const { groupID } = useParams<{
        groupID: string;
    }>();

    const [members, setMembers] = useState<GroupMemberDto[]>([]);

    const { data: responseGroup, isFetching: isFetchingGroup } = useGroupDetail(groupID as Id);
    const { refetch: refetchMembers } = useGroupMembers(groupID as Id, {
        onSuccess: res => {
            if (res.status !== 200) return;
            setMembers(res.data.result?.members || []);
        },
    });

    const group = useMemo(() => responseGroup?.data?.result?.group, [isFetchingGroup]);
    const isFetching = useMemo(() => isFetchingGroup, [isFetchingGroup]);

    useEffect(() => {
        if (_.isEmpty(group) || breadcrumbRef.current == null) return;
        const defaultBreadcrumbs = _.cloneDeep(breadcrumbRef.current?.getBreadcrumbs() || []);
        defaultBreadcrumbs?.pop();

        defaultBreadcrumbs.push({
            title: group?.name,
        });

        breadcrumbRef.current?.setBreadcrumbs(defaultBreadcrumbs);
    }, [isFetching]);

    const handleRoleChange = async (
        event: SelectChangeEvent<GroupMemberRole>,
        params: {
            groupID: Id;
            accountID: Id;
        },
    ) => {
        try {
            const response = await requestApi('post', GROUP_UPDATE_MEMBER_ROLE_API, {
                ...params,
                role: event?.target?.value,
            });

            if (response?.status === 200) return;

            NotifyUtil.error(response.data?.message || 'Có lỗi xảy ra');
        } catch (err) {
            console.log('err: ', err);
        }
    };

    const handleSendInvitation = async () => {
        const isValid = await formRef.current?.isValid();

        if (!isValid) return;

        const formValues = formRef.current?.getValues();
        const email = formValues?.email;
        if (!email) return;

        try {
            const response = await requestApi('post', GROUP_SEND_INVITATION_API, {
                email: email,
                groupID: group?.groupID,
            });
            if (response?.status === 200 || response?.status === 400) {
                if (response.status === 200) {
                    NotifyUtil.success('Mời thành viên vào nhóm thành công');
                } else {
                    NotifyUtil.error(response.data?.message || 'Có lỗi xảy ra');
                }
            }
        } catch (err) {
            console.log('err: ', err);
        }
    };

    const handleRemoveMember = async (member: GroupMemberDto) => {
        const confirm = await NotifyUtil.confirmDialog('Thông báo', `Xóa thành viên ${member.fullname} ?`);
        if (!confirm.isConfirmed) return;

        try {
            const response = await requestApi('post', GROUP_REMOVE_MEMBER_API, {
                groupID: member.groupID,
                accountID: member.accountID,
            });

            if (response?.status === 200) {
                await refetchMembers();
                return;
            }

            NotifyUtil.error(response.data?.message || 'Có lỗi xảy ra');
        } catch (err) {
            console.log('err: ', err);
        }
    };

    const renderToolbar = () => {
        return {
            leftToolbar: <div>Thông tin owner here...</div>,
            rightToolbar: (
                <Dropdown
                    overlayContent={
                        <>
                            <Box
                                sx={{
                                    py: 1.5,
                                    px: 2,
                                }}
                            >
                                <Typography variant="overline">Người có quyền truy cập</Typography>
                                <div className="w-full flex items-center justify-between mt-2">
                                    <BaseForm
                                        className="w-full"
                                        onSubmit={() => {
                                            //
                                        }}
                                        ref={formRef}
                                        fields={[
                                            {
                                                name: 'email',
                                                classNameCol: 'col-span-12',
                                                label: 'Thêm email',
                                                type: 'email',
                                                required: true,
                                            },
                                        ]}
                                    />
                                </div>
                            </Box>
                            <Divider />
                            <Box
                                sx={{
                                    py: 1.5,
                                    px: 2,
                                }}
                            >
                                <div className="w-full flex flex-col">
                                    {members.map(member => {
                                        return (
                                            <div
                                                key={member.groupMemberID}
                                                className="flex-1  flex items-center justify-between"
                                                style={{
                                                    height: 56,
                                                    minHeight: 56,
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <div className="mr-3">
                                                        {ComponentUtil.renderAvatarUser({
                                                            fullName: member.fullname,
                                                            size: 36,
                                                            tooltip: true,
                                                        })}
                                                    </div>
                                                    <div className="flex-1 flex flex-col h-full justify-between">
                                                        <div className="">{member.fullname}</div>
                                                        <div className="text-xs">{member.email}</div>
                                                    </div>
                                                </div>
                                                {member.role !== 'OWNER' && (
                                                    <div>
                                                        <FormControl sx={{ minWidth: 150 }} size="small">
                                                            <Select
                                                                defaultValue={member.role}
                                                                onChange={event =>
                                                                    handleRoleChange(event, {
                                                                        accountID: member.accountID,
                                                                        groupID: member.groupID,
                                                                    })
                                                                }
                                                            >
                                                                {ComboOptionConstant.ROLE.map(({ value, label }) => {
                                                                    return (
                                                                        <MenuItem key={value} value={value}>
                                                                            {label}
                                                                        </MenuItem>
                                                                    );
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                        <ButtonIconBase
                                                            className="!ml-2"
                                                            icon="remove"
                                                            color="error"
                                                            tooltip="Xóa thành viên"
                                                            onClick={() => handleRemoveMember(member)}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </Box>
                            <Divider />
                            <Box
                                sx={{
                                    py: 1.5,
                                    px: 2,
                                }}
                            >
                                <ButtonBase
                                    endIcon={'send'}
                                    color={'primary'}
                                    onClick={handleSendInvitation}
                                    title="Mời vào nhóm"
                                    className="w-full h-10 flex items-center !m-0"
                                />
                            </Box>
                        </>
                    }
                >
                    <AvatarGroup
                        max={3}
                        style={{ cursor: 'pointer' }}
                        sx={{
                            '& .MuiAvatar-root': { width: 36, height: 36 },
                        }}
                    >
                        {members.map(member => {
                            return ComponentUtil.renderAvatarUser({
                                key: member.groupMemberID,
                                fullName: member.fullname,
                                size: 36,
                                tooltip: true,
                            });
                        })}
                    </AvatarGroup>
                </Dropdown>
            ),
        };
    };

    if (isFetching) return <Loading />;
    return (
        <AppContainer breadcrumbRef={breadcrumbRef}>
            <SessionGrid toolbar={renderToolbar()} groupID={groupID} />
        </AppContainer>
    );
};

export default GroupDetailPage;
