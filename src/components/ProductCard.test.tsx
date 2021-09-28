import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('<ProductCard />', () => {
	it('renders the given productData and cardBottom', () => {
		const productData = {
			id: '1',
			name: 'T-Shirt',
			category: 'Clothes',
			price: 10,
		};
		const nameRegExp = new RegExp(productData.name, 'i');
		const categoryRegExp = new RegExp(productData.category, 'i');
		const priceRegExp = new RegExp(productData.price.toString());
		const cardBottomText = 'Testing card';

		render(<ProductCard product={productData} cardBottom={(<div>{cardBottomText}</div>)} />);
		const $name = screen.getByRole('heading', { name: nameRegExp });
		const $category = screen.getByRole('heading', { name: categoryRegExp });
		const $price = screen.getByRole('heading', { name: priceRegExp });
		expect($name).toBeInTheDocument();
		expect($category).toBeInTheDocument();
		expect($price).toBeInTheDocument();
		expect(screen.getByText(cardBottomText)).toBeInTheDocument();
	});
});
