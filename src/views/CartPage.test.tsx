import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/store';
import CartPage from './CartPage';

describe('<CartPage />', () => {
	let $totalPrice: HTMLElement;
	let $buyButton: HTMLButtonElement;
	beforeEach(() => {
		render(
			<Provider store={store}>
				<CartPage />
			</Provider>,
		);
		$totalPrice = screen.getByText(/total:/i);
		$buyButton = screen.getByRole('button', { name: /purchase/i }) as HTMLButtonElement;
	});
	it('renders a total price and a buy button', () => {
		expect($totalPrice).toBeInTheDocument();
		expect($buyButton).toBeInTheDocument();
	});
});
