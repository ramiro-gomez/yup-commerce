import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('<App />', () => {
	it('redirects to different pages by clicking on their respective links', () => {
		render(<App />);
		expect(window.location.hash).toBe('#/');
		userEvent.click(screen.getByText(/sign in/i));
		expect(window.location.hash).toBe('#/signin');
		userEvent.click(screen.getByAltText(/logo/i));
		expect(window.location.hash).toBe('#/');
	});
});
