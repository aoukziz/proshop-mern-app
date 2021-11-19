import { CartItem } from './cartItem';
import { User } from './User';

export interface ShippingAddress {
	address: string;
	city: string;
	country: string;
	postalCode: string;
}

export interface PaymentResult {
	_id: string;
	status: string;
	update_time: string;
	email_address: string;
}

export interface Order {
	_id?: string;
	user?: User;
	orderItems: CartItem[];
	shippingAddress: ShippingAddress;
	paymentMethod: string;
	paymentResult?: PaymentResult;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
	itemsPrice: number;
	isPaid?: boolean;
	isDelivered?: boolean;
	paidAt?: Date;
	deliveredAt?: Date;
	createdAt?: Date;
	updatedAt?: Date;
}
