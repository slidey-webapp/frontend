import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseGrid, { BaseGridRef } from '~/components/grid/BaseGrid';
import GridToolbar from '~/components/grid/components/GridToolbar';
import { useBaseGrid } from '~/hooks/useBaseGrid';
import { SESSION_INDEX_API } from '~/pages/sessions/api/session.api';
import { SessionDto } from '~/pages/sessions/types/session';
import { Id } from '~/types/shared';
import { sessionGridColDef } from '../config/colDef';

interface Props {
    presentationID?: Id;
    hideToolbar?: boolean;
}

const SessionGrid: React.FC<Props> = ({ presentationID, hideToolbar }) => {
    const gridRef = useRef<BaseGridRef>(null);

    const navigate = useNavigate();

    const gridController = useBaseGrid<SessionDto>({
        url: SESSION_INDEX_API,
        params: {
            presentationID,
        },
        gridRef: gridRef,
    });

    const handleDetail = async (data: SessionDto) => navigate('/dashboard/present-session/' + data.sessionID);

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
            toolbar={
                hideToolbar
                    ? undefined
                    : {
                          rightToolbar: (
                              <GridToolbar
                                  hasCreateButton={false}
                                  hasRefreshButton
                                  onClickRefreshButton={gridController?.reloadData}
                              />
                          ),
                      }
            }
        />
    );
};

export default SessionGrid;
