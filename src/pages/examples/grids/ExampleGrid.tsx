import React, { useRef } from 'react';
import BaseGrid, { BaseGridRef } from '~/components/grid/BaseGrid';
import GridToolbar from '~/components/grid/components/GridToolbar';
import { AppContainer } from '~/components/layouts/AppContainer';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';
import { useBaseGrid } from '~/hooks/useBaseGrid';
import { baseDeleteApi } from '~/libs/axios';
import { EXAMPLE_GRID_DELETE_API, EXAMPLE_GRID_INDEX_API } from './api/example-grid.api';
import { ExampleGridColDef } from './configs/colDef';
import { ExampleGridDto } from './types/example-grid';
import { Typography } from '@mui/material';

export interface Props {}

const ExampleGrid: React.FC<Props> = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalBaseRef>(null);

    const gridController = useBaseGrid<ExampleGridDto>({
        url: EXAMPLE_GRID_INDEX_API,
        gridRef: gridRef,
        pageSize: 2,
    });

    const handleCreate = () => {
        modalRef.current?.onOpen(<div>Create modal</div>, 'Tạo mới', '50%');
    };

    const handleUpdate = (data: ExampleGridDto) => {
        modalRef.current?.onOpen(<div>Update modal</div>, 'Cập nhật', '50%');
    };

    const handleDelete = (data: Record<string, any>) => {
        baseDeleteApi(EXAMPLE_GRID_DELETE_API, data.id);
        gridController?.reloadData();
    };

    return (
        <AppContainer>
            <BaseGrid
                {...gridController}
                columnDefs={ExampleGridColDef}
                ref={gridRef}
                actionRowsList={{
                    hasEditBtn: true,
                    hasDeleteBtn: true,
                    onClickEditBtn: handleUpdate,
                    onClickDeleteBtn: handleDelete,
                }}
                defaultColDef={{
                    autoHeight: true,
                }}
                actionRowsWidth={100}
                pagination
                toolbar={{
                    leftToolbar: <Typography variant="h4">Customers</Typography>,

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

export default ExampleGrid;
