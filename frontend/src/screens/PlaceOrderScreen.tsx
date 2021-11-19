import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Row, Col, Image, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { RootState } from '../redux/reducers';
import { CartState } from '../redux/reducers/cart.reducer';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../redux/action-creators/order.actions';
import { OrderCreateState } from '../redux/reducers/order.reducer';

const PlaceOrderScreen = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const cart = useSelector((state: RootState) => state.cart) as CartState;

	const { order, success, error } = useSelector(
		(state: RootState) => state.orderCreate
	) as OrderCreateState;

	// Calculate prices

	const addDecimals = (num: number) => {
		return +(Math.round(num * 100) / 100).toFixed(2);
	};

	const itemsPrice = Number(
		addDecimals(
			cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		)
	).toFixed(2);

	const shippingPrice = Number(
		addDecimals(Number(itemsPrice) > 100 ? 0 : 100)
	).toFixed(2);
	const taxPrice = addDecimals(0.15 * Number(itemsPrice)).toFixed(2);
	const totalPrice = (
		Number(itemsPrice) +
		Number(shippingPrice) +
		Number(taxPrice)
	).toFixed(2);

	useEffect(() => {
		if (success && order) {
			history.push(`/order/${order._id}`);
		}
	}, [history, success, order]);

	if (!cart.shippingAddress) {
		history.push('/shipping');
	}
	if (!cart.paymentMethod) {
		history.push('/payment');
	}

	const placeOrderHandler = () => {
		if (cart.shippingAddress && cart.paymentMethod) {
			dispatch(
				createOrder({
					orderItems: cart.cartItems,
					shippingAddress: cart.shippingAddress,
					paymentMethod: cart.paymentMethod,
					itemsPrice: Number(itemsPrice),
					shippingPrice: Number(shippingPrice),
					taxPrice: Number(taxPrice),
					totalPrice: Number(totalPrice),
				})
			);
		}
	};
	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>
								{cart.shippingAddress?.address},{' '}
								{cart.shippingAddress?.postalCode} {cart.shippingAddress?.city},{' '}
								{cart.shippingAddress?.country}.
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Methode: </strong>
							{cart.paymentMethod}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message>Your Cart is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = ${item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Iax</Col>
									<Col>${taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Iotal</Col>
									<Col>${totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && <Message variant='danger'>{error}</Message>}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block w-100'
									disabled={cart.cartItems.length === 0}
									onClick={placeOrderHandler}>
									PLACE ORDER
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
