import { AxiosResponse } from 'axios';

import { useQuery } from 'react-query';
import { ApiResponse, requestApi } from '~/libs/axios';
import { ExtractFnReturnType, QueryConfig } from '~/libs/react-query';
import { Id } from '~/types/shared';
import { GroupDto } from '../types/group';
import { GROUP_DETAIL_API } from './group.api';

export const getGroupDetail = async (
    id: Id,
    {
        signal,
    }: {
        signal: AbortSignal | undefined;
    },
): Promise<AxiosResponse<ApiResponse<{ group: GroupDto }>>> => {
    return requestApi('get', GROUP_DETAIL_API, null, {
        signal,
        params: {
            groupID: id,
        },
    });
};

type QueryFnType = typeof getGroupDetail;

type UseGroupDetail = QueryConfig<QueryFnType>;

export const useGroupDetail = (id: Id, config?: UseGroupDetail) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['GroupDetail', id],
        queryFn: ({ signal }) => getGroupDetail(id, { signal }),
        ...config,
    });
};
