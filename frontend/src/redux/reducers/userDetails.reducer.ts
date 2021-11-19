import { userDetailsActionTypes } from '../action-types/userDetails.actionTypes';
import { User } from '../../models-interfaces/User';
import { UserDetailsAction } from '../actions/userDetails.actions';

export interface UserDetailsState {
	loading: boolean;
	error: string | null;
	user: User | null;
}

const initialState = {
	loading: false,
	user: null,
	error: null,
};

export const userDetailsReducer = (
	state: UserDetailsState = initialState,
	action: UserDetailsAction
): UserDetailsState => {
	switch (action.type) {
		case userDetailsActionTypes.USER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case userDetailsActionTypes.USER_DETAILS_SUCCESS:
			return { ...state, loading: false, user: action.payload };
		case userDetailsActionTypes.USER_DETAILS_FAIL:
			return { ...state, loading: false, error: action.payload };
		case userDetailsActionTypes.USER_DETAILS_RESET:
			return { ...state, loading: false, error: null, user: null };
		default:
			return state;
	}
};
