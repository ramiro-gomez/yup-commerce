import { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button } from 'react-bootstrap';
import { HashRouter, Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { getUserDataUsingUsername, signUpUser } from '../firebase/handler';

interface AlreadyRegistered {
	email: string | null,
	username: string | null
}

const SignUpPage = () => {
	const [signupForm, setSignupForm] = useState({
		email: '',
		username: '',
		password: '',
	});
	const [alreadyRegistered, setAlreadyRegistered] = useState<AlreadyRegistered>({
		email: null,
		username: null,
	});
	const [showInvalidFields, setShowInvalidFields] = useState(false);
	const [disableSubmitButton, setDisableSubmitButton] = useState(false);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSignupForm({
			...signupForm,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (!form.checkValidity()) {
			setShowInvalidFields(true);
			return;
		}
		setDisableSubmitButton(true);
		const { email, username, password } = signupForm;
		try {
			const usernameExists = await getUserDataUsingUsername(username);
			if (usernameExists) {
				setAlreadyRegistered({
					...alreadyRegistered,
					username,
				});
				setShowInvalidFields(true);
			} else {
				await signUpUser(email, username, password);
			}
		} catch (error: any) {
			if (error.code === 'auth/email-already-in-use') {
				setAlreadyRegistered({
					...alreadyRegistered,
					email,
				});
				setShowInvalidFields(true);
			} else {
				console.log(error);
			}
		}
		setDisableSubmitButton(false);
	};

	return (
		<>
			<HashRouter>
				<Link to="/" className="d-block w-max-content mx-auto my-4 my-lg-5">
					<img className="sign-logo" src={logo} alt="logo" />
				</Link>
			</HashRouter>
			<div className="custom-container">
				<Form className="sign-form mx-auto p-4 rounded-2 shadow-lg" noValidate validated={showInvalidFields} onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="emailInput">
						<Form.Label className="fw-semibold fs-lg-2">Email</Form.Label>
						<Form.Control
							className="border-gray-40 fs-lg-2"
							type="email"
							name="email"
							placeholder="Enter your email"
							onChange={handleInputChange}
							value={signupForm.email}
							pattern={alreadyRegistered.email ? `^(?!${alreadyRegistered.email}$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$` // Must be a valid email and not a registered email
								: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'} // Must be a valid email (This regex is also used by firebase auth)
							required
						/>
						<Form.Control.Feedback type="invalid">
							{signupForm.email === alreadyRegistered.email ? '*This email has already been registered' : '*Enter a valid email adress'}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="usernameInput">
						<Form.Label className="fw-semibold fs-lg-2">Username</Form.Label>
						<Form.Control
							className="border-gray-40 fs-lg-2"
							type="text"
							name="username"
							placeholder="Choose your username"
							onChange={handleInputChange}
							maxLength={20}
							pattern={alreadyRegistered.username ? `^(?!${alreadyRegistered.username}$)[a-zA-Z][0-9a-zA-Z_.-]+$` // Must be a valid username and not a registered username
								: '^[a-zA-Z][0-9a-zA-Z_.-]+$'} // Must be a valid username, requeriments in the following Control.Feedback
							value={signupForm.username}
							required
						/>
						<Form.Control.Feedback type="invalid">
							{signupForm.username === alreadyRegistered.username ? '*Sorry, this username has already been taken' : '*Username must start with a letter and can only contain numbers, letters, periods, hyphens and underscores'}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-4" controlId="passwordInput">
						<Form.Label className="fw-semibold fs-lg-2">Password</Form.Label>
						<Form.Control
							className="border-gray-40 fs-lg-2 mb-1"
							type="password"
							name="password"
							placeholder="Choose your password"
							onChange={handleInputChange}
							value={signupForm.password}
							pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$" // Requeriments in the following Control.Feedback
							required
						/>
						<Form.Control.Feedback type="invalid">
							*Must contain at least 8 characters, numbers, lowercase and uppercase letters
						</Form.Control.Feedback>
					</Form.Group>
					<Button className="w-100 fs-3" disabled={disableSubmitButton} variant="primary" type="submit">Sign up</Button>
				</Form>
			</div>
		</>
	);
};

export default SignUpPage;
