import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('<ProductCard />', () => {
	it('renders the givens name, category and price', () => {
		const productData = {
			name: 'T-Shirt',
			category: 'Clothes',
			price: 10,
		};
		render(<ProductCard productData={productData} />);
		const $name = screen.getByText(new RegExp(productData.name));
		const $category = screen.getByText(new RegExp(productData.category));
		const $price = screen.getByText(new RegExp(`${productData.price.toString()}$`));
		expect($name).toBeInTheDocument();
		expect($category).toBeInTheDocument();
		expect($price).toBeInTheDocument();
	});
});
