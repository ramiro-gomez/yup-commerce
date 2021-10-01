import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { invalidEmail, notRegistered, valid } from '../firebase/__mocks__/mockData';
import SignInPage from './SignInPage';

describe('<SignInPage />', () => {
	let $emailOrUsernameInput: HTMLInputElement;
	let $passwordInput: HTMLInputElement;
	let $signInBUtton: HTMLButtonElement;
	beforeEach(() => {
		render(<SignInPage />);
		$emailOrUsernameInput = screen.getByRole('textbox', { name: /email.*username|username.*email/i }) as HTMLInputElement;
		$passwordInput = screen.getByPlaceholderText(/password/i) as HTMLInputElement;
		$signInBUtton = screen.getByRole('button', { name: /sign in/i }) as HTMLButtonElement;
	});
	it('invalidates empty email or password fields', () => {
		[$emailOrUsernameInput, $passwordInput].forEach(($input) => {
			expect($input.reportValidity()).toBeFalsy();
			userEvent.type($input, 'a');
			expect($input.reportValidity()).toBeTruthy();
		});
	});
	it('clears the typed passsword if it\'s incorrect and shows an error feedback (email field must be valid)', async () => {
		userEvent.type($emailOrUsernameInput, valid.email);
		userEvent.type($passwordInput, '234');
		userEvent.click($signInBUtton);
		await screen.findByText(/wrong password/i);
	});
	it('shows an error feedback if the email is not registered', async () => {
		userEvent.type($emailOrUsernameInput, notRegistered.email);
		userEvent.type($passwordInput, valid.password);
		userEvent.click($signInBUtton);
		await screen.findByText(/email.*not registered/i);
	});
	it('shows an error feedback if the username is not registered', async () => {
		userEvent.type($emailOrUsernameInput, notRegistered.username);
		userEvent.type($passwordInput, valid.password);
		userEvent.click($signInBUtton);
		await screen.findByText(/username doesn't exist/i);
	});
	it('shows an error feedback if the email is invalid', async () => {
		userEvent.type($emailOrUsernameInput, invalidEmail);
		userEvent.type($passwordInput, valid.password);
		userEvent.click($signInBUtton);
		await screen.findByText(/type a valid email/i);
	});
});
