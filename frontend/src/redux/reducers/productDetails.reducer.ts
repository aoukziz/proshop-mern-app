import { productActionTypes } from '../action-types/product.actionTypes';
import { Product } from '../../models-interfaces/Product';
import {
	productCreateAction,
	productCreateReviewAction,
	productDeleteAction,
	productDetailsAction,
	productTopAction,
	productUpdateAction,
} from '../actions/product.actions';

export interface ProductDetailsState {
	loading: boolean;
	error: string | null;
	product: Product | null;
}

export interface ProductDeleteState {
	loading: boolean;
	error: string | null;
	success: boolean;
}

export interface ProductCreateState {
	loading: boolean;
	error: string | null;
	success: boolean;
	product: Product | null;
}

export interface ProductUpdateState {
	loading: boolean;
	error: string | null;
	success: boolean;
	product: Product | null;
}

export interface ProductState {
	loading: boolean;
	error: string | null;
	success: boolean;
	product: Product | null;
}

export interface ProductCreateReviewState {
	loading: boolean;
	error: string | null;
	success: boolean;
}

export interface ProductTopState {
	products: Product[];
	loading: boolean;
	error: string | null;
}

const initialState = {
	loading: false,
	product: null,
	error: null,
};

export const productDetailsReducer = (
	state: ProductDetailsState = initialState,
	action: productDetailsAction
): ProductDetailsState => {
	switch (action.type) {
		case productActionTypes.PRODUCT_DETAILS_REQUEST:
			return { ...state, loading: true };
		case productActionTypes.PRODUCT_DETAILS_SUCCESS:
			return { ...state, loading: false, product: action.payload };
		case productActionTypes.PRODUCT_DETAILS_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productDeleteReducer = (
	state: ProductDeleteState = { loading: false, success: false, error: null },
	action: productDeleteAction
): ProductDeleteState => {
	switch (action.type) {
		case productActionTypes.PRODUCT_DELETE_REQUEST:
			return { ...state, loading: true };
		case productActionTypes.PRODUCT_DELETE_SUCCESS:
			return { ...state, loading: false, success: true };
		case productActionTypes.PRODUCT_DELETE_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productCreateReducer = (
	state: ProductCreateState = {
		loading: false,
		success: false,
		error: null,
		product: null,
	},
	action: productCreateAction
): ProductCreateState => {
	switch (action.type) {
		case productActionTypes.PRODUCT_CREATE_REQUEST:
			return { ...state, loading: true };
		case productActionTypes.PRODUCT_CREATE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				product: action.payload,
			};
		case productActionTypes.PRODUCT_CREATE_FAIL:
			return { ...state, loading: false, error: action.payload };
		case productActionTypes.PRODUCT_CREATE_RESET:
			return {
				loading: false,
				success: false,
				error: null,
				product: null,
			};
		default:
			return state;
	}
};

export const productUpdateReducer = (
	state: ProductUpdateState = {
		loading: false,
		success: false,
		error: null,
		product: null,
	},
	action: productUpdateAction
): ProductUpdateState => {
	switch (action.type) {
		case productActionTypes.PRODUCT_UPDATE_REQUEST:
			return { ...state, loading: true };
		case productActionTypes.PRODUCT_UPDATE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				product: action.payload,
			};
		case productActionTypes.PRODUCT_UPDATE_FAIL:
			return { ...state, loading: false, error: action.payload };
		case productActionTypes.PRODUCT_UPDATE_RESET:
			return {
				loading: false,
				success: false,
				error: null,
				product: null,
			};
		default:
			return state;
	}
};

export const productCreateReviewReducer = (
	state: ProductCreateReviewState = {
		loading: false,
		success: false,
		error: null,
	},
	action: productCreateReviewAction
): ProductCreateReviewState => {
	switch (action.type) {
		case productActionTypes.PRODUCT_CREATE_REVIEW_REQUEST:
			return { ...state, loading: true };
		case productActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case productActionTypes.PRODUCT_CREATE_REVIEW_FAIL:
			return { ...state, loading: false, error: action.payload };
		case productActionTypes.PRODUCT_CREATE_REVIEW_RESET:
			return {
				loading: false,
				success: false,
				error: null,
			};
		default:
			return state;
	}
};

export const productTopRatedReducer = (
	state: ProductTopState = {
		loading: false,
		products: [],
		error: null,
	},
	action: productTopAction
): ProductTopState => {
	switch (action.type) {
		case productActionTypes.PRODUCT_TOP_REQUEST:
			return { ...state, loading: true };
		case productActionTypes.PRODUCT_TOP_SUCCESS:
			return {
				...state,
				products: action.payload,
				loading: false,
			};
		case productActionTypes.PRODUCT_TOP_FAIL:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};
