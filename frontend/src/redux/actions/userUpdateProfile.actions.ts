import { userUpdateProfileActionTypes } from '../action-types/userUpdateProfile.actionTypes';
import { User } from '../../models-interfaces/User';

interface UserUpdateProfileRequestAction {
	type: userUpdateProfileActionTypes.USER_UPDATE_PROFILE_REQUEST;
}

interface UserUpdateProfileSuccessAction {
	type: userUpdateProfileActionTypes.USER_UPDATE_PROFILE_SUCCESS;
	payload: User;
}

interface UserUpdateProfileFailAction {
	type: userUpdateProfileActionTypes.USER_UPDATE_PROFILE_FAIL;
	payload: string;
}

interface UserUpdateResetAction {
	type: userUpdateProfileActionTypes.USER_UPDATE_PROFILE_RESET;
}

export type UserUpdateProfileAction =
	| UserUpdateProfileRequestAction
	| UserUpdateProfileSuccessAction
	| UserUpdateProfileFailAction
	| UserUpdateResetAction;
