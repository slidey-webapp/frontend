import { APP_API_PATH } from '~/configs/global.api';

export const GROUP_INDEX_API = APP_API_PATH + '/group';
export const GROUP_CREATE_API = APP_API_PATH + '/group/create';
export const GROUP_UPDATE_API = APP_API_PATH + '/group/update';
export const GROUP_DELETE_API = APP_API_PATH + '/group/delete';
export const GROUP_DETAIL_API = APP_API_PATH + '/group/detail';

export const GROUP_SEND_INVITATION_API = APP_API_PATH + '/group/send-invitation';
export const GROUP_MEMBER_JOIN_API = APP_API_PATH + '/group/join';
export const GROUP_GET_MEMBERS_API = APP_API_PATH + '/group/members';
export const GROUP_UPDATE_MEMBER_ROLE_API= APP_API_PATH + '/group/member/update-role';
export const GROUP_REMOVE_MEMBER_API= APP_API_PATH + '/group/member/remove';
