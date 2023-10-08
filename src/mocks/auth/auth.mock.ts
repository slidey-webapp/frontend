import { MockAxios } from '~/libs/axios';

MockAxios.onPost('/api/identity/login').reply<any>(200, {
    status: 200,
    success: true,
    result: {},
});

MockAxios.onGet('/api/identity/auth').reply<any>(200, {
    status: 200,
    success: true,
    result: {},
});

MockAxios.onGet('/api/identity/logout').reply<any>(200, {
    status: 200,
    success: true,
    result: {},
});
