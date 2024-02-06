import { APP_API_PATH } from '~/configs/global.api';

export const PRESENTATION_INDEX_API = APP_API_PATH + '/presentation';
export const PRESENTATION_CREATE_API = APP_API_PATH + '/presentation/create';
export const PRESENTATION_UPDATE_API = APP_API_PATH + '/presentation/update';
export const PRESENTATION_DELETE_API = APP_API_PATH + '/presentation/delete';
export const PRESENTATION_DETAIL_API = APP_API_PATH + '/presentation/detail';

export const PRESENTATION_CREATE_SLIDE_API = APP_API_PATH + '/presentation/slide';

export const COLLABORATION_JOIN_API = APP_API_PATH + '/presentation/collab/join';
export const COLLABORATION_INVITATION_API = APP_API_PATH + '/presentation/collab/send-invitation';
export const COLLABORATION_DELETE_API = APP_API_PATH + '/presentation/collab/delete';
export const COLLABORATION_INDEX_API = APP_API_PATH + '/presentation/collab';

// session

export const SESSION_INITIAL_API = APP_API_PATH + '/session/init';
export const SESSION_START_API = APP_API_PATH + '/session/start';
export const SESSION_END_API = APP_API_PATH + '/session/end';
export const SESSION_JOIN_API = APP_API_PATH + '/session/join';
export const SESSION_DETAIL_API = APP_API_PATH + '/session/detail';
export const SESSION_SLIDE_CHANGED_API = APP_API_PATH + '/session/slide/change-slide';
