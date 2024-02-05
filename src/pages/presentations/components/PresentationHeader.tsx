import { Avatar, AvatarGroup, Box, Divider, FormControl, Popover, TextField, Tooltip, Typography } from '@mui/material';
import _ from 'lodash';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonBase } from '~/components/buttons/ButtonBase';
import ButtonIconBase from '~/components/buttons/ButtonIconBase';
import BaseForm, { BaseFormRef } from '~/components/forms/BaseForm';
import BaseIcon from '~/components/icons/BaseIcon';
import { requestApi } from '~/libs/axios';
import NotifyUtil from '~/utils/NotifyUtil';
import { usePresentationContext } from '../PresentationDetailPage';
import { COLLABORATION_DELETE_API, COLLABORATION_INVITATION_API } from '../api/presentation.api';
import { CollaborationDto } from '../types/collaboration';

interface Props {}

const PresentationHeader: React.FC<Props> = () => {
    const {
        presentation,
        presentationID,
        collaborations,
        onUpdatePresentation,
        refetchCollaborations,
        onShowPresentation,
    } = usePresentationContext();
    const navigate = useNavigate();

    const formRef = useRef<BaseFormRef>(null);

    const [anchorElPopover, setAnchorElPopover] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorElPopover);

    const handleAvatarGroupClicked = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setAnchorElPopover(event.currentTarget);
    };
    const handleClosePopover = () => {
        setAnchorElPopover(null);
    };

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
                        <AvatarGroup
                            max={3}
                            onClick={handleAvatarGroupClicked}
                            style={{ cursor: 'pointer' }}
                            sx={{
                                '& .MuiAvatar-root': { width: 32, height: 32 },
                            }}
                        >
                            {collaborations.map(collab => {
                                return (
                                    <Avatar
                                        key={collab.collaborationID}
                                        sx={{
                                            width: 32,
                                            height: 32,
                                        }}
                                    >
                                        {collab.fullname.toString().trim()?.[0]}
                                    </Avatar>
                                );
                            })}
                            {collaborations.length === 0 && (
                                <Avatar
                                    key={'add'}
                                    sx={{
                                        width: 32,
                                        height: 32,
                                    }}
                                >
                                    <BaseIcon type="add" />
                                </Avatar>
                            )}
                        </AvatarGroup>
                        <Popover
                            anchorEl={anchorElPopover}
                            anchorOrigin={{
                                horizontal: 'left',
                                vertical: 'bottom',
                            }}
                            onClose={handleClosePopover}
                            open={openPopover}
                            PaperProps={{ sx: { width: 350 } }}
                            sx={{
                                zIndex: 1000,
                            }}
                        >
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
                            <Box
                                sx={{
                                    py: 1.5,
                                    px: 2,
                                }}
                            >
                                <div className="w-full flex flex-col">
                                    {collaborations.map(collab => {
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
                                                        <Avatar
                                                            sx={{
                                                                width: 32,
                                                                height: 32,
                                                            }}
                                                        >
                                                            {collab.fullname.toString().trim()?.[0]}
                                                        </Avatar>
                                                    </div>
                                                    <div className="flex-1 flex flex-col h-full justify-between">
                                                        <div className="">{collab.fullname}</div>
                                                        <div className="text-xs">{collab.email}</div>
                                                    </div>
                                                </div>
                                                <ButtonIconBase
                                                    className="!ml-2"
                                                    icon="remove"
                                                    color="error"
                                                    tooltip="Xóa cộng tác viên"
                                                    onClick={() => handleRemoveCollab(collab)}
                                                />
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
                                    title="Mời cộng tác"
                                    className="w-full h-10 flex items-center !m-0"
                                />
                            </Box>
                        </Popover>
                    </div>

                    <Divider
                        orientation="vertical"
                        sx={{
                            margin: '0 12px',
                            height: '24px',
                        }}
                    />
                    <div>
                        <ButtonBase
                            title={'Trình chiếu'}
                            startIcon={'play-arrow'}
                            onClick={onShowPresentation}
                            className="!m-0"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PresentationHeader;
