import { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails } from '../redux/action-creators/userDetails.actions';
import { UpdateUser } from '../redux/action-creators/user.actions';
import { RootState } from '../redux/reducers';
import { UserDetailsState } from '../redux/reducers/userDetails.reducer';
import { userActionTypes } from '../redux/action-types/user.actionTypes';
import { UserUpdateState } from '../redux/reducers/user.reducer';

const UserEditScreen = () => {
	const { id: userId } = useParams<{ id: string }>();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	const dispatch = useDispatch();

	const { user, loading, error } = useSelector(
		(state: RootState) => state.userDetails
	) as UserDetailsState;

	const {
		success: successUpdate,
		loading: loadingUpdate,
		error: errorUpdate,
	} = useSelector((state: RootState) => state.userUpdate) as UserUpdateState;

	const history = useHistory();

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: userActionTypes.USER_UPDATE_RESET });
			history.push('/admin/userlist');
		} else {
			if (!user?.name || user?._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [dispatch, user, userId, successUpdate, history]);

	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(
			UpdateUser({
				_id: userId,
				name,
				email,
				isAdmin,
			})
		);
	};

	return (
		<>
			<Link to='/admin/userlist' className='btn btn-light my-3'>
				Go Back
			</Link>

			<FormContainer>
				<h1>Edit User</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loading && <Loader />}
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
					<Form.Group className='mb-3' controlId='isAdmin'>
						<Form.Check
							type='checkbox'
							label='Is Admin'
							checked={isAdmin}
							onChange={(e) => setIsAdmin(e.target.checked)}
						/>
					</Form.Group>

					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
