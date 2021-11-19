import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Product as ProductItem } from '../models-interfaces/Product';

export interface ProductProps {
	product: ProductItem;
}

const Product: React.FC<ProductProps> = ({ product }) => {
	const { _id, image, name, rating, numReviews, price } = product;
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/product/${_id}`}>
				<Card.Img variant='top' src={image} />
			</Link>
			<Card.Body>
				<Link to={`/product/${_id}`}>
					<Card.Title as='div'>
						<strong>{name}</strong>
					</Card.Title>
				</Link>
				<Card.Text as='div'>
					<Rating value={rating} text={`${numReviews} reviews`} />
				</Card.Text>
				<Card.Text as='h3'>${price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
