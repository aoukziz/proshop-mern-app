import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { RootState } from '../redux/reducers';
import { UserState } from '../redux/reducers/user.reducer';
import {
	listProducts,
	deleteProduct,
	createProduct,
} from '../redux/action-creators/products.actionCreators';
import { ProductListState } from '../redux/reducers/productList.reducer';
import {
	ProductCreateState,
	ProductDeleteState,
} from '../redux/reducers/productDetails.reducer';
import { productActionTypes } from '../redux/action-types/product.actionTypes';

const ProductListScreen = () => {
	const { pageNumber } = useParams<{ pageNumber: string }>() || 1;
	const dispatch = useDispatch();
	const history = useHistory();

	const { products, pages, page, error, loading } = useSelector(
		(state: RootState) => state.productList
	) as ProductListState;

	const {
		success: successDelete,
		loading: loadingDelete,
		error: errorDelete,
	} = useSelector(
		(state: RootState) => state.productDelete
	) as ProductDeleteState;

	const {
		success: successCreate,
		loading: loadingCreate,
		error: errorCreate,
		product: createdProduct,
	} = useSelector(
		(state: RootState) => state.productCreate
	) as ProductCreateState;

	const { userInfo } = useSelector(
		(state: RootState) => state.userLogin
	) as UserState;

	useEffect(() => {
		dispatch({ type: productActionTypes.PRODUCT_CREATE_RESET });
		if (!userInfo?.isAdmin) {
			history.push('/login');
		}
		if (successCreate) {
			history.push(`/admin/product/${createdProduct?._id}/edit`);
		} else {
			dispatch(listProducts('', pageNumber));
		}
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		successCreate,
		createdProduct,
		pageNumber,
	]);

	const deleteHandler = (id: string) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteProduct(id));
		}
	};

	const createProductHandler = () => {
		dispatch(createProduct());
	};

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createProductHandler}>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products?.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>&{product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>

									<td>
										<LinkContainer to={`/admin/product/${product._id}/edit`}>
											<Button className='btn-sm' variant='light'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(product._id)}>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					{pages && page && (
						<Paginate page={page} pages={pages} isAdmin={true} />
					)}
				</>
			)}
		</>
	);
};

export default ProductListScreen;
