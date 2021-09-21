import { render, screen } from '@testing-library/react';
import CartPage from './CartPage';

describe('<CartPage />', () => {
	beforeEach(() => {
		render(<CartPage />);
	});
	it('renders a total price and a buy button', () => {
		const $totalPrice = screen.getByText(/total:/i);
		const $buyButton = screen.getByRole('button', { name: /purchase/i });
		expect($totalPrice).toBeInTheDocument();
		expect($buyButton).toBeInTheDocument();
	});
});
