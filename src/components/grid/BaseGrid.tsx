import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ColGroupDef, GetDataPath, ModuleRegistry, RowGroupingDisplayType } from '@ag-grid-community/core';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import clsx from 'clsx';
import _ from 'lodash';
import React from 'react';
import { BaseGridResponse } from '~/hooks/useBaseGrid';
import emptySrc from '~/images/empty.svg';
import NotifyUtil from '~/utils/NotifyUtil';
import ButtonIconBase from '../buttons/ButtonIconBase';
import Loading from '../loadings/Loading';
import GridPagination from './components/GridPagination';
import './styles/base-grid.scss';

export interface BaseGridColDef extends ColDef, Partial<ColGroupDef> {}

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export interface BaseGridProps extends BaseGridResponse<any> {
    columnDefs: BaseGridColDef[];
    defaultColDef?: BaseGridColDef;
    gridConfig?: GridConfig;
    numberRows?: boolean;
    actionRows?: boolean;
    actionRowsList?: {
        hasEditBtn?: boolean | ((data: any) => boolean);
        hasDeleteBtn?: boolean | ((data: any) => boolean);
        hasDetailBtn?: boolean | ((data: any) => boolean);
        hasCreateChildBtn?: boolean;
        hasAddUserBtn?: boolean;
        onClickEditBtn?: (data: any) => void;
        onClickDeleteBtn?: (data: any) => void;
        onClickDetailBtn?: (data: any) => void;
        renderLeftActions?: (data: any) => JSX.Element;
        renderRightActions?: (data: any) => JSX.Element;
    };
    actionRowsWidth?: number;
    treeData?: boolean;
    getDataPath?: GetDataPath;
    groupDefaultExpanded?: number;
    autoGroupColumnDef?: ColDef<any>;
    groupDisplayType?: RowGroupingDisplayType;
    toolbar?: {
        rightToolbar?: JSX.Element;
        leftToolbar?: JSX.Element;
    };
}

interface GridConfig extends AgGridReactProps {}

export interface BaseGridRef extends AgGridReact {}

