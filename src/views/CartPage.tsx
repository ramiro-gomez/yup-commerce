import { Button, Col, Row } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { User } from '@firebase/auth';
import { FC } from 'react';
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

interface Props {
	currentUser: null|User
}

const CartPage: FC<Props> = ({ currentUser }) => (
	<>
		<NavBar currentUser={currentUser} />
		<div className="custom-container">
			<section className="py-3 px-4 my-4 rounded-2 shadow-lg">
				<div className="d-flex mb-4">
					<h4 className="text-gray fs-2 fw-semibold">Total:</h4>
					<h4 className="text-gray fs-2 fw-semibold ms-auto">$400</h4>
				</div>
				<Button className="w-100" variant="primary">Make purchase</Button>
			</section>
			<Row className="g-4">
				{products.map((productData, i) => (
					<Col xs="12" lg="4" key={`col-${i}`}>
						<ProductCard
							key={`product-${i}`}
							productData={productData}
							cardBottom={(
								<div className="d-flex align-items-center">
									<CardQuantity />
									<button className="border-0 bg-transparent p-0 ms-auto" type="button" aria-label="remove">
										<Icon className="text-gray fs-1" icon="ant-design:close-outlined" />
									</button>
								</div>
							)}
						/>
					</Col>
				))}
			</Row>
		</div>
	</>
);

export default CartPage;
