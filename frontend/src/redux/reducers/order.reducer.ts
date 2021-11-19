import {
	orderActionTypes,
	userOrdersActionTypes,
} from '../action-types/order.actionTypes';
import { Order } from '../../models-interfaces/Order';
import {
	OrderAction,
	OrderDeliverAction,
	OrderListAction,
	OrderPayAction,
	UserOrdersAction,
} from '../actions/order.actions';

export interface OrderCreateState {
	loading: boolean;
	error: string | null;
	success: boolean;
	order: Order | null;
}

export interface OrderDetailsState {
	loading: boolean;
	error: string | null;
	order: Order | null;
}

export interface OrderPayState {
	loading: boolean;
	success: boolean;
	error: string | null;
}

export interface OrderDeliverState {
	loading: boolean;
	success: boolean;
	error: string | null;
}

export interface UserOrdersState {
	loading: boolean;
	error: string | null;
	orders: Order[] | [];
}

export interface OrderListState {
	loading: boolean;
	error: string | null;
	orders: Order[] | [];
}

export const orderCreateReducer = (
	state: OrderCreateState = {
		loading: false,
		error: null,
		success: false,
		order: null,
	},
	action: OrderAction
): OrderCreateState => {
	switch (action.type) {
		case orderActionTypes.ORDER_CREATE_REQUEST:
			return { ...state, loading: true };
		case orderActionTypes.ORDER_CREATE_SUCCESS:
			return { ...state, loading: false, success: true, order: action.payload };
		case orderActionTypes.ORDER_CREATE_FAIL:
			return {
				...state,
				loading: false,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const orderDetailsReducer = (
	state: OrderDetailsState = { loading: true, order: null, error: null },
	action: OrderAction
): OrderDetailsState => {
	switch (action.type) {
		case orderActionTypes.ORDER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case orderActionTypes.ORDER_DETAILS_SUCCESS:
			return { ...state, loading: false, order: action.payload };
		case orderActionTypes.ORDER_DETAILS_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const orderPayReducer = (
	state: OrderPayState = { loading: false, success: false, error: null },
	action: OrderPayAction
): OrderPayState => {
	switch (action.type) {
		case orderActionTypes.ORDER_PAY_REQUEST:
			return { ...state, loading: true };
		case orderActionTypes.ORDER_PAY_SUCCESS:
			return { ...state, loading: false, success: true };
		case orderActionTypes.ORDER_PAY_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case orderActionTypes.ORDER_PAY_RESET:
			return { loading: false, success: false, error: null };
		default:
			return state;
	}
};

export const orderDeliverReducer = (
	state: OrderDeliverState = { loading: false, success: false, error: null },
	action: OrderDeliverAction
): OrderDeliverState => {
	switch (action.type) {
		case orderActionTypes.ORDER_DELIVER_REQUEST:
			return { ...state, loading: true };
		case orderActionTypes.ORDER_DELIVER_SUCCESS:
			return { ...state, loading: false, success: true };
		case orderActionTypes.ORDER_DELIVER_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case orderActionTypes.ORDER_DELIVER_RESET:
			return { loading: false, success: false, error: null };
		default:
			return state;
	}
};

export const userOrdersReducer = (
	state: UserOrdersState = { loading: false, orders: [], error: null },
	action: UserOrdersAction
): UserOrdersState => {
	switch (action.type) {
		case userOrdersActionTypes.USER_ORDERS_REQUEST:
			return { ...state, loading: true };
		case userOrdersActionTypes.USER_ORDERS_SUCCESS:
			return { ...state, loading: false, orders: action.payload };
		case userOrdersActionTypes.USER_ORDERS_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case userOrdersActionTypes.USER_ORDERS_RESET:
			return { loading: false, orders: [], error: null };
		default:
			return state;
	}
};

export const orderListReducer = (
	state: OrderListState = { loading: false, orders: [], error: null },
	action: OrderListAction
): OrderListState => {
	switch (action.type) {
		case orderActionTypes.ORDER_LIST_REQUEST:
			return { ...state, loading: true };
		case orderActionTypes.ORDER_LIST_SUCCESS:
			return { ...state, loading: false, orders: action.payload };
		case orderActionTypes.ORDER_LIST_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
