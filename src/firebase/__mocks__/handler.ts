import { mockProducts, mockAlreadyRegisterd } from './mockData';

export const getProducts = () => Promise.resolve(mockProducts);

export const getUsernameData = (username: string) => (
	username === mockAlreadyRegisterd.username ? ({ userid: 'testinguserid' }) : null
);

export const signUpUser = (email: string) => {
	if (email === mockAlreadyRegisterd.email) {
		// eslint-disable-next-line no-throw-literal
		throw {
			code: 'auth/email-already-in-use',
		};
	} else {
		Promise.resolve();
	}
};
