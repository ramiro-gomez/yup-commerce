import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Product } from '../interfaces';
import { addToCart } from '../store/reducers/cartReducer';
import { useAppDispatch } from '../store/store';
import CardQuantity from './CardQuantity';

interface Props {
	product: Product,
}

const ProductCardBottom: FC<Props> = ({ product }) => {
	const [quantity, setQuantity] = useState(1);
	const dispatch = useAppDispatch();

	const increment = () => setQuantity(quantity + 1);
	const decrement = () => (quantity > 1) && setQuantity(quantity - 1);

	return (
		<div className="d-flex mx-auto">
			<CardQuantity increment={increment} decrement={decrement} quantity={quantity} />
			<Button
				className="fm-body fs-5 fs-lg-3 fw-semibold border-start-0 rounded-start-0"
				variant="outline-primary"
				onClick={() => dispatch(addToCart({ product, quantity }))}
			>
				Add to cart
			</Button>
		</div>
	);
};

export default ProductCardBottom;
