import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseGrid, { BaseGridProps, BaseGridRef } from '~/components/grid/BaseGrid';
import GridToolbar from '~/components/grid/components/GridToolbar';
import { useBaseGrid } from '~/hooks/useBaseGrid';
import { SESSION_INDEX_API } from '~/pages/sessions/api/session.api';
import { Id } from '~/types/shared';
import { sessionGridColDef } from '../config/colDef';
import { SessionDto } from '~/pages/presentations/types/session';

interface Props {
    presentationID?: Id;
    groupID?: Id;
    hideToolbar?: boolean;
    toolbar?: BaseGridProps['toolbar'];
}

const SessionGrid: React.FC<Props> = ({ presentationID, groupID, toolbar, hideToolbar }) => {
    const gridRef = useRef<BaseGridRef>(null);

    const navigate = useNavigate();

    const gridController = useBaseGrid<SessionDto>({
        url: SESSION_INDEX_API,
        params: {
            presentationID,
            groupID,
        },
        gridRef: gridRef,
    });

    const handleDetail = async (data: SessionDto) => navigate('/dashboard/present-session/' + data.sessionID);

    const renderToolbar = () => {
        if (hideToolbar) return undefined;
        if (toolbar) return toolbar;
        return {
            rightToolbar: (
                <GridToolbar
                    hasCreateButton={false}
                    hasRefreshButton
                    onClickRefreshButton={gridController?.reloadData}
                />
            ),
        };
    };

    return (
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
            actionRowsWidth={100}
            toolbar={renderToolbar()}
        />
    );
};

export default SessionGrid;
