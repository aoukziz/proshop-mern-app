import { userActionTypes } from '../action-types/user.actionTypes';
import { User } from '../../models-interfaces/User';

interface UserLoginRequestAction {
	type: userActionTypes.USER_LOGIN_REQUEST;
}

interface UserLoginSuccessAction {
	type: userActionTypes.USER_LOGIN_SUCCESS;
	payload: User;
}

interface UserLoginFailAction {
	type: userActionTypes.USER_LOGIN_FAIL;
	payload: string;
}

interface UserLogoutAction {
	type: userActionTypes.USER_LOGOUT;
}

export type UserLoginAction =
	| UserLoginRequestAction
	| UserLoginSuccessAction
	| UserLoginFailAction
	| UserLogoutAction;

interface UserRegisterRequestAction {
	type: userActionTypes.USER_REGISTER_REQUEST;
}

interface UserRegisterSuccessAction {
	type: userActionTypes.USER_REGISTER_SUCCESS;
	payload: User;
}

interface UserRegisterFailAction {
	type: userActionTypes.USER_REGISTER_FAIL;
	payload: string;
}

export type UserRegisterAction =
	| UserRegisterRequestAction
	| UserRegisterSuccessAction
	| UserRegisterFailAction;

interface UserListRequestAction {
	type: userActionTypes.USER_LIST_REQUEST;
}

interface UserListSuccessAction {
	type: userActionTypes.USER_LIST_SUCCESS;
	payload: User[];
}

interface UserListFailAction {
	type: userActionTypes.USER_LIST_FAIL;
	payload: string;
}

interface UserListResetAction {
	type: userActionTypes.USER_LIST_RESET;
}

export type UserListAction =
	| UserListRequestAction
	| UserListSuccessAction
	| UserListFailAction
	| UserListResetAction;

interface UserDeleteRequestAction {
	type: userActionTypes.USER_DELETE_REQUEST;
}

interface UserDeleteSuccessAction {
	type: userActionTypes.USER_DELETE_SUCCESS;
}

interface UserDeleteFailAction {
	type: userActionTypes.USER_DELETE_FAIL;
	payload: string;
}

export type UserDeleteAction =
	| UserDeleteRequestAction
	| UserDeleteSuccessAction
	| UserDeleteFailAction;

interface UserUpdateRequestAction {
	type: userActionTypes.USER_UPDATE_REQUEST;
}

interface UserUpdateSuccessAction {
	type: userActionTypes.USER_UPDATE_SUCCESS;
}

interface UserUpdateFailAction {
	type: userActionTypes.USER_UPDATE_FAIL;
	payload: string;
}

interface UserUpdateResetAction {
	type: userActionTypes.USER_UPDATE_RESET;
}

export type UserUpdateAction =
	| UserUpdateRequestAction
	| UserUpdateSuccessAction
	| UserUpdateFailAction
	| UserUpdateResetAction;
