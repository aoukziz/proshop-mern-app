import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { RootState } from '../redux/reducers';
import { UserState } from '../redux/reducers/user.reducer';
import { listOrders } from '../redux/action-creators/order.actions';
import { OrderListState } from '../redux/reducers/order.reducer';
import moment from 'moment';

const OrderListScreen = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const { orders, error, loading } = useSelector(
		(state: RootState) => state.orderList
	) as OrderListState;

	const { userInfo } = useSelector(
		(state: RootState) => state.userLogin
	) as UserState;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo]);

	return (
		<>
			<h1>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERD</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders?.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{moment(order.createdAt).format('D.dddd.MMM.YYYY')}</td>
								<td>${order.totalPrice}</td>
								<td>
									{order.isPaid ? (
										moment(order.paidAt).format('D.dddd.MMM.YYYY')
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									{order.isDelivered ? (
										moment(order.deliveredAt).format('D.dddd.MMM.YYYY')
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>

								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button className='btn-sm' variant='light'>
											Details
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default OrderListScreen;
