import { render, screen } from '@testing-library/react';
import SignInPage from './SignInPage';

describe('<SignInPage />', () => {
	it('renders a sign in form', () => {
		render(<SignInPage />);
		const $userAccountInput = screen.getByRole('textbox', { name: /email.*username|username.*email/i });
		const $passwordInput = screen.getByPlaceholderText(/password/i);
		const $signInBUtton = screen.getByRole('button', { name: /sign in/i });
		expect($userAccountInput).toBeInTheDocument();
		expect($passwordInput).toBeInTheDocument();
		expect($signInBUtton).toBeInTheDocument();
	});
});
