import { MockAxios } from '~/libs/axios';

MockAxios.onGet('/api/example/grid/index', {
    params: {
        offset: 0,
        limit: 2,
    },
}).reply<any>(200, {
    status: 200,
    success: true,
    result: {
        totalCount: 5,
        totalPages: 3,
        offset: 0,
        limit: 2,
        currentPage: 0,
        items: [
            {
                id: '1',
                name: 'Khoa Trần 1 ',
                code: 'KT',
                age: 23,
                gender: 'Male',
            },
            {
                id: '2',
                name: 'Khoa Trần 2 ',
                code: 'KT',
                age: 23,
                gender: 'Male',
            },
        ],
    },
});

MockAxios.onGet('/api/example/grid/index', {
    params: {
        offset: 2,
        limit: 2,
    },
}).reply<any>(200, {
    status: 200,
    success: true,
    result: {
        totalCount: 5,
        totalPages: 3,
        offset: 2,
        limit: 2,
        currentPage: 1,
        items: [
            {
                id: '3',
                name: 'Khoa Trần 3',
                code: 'KT',
                age: 23,
                gender: 'Male',
            },
            {
                id: '4',
                name: 'Khoa Trần 4',
                code: 'KT',
                age: 23,
                gender: 'Male',
            },
        ],
    },
});

MockAxios.onGet('/api/example/grid/index', {
    params: {
        offset: 4,
        limit: 2,
    },
}).reply<any>(200, {
    status: 200,
    success: true,
    result: {
        totalCount: 5,
        totalPages: 3,
        offset: 4,
        limit: 2,
        currentPage: 2,
        items: [
            {
                id: '5',
                name: 'Khoa Trần 5',
                code: 'KT',
                age: 23,
                gender: 'Male',
            },
        ],
    },
});
