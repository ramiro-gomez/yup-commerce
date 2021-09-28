import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
	invalidEmail, notRegistered, valid,
} from '../firebase/__mocks__/mockData';
import SignInPage from './SignInPage';

jest.mock('../firebase/handler.ts');

describe('<SignInPage />', () => {
	beforeEach(() => {
		render(<SignInPage />);
	});
	it('invalidates empty email or password fields', () => {
		const $emailOrUsernameInput = screen.getByRole('textbox', { name: /email.*username|username.*email/i }) as HTMLInputElement;
		const $passwordInput = screen.getByPlaceholderText(/password/i) as HTMLInputElement;
		[$emailOrUsernameInput, $passwordInput].forEach(($input) => {
			expect($input.reportValidity()).toBeFalsy();
			userEvent.type($input, 'a');
			expect($input.reportValidity()).toBeTruthy();
		});
	});
	it('clears the typed passsword if it\'s incorrect and shows an error feedback (email field must be valid)', async () => {
		const $emailOrUsernameInput = screen.getByRole('textbox', { name: /email.*username|username.*email/i });
		const $passwordInput = screen.getByPlaceholderText(/password/i);
		const $signInBUtton = screen.getByRole('button', { name: /sign in/i });
		userEvent.type($emailOrUsernameInput, valid.email);
		userEvent.type($passwordInput, '234');
		userEvent.click($signInBUtton);
		await screen.findByText(/wrong password/i);
	});
	it('shows an error feedback if the email is not registered', async () => {
		const $emailOrUsernameInput = screen.getByRole('textbox', { name: /email.*username|username.*email/i });
		const $passwordInput = screen.getByPlaceholderText(/password/i);
		const $signInBUtton = screen.getByRole('button', { name: /sign in/i });
		userEvent.type($emailOrUsernameInput, notRegistered.email);
		userEvent.type($passwordInput, valid.password);
		userEvent.click($signInBUtton);
		await screen.findByText(/email.*not registered/i);
	});
	it('shows an error feedback if the username is not registered', async () => {
		const $emailOrUsernameInput = screen.getByRole('textbox', { name: /email.*username|username.*email/i });
		const $passwordInput = screen.getByPlaceholderText(/password/i);
		const $signInBUtton = screen.getByRole('button', { name: /sign in/i });
		userEvent.type($emailOrUsernameInput, notRegistered.username);
		userEvent.type($passwordInput, valid.password);
		userEvent.click($signInBUtton);
		await screen.findByText(/username doesn't exist/i);
	});
	it('shows an error feedback if the email is invalid', async () => {
		const $emailOrUsernameInput = screen.getByRole('textbox', { name: /email.*username|username.*email/i });
		const $passwordInput = screen.getByPlaceholderText(/password/i);
		const $signInBUtton = screen.getByRole('button', { name: /sign in/i });
		userEvent.type($emailOrUsernameInput, invalidEmail);
		userEvent.type($passwordInput, valid.password);
		userEvent.click($signInBUtton);
		await screen.findByText(/type a valid email/i);
	});
});
