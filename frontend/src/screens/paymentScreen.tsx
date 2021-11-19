import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { RootState } from '../redux/reducers';
import { CartState } from '../redux/reducers/cart.reducer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../redux/action-creators/cart.actionCreators';

const PaymentScreen = () => {
	const { shippingAddress } = useSelector(
		(state: RootState) => state.cart
	) as CartState;

	const history = useHistory();

	if (!shippingAddress) {
		history.push('/shipping');
	}
	const dispatch = useDispatch();

	const [paymentMethod, setPaymentMethod] = useState<string>('Paypal');

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};
	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>

					<Col>
						<Form.Check
							type='radio'
							label='Paypal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
					</Col>
				</Form.Group>
				<Button type='submit' variant='primary' className='my-3'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
