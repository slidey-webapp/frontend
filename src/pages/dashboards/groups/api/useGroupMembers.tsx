import { AxiosResponse } from 'axios';

import { useQuery } from 'react-query';
import { ApiResponse, requestApi } from '~/libs/axios';
import { ExtractFnReturnType, QueryConfig } from '~/libs/react-query';
import { Id } from '~/types/shared';
import { GroupMemberDto } from '../types/group';
import { GROUP_GET_MEMBERS_API } from './group.api';

export const getGroupMembers = async (
    id: Id,
    {
        signal,
    }: {
        signal: AbortSignal | undefined;
    },
): Promise<AxiosResponse<ApiResponse<{ members: GroupMemberDto[] }>>> => {
    return requestApi('get', GROUP_GET_MEMBERS_API, null, {
        signal,
        params: {
            groupID: id,
        },
    });
};

type QueryFnType = typeof getGroupMembers;

type UseGroupMembers = QueryConfig<QueryFnType>;

export const useGroupMembers = (id: Id, config?: UseGroupMembers) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['GroupMembers', id],
        queryFn: ({ signal }) => getGroupMembers(id, { signal }),
        ...config,
    });
};
