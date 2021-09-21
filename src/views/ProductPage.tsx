import { Col, Row, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import CardQuantity from '../components/CardQuantity';

const products = [
	{
		name: 'T-Shirt',
		category: 'Clothes',
		price: 10,
	},
	{
		name: 'T-Shirt',
		category: 'Clothes',
		price: 10,
	},
	{
		name: 'T-Shirt',
		category: 'Clothes',
		price: 10,
	},
	{
		name: 'Laptop',
		category: 'Technology',
		price: 100,
	},
	{
		name: 'Laptop',
		category: 'Technology',
		price: 100,
	},
	{
		name: 'Laptop',
		category: 'Technology',
		price: 100,
	},
];

const ProductPage = () => {
	const [searchText, setSearchText] = useState('');
	return (
		<>
			<NavBar />
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
					{products.map((productData, i) => {
						if (productData.name.toLowerCase().includes(searchText.toLowerCase())) {
							return (
								<Col xs="12" lg="4" key={`col-${i}`}>
									<ProductCard
										key={`product-${i}`}
										productData={productData}
										cardBottom={(
											<div className="d-flex mx-auto">
												<CardQuantity />
												<Button className="fm-body fs-5 fs-lg-3 fw-semibold border-start-0 rounded-start-0" variant="outline-primary">Add to cart</Button>
											</div>
										)}
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
