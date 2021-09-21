import { render, screen } from '@testing-library/react';
import SignUpPage from './SignUpPage';

describe('<SignUpPage />', () => {
	it('renders a signup form', () => {
		render(<SignUpPage />);
		const $emailInput = screen.getByRole('textbox', { name: /email/i });
		const $usernameInput = screen.getByRole('textbox', { name: /username/i });
		const $passwordInput = screen.getByPlaceholderText(/password/i);
		const $signUpButton = screen.getByRole('button', { name: /sign up/i });
		expect($emailInput).toBeInTheDocument();
		expect($usernameInput).toBeInTheDocument();
		expect($passwordInput).toBeInTheDocument();
		expect($signUpButton).toBeInTheDocument();
	});
});
