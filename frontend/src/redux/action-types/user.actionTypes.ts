export enum userActionTypes {
	USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
	USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
	USER_LOGIN_FAIL = 'USER_LOGIN_FAIL',

	USER_LOGOUT = 'USER_LOGOUT',

	USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST',
	USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS',
	USER_REGISTER_FAIL = 'USER_REGISTER_FAIL',

	USER_LIST_REQUEST = 'USER_LIST_REQUEST',
	USER_LIST_SUCCESS = 'USER_LIST_SUCCESS',
	USER_LIST_FAIL = 'USER_LIST_FAIL',
	USER_LIST_RESET = 'USER_LIST_RESET',

	USER_DELETE_REQUEST = 'USER_DELETE_REQUEST',
	USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS',
	USER_DELETE_FAIL = 'USER_DELETE_FAIL',

	USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST',
	USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS',
	USER_UPDATE_FAIL = 'USER_UPDATE_FAIL',
	USER_UPDATE_RESET = 'USER_UPDATE_RESET',
}