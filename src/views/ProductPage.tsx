/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Alert, Col, Offcanvas, Row, Button, Accordion, Modal,
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { useState, useEffect, FC } from 'react';
import ProductCard from '../components/ProductCard';
import ProductCardBottom from '../components/ProductCardBottom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchProducts } from '../store/reducers/productsReducer';
import NavBar from '../components/NavBar';
import ProductForm from '../components/ProductForm';

const ProductPage: FC = () => {
	const [searchText, setSearchText] = useState('');
	const [hasToShowAlert, setHasToShowAlert] = useState(false);
	const [hasToShowProdForm, setHasToShowProdForm] = useState(false);
	const products = useAppSelector((state) => state.products);
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!products.length) {
			dispatch(fetchProducts());
		}
	}, []);

	return (
		<>
			<div className="sticky-top">
				<NavBar />
				{hasToShowAlert && (
					<Alert variant="danger" className="mb-0">
						You need to sign in before you can start adding products
					</Alert>
				)}
			</div>
			{user && (
				<Button
					variant="outline-primary"
					className="btn-create-product position-fixed end-0 p-2 p-lg-3 fs-1 border-2 rounded-3 border-end-0 rounded-end-0"
					onClick={() => setHasToShowProdForm(true)}
				>
					+
				</Button>
			)}
			<div className="custom-container pb-5">
				<div className="w-100 d-flex align-items-center px-4 py-2 my-4 my-lg-5 border border-1 border-gray-40 rounded-pill shadow-md">
					<Icon className="text-gray fs-3 fs-lg-1 me-2" icon="akar-icons:search" />
					<input
						className="w-100 text-gray fm-header fs-2 fs-lg-1 border-0"
						type="text"
						onChange={(e) => setSearchText(e.target.value)}
						placeholder="Search..."
					/>
				</div>
				<Row className="g-4">
					{products.map((product) => (
						product.name.toLowerCase().includes(searchText.toLowerCase()) ? (
							<Col xs="12" lg="4" key={`col-${product.id}`}>
								<ProductCard
									product={product}
									cardBottom={(
										<ProductCardBottom
											product={product}
											showAlert={() => setHasToShowAlert(true)}
										/>
									)}
								/>
							</Col>
						) : null
					))}
				</Row>
			</div>
			{user && (
				<Modal show={hasToShowProdForm} onHide={() => setHasToShowProdForm(false)} centered>
					<Modal.Header closeButton>
						<Modal.Title>Create a new product</Modal.Title>
					</Modal.Header>
					<Modal.Body className="p-0">
						<ProductForm onProductSave={() => setHasToShowProdForm(false)} />
					</Modal.Body>
				</Modal>
			)}
		</>
	);
};

export default ProductPage;
