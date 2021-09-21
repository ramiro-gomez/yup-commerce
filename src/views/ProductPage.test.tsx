import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductPage from './ProductPage';

describe('<ProductPage />', () => {
	it('renders a search bar and hides the cards that doesn\'t match with the text typed in the search bar', () => {
		render(<ProductPage />);
		const $searchBar = screen.getByPlaceholderText(/search/i);
		const $shirtCards = screen.getAllByText(/shirt/i);
		const $laptopCards = screen.getAllByText(/laptop/i);
		$shirtCards.forEach(($shirtCard) => expect($shirtCard).toBeVisible());
		$laptopCards.forEach(($laptopCard) => expect($laptopCard).toBeVisible());
		userEvent.type($searchBar, 'shirt');
		$shirtCards.forEach(($shirtCard) => expect($shirtCard).toBeVisible());
		$laptopCards.forEach(($laptopCard) => expect($laptopCard).not.toBeVisible());
		expect.assertions(($shirtCards.length * 2) + ($laptopCards.length * 2));
	});
});
