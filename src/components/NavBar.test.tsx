import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/store';
import NavBar from './NavBar';

describe('<NavBar />', () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<NavBar />
			</Provider>,
		);
	});
	it('renders logo, sign in and sign up links', () => {
		const $logoLink = screen.getByRole('link', { name: /logo/i });
		const $signInLink = screen.getByRole('link', { name: /sign in/i });
		const $signUpLink = screen.getByRole('link', { name: /sign up/i });
		expect($logoLink).toBeInTheDocument();
		expect($signInLink).toBeInTheDocument();
		expect($signUpLink).toBeInTheDocument();
	});
});
