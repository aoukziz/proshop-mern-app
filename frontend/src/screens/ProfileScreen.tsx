import { useState, useEffect } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../redux/action-creators/userDetails.actions';
import { RootState } from '../redux/reducers';
import { UserDetailsState } from '../redux/reducers/userDetails.reducer';
import { UserState } from '../redux/reducers/user.reducer';
import { updateUserProfile } from '../redux/action-creators/userUpdateProfile.actions';
import { UserUpdateProfileState } from '../redux/reducers/userUpdateProfile.reducer';
import { userUpdateProfileActionTypes } from '../redux/action-types/userUpdateProfile.actionTypes';
import { UserOrdersState } from '../redux/reducers/order.reducer';
import { listUserOrders } from '../redux/action-creators/order.actions';
import { LinkContainer } from 'react-router-bootstrap';

const ProfileScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState<null | string>();
	const [showMessage, setShowMessage] = useState(false);

	const dispatch = useDispatch();

	const { user, loading, error } = useSelector(
		(state: RootState) => state.userDetails
	) as UserDetailsState;

	const { userInfo } = useSelector(
		(state: RootState) => state.userLogin
	) as UserState;

	const { success } = useSelector(
		(state: RootState) => state.userUpdateProfile
	) as UserUpdateProfileState;

	const {
		orders,
		loading: loadingOrders,
		error: errorOrders,
	} = useSelector((state: RootState) => state.userOrders) as UserOrdersState;

	const history = useHistory();

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user || !user.name || success) {
				if (success) {
					setShowMessage(true);
				}
				dispatch({
					type: userUpdateProfileActionTypes.USER_UPDATE_PROFILE_RESET,
				});

				dispatch(getUserDetails('profile'));
				dispatch(listUserOrders());
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user, success]);

	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(
				updateUserProfile({
					name,
					email,
					password,
				})
			);
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{loading && <Loader />}
				{message && <Message variant='danger'>{message}</Message>}
				{showMessage && <Message variant='success'>Profile Updated</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				<Form onSubmit={submitHandler}>
					<Form.Group className='mb-3' controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='confirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm Password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>
					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My orders</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant='danger'>{errorOrders}</Message>
				) : (
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
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
			</Col>
		</Row>
	);
};

export default ProfileScreen;
