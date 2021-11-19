import { RootState } from './../reducers/index';
import axios from 'axios';
import { userUpdateProfileActionTypes } from '../action-types/userUpdateProfile.actionTypes';
import { userActionTypes } from '../action-types/user.actionTypes';
import { Dispatch } from 'redux';
import { UserUpdateProfileAction } from '../actions/userUpdateProfile.actions';
import { UserLoginAction } from '../actions/user.actions';

export const updateUserProfile =
	(userData: { name: string; email: string; password: string }) =>
	async (
		dispatch: Dispatch<UserUpdateProfileAction | UserLoginAction>,
		getState: () => RootState
	) => {
		try {
			dispatch({
				type: userUpdateProfileActionTypes.USER_UPDATE_PROFILE_REQUEST,
			});

			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo?.token}`,
				},
			};
			const { data } = await axios.put('/api/users/profile', userData, config);
			dispatch({
				type: userUpdateProfileActionTypes.USER_UPDATE_PROFILE_SUCCESS,
				payload: data,
			});

			dispatch({
				type: userActionTypes.USER_LOGIN_SUCCESS,
				payload: data,
			});
			localStorage.setItem('userInfo', JSON.stringify(data));
		} catch (error: any) {
			dispatch({
				type: userUpdateProfileActionTypes.USER_UPDATE_PROFILE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
