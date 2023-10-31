import React from 'react';
import { BaseGridRef } from '~/components/grid/BaseGrid';
import { PaginatedList, PaginatedListQuery, requestApi } from '~/libs/axios';

export interface BaseGridResponse<TData> {
    loading: boolean;
    data: TData[] | undefined;
    reloadData(): void;
}

interface Props {
    url: string;
    gridRef?: React.RefObject<BaseGridRef>;
    pageSize?: number;
}

interface State<TData> {
    loading: boolean;
    data: TData[] | undefined;
}

export function useBaseGrid<TData>({
    pageSize = Number.MAX_SAFE_INTEGER,
    ...props
}: Props): BaseGridResponse<TData> | null {
    const [state, setState] = React.useState<State<TData>>({
        loading: true,
        data: undefined,
    });

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (limit: number = pageSize) => {
        props.gridRef?.current?.api?.showLoadingOverlay?.();
        const query: PaginatedListQuery = {
            offset: 0,
            limit: limit,
        };

        const response = await requestApi<PaginatedList<TData>>('get', props.url, {}, { params: query });

        if (response.status === 200) {
            setState({
                loading: false,
                data: response.data?.result?.items,
            });
        }
        props.gridRef?.current?.api.sizeColumnsToFit();
        props.gridRef?.current?.api.hideOverlay();
    };

    return {
        ...state,
        reloadData: fetchData,
    };
}
