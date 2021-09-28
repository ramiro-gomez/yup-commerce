import { Button, Col, Row } from 'react-bootstrap';
import { FC } from 'react';
import ProductCard from '../components/ProductCard';
import CartCardBttom from '../components/CartCardBttom';
import { useAppSelector } from '../store/store';

const CartPage: FC = () => {
	const cartProducts = useAppSelector((state) => state.cart);
	const totalPrice = cartProducts.reduce(
		(acc, { product, quantity }) => acc + (product.price * quantity), 0,
	);

	return (
		<>
			<div className="custom-container">
				<section className="py-3 px-4 my-4 rounded-2 shadow-lg">
					<div className="d-flex mb-4">
						<h4 className="text-gray fs-2 fw-semibold">Total:</h4>
						<h4 className="text-gray fs-2 fw-semibold ms-auto">
							$
							{totalPrice}
						</h4>
					</div>
					<Button className="w-100" variant="primary">Make purchase</Button>
				</section>
				<Row className="g-4">
					{cartProducts.map(({ product, quantity }) => (
						<Col xs="12" lg="4" key={`col-${product.id}`}>
							<ProductCard
								product={product}
								cardBottom={<CartCardBttom product={product} quantity={quantity} />}
							/>
						</Col>
					))}
				</Row>
			</div>
		</>
	);
};

export default CartPage;
