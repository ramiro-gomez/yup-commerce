import { Col, Row } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { useState, useEffect, FC } from 'react';
import ProductCard from '../components/ProductCard';
import ProductCardBottom from '../components/ProductCardBottom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchProducts } from '../store/reducers/productsReducer';

const ProductPage: FC = () => {
	const [searchText, setSearchText] = useState('');
	const products = useAppSelector((state) => state.products);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!products.length) {
			dispatch(fetchProducts());
		}
	}, []);

	return (
		<>
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
					{products.map((product) => {
						if (product.name.toLowerCase().includes(searchText.toLowerCase())) {
							return (
								<Col xs="12" lg="4" key={`col-${product.id}`}>
									<ProductCard
										product={product}
										cardBottom={<ProductCardBottom product={product} />}
									/>
								</Col>
							);
						}
						return null;
					})}
				</Row>
			</div>
		</>
	);
};

export default ProductPage;
