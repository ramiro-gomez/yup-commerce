import {
	products,
	alreadyRegisteredEmail,
	notRegisteredEmail,
	invalidEmail,
	userData,
	valid,
	validUid,
} from './mockData';

const throwFirebaseException = (code: string) => {
	throw {
		code,
	};
};

export const getProducts = () => Promise.resolve(products);

export const signUpUser = (email: string) => {
	if (email === alreadyRegisteredEmail) {
		throwFirebaseException('auth/email-already-in-use');
	}
	return Promise.resolve();
};

export const signInUser = (email: string, password: string) => {
	const mailExceptions = {
		[notRegisteredEmail]: 'auth/user-not-found',
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

export const getUserData = (uid: string) => {
	if (uid === validUid) return Promise.resolve(userData);
	return Promise.resolve();
};
