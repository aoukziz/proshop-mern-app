import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { RootState } from '../redux/reducers';
import {
	UserDeleteState,
	UserListState,
	UserState,
} from '../redux/reducers/user.reducer';
import { listUsers, deleteUser } from '../redux/action-creators/user.actions';

const UserListScreen = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const { users, error, loading } = useSelector(
		(state: RootState) => state.userList
	) as UserListState;

	const { success: successDelete } = useSelector(
		(state: RootState) => state.userDelete
	) as UserDeleteState;

	const { userInfo } = useSelector(
		(state: RootState) => state.userLogin
	) as UserState;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo, successDelete]);

	const deleteHandler = (id: string) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteUser(id));
		}
	};

	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users?.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto: ${user.email}`}>{user.email}</a>
								</td>
								<td>
									{user.isAdmin ? (
										<i className='fas fa-check' style={{ color: 'green' }}></i>
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>

								<td>
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<Button className='btn-sm' variant='light'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteHandler(user._id)}>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserListScreen;
