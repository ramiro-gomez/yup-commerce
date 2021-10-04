import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpPage from './SignUpPage';
import { alreadyRegisteredEmail, valid } from '../firebase/__mocks__/mockData';

describe('<SignUpPage />', () => {
	let $emailInput: HTMLInputElement;
	let $firstNameInput: HTMLInputElement;
	let $lastNameInput: HTMLInputElement;
	let $passwordInput: HTMLInputElement;
	let $repeatPasswordInput: HTMLInputElement;
	let $signUpButton: HTMLButtonElement;
	beforeEach(() => {
		render(<SignUpPage />);
		$emailInput = screen.getByRole('textbox', { name: /email/i }) as HTMLInputElement;
		$firstNameInput = screen.getByRole('textbox', { name: /first.*name/i }) as HTMLInputElement;
		$lastNameInput = screen.getByRole('textbox', { name: /last.*name/i }) as HTMLInputElement;
		$passwordInput = screen.getByLabelText(/^password$/i) as HTMLInputElement;
		$repeatPasswordInput = screen.getByLabelText(/repeat.*password/i) as HTMLInputElement;
		$signUpButton = screen.getByRole('button', { name: /sign up/i }) as HTMLButtonElement;
	});
	it('shows a feedback message if an email is not entered', async () => {
		userEvent.type($emailInput, '');
		userEvent.click(document.body);
		await screen.findByText(/you must enter an email/i);
	});
	it('shows feedback messages if a first name is not entered', async () => {
		userEvent.type($firstNameInput, '');
		userEvent.click(document.body);
		await screen.findByText(/you must enter a first name/i);
	});
	it('shows feedback messages if a last name is not entered', async () => {
		userEvent.type($lastNameInput, '');
		userEvent.click(document.body);
		await screen.findByText(/you must enter a last name/i);
	});
	it('shows feedback messages if a password is not entered', async () => {
		userEvent.type($passwordInput, '');
		userEvent.click(document.body);
		await screen.findByText(/you must enter a password/i);
	});
	it('shows feedback messages if the password is not repeated', async () => {
		userEvent.type($repeatPasswordInput, '');
		userEvent.click(document.body);
		await screen.findByText(/you must repeat your password/i);
	});

	it.each([
		'a', 'a@', 'a@b', 'a@b.', 'a@b.c', 'a@b@', 'a@@b.c', '@a@b.c', 'a@c..c',
	])('shows a feedback message for the invalid email %s', async (invalidEmail) => {
		userEvent.type($emailInput, invalidEmail);
		userEvent.click(document.body);
		await screen.findByText(/enter a valid email adress/i);
	});
	it.each([
		'a@b.cc', 'abc@abc.abc', 'test@email.test', 't-em@e.cc', 'a_@b.cc',
	])('doesn\'t show a feedback message for the valid email %s', async (validEmail) => {
		userEvent.type($emailInput, validEmail);
		userEvent.click(document.body);
		await waitFor(() => Promise.resolve());
		expect(screen.queryByText(/enter a valid email adress/i)).toBeNull();
	});

	const validFirstAndLastNames = ['a', 'A', 'ab', 'aB'];
	const invalidFirstAndLastNames = ['.', '_', '&', '-', '.a', 'a-b', 'a b'];
	it.each(invalidFirstAndLastNames)('shows a feedback message for the invalid first name %s', async (invalidFirstName) => {
		userEvent.type($firstNameInput, invalidFirstName);
		userEvent.click(document.body);
		await screen.findByText(/first name can only contain letters/i);
	});
	it.each(invalidFirstAndLastNames)('shows a feedback message for the invalid last name %s', async (invalidLastName) => {
		userEvent.type($lastNameInput, invalidLastName);
		userEvent.click(document.body);
		await screen.findByText(/last name can only contain letters/i);
	});

	it.each(validFirstAndLastNames)('doesn\'t show a feedback message for the valid first name %s', async (validFirstName) => {
		userEvent.type($firstNameInput, validFirstName);
		userEvent.click(document.body);
		await waitFor(() => Promise.resolve());
		expect(screen.queryByText(/first name can only contain letters/i)).toBeNull();
	});
	it.each(validFirstAndLastNames)('doesn\'t show a feedback message for the valid last name %s', async (validLastName) => {
		userEvent.type($lastNameInput, validLastName);
		userEvent.click(document.body);
		await waitFor(() => Promise.resolve());
		expect(screen.queryByText(/last name can only contain letters/i)).toBeNull();
	});

	it.each([
		'12345678', 'abcdefgh', 'abcd1234', '12345Ab', '1234567-A', 'Ab34 56', 'Ab34567', '12345678', 'abcdefgh', 'abc345678',
	])('shows a feedback message for the invalid password %s', async (invalidPassword) => {
		userEvent.type($passwordInput, invalidPassword);
		userEvent.click(document.body);
		await screen.findByText(/must contain at least 8 characters, numbers, lowercase and uppercase letters/i);
	});
	it.each([
		'Ab345678', 'Abcd1234', '-1234567Ab', 'Ab34 56-',
	])('doen\'t show a feedback message for the valid password %s', async (validPassword) => {
		userEvent.type($passwordInput, validPassword);
		userEvent.click(document.body);
		await waitFor(() => Promise.resolve());
		expect(screen.queryByText(/must contain at least 8 characters, numbers, lowercase and uppercase letters/i)).toBeNull();
	});

	it('shows a feedback message if the passwords don\'t match', async () => {
		userEvent.type($passwordInput, valid.password);
		userEvent.type($repeatPasswordInput, '123');
		userEvent.click(document.body);
		await screen.findByText(/the passwords don't match/i);
	});

	it('invalidates the email if is already registered (all fields must be valid)', async () => {
		userEvent.type($emailInput, alreadyRegisteredEmail);
		userEvent.type($firstNameInput, valid.firstName);
		userEvent.type($lastNameInput, valid.lastName);
		userEvent.type($passwordInput, valid.password);
		userEvent.type($repeatPasswordInput, valid.password);
		userEvent.click($signUpButton);
		await screen.findByText(/this email has already been registered/i);
	});
});
