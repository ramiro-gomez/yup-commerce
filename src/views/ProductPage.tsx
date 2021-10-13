import {
	Alert, Col, Row, Button, Modal,
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { useState, FC } from 'react';
import ProductCard from '../components/ProductCard';
import ProductCardBottom from '../components/ProductCardBottom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { deleteProduct } from '../store/reducers/productsReducer';
import NavBar from '../components/NavBar';
import ProductForm, { ProductFormAction } from '../components/ProductForm';
import { addToCart } from '../store/reducers/cartReducer';
import { Product } from '../interfaces';

interface ProductModal {
	hasToShow: boolean,
	action: ProductFormAction,
	title: string,
	productToEdit: null|Product,
}

const ProductPage: FC = () => {
	const [searchText, setSearchText] = useState('');
	const [alertMessage, setAlertMessage] = useState('');
	const [productModal, setProductModal] = useState<ProductModal>({
		hasToShow: false,
		action: ProductFormAction.create,
		title: '',
		productToEdit: null,
	});
	const products = useAppSelector((state) => state.products);
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const handleAddToCart = (product: Product, quantity: number) => {
		if (user) {
			dispatch(addToCart({ product, quantity }));
		} else {
			setAlertMessage('You need to sign in before you can start adding products to your cart');
		}
	};
	const hideProductModal = () => setProductModal({ ...productModal, hasToShow: false });
	const handleShowProductModal = () => {
		if (user) {
			setProductModal({
				hasToShow: true,
				action: ProductFormAction.create,
				title: 'Create a new product',
				productToEdit: null,
			});
		} else {
			setAlertMessage('You need to sign in to start creating new products');
		}
	};
	const handleEditProduct = (product: Product) => {
		setProductModal({
			hasToShow: true,
			action: ProductFormAction.edit,
			title: 'Edit this product',
			productToEdit: product,
		});
	};
	const handleDeleteProduct = async (product: Product) => {
		dispatch(deleteProduct(product));
	};

	return (
		<>
			<Modal show={productModal.hasToShow} onHide={hideProductModal} centered>
				<Modal.Header closeButton>
					<Modal.Title>{productModal.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body className="p-0">
					<ProductForm
						action={productModal.action}
						productToEdit={productModal.productToEdit}
						hideProductModal={hideProductModal}
					/>
				</Modal.Body>
			</Modal>
			<div className="sticky-top">
				<NavBar />
				{alertMessage && <Alert variant="danger" className="mb-0">{alertMessage}</Alert>}
			</div>
			<Button
				variant="outline-primary"
				className="btn-create-product position-fixed end-0 p-2 p-lg-3 fs-1 border-2 rounded-3 border-end-0 rounded-end-0"
				onClick={handleShowProductModal}
			>
				+
			</Button>
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
									cardTop={user && product.createdBy === user.uid && (
										<div className="position-absolute d-flex justify-content-between w-100">
											<button type="button" className="corner-btn-edit" onClick={() => handleEditProduct(product)}>
												<Icon icon="bytesize:edit" />
											</button>
											<button type="button" className="corner-btn-delete" onClick={() => handleDeleteProduct(product)}>
												<Icon icon="carbon:delete" />
											</button>
										</div>
									)}
									cardBottom={(
										<ProductCardBottom product={product} handleAddToCart={handleAddToCart} />
									)}
								/>
							</Col>
						) : null
					))}
				</Row>
			</div>
		</>
	);
};

export default ProductPage;
