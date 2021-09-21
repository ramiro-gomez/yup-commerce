import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('<App />', () => {
	it('redirects to different pages by clicking on their respective links', () => {
		render(<App />);
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
