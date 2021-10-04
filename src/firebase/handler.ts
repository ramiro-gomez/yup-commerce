import {
	collection, doc, getDoc, getDocs, setDoc,
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

export const signUpUser = async (
	email: string, firstName: string, lastName: string, password: string,
) => {
	const userCredential = await createUserWithEmailAndPassword(auth, email, password);
	await setDoc(doc(db, 'users', userCredential.user.uid), {
		firstName,
		lastName,
	});
};
export const signInUser = async (email:string, password: string) => {
	await signInWithEmailAndPassword(auth, email, password);
};
export const getUserData = async (uid: string) => {
	const userSnap = await getDoc(doc(db, 'users', uid));
	if (!userSnap.exists()) {
		throw new Error('User data does not exist');
	}
	return userSnap.data() as { firstName: string, lastName: string };
};
