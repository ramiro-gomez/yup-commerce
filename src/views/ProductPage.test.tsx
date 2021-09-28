import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductPage from './ProductPage';
import { products } from '../firebase/__mocks__/mockData';
import { getProducts } from '../firebase/handler';

jest.mock('../firebase/handler');

describe('<ProductPage />', () => {
	beforeEach(async () => {
		render(<ProductPage />);
		await waitFor(() => getProducts());
	});
	it('renders product cards', async () => {
		products.forEach(({ name, category, price }) => {
			const nameRegExp = new RegExp(name, 'i');
			const categoryRegExp = new RegExp(category, 'i');
			const priceRegExp = new RegExp(`${price}$`);
			screen.getAllByText(nameRegExp);
			screen.getAllByText(categoryRegExp);
			screen.getAllByText(priceRegExp);
		});
	});
	it('renders a search bar and hides the cards that doesn\'t match with the text typed in the search bar', async () => {
		const $searchBar = screen.getByPlaceholderText(/search/i);
		const product0NameRegExp = new RegExp(products[0].name, 'i');
		const $product0 = screen.getAllByText(product0NameRegExp);
		const $prodsWithDiffName = products.reduce((acc, { name }) => {
			if (name.match(product0NameRegExp)) return acc;
			return [...acc, ...screen.getAllByText(name)];
		}, [] as HTMLElement[]);
		$product0.forEach(($product) => expect($product).toBeVisible());
		$prodsWithDiffName.forEach(($product) => expect($product).toBeVisible());
		userEvent.type($searchBar, products[0].name);
		$product0.forEach(($product) => expect($product).toBeVisible());
		$prodsWithDiffName.forEach(($product) => expect($product).not.toBeVisible());
		expect.assertions(($product0.length * 2) + ($prodsWithDiffName.length * 2));
	});
});
