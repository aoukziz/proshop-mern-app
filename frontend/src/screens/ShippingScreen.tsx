import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { RootState } from '../redux/reducers';
import { CartState } from '../redux/reducers/cart.reducer';
import { saveShippingAddress } from '../redux/action-creators/cart.actionCreators';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
	const { shippingAddress } = useSelector(
		(state: RootState) => state.cart
	) as CartState;

	const history = useHistory();
	const dispatch = useDispatch();

	const [address, setAddress] = useState<string>(
		shippingAddress ? shippingAddress.address : ''
	);
	const [city, setCity] = useState<string>(
		shippingAddress ? shippingAddress.city : ''
	);
	const [postalCode, setPostalCode] = useState<string>(
		shippingAddress ? shippingAddress.postalCode : ''
	);
	const [country, setCountry] = useState<string>(
		shippingAddress ? shippingAddress.country : ''
	);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(
			saveShippingAddress({
				address,
				city,
				postalCode,
				country,
			})
		);

		history.push('/payment');
	};
	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group className='mb-3' controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						required
						type='text'
						placeholder='Enter address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control
						required
						type='text'
						placeholder='Enter city'
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='postalCode'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						required
						type='text'
						placeholder='Enter postal code'
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						required
						type='text'
						placeholder='Enter country'
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
