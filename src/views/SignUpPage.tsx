import { Formik, FormikHelpers } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { HashRouter, Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { signUpUser } from '../firebase/handler';

interface Fields {
	email: string,
	firstName: string,
	lastName: string,
	password: string,
	repeatPassword: string
}

const SignUpPage = () => {
	const initialValues: Fields = {
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		repeatPassword: '',
	};

	const validate = ({
		email, firstName, lastName, password, repeatPassword,
	}: Fields) => {
		let errors = {};
		if (!email) {
			errors = {
				...errors,
				email: '*You must enter an email',
			};
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) { // Same regex used by firebase auth
			errors = {
				...errors,
				email: '*Enter a valid email adress',
			};
		}
		if (!firstName) {
			errors = {
				...errors,
				firstName: '*You must enter a first name',
			};
		} else if (!/^[a-zA-Z]+$/.test(firstName)) {
			errors = {
				...errors,
				firstName: '*First name can only contain letters',
			};
		}
		if (!lastName) {
			errors = {
				...errors,
				lastName: '*You must enter a last name',
			};
		} else if (!/^[a-zA-Z]+$/.test(lastName)) {
			errors = {
				...errors,
				lastName: '*Last name can only contain letters',
			};
		}
		if (!password) {
			errors = {
				...errors,
				password: '*You must enter a password',
			};
		} else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
			errors = {
				...errors,
				password: '*Must contain at least 8 characters, numbers, lowercase and uppercase letters',
			};
		}
		if (!repeatPassword) {
			errors = {
				...errors,
				repeatPassword: '*You must repeat your password',
			};
		} else if (repeatPassword !== password) {
			errors = {
				...errors,
				repeatPassword: '*The passwords don\'t match',
			};
		}
		return errors;
	};

	const handleSignUp = async ({
		email, firstName, lastName, password,
	}: Fields, { setSubmitting, setFieldError }: FormikHelpers<Fields>) => {
		try {
			await signUpUser(email, firstName, lastName, password);
		} catch (error: any) {
			switch (error.code) {
				case 'auth/email-already-in-use':
					setFieldError('email', '*This email has already been registered');
					break;
				case 'auth/invalid-email':
					setFieldError('email', '*Enter a valid email adress');
					break;
				default:
					console.log(error);
					break;
			}
			setSubmitting(false);
		}
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
					onSubmit={handleSignUp}
				>
					{({
						handleSubmit, getFieldProps, errors, isSubmitting, touched,
					}) => (
						<Form className="form-size mx-auto p-4 rounded-2 shadow-lg" noValidate onSubmit={handleSubmit}>
							<Form.Group className="mb-3" controlId="email">
								<Form.Label className="fw-semibold fs-lg-2">Email</Form.Label>
								<Form.Control
									className="border-gray-40 fs-lg-2"
									placeholder="Enter your email"
									type="email"
									{...getFieldProps('email')}
									isValid={touched.email && !errors.email}
									isInvalid={touched.email && !!errors.email}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.email}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3" controlId="firstName">
								<Form.Label className="fw-semibold fs-lg-2">First name</Form.Label>
								<Form.Control
									className="border-gray-40 fs-lg-2"
									placeholder="Enter your first name"
									type="firstName"
									{...getFieldProps('firstName')}
									isValid={touched.firstName && !errors.firstName}
									isInvalid={touched.firstName && !!errors.firstName}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.firstName}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3" controlId="lastName">
								<Form.Label className="fw-semibold fs-lg-2">Last name</Form.Label>
								<Form.Control
									className="border-gray-40 fs-lg-2"
									placeholder="Enter your last name"
									type="lastName"
									{...getFieldProps('lastName')}
									isValid={touched.lastName && !errors.lastName}
									isInvalid={touched.lastName && !!errors.lastName}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.lastName}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-4" controlId="password">
								<Form.Label className="fw-semibold fs-lg-2">Password</Form.Label>
								<Form.Control
									className="border-gray-40 fs-lg-2"
									placeholder="Choose your password"
									type="password"
									{...getFieldProps('password')}
									isValid={touched.password && !errors.password}
									isInvalid={touched.password && !!errors.password}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.password}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-4" controlId="repeatPassword">
								<Form.Label className="fw-semibold fs-lg-2">Repeat your password</Form.Label>
								<Form.Control
									className="border-gray-40 fs-lg-2"
									placeholder="Repeat your choseen password"
									type="password"
									{...getFieldProps('repeatPassword')}
									isValid={touched.repeatPassword && !errors.repeatPassword}
									isInvalid={touched.repeatPassword && !!errors.repeatPassword}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.repeatPassword}
								</Form.Control.Feedback>
							</Form.Group>
							<Button
								className="w-100 fs-3"
								disabled={isSubmitting}
								variant="primary"
								type="submit"
							>
								Sign up
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
};

export default SignUpPage;
