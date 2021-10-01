import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpPage from './SignUpPage';
import { signUpUser, getUserDataUsingUsername } from '../firebase/handler';
import { alreadyRegistered, valid } from '../firebase/__mocks__/mockData';

describe('<SignUpPage />', () => {
	let $emailInput: HTMLInputElement;
	let $usernameInput: HTMLInputElement;
	let $passwordInput: HTMLInputElement;
	let $signUpButton: HTMLButtonElement;
	beforeEach(() => {
		render(<SignUpPage />);
		$emailInput = screen.getByRole('textbox', { name: /email/i }) as HTMLInputElement;
		$usernameInput = screen.getByRole('textbox', { name: /username/i }) as HTMLInputElement;
		$passwordInput = screen.getByPlaceholderText(/password/i) as HTMLInputElement;
		$signUpButton = screen.getByRole('button', { name: /sign up/i }) as HTMLButtonElement;
	});
	it('validates that the email is well written', () => {
		const invalidEmails = ['a', 'a@', 'a@b', 'a@b.', 'a@b.c', 'a@b@', 'a@@b.c', '@a@b.c', 'a@c..c'];
		const validEmails = ['a@b.cc', 'abc@abc.abc', 'test@email.test', 't-em@e.cc', 'a_@b.cc'];
		invalidEmails.forEach((email) => {
			userEvent.type($emailInput, email);
			expect($emailInput.reportValidity()).toBeFalsy();
			userEvent.clear($emailInput);
		});
		validEmails.forEach((email) => {
			userEvent.type($emailInput, email);
			expect($emailInput.reportValidity()).toBeTruthy();
			userEvent.clear($emailInput);
		});
	});
	it('validates that the username is longer than 2 characters, starts with a letter and only contains numbers, letters, periods, hyphens or underscores', () => {
		const invalidUsernames = ['a', '1a', '123', '1abc', '.a', '.abcD', '-a', '-abcD', '_abcD', 'a@', 'b~', 'c(', 'a='];
		const validUsernames = ['aa', 'AA', 'A.b.c.d', 'a_d', 'a_b.c-e', 'a1', 'adefg'];
		invalidUsernames.forEach((username) => {
			userEvent.type($usernameInput, username);
			expect($usernameInput.reportValidity()).toBeFalsy();
			userEvent.clear($usernameInput);
		});
		validUsernames.forEach((username) => {
			userEvent.type($usernameInput, username);
			expect($usernameInput.reportValidity()).toBeTruthy();
			userEvent.clear($usernameInput);
		});
	});
	it('validates that the password has at least 8 characters, numbers, lowercase and uppercase letters', () => {
		const invalidPasswords = ['12345678', 'abcdefgh', 'abcd1234', '12345Ab', '-1234567A', 'Ab34 56'];
		const validPasswords = ['Ab345678', 'Abcd1234', '-1234567Ab', 'Ab34 56-'];
		invalidPasswords.forEach((password) => {
			userEvent.type($passwordInput, password);
			expect($passwordInput.reportValidity()).toBeFalsy();
			userEvent.clear($passwordInput);
		});
		validPasswords.forEach((password) => {
			userEvent.type($passwordInput, password);
			expect($passwordInput.reportValidity()).toBeTruthy();
			userEvent.clear($passwordInput);
		});
	});
	it('checks if the user name already exists (all other fields must be valid)', async () => {
		userEvent.type($emailInput, valid.email);
		userEvent.type($usernameInput, alreadyRegistered.username);
		userEvent.type($passwordInput, valid.password);
		expect($usernameInput.reportValidity()).toBeTruthy();
		userEvent.click($signUpButton);
		await waitFor(() => getUserDataUsingUsername(''));
		expect($usernameInput.reportValidity()).toBeFalsy();
	});
	it('invalidates the email if is already registered (all fields must be valid and the username must not exist) ', async () => {
		userEvent.type($emailInput, alreadyRegistered.email);
		userEvent.type($usernameInput, valid.username);
		userEvent.type($passwordInput, valid.password);
		expect($emailInput.reportValidity()).toBeTruthy();
		userEvent.click($signUpButton);
		await waitFor(() => getUserDataUsingUsername(''));
		await waitFor(() => signUpUser('', '', ''));
		expect($emailInput.reportValidity()).toBeFalsy();
	});
	it('prevents the sign up button from being clicked while registering (all fields must be valid)', async () => {
		userEvent.type($emailInput, valid.email);
		userEvent.type($usernameInput, valid.username);
		userEvent.type($passwordInput, valid.password);
		expect($signUpButton).toBeEnabled();
		userEvent.click($signUpButton);
		expect($signUpButton).toBeDisabled();
		userEvent.click($signUpButton);
		expect($signUpButton).toBeDisabled();
		userEvent.click($signUpButton);
		await waitFor(() => signUpUser('', '', ''));
		expect($signUpButton).toBeEnabled();
	});
});
