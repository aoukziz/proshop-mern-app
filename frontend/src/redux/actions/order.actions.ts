import {
	orderActionTypes,
	userOrdersActionTypes,
} from '../action-types/order.actionTypes';
import { Order } from '../../models-interfaces/Order';

interface orderCreateRequestAction {
	type: orderActionTypes.ORDER_CREATE_REQUEST;
}

interface orderCreateSuccessAction {
	type: orderActionTypes.ORDER_CREATE_SUCCESS;
	payload: Order;
}

interface orderCreateFailAction {
	type: orderActionTypes.ORDER_CREATE_FAIL;
	payload: string;
}

interface orderDetailsRequestAction {
	type: orderActionTypes.ORDER_DETAILS_REQUEST;
}

interface orderDetailsSuccessAction {
	type: orderActionTypes.ORDER_DETAILS_SUCCESS;
	payload: Order;
}

interface orderDetailsFailAction {
	type: orderActionTypes.ORDER_DETAILS_FAIL;
	payload: string;
}

export type OrderAction =
	| orderCreateRequestAction
	| orderCreateSuccessAction
	| orderCreateFailAction
	| orderDetailsRequestAction
	| orderDetailsSuccessAction
	| orderDetailsFailAction;

interface orderPayRequestAction {
	type: orderActionTypes.ORDER_PAY_REQUEST;
}

interface orderPaySuccessAction {
	type: orderActionTypes.ORDER_PAY_SUCCESS;
}

interface orderPayFailAction {
	type: orderActionTypes.ORDER_PAY_FAIL;
	payload: string;
}

interface orderPayResetAction {
	type: orderActionTypes.ORDER_PAY_RESET;
}

export type OrderPayAction =
	| orderPayRequestAction
	| orderPaySuccessAction
	| orderPayFailAction
	| orderPayResetAction;

interface orderDeliverRequestAction {
	type: orderActionTypes.ORDER_DELIVER_REQUEST;
}

interface orderDeliverSuccessAction {
	type: orderActionTypes.ORDER_DELIVER_SUCCESS;
}

interface orderDeliverFailAction {
	type: orderActionTypes.ORDER_DELIVER_FAIL;
	payload: string;
}

interface orderDeliverResetAction {
	type: orderActionTypes.ORDER_DELIVER_RESET;
}

export type OrderDeliverAction =
	| orderDeliverRequestAction
	| orderDeliverSuccessAction
	| orderDeliverFailAction
	| orderDeliverResetAction;

interface userOrdersRequestAction {
	type: userOrdersActionTypes.USER_ORDERS_REQUEST;
}

interface userOrdersSuccessAction {
	type: userOrdersActionTypes.USER_ORDERS_SUCCESS;
	payload: Order[];
}

interface userOrdersFailAction {
	type: userOrdersActionTypes.USER_ORDERS_FAIL;
	payload: string;
}

interface userOrdersResetAction {
	type: userOrdersActionTypes.USER_ORDERS_RESET;
}

export type UserOrdersAction =
	| userOrdersRequestAction
	| userOrdersSuccessAction
	| userOrdersFailAction
	| userOrdersResetAction;

interface orderListRequestAction {
	type: orderActionTypes.ORDER_LIST_REQUEST;
}

interface orderListSuccessAction {
	type: orderActionTypes.ORDER_LIST_SUCCESS;
	payload: Order[];
}

interface orderListFailAction {
	type: orderActionTypes.ORDER_LIST_FAIL;
	payload: string;
}

export type OrderListAction =
	| orderListRequestAction
	| orderListSuccessAction
	| orderListFailAction;
