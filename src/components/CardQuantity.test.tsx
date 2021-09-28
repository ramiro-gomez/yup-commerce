import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardQuantity from './CardQuantity';

describe('<CardQuantity />', () => {
	const mock = {
		increment: jest.fn(),
		decrement: jest.fn(),
		quantity: 2,
	};
	beforeEach(() => {
		render(
			<CardQuantity
				increment={mock.increment}
				decrement={mock.decrement}
				quantity={mock.quantity}
			/>,
		);
	});
	it('calls increment and decrement with their respective buttons', () => {
		screen.getByText(mock.quantity);
		const $incrementButton = screen.getByRole('button', { name: /\+/ });
		const $decrementButton = screen.getByRole('button', { name: /-/ });
		expect(mock.increment).not.toHaveBeenCalled();
		expect(mock.decrement).not.toHaveBeenCalled();
		userEvent.click($incrementButton);
		expect(mock.increment).toHaveBeenCalledTimes(1);
		userEvent.click($decrementButton);
		expect(mock.decrement).toHaveBeenCalledTimes(1);
	});
});
