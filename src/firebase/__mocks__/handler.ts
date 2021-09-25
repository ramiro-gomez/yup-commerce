import {
	products,
	alreadyRegistered,
	notRegistered,
	invalidEmail,
	userData,
	valid,
} from './mockData';

const throwFirebaseException = (code: string) => {
	throw {
		code,
	};
};

export const getProducts = () => Promise.resolve(products);

export const getUserDataUsingUsername = (username: string) => {
	if (username === alreadyRegistered.username) return Promise.resolve(userData);
	return Promise.resolve();
};

export const signUpUser = (email: string) => {
	if (email === alreadyRegistered.email) {
		throwFirebaseException('auth/email-already-in-use');
	}
	return Promise.resolve();
};

export const signInUser = (email: string, password: string) => {
	const mailExceptions = {
		[notRegistered.email]: 'auth/user-not-found',
		[invalidEmail]: 'auth/invalid-email',
	};
	if (mailExceptions[email]) {
		throwFirebaseException(mailExceptions[email]);
	}
	if (password === valid.password) {
		return Promise.resolve();
	}
	return throwFirebaseException('auth/wrong-password');
};
