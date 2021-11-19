import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../redux/action-creators/products.actionCreators';
import { RootState } from '../redux/reducers';
import { ProductListState } from '../redux/reducers/productList.reducer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
	const { keyword } = useParams<{ keyword: string }>();
	const { pageNumber } = useParams<{ pageNumber: string }>() || 1;
	const dispatch = useDispatch();
	const { loading, error, products, page, pages } = useSelector(
		(state: RootState) => state.productList
	) as ProductListState;

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);
	return (
		<>
			<Meta />
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to='/' className='btn btn-light'>
					Go Back
				</Link>
			)}
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						{products?.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								{product && <Product product={product} />}
							</Col>
						))}
					</Row>
					{pages && page && (
						<Paginate
							page={page}
							pages={pages}
							keyword={keyword ? keyword : ''}
						/>
					)}
				</>
			)}
		</>
	);
};

export default HomeScreen;
