import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

describe('<NavBar />', () => {
	it('renders sign in, sign up links', () => {
		render(<NavBar />);
		const $signInLink = screen.getByText(/sign in/i);
		const $signUpLink = screen.getByText(/sign up/i);
		expect($signInLink).toBeInTheDocument();
		expect($signUpLink).toBeInTheDocument();
	});
});
