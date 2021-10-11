import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Product } from '../interfaces';
import CardQuantity from './CardQuantity';

interface Props {
	product: Product,
	handleAddToCart: (product: Product, quantity: number) => void
}

const ProductCardBottom: FC<Props> = ({ product, handleAddToCart }) => {
	const [quantity, setQuantity] = useState(1);

	const increment = () => setQuantity(quantity + 1);
	const decrement = () => (quantity > 1) && setQuantity(quantity - 1);

	return (
		<div className="d-flex mx-auto">
			<CardQuantity increment={increment} decrement={decrement} quantity={quantity} />
			<Button
				className="fm-body fs-5 fs-lg-3 fw-semibold border-start-0 rounded-start-0"
				variant="outline-primary"
				onClick={() => handleAddToCart(product, quantity)}
			>
				Add to cart
			</Button>
		</div>
	);
};

export default ProductCardBottom;
