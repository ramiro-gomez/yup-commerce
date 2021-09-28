import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import App from './App';
import { getProducts } from './firebase/handler';
import store from './store/store';

describe('<App />', () => {
	beforeEach(async () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>,
		);
		await waitFor(() => getProducts());
	});
	it('redirects to different pages by clicking on their respective links', () => {
		expect(window.location.hash).toBe('#/');
		userEvent.click(screen.getByRole('link', { name: /sign in/i }));
		expect(window.location.hash).toBe('#/signin');
		userEvent.click(screen.getByRole('link', { name: /logo/i }));
		expect(window.location.hash).toBe('#/');
		userEvent.click(screen.getByRole('link', { name: /sign up/i }));
		expect(window.location.hash).toBe('#/signup');
		userEvent.click(screen.getByRole('link', { name: /logo/i }));
		expect(window.location.hash).toBe('#/');
	});
});
