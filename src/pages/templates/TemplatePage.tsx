import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseGrid, { BaseGridRef } from '~/components/grid/BaseGrid';
import GridToolbar from '~/components/grid/components/GridToolbar';
import { AppContainer } from '~/components/layouts/AppContainer';
import { useBaseGrid } from '~/hooks/useBaseGrid';
import { requestApi } from '~/libs/axios';
import NotifyUtil from '~/utils/NotifyUtil';
import { PRESENTATION_CREATE_API } from '../presentations/api/presentation.api';
import { PresentationDto } from '../presentations/types/presentation';
import { TEMPLATE_INDEX_API } from './api/template.api';
import { presentationGridColDef } from './configs/colDef';

interface Props {}

const TemplatePage: React.FC<Props> = () => {
    const gridRef = useRef<BaseGridRef>(null);

    const navigate = useNavigate();

    const gridController = useBaseGrid<PresentationDto>({
        url: TEMPLATE_INDEX_API,
        gridRef: gridRef,
    });

    const handleCreate = async () => {
        navigate('/template/create');
    };

    const handleDetail = async (data: PresentationDto) => {
        ///
        // navigate('/presentation/edit/' + data.presentationID)
    };

    return (
        <AppContainer>
            <BaseGrid
                {...gridController}
                columnDefs={presentationGridColDef}
                ref={gridRef}
                actionRowsList={{
                    hasDetailBtn: true,
                    onClickDetailBtn: handleDetail,
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
        </AppContainer>
    );
};

export default TemplatePage;
