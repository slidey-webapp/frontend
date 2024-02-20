import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { ApiResponse, requestApi } from '~/libs/axios';
import { ExtractFnReturnType, QueryConfig } from '~/libs/react-query';
import { ComboOption } from '~/types/shared';
import { GROUP_COMBO_API } from './group.api';

export const getGroupCombo = async ({
    signal,
}: {
    signal: AbortSignal | undefined;
}): Promise<AxiosResponse<ApiResponse<ComboOption[]>>> => {
    return requestApi('get', GROUP_COMBO_API, null, { signal });
};

type QueryFnType = typeof getGroupCombo;

type UseGroupCombo = QueryConfig<QueryFnType>;

export const useGroupCombo = (config?: UseGroupCombo) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['GroupCombo'],
        queryFn: ({ signal }) => getGroupCombo({ signal }),
        ...config,
    });
};
