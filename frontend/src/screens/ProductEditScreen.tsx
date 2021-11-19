import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
	listProductsDetails,
	updateProduct,
} from '../redux/action-creators/products.actionCreators';

import { RootState } from '../redux/reducers';

import {
	ProductDetailsState,
	ProductUpdateState,
} from '../redux/reducers/productDetails.reducer';
import { productActionTypes } from '../redux/action-types/product.actionTypes';

const ProductEditScreen = () => {
	const { id: productId } = useParams<{ id: string }>();
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();

	const { product, loading, error } = useSelector(
		(state: RootState) => state.productDetails
	) as ProductDetailsState;

	const {
		success: successUpdate,
		loading: loadingUpdate,
		error: errorUpdate,
	} = useSelector(
		(state: RootState) => state.productUpdate
	) as ProductUpdateState;

	const history = useHistory();

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: productActionTypes.PRODUCT_UPDATE_RESET });
			history.push('/admin/productlist');
		} else {
			if (!product?.name || product?._id !== productId) {
				dispatch(listProductsDetails(productId));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
			}
		}
	}, [dispatch, product, productId, successUpdate, history]);

	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				image,
				brand,
				category,
				description,
				countInStock,
			})
		);
	};

	const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		const formdata = new FormData();
		formdata.append('image', file);
		setUploading(true);
		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};
			const { data } = await axios.post('/api/upload', formdata, config);
			setImage(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	return (
		<>
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				Go Back
			</Link>

			<FormContainer>
				<h1>Edit Product</h1>
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
					<Form.Group className='mb-3' controlId='price'>
						<Form.Label>Price</Form.Label>
						<Form.Control
							type='number'
							placeholder='Enter price'
							value={price}
							onChange={(e) => setPrice(+e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='image'>
						<Form.Label>Image</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter image url'
							value={image}
							onChange={(e) => setImage(e.target.value)}
						/>
						<Form.File
							id='image-file'
							label='Choose File'
							custom
							onChange={uploadFileHandler}></Form.File>
						{uploading && <Loader />}
					</Form.Group>

					<Form.Group className='mb-3' controlId='brand'>
						<Form.Label>Brand</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter brand'
							value={brand}
							onChange={(e) => setBrand(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='countInStock'>
						<Form.Label>Count In Stock</Form.Label>
						<Form.Control
							type='number'
							placeholder='Enter countInStock'
							value={countInStock}
							onChange={(e) => setCountInStock(+e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='category'>
						<Form.Label>Category</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter category'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='description'>
						<Form.Label>Description</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
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

export default ProductEditScreen;
