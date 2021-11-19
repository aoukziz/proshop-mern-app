import { productActionTypes } from '../action-types/product.actionTypes';
import { Product } from '../../models-interfaces/Product';
import { productListAction } from '../actions/product.actions';

export interface ProductListState {
	products: Product[];
	pages?: number;
	page?: number;
	loading: boolean;
	error: string | null;
}

const initialState = {
	loading: false,
	products: [],
	error: null,
};

export const productListReducer = (
	state: ProductListState = initialState,
	action: productListAction
): ProductListState => {
	switch (action.type) {
		case productActionTypes.PRODUCT_LIST_REQUEST:
			return { ...state, loading: true, products: [] };
		case productActionTypes.PRODUCT_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				products: action.payload.products,
				pages: action.payload.pages,
				page: action.payload.page,
			};
		case productActionTypes.PRODUCT_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};
