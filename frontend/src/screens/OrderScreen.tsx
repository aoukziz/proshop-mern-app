import { useState, useEffect } from 'react';
import moment from 'moment';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Row, Col, Image, Card, ListGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { RootState } from '../redux/reducers';
import Loader from '../components/Loader';
import {
	getOrderDetails,
	payOrder,
	deliverOrder,
} from '../redux/action-creators/order.actions';
import {
	OrderDeliverState,
	OrderDetailsState,
	OrderPayState,
} from '../redux/reducers/order.reducer';
import axios from 'axios';
import { PaymentResult } from '../models-interfaces/Order';
import { orderActionTypes } from '../redux/action-types/order.actionTypes';
import { UserState } from '../redux/reducers/user.reducer';

const OrderScreen = () => {
	const { id } = useParams<{ id: string }>();

	const orderId = id;

	const [sdkReady, setSdkReady] = useState(false);

	const dispatch = useDispatch();
	const history = useHistory();

	const { userInfo } = useSelector(
		(state: RootState) => state.userLogin
	) as UserState;

	const { order, loading, error } = useSelector(
		(state: RootState) => state.orderDetails
	) as OrderDetailsState;

	const { success: successPay, loading: loadingPay } = useSelector(
		(state: RootState) => state.orderPay
	) as OrderPayState;

	const { success: successDeliver, loading: loadingDeliver } = useSelector(
		(state: RootState) => state.orderDeliver
	) as OrderDeliverState;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		}

		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal');
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};

		if (!order || order._id !== id || successPay || successDeliver) {
			dispatch({ type: orderActionTypes.ORDER_PAY_RESET });
			dispatch({ type: orderActionTypes.ORDER_DELIVER_RESET });
			dispatch(getOrderDetails(id));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [dispatch, order, id, successPay, successDeliver, history, userInfo]);

	if (loading || !order) {
		return <Loader />;
	}

	const addDecimals = (num: number) => {
		return +(Math.round(num * 100) / 100).toFixed(2);
	};

	const itemsPrice = addDecimals(
		order?.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0)
	);

	const successPaymentHandler = (paymentResult: PaymentResult) => {
		console.log(paymentResult);
		dispatch(payOrder(orderId, paymentResult));
	};

	const deliverHandler = () => {
		dispatch(deliverOrder(order));
	};

	return (
		<>
			{error && <Message variant='danger'>{error}</Message>}
			<h1>Order {order?._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong> {order?.user?.name}
							</p>
							<p>
								<strong>Email: </strong>
								<a href={`mailto: ${order?.user?.email}`}>
									{order?.user?.email}
								</a>
							</p>
							<p>
								<strong>Address: </strong>
								{order?.shippingAddress.address},{' '}
								{order?.shippingAddress.postalCode}{' '}
								{order?.shippingAddress.city}, {order?.shippingAddress.country}.
							</p>
							{order?.isDelivered ? (
								<Message variant='success'>
									{' '}
									Delivered on{' '}
									{moment(order.deliveredAt).format('D.dddd.MMM.YYYY')}
								</Message>
							) : (
								<Message variant='danger'>Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Methode: </strong>
								{order?.paymentMethod}
							</p>
							{order?.isPaid ? (
								<Message variant='success'>
									{' '}
									Paid on {moment(order.paidAt).format('D.dddd.MMM.YYYY')}
								</Message>
							) : (
								<Message variant='danger'>Not Paid</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{order?.orderItems.length === 0 ? (
								<Message>Your Cart is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{order?.orderItems.map((item, index) => (
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
									<Col>${order?.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Iax</Col>
									<Col>${order?.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Iotal</Col>
									<Col>${order?.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{!sdkReady ? (
										<Loader />
									) : (
										<PayPalButton
											amount={order.totalPrice}
											onSuccess={successPaymentHandler}
										/>
									)}
								</ListGroup.Item>
							)}
							{loadingDeliver && <Loader />}
							{userInfo &&
								userInfo.isAdmin &&
								order.isPaid &&
								!order.isDelivered && (
									<ListGroup.Item>
										<Button
											type='button'
											className='btn btn-block w-100'
											onClick={deliverHandler}>
											Mark As Delivered
										</Button>
									</ListGroup.Item>
								)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
