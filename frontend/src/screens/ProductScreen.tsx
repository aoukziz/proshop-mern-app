import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import {
	listProductsDetails,
	createProductReview,
} from '../redux/action-creators/products.actionCreators';
import {
	ProductCreateReviewState,
	ProductDetailsState,
} from '../redux/reducers/productDetails.reducer';
import { RootState } from '../redux/reducers';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { productActionTypes } from '../redux/action-types/product.actionTypes';
import { UserState } from '../redux/reducers/user.reducer';
import moment from 'moment';

const ProductScreen = () => {
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const { id } = useParams<{ id: string }>();

	const dispatch = useDispatch();

	const history = useHistory();

	const { loading, error, product } = useSelector(
		(state: RootState) => state.productDetails
	) as ProductDetailsState;

	const { error: errorProductReview, success: successProductReview } =
		useSelector(
			(state: RootState) => state.productCreateReview
		) as ProductCreateReviewState;

	const { userInfo } = useSelector(
		(state: RootState) => state.userLogin
	) as UserState;

	useEffect(() => {
		if (successProductReview) {
			alert('Review Submited!');
			setRating(0);
			setComment('');
			dispatch({ type: productActionTypes.PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductsDetails(id));
	}, [dispatch, id, successProductReview]);

	const addToCartHandler = () => {
		history.push(`/cart/${id}?qty=${qty}`);
	};

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(createProductReview(id, { rating, comment }));
	};

	return (
		<>
			{loading && <Loader />}
			{error && <Message variant='danger'>{error}</Message>}
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			<Meta title={product?.name} />
			<Row>
				<Col md={6}>
					<Image src={product?.image} alt={product?.name} fluid />
				</Col>
				<Col md={3}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h3>{product?.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							{product && (
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							)}
						</ListGroup.Item>
						<ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
						<ListGroup.Item>
							Description: ${product?.description}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>${product?.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>
										{product && product.countInStock > 0
											? 'In Stock'
											: 'Out of Stock'}
									</Col>
								</Row>
							</ListGroup.Item>
							{product && product.countInStock > 0 && (
								<ListGroup.Item>
									<Row>
										<Col>Qty</Col>
										<Col>
											<Form.Control
												className='form-select'
												style={{
													padding: '0.75rem 0.2rem 0.75rem 0.4rem',
												}}
												as='select'
												value={qty}
												onChange={(e) => setQty(+e.target.value)}>
												{[...Array(product.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</Form.Control>
										</Col>
									</Row>
								</ListGroup.Item>
							)}
							<ListGroup.Item>
								<Button
									onClick={addToCartHandler}
									className='w-100'
									type='button'
									disabled={product?.countInStock === 0}>
									Add To Cart
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<h2>Reviews</h2>
					{product && product.reviews?.length === 0 && (
						<Message>No Reviews</Message>
					)}
					<ListGroup variant='flush'>
						{product &&
							product.reviews?.map((review) => (
								<ListGroup.Item key={review._id}>
									<strong>{review.name}</strong>
									<Rating value={review.rating} />
									<p>{moment(review.createdAt).format('D.dddd.MMM.YYYY')}</p>
									<p>{review.comment}</p>
								</ListGroup.Item>
							))}
						<ListGroup.Item>
							<h2>Write a Customer Review</h2>
							{errorProductReview && (
								<Message variant='danger'>{errorProductReview}</Message>
							)}
							{userInfo ? (
								<Form onSubmit={submitHandler}>
									<Form.Group controlId='rating'>
										<Form.Label>Rating</Form.Label>
										<Form.Control
											className='form-select'
											as='select'
											value={rating}
											onChange={(e) => setRating(+e.target.value)}>
											<option value=''>Select...</option>
											<option value='1'>1 - Poor</option>
											<option value='2'>2 - Fair</option>
											<option value='3'>3 - Good</option>
											<option value='4'>4 - Very Good</option>
											<option value='5'>5 - Excellent</option>
										</Form.Control>
										<Form.Group>
											<Form.Label>Comment</Form.Label>
											<Form.Control
												as='textarea'
												rows={3}
												value={comment}
												onChange={(e) =>
													setComment(e.target.value)
												}></Form.Control>
										</Form.Group>
									</Form.Group>
									<Button type='submit' variant='primary' className='my-3'>
										Submit
									</Button>
								</Form>
							) : (
								<Message>
									Please <Link to='/login'>sign in</Link> to write a review
								</Message>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</>
	);
};

export default ProductScreen;
