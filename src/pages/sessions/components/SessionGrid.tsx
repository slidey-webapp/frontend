import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonIconBase from '~/components/buttons/ButtonIconBase';
import BaseGrid, { BaseGridProps, BaseGridRef } from '~/components/grid/BaseGrid';
import GridToolbar from '~/components/grid/components/GridToolbar';
import { useBaseGrid } from '~/hooks/useBaseGrid';
import { requestApi } from '~/libs/axios';
import { SESSION_END_API } from '~/pages/presentations/api/presentation.api';
import { SessionDto } from '~/pages/presentations/types/session';
import { SESSION_INDEX_API } from '~/pages/sessions/api/session.api';
import { Id } from '~/types/shared';
import NotifyUtil from '~/utils/NotifyUtil';
import { sessionGridColDef } from '../config/colDef';

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

    const handleEndSession = async (session: SessionDto) => {
        NotifyUtil.confirmDialog('Thông báo', 'Bạn có chắc muốn kết thúc phiên ?').then(async confirm => {
            if (confirm.isConfirmed) {
                gridController.mask();
                const response = await requestApi('post', SESSION_END_API, {
                    sessionID: session.sessionID,
                });
                gridController.unmask();

                if (response.status === 200) {
                    NotifyUtil.success('Kết thúc phiên thành công!');
                    gridController.reloadData();
                    return;
                }

                response.data.message && NotifyUtil.error(response.data.message);
            }
        });
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
                renderLeftActions: (session: SessionDto) => {
                    if (session.status === 'ENDED') return <></>;

                    return (
                        <ButtonIconBase
                            icon={'power-setting'}
                            onClick={() => handleEndSession(session)}
                            tooltip="Kết thúc phiên"
                            color="error"
                        />
                    );
                },
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
