import { UserUpdateProfileState } from './reducers/userUpdateProfile.reducer';
import { UserDetailsState } from './reducers/userDetails.reducer';
import { ProductDetailsState } from './reducers/productDetails.reducer';
import { ProductListState } from './reducers/productList.reducer';
import { UserState } from './reducers/user.reducer';
import { CartState } from './reducers/cart.reducer';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

interface State {
	cart: CartState;
	userLogin: UserState;
	productList: ProductListState;
	productDetails: ProductDetailsState;
	userDetails: UserDetailsState;
	userUpdateProfile: UserUpdateProfileState;
}

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems')!)
	: [];

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo')!)
	: null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress')!)
	: {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
	? JSON.parse(localStorage.getItem('paymentMethod')!)
	: '';

const initialState: State = {
	productList: {
		products: [],
		loading: false,
		error: null,
	},
	productDetails: {
		product: null,
		loading: false,
		error: null,
	},
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
		paymentMethod: paymentMethodFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage, loading: false, error: null },
	userDetails: {
		user: null,
		loading: false,
		error: null,
	},
	userUpdateProfile: {
		userInfo: null,
		loading: false,
		error: null,
		success: false,
	},
};

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
