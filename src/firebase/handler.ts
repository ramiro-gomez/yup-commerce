import {
	addDoc,
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

const productsCollection = collection(db, 'products');
export const getProducts = async () => {
	const productSnaps = await getDocs(productsCollection);
	return productSnaps.docs.map((productSnap) => ({
		...productSnap.data(),
		id: productSnap.id,
	}) as Product);
};
export const createProduct = async (
	name: string, category: string, price: number, createdBy: string,
) => {
	const productRef = await addDoc(productsCollection, {
		name,
		category,
		price,
		createdBy,
	});
	return productRef;
};
