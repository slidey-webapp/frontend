import { Box, Grid, Stack } from '@mui/material';
import _ from 'lodash';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/AppStore';
import ButtonIconBase from '~/components/buttons/ButtonIconBase';
import BaseGrid, { BaseGridRef } from '~/components/grid/BaseGrid';
import GridToolbar from '~/components/grid/components/GridToolbar';
import { AppContainer } from '~/components/layouts/AppContainer';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';
import { useBaseGrid } from '~/hooks/useBaseGrid';
import { baseDeleteWithoutIdApi, requestApi } from '~/libs/axios';
import { indigo, neutral } from '~/themes/colors';
import NotifyUtil from '~/utils/NotifyUtil';
import SessionGrid from '../sessions/components/SessionGrid';
import TemplateList from '../templates/components/TemplateList';
import { PRESENTATION_CREATE_API, PRESENTATION_DELETE_API, PRESENTATION_INDEX_API } from './api/presentation.api';
import { presentationGridColDef } from './config/colDef';
import { PresentationDto } from './types/presentation';

interface Props {}

const PresentationPage: React.FC<Props> = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalBaseRef>(null);

    const { authUser } = useAppSelector(x => x.auth);
    const navigate = useNavigate();

    const gridController = useBaseGrid<PresentationDto>({
        url: PRESENTATION_INDEX_API,
        gridRef: gridRef,
    });

    const handleCreate = async () => {
        modalRef.current?.onOpen(
            <TemplateList
                renderAddonBeforeItem={() => {
                    return (
                        <Grid item xs={12} sm={6} md={4}>
                            <Stack direction="column">
                                <div className="cursor-pointer select-none relative group" onClick={handleCreateEmpty}>
                                    <Box
                                        sx={{
                                            padding: '1rem',
                                            borderRadius: '8px',
                                            transition: 'all .3s',
                                            borderWidth: 2,
                                            borderColor: _.get(neutral, '100'),
                                            borderStyle: 'solid',
                                            '&:hover': {
                                                borderColor: _.get(indigo, 'main'),
                                            },
                                            aspectRatio: '16 / 9',
                                            position: 'relative',
                                        }}
                                    >
                                        <div className={'w-full h-full flex flex-col items-center justify-center'} />
                                    </Box>
                                    <div className="mt-2">
                                        <div className="text-neutral-800 text-lg line-clamp-1">
                                            Bài trình chiếu trống
                                        </div>
                                        <div className="text-sm text-neutral-500 line-clamp-1 text-transparent">0</div>
                                    </div>
                                </div>
                            </Stack>
                        </Grid>
                    );
                }}
            />,
            'Tất cả mẫu',
            '80%',
        );
    };

    const handleCreateEmpty = async () => {
        const response = await requestApi<{
            presentation: PresentationDto;
            slides: [];
        }>('post', PRESENTATION_CREATE_API, {
            name: 'Bài trình chiếu chưa có tiêu đề',
        });
        modalRef.current?.onClose();

        if (response.status !== 200) {
            NotifyUtil.error(response.data.message || 'Có lỗi xảy ra');
            return;
        }

        handleDetail(response.data.result?.presentation || ({} as PresentationDto));
    };

    const handleOpenSessionList = (data: PresentationDto) => {
        modalRef.current?.onOpen(
            <div
                className="w-full"
                style={{
                    height: '60vh',
                }}
            >
                <SessionGrid presentationID={data.presentationID} hideToolbar />
            </div>,
            `Các session của ${data.name}`,
            '80%',
        );
    };

    const handleDelete = async (data: PresentationDto) => {
        await baseDeleteWithoutIdApi(PRESENTATION_DELETE_API, { presentationID: data.presentationID }, 'post');
        gridController?.reloadData();
    };

    const handleDetail = async (data: PresentationDto) => navigate('/presentation/edit/' + data.presentationID);

    return (
        <AppContainer>
            <BaseGrid
                {...gridController}
                columnDefs={presentationGridColDef}
                ref={gridRef}
                actionRowsList={{
                    hasDetailBtn: true,
                    hasDeleteBtn: (data: PresentationDto) => {
                        if (data.createdBy === authUser?.user.accountID) return true;

                        return false;
                    },
                    onClickDetailBtn: handleDetail,
                    onClickDeleteBtn: handleDelete,
                    renderLeftActions: data => {
                        if (data.createdBy !== authUser?.user.accountID) return <></>;

                        return (
                            <ButtonIconBase
                                icon={'slide-outlined'}
                                onClick={() => handleOpenSessionList(data)}
                                tooltip="Các phiên trình chiếu"
                                color="success"
                            />
                        );
                    },
                }}
                defaultColDef={{
                    autoHeight: true,
                }}
                actionRowsWidth={140}
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

export default PresentationPage;
