import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

describe('<NavBar />', () => {
	it('renders logo, sign in and sign up links', () => {
		render(<NavBar />);
		const $logoLink = screen.getByRole('link', { name: /logo/i });
		const $signInLink = screen.getByRole('link', { name: /sign in/i });
		const $signUpLink = screen.getByRole('link', { name: /sign up/i });
		expect($logoLink).toBeInTheDocument();
		expect($signInLink).toBeInTheDocument();
		expect($signUpLink).toBeInTheDocument();
	});
});
