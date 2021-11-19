import { RootState } from './../reducers/index';
import axios from 'axios';
import { userDetailsActionTypes } from '../action-types/userDetails.actionTypes';
import { Dispatch } from 'redux';
import { UserDetailsAction } from '../actions/userDetails.actions';

export const getUserDetails =
	(id: string) =>
	async (dispatch: Dispatch<UserDetailsAction>, getState: () => RootState) => {
		try {
			dispatch({ type: userDetailsActionTypes.USER_DETAILS_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo?.token}`,
				},
			};
			const { data } = await axios.get(
				`/api/users/${id}`,

				config
			);
			dispatch({
				type: userDetailsActionTypes.USER_DETAILS_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: userDetailsActionTypes.USER_DETAILS_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