const BaseGrid = React.forwardRef<BaseGridRef, BaseGridProps>((props, ref) => {
    const { numberRows = true, actionRows = true, actionRowsList, paginatedList } = props;

    const customColDefs = (
        numberRows
            ? [
                  {
                      field: 'stt',
                      headerName: 'STT',
                      width: 50,
                      maxWidth: 50,
                      minWidth: 50,
                      resizable: false,
                      cellStyle: {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                      },
                      suppressMovable: true,
                      valueGetter: params => {
                          const rowIndex = _.get(params, 'node.rowIndex');

                          return Number(rowIndex) + 1 + paginatedList.currentPage * paginatedList.limit;
                      },
                  },
              ]
            : []
    ) as BaseGridColDef[];

    customColDefs.push(...props.columnDefs);

    const renderDetailButton = (data: any) => {
        if (!actionRowsList?.hasDetailBtn) return null;
        const button = (
            <ButtonIconBase
                icon={'info'}
                onClick={() => {
                    actionRowsList.onClickDetailBtn?.(data);
                }}
                tooltip="Chi tiết"
            />
        );
        if (typeof actionRowsList?.hasDetailBtn === 'boolean') {
            if (actionRowsList.hasDetailBtn) {
                return button;
            }

            return null;
        }

        const isDisplay = actionRowsList?.hasDetailBtn(data);
        if (!isDisplay) return null;

        return button;
    };

    const renderUpdateButton = (data: any) => {
        if (!actionRowsList?.hasEditBtn) return null;
        const button = (
            <ButtonIconBase
                icon={'edit'}
                color={'success'}
                onClick={() => {
                    actionRowsList.onClickEditBtn?.(data);
                }}
                tooltip="Cập nhật"
            />
        );
        if (typeof actionRowsList?.hasEditBtn === 'boolean') {
            if (actionRowsList.hasEditBtn) {
                return button;
            }

            return null;
        }

        const isDisplay = actionRowsList?.hasEditBtn(data);
        if (!isDisplay) return null;

        return button;
    };

    const renderDeleteButton = (data: any) => {
        if (!actionRowsList?.hasDeleteBtn) return null;
        const button = (
            <ButtonIconBase
                icon={'delete'}
                tooltip="Xóa"
                color={'error'}
                onClick={() => {
                    NotifyUtil.confirmDialog('Thông báo', 'Bạn có chắc muốn xóa ?').then(confirm => {
                        if (confirm.isConfirmed) actionRowsList.onClickDeleteBtn?.(data);
                    });
                }}
            />
        );
        if (typeof actionRowsList?.hasDeleteBtn === 'boolean') {
            if (actionRowsList.hasDeleteBtn) {
                return button;
            }

            return null;
        }

        const isDisplay = actionRowsList?.hasDeleteBtn(data);
        if (!isDisplay) return null;

        return button;
    };

    actionRows &&
        customColDefs.push({
            field: 'actionRows',
            headerName: 'Hành động',
            width: props.actionRowsWidth ?? 100,
            maxWidth: props.actionRowsWidth ?? 100,
            minWidth: props.actionRowsWidth ?? 100,
            cellStyle: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            resizable: false,
            suppressMovable: true,
            // pinned: 'right',
            cellRenderer: (params: any) => {
                const data = _.get(params, 'data');
                return (
                    <div className="w-full h-full flex items-center justify-center">
                        {actionRowsList?.renderLeftActions?.(data)}
                        {renderDetailButton(data)}
                        {renderUpdateButton(data)}
                        {renderDeleteButton(data)}
                        {actionRowsList?.renderRightActions?.(data)}
                    </div>
                );
            },
        });

    return (
        <div className="w-full h-full flex flex-col">
            {!_.isEmpty(props.toolbar) && (
                <div className="w-full h-fit min-h-[40px] mb-7">
                    <div className="w-full flex items-center justify-between">
                        {props.toolbar.leftToolbar && (
                            <div className="flex flex-1 items-center justify-start mr-2">
                                {props.toolbar.leftToolbar}
                            </div>
                        )}
                        {props.toolbar.rightToolbar && (
                            <div className="flex flex-1 items-center justify-end ml-2">
                                {props.toolbar.rightToolbar}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="w-full flex-1 ag-theme-alpine grid base-grid">
                <div className="w-full h-full flex flex-col relative">
                    <AgGridReact
                        className="flex-1"
                        ref={ref}
                        rowData={paginatedList.items}
                        autoGroupColumnDef={props.autoGroupColumnDef}
                        columnDefs={customColDefs}
                        defaultColDef={{
                            resizable: true,
                            floatingFilter: false,
                            ...props.defaultColDef,
                        }}
                        loadingOverlayComponent={() => <Loading />}
                        noRowsOverlayComponent={() => <Loading />}
                        treeData={props.treeData}
                        animateRows
                        getDataPath={props.getDataPath}
                        groupDefaultExpanded={props.groupDefaultExpanded}
                        detailCellRenderer
                        groupDisplayType={props.groupDisplayType}
                        onGridSizeChanged={event => {
                            event?.api?.sizeColumnsToFit?.();
                        }}
                        onColumnResized={event => {
                            if (
                                !event.finished ||
                                event.source === 'uiColumnDragged' ||
                                event.source == 'sizeColumnsToFit'
                            )
                                return;

                            event?.api?.sizeColumnsToFit?.();
                        }}
                        {...props.gridConfig}
                    />
                    <GridPagination onChangePage={props.onChangePage} paginatedList={props.paginatedList} />
                    {paginatedList?.items?.length === 0 && (
                        <div
                            className={clsx('w-full bg-white absolute z-999 ')}
                            style={{
                                height: 'calc(100% - 50px - 49px)',
                                width: 'calc(100% - 2px)',
                                top: 50,
                                left: 1,
                                borderEndEndRadius: '10px',
                            }}
                        >
                            <div className="flex flex-col items-center justify-center w-full h-full select-none">
                                <img
                                    src={emptySrc}
                                    style={{
                                        height: 120,
                                        objectFit: 'cover',
                                    }}
                                />
                                <div className="mt-2 text-base">Không có dữ liệu</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export default BaseGrid;
