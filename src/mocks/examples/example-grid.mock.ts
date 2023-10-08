import { MockAxios, ResultResponse } from '~/libs/axios';

MockAxios.onGet('/api/example/grid/index').reply<any>(200, {
    status: 200,
    success: true,
    result: {
        totalCount: 2,
        offset: 0,
        limit: 10,
        totalPages: 1,
        currentPage: 1,
        items: [
            {
                id: '1',
                name: 'Khoa Trần',
                code: 'KT',
                age: 23,
                gender: 'Male',
            },
            {
                id: '2',
                name: 'Khoa Trần',
                code: 'KT',
                age: 23,
                gender: 'Male',
            },
        ],
    },
});
