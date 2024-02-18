import React, { useRef } from 'react';
import BaseGrid, { BaseGridRef } from '~/components/grid/BaseGrid';
import GridToolbar from '~/components/grid/components/GridToolbar';
import { AppContainer } from '~/components/layouts/AppContainer';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';
import { useBaseGrid } from '~/hooks/useBaseGrid';

import { SESSION_INDEX_API } from './api/session.api';
import { sessionGridColDef } from './config/colDef';
import { SessionDto } from './types/session';

interface Props {}

const SessionDashboardPage: React.FC<Props> = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalBaseRef>(null);

    const gridController = useBaseGrid<SessionDto>({
        url: SESSION_INDEX_API,
        gridRef: gridRef,
    });

    const handleDetail = async (data: SessionDto) =>
        window.open('/dashboard/present-session/' + data.sessionID, '_blank');
    return (
        <AppContainer>
            <BaseGrid
                {...gridController}
                columnDefs={sessionGridColDef}
                ref={gridRef}
                actionRowsList={{
                    hasDetailBtn: true,
                    hasDeleteBtn: false,
                    onClickDetailBtn: handleDetail,
                }}
                defaultColDef={{
                    autoHeight: true,
                }}
                actionRowsWidth={80}
                toolbar={{
                    rightToolbar: (
                        <GridToolbar
                            hasCreateButton
                            hasRefreshButton
                            onClickRefreshButton={gridController?.reloadData}
                        />
                    ),
                }}
            />
            <ModalBase ref={modalRef} />
        </AppContainer>
    );
};

export default SessionDashboardPage;
