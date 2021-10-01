import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { products } from '../firebase/__mocks__/mockData';

describe('<ProductCard />', () => {
	it('renders the given productData and cardBottom', () => {
		const nameRegExp = new RegExp(products[0].name, 'i');
		const categoryRegExp = new RegExp(products[0].category, 'i');
		const priceRegExp = new RegExp(products[0].price.toString());
		const cardBottomText = 'Testing card';

		render(<ProductCard product={products[0]} cardBottom={(<div>{cardBottomText}</div>)} />);
		const $name = screen.getByRole('heading', { name: nameRegExp });
		const $category = screen.getByRole('heading', { name: categoryRegExp });
		const $price = screen.getByRole('heading', { name: priceRegExp });
		expect($name).toBeInTheDocument();
		expect($category).toBeInTheDocument();
		expect($price).toBeInTheDocument();
		expect(screen.getByText(cardBottomText)).toBeInTheDocument();
	});
});
