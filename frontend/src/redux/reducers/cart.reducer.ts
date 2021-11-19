import { ShippingAddress } from '../../models-interfaces/Order';
import { cartActionTypes } from '../action-types/cart.actionTypes';
import { CartAction } from '../actions/cart.actions';
import { CartItem } from '../../models-interfaces/cartItem';

export interface CartState {
	cartItems: CartItem[];
	shippingAddress?: ShippingAddress;
	paymentMethod?: string;
}

const initialState = {
	cartItems: [],
	ShippingAddress: {},
	paymentMethod: '',
};

export const cartReducer = (
	state: CartState = initialState,
	action: CartAction
): CartState => {
	switch (action.type) {
		case cartActionTypes.CART_ADD_ITEM:
			const item = action.payload;

			const existItem = state.cartItems.find((x) => x.product === item.product);

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) =>
						x.product === existItem.product ? item : x
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		case cartActionTypes.CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.product !== action.payload),
			};
		case cartActionTypes.CART_SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			};
		case cartActionTypes.CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			};
		default:
			return state;
	}
};
