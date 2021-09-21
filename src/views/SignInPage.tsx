import { Form, Button } from 'react-bootstrap';
import { HashRouter, Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const SignUpPage = () => (
	<>
		<HashRouter>
			<Link to="/" className="d-block w-max-content mx-auto my-4 my-lg-5">
				<img className="sign-logo" src={logo} alt="logo" />
			</Link>
		</HashRouter>
		<div className="custom-container">
			<Form className="sign-form mx-auto p-4 rounded-2 shadow-lg">
				<Form.Group className="mb-3" controlId="userAccountInput">
					<Form.Label className="fw-semibold fs-lg-2">Email or username</Form.Label>
					<Form.Control className="border-gray-40 fs-lg-2" type="text" placeholder="Enter your email or username" />
				</Form.Group>
				<Form.Group className="mb-4" controlId="passwordInput">
					<Form.Label className="fw-semibold fs-lg-2">Password</Form.Label>
					<Form.Control className="border-gray-40 fs-lg-2 mb-1" type="password" placeholder="Enter your password" />
				</Form.Group>
				<Button className="w-100 fs-3" variant="primary" type="submit">Sign in</Button>
			</Form>
		</div>
	</>
);

export default SignUpPage;
