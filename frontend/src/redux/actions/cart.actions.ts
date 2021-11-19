import { ShippingAddress } from '../../models-interfaces/Order';
import { cartActionTypes } from '../action-types/cart.actionTypes';
import { CartItem } from '../../models-interfaces/cartItem';

interface CartAddItemAction {
	type: cartActionTypes.CART_ADD_ITEM;
	payload: CartItem;
}

interface CartRemoveItemAction {
	type: cartActionTypes.CART_REMOVE_ITEM;
	payload: string;
}

interface CartSaveShippingAddressAction {
	type: cartActionTypes.CART_SAVE_SHIPPING_ADDRESS;
	payload: ShippingAddress;
}

interface CartSavePaymentMethodAction {
	type: cartActionTypes.CART_SAVE_PAYMENT_METHOD;
	payload: string;
}

export type CartAction =
	| CartAddItemAction
	| CartRemoveItemAction
	| CartSaveShippingAddressAction
	| CartSavePaymentMethodAction;
