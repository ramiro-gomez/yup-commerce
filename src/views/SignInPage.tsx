import { Formik, FormikHelpers } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { HashRouter, Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { signInUser } from '../firebase/handler';

interface Fields {
	email: string,
	password: string
}

const SignUpPage = () => {
	const initialValues: Fields = {
		email: '',
		password: '',
	};
	const validate = ({ email, password }: Fields) => {
		let errors = {};
		if (!email) {
			errors = {
				...errors,
				email: '*You must enter an email',
			};
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) { // Same regex used by firebase auth
			errors = {
				...errors,
				email: '*Enter a valid email',
			};
		}
		if (!password) {
			errors = {
				...errors,
				password: '*You must enter a password',
			};
		}
		return errors;
	};
	const handleSignIn = async (
		{ email, password }: Fields, { setSubmitting, setFieldError }: FormikHelpers<Fields>,
	) => {
		try {
			await signInUser(email, password);
		} catch (error: any) {
			switch (error.code) {
				case 'auth/user-not-found':
					setFieldError('email', '*This email is not registered');
					break;
				case 'auth/invalid-email':
					setFieldError('email', '*Enter a valid email');
					break;
				case 'auth/wrong-password':
					setFieldError('password', '*Wrong password');
					break;
				default:
					console.log(error);
					break;
			}
		}
		setSubmitting(false);
	};

	return (
		<>
			<HashRouter>
				<Link to="/" className="d-block w-max-content mx-auto my-4 my-lg-5">
					<img className="sign-logo" src={logo} alt="logo" />
				</Link>
			</HashRouter>
			<div className="custom-container">
				<Formik
					initialValues={initialValues}
					validate={validate}
					onSubmit={handleSignIn}
				>
					{({
						handleSubmit, getFieldProps, errors, isSubmitting, submitCount,
					}) => (
						<Form className="form-size mx-auto p-4 mb-5 rounded-2 shadow-lg" noValidate onSubmit={handleSubmit}>
							<Form.Group className="mb-3" controlId="email">
								<Form.Label className="fw-semibold fs-lg-2">Email</Form.Label>
								<Form.Control
									className="border-gray-40 fs-lg-2"
									placeholder="Enter your email"
									type="email"
									{...getFieldProps('email')}
									isValid={submitCount > 0 && !errors.email}
									isInvalid={submitCount > 0 && !!errors.email}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.email}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-4" controlId="password">
								<Form.Label className="fw-semibold fs-lg-2">Password</Form.Label>
								<Form.Control
									className="border-gray-40 fs-lg-2"
									placeholder="Enter your password"
									type="password"
									{...getFieldProps('password')}
									isValid={submitCount > 0 && !errors.password}
									isInvalid={submitCount > 0 && !!errors.password}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.password}
								</Form.Control.Feedback>
							</Form.Group>
							<Button
								className="w-100 fs-3"
								variant="primary"
								type="submit"
								disabled={isSubmitting}
							>
								Sign in
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
};

export default SignUpPage;
