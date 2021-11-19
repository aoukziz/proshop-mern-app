import { combineReducers } from 'redux';
import { productListReducer } from './productList.reducer';
import {
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
	productCreateReviewReducer,
	productTopRatedReducer,
} from './productDetails.reducer';
import { cartReducer } from './cart.reducer';
import {
	userLoginReducer,
	userRegisterReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
} from './user.reducer';
import { userDetailsReducer } from './userDetails.reducer';
import { userUpdateProfileReducer } from './userUpdateProfile.reducer';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderDeliverReducer,
	userOrdersReducer,
	orderListReducer,
} from './order.reducer';

const rootReducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productCreateReview: productCreateReviewReducer,
	productTopRated: productTopRatedReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliverReducer,
	userOrders: userOrdersReducer,
	orderList: orderListReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
