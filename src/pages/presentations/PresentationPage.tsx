import React, { useRef } from 'react';
import BaseGrid, { BaseGridRef } from '~/components/grid/BaseGrid';
import GridToolbar from '~/components/grid/components/GridToolbar';
import { AppContainer } from '~/components/layouts/AppContainer';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';
import { useBaseGrid } from '~/hooks/useBaseGrid';
import { baseDeleteWithoutIdApi, requestApi } from '~/libs/axios';
import NotifyUtil from '~/utils/NotifyUtil';
import { PRESENTATION_CREATE_API, PRESENTATION_DELETE_API, PRESENTATION_INDEX_API } from './api/presentation.api';
import { presentationGridColDef } from './config/colDef';
import { PresentationDto } from './types/presentation';
import { useNavigate } from 'react-router-dom';

interface Props {}

const PresentationPage: React.FC<Props> = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalBaseRef>(null);

    const navigate = useNavigate();

    const gridController = useBaseGrid<PresentationDto>({
        url: PRESENTATION_INDEX_API,
        gridRef: gridRef,
    });

    const handleCreate = async () => {
        gridRef.current?.api.showLoadingOverlay();

        const response = await requestApi<{
            presentation: PresentationDto;
            slides: [];
        }>('post', PRESENTATION_CREATE_API, {
            name: 'Bản trình bày chưa có tiêu đề',
        });

        gridRef.current?.api.hideOverlay();

        if (response.status !== 200) {
            // todo: error handling ...
            NotifyUtil.error('Có lỗi xảy ra');

            return;
        }

        handleDetail(response.data.result?.presentation || ({} as PresentationDto));
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
                    hasDeleteBtn: true,
                    onClickDetailBtn: handleDetail,
                    onClickDeleteBtn: handleDelete,
                }}
                defaultColDef={{
                    autoHeight: true,
                }}
                actionRowsWidth={100}
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
