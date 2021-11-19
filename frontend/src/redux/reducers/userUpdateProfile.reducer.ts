import { userUpdateProfileActionTypes } from '../action-types/userUpdateProfile.actionTypes';
import { User } from '../../models-interfaces/User';
import { UserUpdateProfileAction } from '../actions/userUpdateProfile.actions';

export interface UserUpdateProfileState {
	loading: boolean;
	error: string | null;
	userInfo: User | null;
	success: boolean;
}

const initialState = {
	loading: false,
	userInfo: null,
	error: null,
	success: false,
};

export const userUpdateProfileReducer = (
	state: UserUpdateProfileState = initialState,
	action: UserUpdateProfileAction
): UserUpdateProfileState => {
	switch (action.type) {
		case userUpdateProfileActionTypes.USER_UPDATE_PROFILE_REQUEST:
			return { ...state, loading: true };
		case userUpdateProfileActionTypes.USER_UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				userInfo: action.payload,
			};
		case userUpdateProfileActionTypes.USER_UPDATE_PROFILE_FAIL:
			return {
				...state,
				loading: false,
				success: false,
				error: action.payload,
			};
		case userUpdateProfileActionTypes.USER_UPDATE_PROFILE_RESET:
			return {
				...state,
				loading: false,
				success: false,
				error: null,
				userInfo: null,
			};
		default:
			return state;
	}
};
