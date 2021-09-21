import { render, screen } from '@testing-library/react';
import CardQuantity from './CardQuantity';

describe('<CardQuantity />', () => {
	it('renders a counter with increment and decrement buttons', () => {
		render(<CardQuantity />);
		const $counterNumber = screen.getByText(/1/i);
		const $incrementButton = screen.getByRole('button', { name: /\+/ });
		const $decrementButton = screen.getByRole('button', { name: /-/ });
		expect($counterNumber).toBeInTheDocument();
		expect($incrementButton).toBeInTheDocument();
		expect($decrementButton).toBeInTheDocument();
	});
});
