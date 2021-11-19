import { PaymentResult } from './../../models-interfaces/Order';
import { RootState } from './../reducers/index';
import axios from 'axios';
import {
	orderActionTypes,
	userOrdersActionTypes,
} from '../action-types/order.actionTypes';
import { Dispatch } from 'redux';
import {
	OrderAction,
	OrderDeliverAction,
	OrderListAction,
	OrderPayAction,
	UserOrdersAction,
} from '../actions/order.actions';
import { Order } from '../../models-interfaces/Order';

export const createOrder =
	(order: Order) =>
	async (dispatch: Dispatch<OrderAction>, getState: () => RootState) => {
		dispatch({ type: orderActionTypes.ORDER_CREATE_REQUEST });
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
			const { data } = await axios.post('/api/orders', order, config);
			dispatch({
				type: orderActionTypes.ORDER_CREATE_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: orderActionTypes.ORDER_CREATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const getOrderDetails =
	(id: string) =>
	async (dispatch: Dispatch<OrderAction>, getState: () => RootState) => {
		dispatch({ type: orderActionTypes.ORDER_DETAILS_REQUEST });
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			};
			const { data } = await axios.get(`/api/orders/${id}`, config);
			dispatch({
				type: orderActionTypes.ORDER_DETAILS_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: orderActionTypes.ORDER_DETAILS_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const payOrder =
	(orderId: string, paymentResult: PaymentResult) =>
	async (dispatch: Dispatch<OrderPayAction>, getState: () => RootState) => {
		dispatch({ type: orderActionTypes.ORDER_PAY_REQUEST });
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
			await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);
			dispatch({
				type: orderActionTypes.ORDER_PAY_SUCCESS,
			});
		} catch (error: any) {
			dispatch({
				type: orderActionTypes.ORDER_PAY_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const deliverOrder =
	(order: Order) =>
	async (dispatch: Dispatch<OrderDeliverAction>, getState: () => RootState) => {
		dispatch({ type: orderActionTypes.ORDER_DELIVER_REQUEST });
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			};
			await axios.put(`/api/orders/${order._id}/deliver`, {}, config);
			dispatch({
				type: orderActionTypes.ORDER_DELIVER_SUCCESS,
			});
		} catch (error: any) {
			dispatch({
				type: orderActionTypes.ORDER_DELIVER_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const listUserOrders =
	() =>
	async (dispatch: Dispatch<UserOrdersAction>, getState: () => RootState) => {
		dispatch({ type: userOrdersActionTypes.USER_ORDERS_REQUEST });
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			};
			const { data } = await axios.get(`/api/orders/myorders`, config);
			dispatch({
				type: userOrdersActionTypes.USER_ORDERS_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: userOrdersActionTypes.USER_ORDERS_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const listOrders =
	() =>
	async (dispatch: Dispatch<OrderListAction>, getState: () => RootState) => {
		dispatch({ type: orderActionTypes.ORDER_LIST_REQUEST });
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			};
			const { data } = await axios.get(`/api/orders`, config);
			dispatch({
				type: orderActionTypes.ORDER_LIST_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: orderActionTypes.ORDER_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
