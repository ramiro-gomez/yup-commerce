import {
	Alert, Button, Col, Modal, Row,
} from 'react-bootstrap';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CartCardBttom from '../components/CartCardBttom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { resetCart } from '../store/reducers/cartReducer';
import NavBar from '../components/NavBar';

const CartPage: FC = () => {
	const [showModal, setShowModal] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const cartProducts = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();
	const totalPrice = cartProducts.reduce(
		(acc, { product, quantity }) => acc + (product.price * quantity), 0,
	);

	const handleClose = () => setShowModal(false);
	const handlePurchase = () => {
		if (cartProducts.length) {
			dispatch(resetCart());
			setShowModal(true);
		} else {
			setShowAlert(true);
		}
	};

	return (
		<>
			<div className="sticky-top">
				<NavBar />
				{showAlert && <Alert variant="danger" className="mb-0">You have no products in your shopping cart</Alert>}
			</div>
			<div className="custom-container">
				<Row className="g-4 pt-4">
					<Col xs="12" lg={{ span: 5, order: 'last' }}>
						<section className="py-3 px-4 rounded-2 shadow-lg">
							<div className="d-flex mb-4">
								<h4 className="text-gray fs-2 fw-semibold">Total:</h4>
								<h4 className="text-gray fs-2 fw-semibold ms-auto">
									$
									{totalPrice}
								</h4>
							</div>
							<Button className="w-100" variant="primary" onClick={handlePurchase}>Make purchase</Button>
						</section>
					</Col>
					<Col xs="12" lg="7">
						<Row className="gy-4">
							{cartProducts.map(({ product, quantity }) => (
								<Col xs="12" key={`col-${product.id}`}>
									<ProductCard
										product={product}
										cardBottom={(
											<CartCardBttom
												product={product}
												quantity={quantity}
											/>
										)}
									/>
								</Col>
							))}
						</Row>
					</Col>
				</Row>
			</div>

			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Purchase completed</Modal.Title>
				</Modal.Header>
				<Modal.Body>Your purchase has been made successfully!</Modal.Body>
				<Modal.Footer>
					<Link to="/">
						<Button variant="primary" onClick={handleClose}>
							Continue shopping
						</Button>
					</Link>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default CartPage;
