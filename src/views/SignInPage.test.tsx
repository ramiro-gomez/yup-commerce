import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { notRegisteredEmail, valid } from '../firebase/__mocks__/mockData';
import SignInPage from './SignInPage';

describe('<SignInPage />', () => {
	let $emailInput: HTMLInputElement;
	let $passwordInput: HTMLInputElement;
	let $signInBUtton: HTMLButtonElement;
	beforeEach(() => {
		render(<SignInPage />);
		$emailInput = screen.getByRole('textbox', { name: /email/i }) as HTMLInputElement;
		$passwordInput = screen.getByPlaceholderText(/password/i) as HTMLInputElement;
		$signInBUtton = screen.getByRole('button', { name: /sign in/i }) as HTMLButtonElement;
	});
	it('shows a feedback message if an email is not entered', async () => {
		userEvent.type($emailInput, '');
		userEvent.click(document.body);
		await screen.findByText(/you must enter an email/i);
	});
	it('shows a feedback message if a password is not entered', async () => {
		userEvent.type($passwordInput, '');
		userEvent.click(document.body);
		await screen.findByText(/you must enter a password/i);
	});

	it.each([
		'a', 'a@', 'a@b', 'a@b.', 'a@b.c', 'a@b@', 'a@@b.c', '@a@b.c', 'a@c..c',
	])('shows a feedback message for the invalid email %s', async (invalidEmail) => {
		userEvent.type($emailInput, invalidEmail);
		userEvent.click(document.body);
		await screen.findByText(/enter a valid email/i);
	});
	it.each([
		'a@b.cc', 'abc@abc.abc', 'test@email.test', 't-em@e.cc', 'a_@b.cc',
	])('doesn\'t show a feedback message for the valid email %s', async (validEmail) => {
		userEvent.type($emailInput, validEmail);
		userEvent.click(document.body);
		await waitFor(() => Promise.resolve());
		expect(screen.queryByText(/enter a valid email/i)).toBeNull();
	});

	it('shows an error feedback if the email is not registered', async () => {
		userEvent.type($emailInput, notRegisteredEmail);
		userEvent.type($passwordInput, '234');
		userEvent.click($signInBUtton);
		await screen.findByText(/email.*not registered/i);
	});
	it('shows a feedback message if the password is wrong (email field must be valid)', async () => {
		userEvent.type($emailInput, valid.email);
		userEvent.type($passwordInput, '234');
		userEvent.click($signInBUtton);
		await screen.findByText(/wrong password/i);
	});
});
