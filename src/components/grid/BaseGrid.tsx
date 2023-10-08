import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ColGroupDef, GetDataPath, ModuleRegistry, RowGroupingDisplayType } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import PencilSquareIcon from '@heroicons/react/24/solid/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import _ from 'lodash';
import React from 'react';
import NotifyUtil from '~/utils/NotifyUtil';
import { ButtonBase } from '../buttons/ButtonBase';

import { SvgIcon } from '@mui/material';
import './styles/base-grid.scss';
import BaseIcon from '../icons/BaseIcon';

export interface BaseGridColDef extends ColDef, Partial<ColGroupDef> {}

ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

export interface BaseGridProps {
    columnDefs: BaseGridColDef[];
    data: any[] | undefined;
    defaultColDef?: BaseGridColDef;
    gridConfig?: GridConfig;
    numberRows?: boolean;
    actionRows?: boolean;
    actionRowsList?: {
        hasEditBtn?: boolean;
        hasDeleteBtn?: boolean;
        hasDetailBtn?: boolean;
        hasCreateChildBtn?: boolean;
        hasAddUserBtn?: boolean;
        onClickEditBtn?: (data: any) => void;
        onClickDeleteBtn?: (data: any) => void;
        onClickDetailBtn?: (data: any) => void;
    };
    actionRowsWidth?: number;
    treeData?: boolean;
    getDataPath?: GetDataPath;
    groupDefaultExpanded?: number;
    autoGroupColumnDef?: ColDef<any>;
    groupDisplayType?: RowGroupingDisplayType;
    pagination?: boolean;
    paginationPageSize?: number;
    children?: React.ReactNode; // grid tool bar
}

interface GridConfig {}

export interface BaseGridRef extends AgGridReact {}

const BaseGrid = React.forwardRef<BaseGridRef, BaseGridProps>((props, ref) => {
    const { numberRows = true, actionRows = true, actionRowsList, pagination = true, paginationPageSize = 10 } = props;

    const customColDefs = (
        numberRows
            ? [
                  {
                      field: 'stt',
                      headerName: 'STT',
                      width: 60,
                      maxWidth: 60,
                      cellStyle: {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                      },
                      valueGetter: params => {
                          const rowIndex = _.get(params, 'node.rowIndex');

                          return Number(rowIndex) + 1;
                      },
                  },
              ]
            : []
    ) as BaseGridColDef[];

    customColDefs.push(...props.columnDefs);

    actionRows &&
        customColDefs.push({
            field: 'actionRows',
            headerName: 'Hành động',
            width: props.actionRowsWidth ?? 100,
            maxWidth: props.actionRowsWidth ?? 100,
            cellStyle: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            cellRenderer: (params: any) => {
                const data = _.get(params, 'data');
                return (
                    <div className="w-full h-full flex items-center justify-center">
                        {actionRowsList?.hasDetailBtn && (
                            <ButtonBase
                                startIcon={'information-circle'}
                                variant={'primary'}
                                onClick={() => {
                                    actionRowsList.onClickDetailBtn?.(data);
                                }}
                                tooltip="Chi tiết"
                            />
                        )}
                        {actionRowsList?.hasEditBtn && (
                            <ButtonBase
                                startIcon={'pencil-square'}
                                variant={'success'}
                                onClick={() => {
                                    actionRowsList.onClickEditBtn?.(data);
                                }}
                                tooltip="Cập nhật"
                            />
                        )}
                        {actionRowsList?.hasDeleteBtn && (
                            <ButtonBase
                                startIcon={'trash'}
                                tooltip="Xóa"
                                variant={'danger'}
                                onClick={() => {
                                    NotifyUtil.confirmDialog('Thông báo', 'Bạn có chắc muốn xóa ?').then(confirm => {
                                        if (confirm.isConfirmed) actionRowsList.onClickDeleteBtn?.(data);
                                    });
                                }}
                            />
                        )}
                    </div>
                );
            },
        });

    return (
        <div className="w-full h-full">
            <div className="h-[6%]">{props.children}</div>
            <div className="w-full h-[94%] ag-theme-alpine grid base-grid">
                {props.data && (
                    <AgGridReact
                        ref={ref}
                        rowData={props.data}
                        autoGroupColumnDef={props.autoGroupColumnDef}
                        columnDefs={customColDefs}
                        defaultColDef={{
                            resizable: true,
                            floatingFilter: false,
                            ...props.defaultColDef,
                        }}
                        loadingOverlayComponent={() => <div>Loading...</div>}
                        pagination={pagination}
                        paginationPageSize={paginationPageSize}
                        onGridReady={params => params.api.sizeColumnsToFit()}
                        treeData={props.treeData}
                        animateRows
                        getDataPath={props.getDataPath}
                        groupDefaultExpanded={props.groupDefaultExpanded}
                        detailCellRenderer
                        groupDisplayType={props.groupDisplayType}
                        {...props.gridConfig}
                    />
                )}
            </div>
        </div>
    );
});

export default BaseGrid;
