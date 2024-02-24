import { AvatarGroup, Box, Divider, FormControl, TextField, Tooltip, Typography } from '@mui/material';
import _ from 'lodash';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppSelector } from '~/AppStore';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import ButtonIconBase from '~/components/buttons/ButtonIconBase';
import Dropdown from '~/components/dropdowns/Dropdown';
import BaseForm, { BaseFormRef } from '~/components/forms/BaseForm';
import BaseIcon, { BaseIconProps } from '~/components/icons/BaseIcon';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';
import { requestApi } from '~/libs/axios';
import ComponentUtil from '~/utils/ComponentUtil';
import NotifyUtil from '~/utils/NotifyUtil';
import { usePresentationContext } from '../PresentationDetailPage';
import { COLLABORATION_DELETE_API, COLLABORATION_INVITATION_API } from '../api/presentation.api';
import { CollaborationDto } from '../types/collaboration';
import PresentGroupShareForm from './PresentGroupShareForm';

interface Props {}

const PresentationHeader: React.FC<Props> = () => {
    const {
        presentation,
        presentationID,
        collaborations,
        usersOnline,
        onUpdatePresentation,
        refetchCollaborations,
        onShowPresentation,
    } = usePresentationContext();
    const navigate = useNavigate();

    const formRef = useRef<BaseFormRef>(null);
    const modalRef = useRef<ModalBaseRef>(null);
    const { authUser } = useAppSelector((state: RootState) => state.auth);

    const handleSendInvitation = async () => {
        const isValid = await formRef.current?.isValid();
        if (!isValid) return;
        const formValues = formRef.current?.getValues();
        const email = formValues?.email;
        if (!email) return;
        try {
            const response = await requestApi('post', COLLABORATION_INVITATION_API, {
                email,
                presentationID,
            });
            if (response?.status === 200 || response?.status === 400) {
                if (response.status === 200) {
                    NotifyUtil.success('Mời cộng tác thành công');
                } else {
                    NotifyUtil.error(response.data?.message || 'Có lỗi xảy ra');
                }
            }
        } catch (err) {
            console.log('err: ', err);
        }
    };

    const handleRemoveCollab = async (collab: CollaborationDto) => {
        const confirm = await NotifyUtil.confirmDialog('Thông báo', `Xóa cộng tác viên ${collab.fullname} ?`);
        if (!confirm.isConfirmed) return;
        try {
            const response = await requestApi('post', COLLABORATION_DELETE_API, {
                presentationID,
                accountID: collab.accountID,
            });
            if (response?.status === 200) {
                await refetchCollaborations();
                return;
            }
            NotifyUtil.error(response.data?.message || 'Có lỗi xảy ra');
        } catch (err) {
            console.log('err: ', err);
        }
    };

    return (
        <div
            className="w-full flex items-center px-4 border-b border-[#e8e8eb]"
            style={{
                minHeight: 56,
                maxHeight: 56,
                height: 56,
            }}
        >
            <div className="w-full h-full flex items-center justify-between">
                <div className="flex-1 flex items-center ">
                    <Tooltip title="Trở lại">
                        <div
                            className="cursor-pointer transition-all duration-300 ease-in-out hover:text-neutral-500"
                            onClick={() => navigate(-1)}
                        >
                            <BaseIcon type={'arrow-back'} />
                        </div>
                    </Tooltip>
                    <div className="w-56 ml-4" title={presentation.name}>
                        <FormControl fullWidth>
                            <TextField
                                variant="standard"
                                size="small"
                                placeholder="Tên bài thuyết trình..."
                                defaultValue={presentation.name}
                                onChange={_.debounce(
                                    event =>
                                        onUpdatePresentation({
                                            name: event.target.value,
                                        }),
                                    350,
                                )}
                            />
                        </FormControl>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-end">
                    <div>
                        <Dropdown
                            overlayContent={
                                <>
                                    <Box
                                        sx={{
                                            py: 1.5,
                                            px: 2,
                                        }}
                                    >
                                        <Typography variant="overline">Người cộng tác</Typography>
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
                                                        label: 'Nhập email',
                                                        type: 'email',
                                                        required: true,
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </Box>
                                    <Divider />
                                    <>
                                        <Box
                                            sx={{
                                                py: 1.5,
                                                px: 2,
                                            }}
                                        >
                                            <div className="w-full flex flex-col">
                                                {[
                                                    {
                                                        accountID: presentation.creator?.accountID,
                                                        fullname: presentation.creator?.fullname,
                                                        email: presentation.creator?.email,
                                                        presentationID: presentationID,
                                                        collaborationID: `creator-${presentation.creator?.accountID}`,
                                                    } as CollaborationDto,
                                                    ...collaborations,
                                                ].map(collab => {
                                                    return (
                                                        <div
                                                            key={collab.collaborationID}
                                                            className="flex-1  flex items-center justify-between"
                                                            style={{
                                                                height: 56,
                                                                minHeight: 56,
                                                            }}
                                                        >
                                                            <div className="flex items-center">
                                                                <div className="mr-3">
                                                                    {ComponentUtil.renderAvatarUser({
                                                                        key: collab.collaborationID,
                                                                        fullName: collab.fullname,
                                                                        size: 32,
                                                                        tooltip:
                                                                            collab.accountID ===
                                                                            authUser?.user.accountID
                                                                                ? 'Bạn'
                                                                                : collab.fullname,
                                                                    })}
                                                                </div>
                                                                <div className="flex-1 flex flex-col h-full justify-between">
                                                                    <div className="">{collab.fullname}</div>
                                                                    <div className="text-xs">{collab.email}</div>
                                                                </div>
                                                            </div>
                                                            {presentation.createdBy !== collab.accountID && (
                                                                <ButtonIconBase
                                                                    className="!ml-2"
                                                                    icon="remove"
                                                                    color="error"
                                                                    tooltip="Xóa cộng tác viên"
                                                                    onClick={() => handleRemoveCollab(collab)}
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </Box>
                                        <Divider />
                                    </>
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
                                            title="Mời cộng tác"
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
                                    '& .MuiAvatar-root': { width: 32, height: 32 },
                                }}
                            >
                                {[
                                    {
                                        accountID: presentation.creator?.accountID,
                                        fullname: presentation.creator?.fullname,
                                        email: presentation.creator?.email,
                                        presentationID: presentationID,
                                        collaborationID: `creator-${presentation.creator?.accountID}`,
                                    } as CollaborationDto,
                                    ...collaborations,
                                ].map(collab => {
                                    return ComponentUtil.renderAvatarUser({
                                        key: collab.collaborationID,
                                        fullName: collab.fullname,
                                        size: 32,
                                        tooltip:
                                            collab.accountID === authUser?.user.accountID ? 'Bạn' : collab.fullname,
                                        active: usersOnline.some(x => x.accountID === collab.accountID),
                                    });
                                })}
                            </AvatarGroup>
                        </Dropdown>
                    </div>
                    <Divider
                        orientation="vertical"
                        sx={{
                            margin: '0 12px',
                            height: '24px',
                        }}
                    />
                    <div>
                        <Dropdown
                            popoverProps={{
                                slotProps: {
                                    paper: {
                                        sx: { width: 220 },
                                    },
                                },
                            }}
                            overlayContent={
                                <>
                                    {[
                                        {
                                            title: 'Công khai',
                                            icon: 'public' as BaseIconProps['type'],
                                            onClick: onShowPresentation,
                                        },
                                        {
                                            title: 'Trong nhóm',
                                            icon: 'lock' as BaseIconProps['type'],
                                            onClick: () => {
                                                modalRef.current?.onOpen(
                                                    <PresentGroupShareForm
                                                        onClose={() => modalRef.current?.onClose()}
                                                        onSubmit={onShowPresentation}
                                                    />,
                                                    'Trình chiếu trong nhóm',
                                                    '50%',
                                                );
                                            },
                                        },
                                    ].map((item, index) => {
                                        return (
                                            <>
                                                <div
                                                    key={item.title}
                                                    className="px-4 py-3 cursor-pointer transition-all duration-100 ease-in-out hover:bg-neutral-50"
                                                    onClick={() => item.onClick()}
                                                >
                                                    <div className="flex-1 h-6 flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <div className="mr-3">
                                                                <BaseIcon type={item.icon} />
                                                            </div>
                                                            <div className="flex-1 flex flex-col h-full">
                                                                {item.title}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {index < 1 && <Divider />}
                                            </>
                                        );
                                    })}
                                </>
                            }
                        >
                            <ButtonBase title={'Trình chiếu'} startIcon={'play-arrow'} className="!m-0" />
                        </Dropdown>
                    </div>
                </div>
            </div>
            <ModalBase ref={modalRef} />
        </div>
    );
};

export default PresentationHeader;
