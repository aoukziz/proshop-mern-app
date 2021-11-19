import { userDetailsActionTypes } from '../action-types/userDetails.actionTypes';
import { User } from '../../models-interfaces/User';

interface UserDetailsRequestAction {
	type: userDetailsActionTypes.USER_DETAILS_REQUEST;
}

interface UserDetailsSuccessAction {
	type: userDetailsActionTypes.USER_DETAILS_SUCCESS;
	payload: User;
}

interface UserDetailsFailAction {
	type: userDetailsActionTypes.USER_DETAILS_FAIL;
	payload: string;
}

interface UserDetailsResetAction {
	type: userDetailsActionTypes.USER_DETAILS_RESET;
}

export type UserDetailsAction =
	| UserDetailsRequestAction
	| UserDetailsSuccessAction
	| UserDetailsFailAction
	| UserDetailsResetAction;
