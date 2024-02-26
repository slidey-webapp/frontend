import React, { useEffect, useState } from 'react';
import { BaseGridRef } from '~/components/grid/BaseGrid';
import { PaginatedList, PaginatedListQuery, requestApi } from '~/libs/axios';

type Param = {
    [key: string]: any;
};

export interface BaseGridResponse<TData> {
    paginatedList: PaginatedList<TData>;
    reloadData: () => void;
    onChangePage: (pageNumber: number) => void;
    mask: () => void;
    unmask: () => void;
}

interface Props<TData> {
    url: string;
    gridRef: React.RefObject<BaseGridRef>;
    pageSize?: number;
    params?: Param;
    customData?: (data: TData[]) => TData[];
}

export function useBaseGrid<TData>(props: Props<TData>): BaseGridResponse<TData> {
    const [paginatedQuery, setPaginatedQuery] = useState<PaginatedListQuery>({
        offset: 0,
        limit: props.pageSize || 10,
    });
    const [paginatedList, setPaginatedList] = useState<PaginatedList<TData>>({
        totalCount: 0,
        offset: paginatedQuery.offset,
        limit: paginatedQuery.limit,
        totalPages: 0,
        currentPage: 0,
        items: [],
    });

    useEffect(() => {
        fetchData();
    }, [paginatedQuery.offset, paginatedQuery.limit]);

    const onChangePage = (pageNumber: number) => {
        setPaginatedQuery(pre => ({
            ...pre,
            offset: (pageNumber - 1) * pre.limit,
        }));
    };

    const fetchData = async () => {
        props.gridRef?.current?.api?.showLoadingOverlay?.();
        const response = await requestApi<PaginatedList<TData>>(
            'get',
            props.url,
            {},
            {
                params: {
                    ...props.params,
                    ...paginatedQuery,
                },
            },
        );

        if (response.status === 200 && response.data?.result) {
            setPaginatedList(response.data?.result);
        }
        props.gridRef?.current?.api?.sizeColumnsToFit();
        props.gridRef?.current?.api?.hideOverlay();
    };

    return {
        paginatedList: paginatedList,
        reloadData: fetchData,
        onChangePage,
        mask: () => props.gridRef?.current?.api?.showLoadingOverlay?.(),
        unmask: () => {
            setTimeout(() => props.gridRef?.current?.api?.hideOverlay, 250);
        },
    };
}
