import axios from 'axios';
import { productActionTypes } from '../action-types/product.actionTypes';
import { Dispatch } from 'redux';
import {
	productListAction,
	productDetailsAction,
	productDeleteAction,
	productCreateAction,
	productUpdateAction,
	productCreateReviewAction,
	productTopAction,
} from '../actions/product.actions';
import { RootState } from '../reducers';

export const listProducts =
	(keyword = '', pageNumber = '') =>
	async (dispatch: Dispatch<productListAction>) => {
		dispatch({ type: productActionTypes.PRODUCT_LIST_REQUEST });
		try {
			const { data } = await axios.get(
				`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
			);
			dispatch({
				type: productActionTypes.PRODUCT_LIST_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: productActionTypes.PRODUCT_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const listProductsDetails =
	(id: string) => async (dispatch: Dispatch<productDetailsAction>) => {
		dispatch({ type: productActionTypes.PRODUCT_DETAILS_REQUEST });
		try {
			const { data } = await axios.get(`/api/products/${id}`);
			dispatch({
				type: productActionTypes.PRODUCT_DETAILS_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: productActionTypes.PRODUCT_DETAILS_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const deleteProduct =
	(id: string) =>
	async (
		dispatch: Dispatch<productDeleteAction>,
		getState: () => RootState
	) => {
		dispatch({ type: productActionTypes.PRODUCT_DELETE_REQUEST });
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			};
			await axios.delete(`/api/products/${id}`, config);
			dispatch({
				type: productActionTypes.PRODUCT_DELETE_SUCCESS,
			});
		} catch (error: any) {
			dispatch({
				type: productActionTypes.PRODUCT_DELETE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const createProduct =
	() =>
	async (
		dispatch: Dispatch<productCreateAction>,
		getState: () => RootState
	) => {
		dispatch({ type: productActionTypes.PRODUCT_CREATE_REQUEST });
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo?.token}`,
				},
			};
			const { data } = await axios.post(`/api/products`, {}, config);
			dispatch({
				type: productActionTypes.PRODUCT_CREATE_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: productActionTypes.PRODUCT_CREATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const updateProduct =
	(product: {
		_id: string;
		name: string;
		image: string;
		description: string;
		brand: string;
		category: string;
		price: number;
		countInStock: number;
	}) =>
	async (
		dispatch: Dispatch<productUpdateAction>,
		getState: () => RootState
	) => {
		dispatch({ type: productActionTypes.PRODUCT_UPDATE_REQUEST });
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
			const { data } = await axios.put(
				`/api/products/${product._id}`,
				product,
				config
			);
			dispatch({
				type: productActionTypes.PRODUCT_UPDATE_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: productActionTypes.PRODUCT_UPDATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const createProductReview =
	(
		productId: string,
		review: {
			comment: string;
			rating: number;
		}
	) =>
	async (
		dispatch: Dispatch<productCreateReviewAction>,
		getState: () => RootState
	) => {
		dispatch({ type: productActionTypes.PRODUCT_CREATE_REVIEW_REQUEST });
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
			await axios.post(`/api/products/${productId}/reviews`, review, config);
			dispatch({
				type: productActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
			});
		} catch (error: any) {
			dispatch({
				type: productActionTypes.PRODUCT_CREATE_REVIEW_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const listTopProducts =
	() => async (dispatch: Dispatch<productTopAction>) => {
		dispatch({ type: productActionTypes.PRODUCT_TOP_REQUEST });
		try {
			const { data } = await axios.get(`/api/products/top`);
			dispatch({
				type: productActionTypes.PRODUCT_TOP_SUCCESS,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: productActionTypes.PRODUCT_TOP_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
