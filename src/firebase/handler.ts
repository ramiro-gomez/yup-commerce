import {
	collection, doc, getDoc, getDocs, query, setDoc, where,
} from '@firebase/firestore';
import {
	getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './config';
import { Product } from '../interfaces';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();

export const getProducts = async () => {
	try {
		const productSnaps = await getDocs(collection(db, 'products'));
		return productSnaps.docs.map((productSnap) => productSnap.data() as Product);
	} catch (error) {
		console.log(error);
	}
	return [];
};

export const getUserDataUsingUsername = async (username: string) => {
	const usersRef = collection(db, 'users');
	const usernameQuery = query(usersRef, where('username', '==', username));
	const userSnaps = await getDocs(usernameQuery);
	if (userSnaps.docs[0]) {
		return userSnaps.docs[0].data();
	}
	throw {
		code: 'yup-auth/username-not-found',
	};
};

export const getAssociatedUsername = async (uid: string) => {
	const userSnap = await getDoc(doc(db, 'users', uid));
	if (userSnap.exists()) {
		const user = userSnap.data();
		return user.username;
	}
	return '';
};

export const signUpUser = async (email: string, username: string, password: string) => {
	const userCredential = await createUserWithEmailAndPassword(auth, email, password);
	await setDoc(doc(db, 'users', userCredential.user.uid), {
		username,
	});
};

export const signInUser = async (email:string, password: string) => {
	await signInWithEmailAndPassword(auth, email, password);
};
