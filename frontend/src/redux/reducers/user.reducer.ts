import { userActionTypes } from '../action-types/user.actionTypes';
import { User } from '../../models-interfaces/User';
import {
	UserDeleteAction,
	UserListAction,
	UserLoginAction,
	UserRegisterAction,
	UserUpdateAction,
} from '../actions/user.actions';

export interface UserState {
	loading: boolean;
	error: string | null;
	userInfo: User | null;
}

export interface UserListState {
	loading: boolean;
	error: string | null;
	users: User[] | null;
}

export interface UserUpdateState {
	loading: boolean;
	error: string | null;
	success: boolean;
}

export interface UserDeleteState {
	loading: boolean;
	error: string | null;
	success: boolean;
}

const initialState = {
	loading: false,
	userInfo: null,
	error: null,
};

export const userLoginReducer = (
	state: UserState = initialState,
	action: UserLoginAction
): UserState => {
	switch (action.type) {
		case userActionTypes.USER_LOGIN_REQUEST:
			return { ...state, loading: true };
		case userActionTypes.USER_LOGIN_SUCCESS:
			return { ...state, loading: false, userInfo: action.payload };
		case userActionTypes.USER_LOGIN_FAIL:
			return { ...state, loading: false, error: action.payload };
		case userActionTypes.USER_LOGOUT:
			return { loading: false, userInfo: null, error: null };
		default:
			return state;
	}
};

export const userRegisterReducer = (
	state: UserState = initialState,
	action: UserRegisterAction
): UserState => {
	switch (action.type) {
		case userActionTypes.USER_REGISTER_REQUEST:
			return { ...state, loading: true };
		case userActionTypes.USER_REGISTER_SUCCESS:
			return { ...state, loading: false, userInfo: action.payload };
		case userActionTypes.USER_REGISTER_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userListReducer = (
	state: UserListState = { loading: false, error: null, users: [] },
	action: UserListAction
): UserListState => {
	switch (action.type) {
		case userActionTypes.USER_LIST_REQUEST:
			return { ...state, loading: true };
		case userActionTypes.USER_LIST_SUCCESS:
			return { ...state, loading: false, users: action.payload };
		case userActionTypes.USER_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };
		case userActionTypes.USER_LIST_RESET:
			return { loading: false, error: null, users: [] };
		default:
			return state;
	}
};

export const userDeleteReducer = (
	state: UserDeleteState = { loading: false, error: null, success: false },
	action: UserDeleteAction
): UserDeleteState => {
	switch (action.type) {
		case userActionTypes.USER_DELETE_REQUEST:
			return { ...state, loading: true };
		case userActionTypes.USER_DELETE_SUCCESS:
			return { ...state, loading: false, success: true };
		case userActionTypes.USER_DELETE_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userUpdateReducer = (
	state: UserUpdateState = { loading: false, error: null, success: false },
	action: UserUpdateAction
): UserUpdateState => {
	switch (action.type) {
		case userActionTypes.USER_UPDATE_REQUEST:
			return { ...state, loading: true };
		case userActionTypes.USER_UPDATE_SUCCESS:
			return { ...state, loading: false, success: true };
		case userActionTypes.USER_UPDATE_FAIL:
			return { ...state, loading: false, error: action.payload };
		case userActionTypes.USER_UPDATE_RESET:
			return { loading: false, error: null, success: false };
		default:
			return state;
	}
};
