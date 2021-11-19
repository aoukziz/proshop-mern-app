import { CartAction } from '../actions/cart.actions';
import { cartActionTypes } from '../action-types/cart.actionTypes';
import { Dispatch } from 'redux';
import axios from 'axios';
import { RootState } from '../reducers';
import { ShippingAddress } from '../../models-interfaces/Order';

export const addToCart =
	(id: string, qty: number) =>
	async (dispatch: Dispatch<CartAction>, getState: () => RootState) => {
		const { data } = await axios.get(`/api/products/${id}`);

		dispatch({
			type: cartActionTypes.CART_ADD_ITEM,
			payload: {
				product: data._id,
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
				qty,
			},
		});
		localStorage.setItem(
			'cartItems',
			JSON.stringify(getState().cart.cartItems)
		);
	};

export const removeFromCart =
	(id: string) =>
	async (dispatch: Dispatch<CartAction>, getState: () => RootState) => {
		dispatch({
			type: cartActionTypes.CART_REMOVE_ITEM,
			payload: id,
		});
		localStorage.setItem(
			'cartItems',
			JSON.stringify(getState().cart.cartItems)
		);
	};

export const saveShippingAddress =
	(data: ShippingAddress) => async (dispatch: Dispatch<CartAction>) => {
		dispatch({
			type: cartActionTypes.CART_SAVE_SHIPPING_ADDRESS,
			payload: data,
		});
		localStorage.setItem('shippingAddress', JSON.stringify(data));
	};

export const savePaymentMethod =
	(data: string) => async (dispatch: Dispatch<CartAction>) => {
		dispatch({
			type: cartActionTypes.CART_SAVE_PAYMENT_METHOD,
			payload: data,
		});
		localStorage.setItem('paymentMethod', JSON.stringify(data));
	};
