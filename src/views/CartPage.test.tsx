import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/store';
import CartPage from './CartPage';

describe('<CartPage />', () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<CartPage />
			</Provider>,
		);
	});
	it('renders a total price and a buy button', () => {
		const $totalPrice = screen.getByText(/total:/i);
		const $buyButton = screen.getByRole('button', { name: /purchase/i });
		expect($totalPrice).toBeInTheDocument();
		expect($buyButton).toBeInTheDocument();
	});
});
