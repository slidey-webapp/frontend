import React, { useRef } from 'react';
import BaseGrid, { BaseGridRef } from '~/components/grid/BaseGrid';
import GridToolbar from '~/components/grid/components/GridToolbar';
import { AppContainer } from '~/components/layouts/AppContainer';
import Loading from '~/components/loadings/Loading';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';
import { useBaseGrid } from '~/hooks/useBaseGrid';
import { baseDeleteApi } from '~/libs/axios';
import { EXAMPLE_GRID_DELETE_API, EXAMPLE_GRID_INDEX_API } from './api/example-grid.api';
import { ExampleGridColDef } from './configs/colDef';
import { ExampleGridDto } from './types/example-grid';

export interface Props {}

const ExampleGrid: React.FC<Props> = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalBaseRef>(null);

    const gridController = useBaseGrid<ExampleGridDto>({
        url: EXAMPLE_GRID_INDEX_API,
        gridRef: gridRef,
    });

    const handleCreate = () => {
        modalRef.current?.onOpen(<div>Create modal</div>, 'Tạo mới', '50%');
    };

    const handleUpdate = (data: ExampleGridDto) => {
        console.log(data)
        modalRef.current?.onOpen(<div>Update modal</div>, 'Cập nhật', '50%');
    };

    const handleDelete = (data: Record<string, any>) => {
        baseDeleteApi(EXAMPLE_GRID_DELETE_API, data.id);
        gridController?.reloadData();
    };

    if (gridController?.loading) return <Loading />;
    return (
        <AppContainer>
            <BaseGrid
                columnDefs={ExampleGridColDef}
                data={gridController?.data}
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
                groupDisplayType={'groupRows'}
                groupDefaultExpanded={-1}
            >
                <GridToolbar
                    hasCreateButton
                    hasRefreshButton
                    onClickCreateButton={handleCreate}
                    onClickRefreshButton={gridController?.reloadData}
                />
            </BaseGrid>
            <ModalBase ref={modalRef} />
        </AppContainer>
    );
};

export default ExampleGrid;
