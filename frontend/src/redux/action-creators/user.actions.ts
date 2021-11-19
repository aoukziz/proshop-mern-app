import { userDetailsActionTypes } from './../action-types/userDetails.actionTypes';
import axios from 'axios';
import { userActionTypes } from '../action-types/user.actionTypes';
import { Dispatch } from 'redux';
import {
	UserDeleteAction,
	UserListAction,
	UserLoginAction,
	UserRegisterAction,
	UserUpdateAction,
} from '../actions/user.actions';
import { UserDetailsAction } from '../actions/userDetails.actions';
import { userOrdersActionTypes } from '../action-types/order.actionTypes';
import { UserOrdersAction } from '../actions/order.actions';
import { RootState } from '../reducers';

export const login =
	(email: string, password: string) =>
	async (dispatch: Dispatch<UserLoginAction>) => {
		dispatch({ type: userActionTypes.USER_LOGIN_REQUEST });
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const { data } = await axios.post(
				'/api/users/login',
				{ email, password },
				config
			);
			dispatch({
				type: userActionTypes.USER_LOGIN_SUCCESS,
				payload: data,
			});
			localStorage.setItem('userInfo', JSON.stringify(data));
		} catch (error: any) {
			dispatch({
				type: userActionTypes.USER_LOGIN_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const logout =
	() =>
	async (
		dispatch: Dispatch<
			UserLoginAction | UserDetailsAction | UserOrdersAction | UserListAction
		>
	) => {
		localStorage.removeItem('userInfo');
		dispatch({ type: userActionTypes.USER_LOGOUT });
		dispatch({ type: userActionTypes.USER_LIST_RESET });
		dispatch({ type: userDetailsActionTypes.USER_DETAILS_RESET });
		dispatch({ type: userOrdersActionTypes.USER_ORDERS_RESET });
	};

export const register =
	(name: string, email: string, password: string) =>
	async (dispatch: Dispatch<UserRegisterAction | UserLoginAction>) => {
		dispatch({ type: userActionTypes.USER_REGISTER_REQUEST });
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const { data } = await axios.post(
				'/api/users',
				{ name, email, password },
				config
			);
			dispatch({
				type: userActionTypes.USER_REGISTER_SUCCESS,
				payload: data,
			});

			dispatch({
				type: userActionTypes.USER_LOGIN_SUCCESS,
				payload: data,
			});
			localStorage.setItem('userInfo', JSON.stringify(data));
		} catch (error: any) {
			dispatch({
				type: userActionTypes.USER_REGISTER_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const listUsers =
	() =>
	async (dispatch: Dispatch<UserListAction>, getState: () => RootState) => {
		dispatch({ type: userActionTypes.USER_LIST_REQUEST });
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			};
			const { data } = await axios.get('/api/users', config);
			dispatch({
				type: userActionTypes.USER_LIST_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: userActionTypes.USER_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const deleteUser =
	(id: string) =>
	async (dispatch: Dispatch<UserDeleteAction>, getState: () => RootState) => {
		dispatch({ type: userActionTypes.USER_DELETE_REQUEST });
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			};
			await axios.delete(`/api/users/${id}`, config);
			dispatch({
				type: userActionTypes.USER_DELETE_SUCCESS,
			});
		} catch (error: any) {
			dispatch({
				type: userActionTypes.USER_DELETE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const UpdateUser =
	(userData: { _id: string; name: string; email: string; isAdmin: boolean }) =>
	async (
		dispatch: Dispatch<UserUpdateAction | UserDetailsAction>,
		getState: () => RootState
	) => {
		dispatch({ type: userActionTypes.USER_UPDATE_REQUEST });
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo?.token}`,
				},
			};
			const { data } = await axios.put(
				`/api/users/${userData._id}`,
				userData,
				config
			);
			dispatch({
				type: userActionTypes.USER_UPDATE_SUCCESS,
			});
			dispatch({
				type: userDetailsActionTypes.USER_DETAILS_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: userActionTypes.USER_UPDATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
