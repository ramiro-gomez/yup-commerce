import { ChangeEvent, FormEvent, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { HashRouter, Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { getUserDataUsingUsername, signInUser } from '../firebase/handler';

const SignUpPage = () => {
	const [signInForm, setSignInForm] = useState({
		emailOrUsername: '',
		password: '',
	});
	const [showInvalidFields, setShowInvalidFields] = useState(false);
	const [notRegisteredEmailOrUsername, setNotRegisteredEmailOrUsername] = useState('');
	const [feedback, setFeedback] = useState({
		emailOrUsername: '',
		password: '',
	});
	const [disableSubmitButton, setDisableSubmitButton] = useState(false);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSignInForm({
			...signInForm,
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
		const { emailOrUsername, password } = signInForm;
		try {
			let email: string;
			if (emailOrUsername.includes('@')) {
				email = emailOrUsername;
			} else {
				const username = emailOrUsername;
				const userData = await getUserDataUsingUsername(username);
				if (userData) {
					email = userData.email;
				} else {
					setFeedback({
						emailOrUsername: '*This username doesn\'t exist',
						password: '',
					});
					setNotRegisteredEmailOrUsername(emailOrUsername);
					setShowInvalidFields(true);
					return;
				}
			}
			await signInUser(email, password);
		} catch (error: any) {
			switch (error.code) {
				case 'auth/user-not-found':
					setFeedback({
						emailOrUsername: '*This email is not registered',
						password: '',
					});
					setNotRegisteredEmailOrUsername(emailOrUsername);
					setShowInvalidFields(true);
					break;
				case 'auth/invalid-email':
					setFeedback({
						emailOrUsername: '*Type a valid email',
						password: '',
					});
					setNotRegisteredEmailOrUsername(emailOrUsername);
					setShowInvalidFields(true);
					break;
				case 'auth/wrong-password':
					setFeedback({
						emailOrUsername: '',
						password: '*Wrong password',
					});
					setSignInForm({
						...signInForm,
						password: '',
					});
					setShowInvalidFields(true);
					break;
				default:
					console.log(error);
					break;
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
					<Form.Group className="mb-3" controlId="userAccountInput">
						<Form.Label className="fw-semibold fs-lg-2">Email or username</Form.Label>
						<Form.Control
							className="border-gray-40 fs-lg-2"
							type="text"
							placeholder="Enter your email or username"
							name="emailOrUsername"
							value={signInForm.emailOrUsername}
							onChange={handleInputChange}
							pattern={notRegisteredEmailOrUsername ? `^(?!${notRegisteredEmailOrUsername}$).*$` : undefined}
							required
						/>
						<Form.Control.Feedback type="invalid">
							{feedback.emailOrUsername || '*You must enter an email or username'}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-4" controlId="passwordInput">
						<Form.Label className="fw-semibold fs-lg-2">Password</Form.Label>
						<Form.Control
							className="border-gray-40 fs-lg-2 mb-1"
							type="password"
							placeholder="Enter your password"
							name="password"
							value={signInForm.password}
							onChange={handleInputChange}
							required
						/>
						<Form.Control.Feedback type="invalid">
							{feedback.password || '*You must enter a password'}
						</Form.Control.Feedback>
					</Form.Group>
					<Button className="w-100 fs-3" variant="primary" type="submit" disabled={disableSubmitButton}>Sign in</Button>
				</Form>
			</div>
		</>
	);
};

export default SignUpPage;
