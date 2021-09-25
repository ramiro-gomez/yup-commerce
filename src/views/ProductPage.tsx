import { Col, Row, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { useState, useEffect, FC } from 'react';
import { User } from '@firebase/auth';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import CardQuantity from '../components/CardQuantity';
import { getProducts } from '../firebase/handler';

interface Product {
	name: string,
	category: string,
	price: number
}

interface Props {
	currentUser: null|User
}

const ProductPage: FC<Props> = ({ currentUser }) => {
	const [searchText, setSearchText] = useState('');
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		(async () => {
			setProducts(await getProducts());
		})();
	}, []);

	return (
		<>
			<NavBar currentUser={currentUser} />
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
