import { productActionTypes } from '../action-types/product.actionTypes';
import { Product } from '../../models-interfaces/Product';

interface productListRequestAction {
	type: productActionTypes.PRODUCT_LIST_REQUEST;
}

interface productListSuccessAction {
	type: productActionTypes.PRODUCT_LIST_SUCCESS;
	payload: { products: Product[]; pages: number; page: number };
}

interface productListFailAction {
	type: productActionTypes.PRODUCT_LIST_FAIL;
	payload: string;
}

export type productListAction =
	| productListRequestAction
	| productListSuccessAction
	| productListFailAction;

interface productDetailsRequestAction {
	type: productActionTypes.PRODUCT_DETAILS_REQUEST;
}

interface productDetailsSuccessAction {
	type: productActionTypes.PRODUCT_DETAILS_SUCCESS;
	payload: Product;
}

interface productDetailsFailAction {
	type: productActionTypes.PRODUCT_DETAILS_FAIL;
	payload: string;
}

export type productDetailsAction =
	| productDetailsRequestAction
	| productDetailsSuccessAction
	| productDetailsFailAction;

interface productDeleteRequestAction {
	type: productActionTypes.PRODUCT_DELETE_REQUEST;
}

interface productDeleteSuccessAction {
	type: productActionTypes.PRODUCT_DELETE_SUCCESS;
}

interface productDeleteFailAction {
	type: productActionTypes.PRODUCT_DELETE_FAIL;
	payload: string;
}

export type productDeleteAction =
	| productDeleteRequestAction
	| productDeleteSuccessAction
	| productDeleteFailAction;

interface productCreateRequestAction {
	type: productActionTypes.PRODUCT_CREATE_REQUEST;
}

interface productCreateSuccessAction {
	type: productActionTypes.PRODUCT_CREATE_SUCCESS;
	payload: Product;
}

interface productCreateFailAction {
	type: productActionTypes.PRODUCT_CREATE_FAIL;
	payload: string;
}

interface productCreateResetAction {
	type: productActionTypes.PRODUCT_CREATE_RESET;
}

export type productCreateAction =
	| productCreateRequestAction
	| productCreateSuccessAction
	| productCreateFailAction
	| productCreateResetAction;

interface productUpdateRequestAction {
	type: productActionTypes.PRODUCT_UPDATE_REQUEST;
}

interface productUpdateSuccessAction {
	type: productActionTypes.PRODUCT_UPDATE_SUCCESS;
	payload: Product;
}

interface productUpdateFailAction {
	type: productActionTypes.PRODUCT_UPDATE_FAIL;
	payload: string;
}

interface productUpdateResetAction {
	type: productActionTypes.PRODUCT_UPDATE_RESET;
}

export type productUpdateAction =
	| productUpdateRequestAction
	| productUpdateSuccessAction
	| productUpdateFailAction
	| productUpdateResetAction;

interface productCreateReviewRequestAction {
	type: productActionTypes.PRODUCT_CREATE_REVIEW_REQUEST;
}

interface productCreateReviewSuccessAction {
	type: productActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS;
}

interface productCreateReviewFailAction {
	type: productActionTypes.PRODUCT_CREATE_REVIEW_FAIL;
	payload: string;
}

interface productCreateReviewResetAction {
	type: productActionTypes.PRODUCT_CREATE_REVIEW_RESET;
}

export type productCreateReviewAction =
	| productCreateReviewRequestAction
	| productCreateReviewSuccessAction
	| productCreateReviewFailAction
	| productCreateReviewResetAction;

export interface productTopRequestAction {
	type: productActionTypes.PRODUCT_TOP_REQUEST;
}

export interface productTopSuccessAction {
	type: productActionTypes.PRODUCT_TOP_SUCCESS;
	payload: Product[];
}

export interface productTopFailureAction {
	type: productActionTypes.PRODUCT_TOP_FAIL;
	payload: string;
}

export type productTopAction =
	| productTopSuccessAction
	| productTopFailureAction
	| productTopRequestAction;
