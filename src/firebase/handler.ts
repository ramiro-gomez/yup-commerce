import {
	addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc,
} from '@firebase/firestore';
import {
	getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './config';
import { Product, ProductPrototype } from '../interfaces';

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
export const fetchFSProducts = async () => {
	const productSnaps = await getDocs(productsCollection);
	return productSnaps.docs.map((productSnap) => ({
		...productSnap.data(),
		id: productSnap.id,
	}) as Product);
};
export const createFSProduct = async (product: ProductPrototype) => {
	const productRef = await addDoc(productsCollection, product);
	return productRef;
};
export const updateFSProduct = async (product: Product) => {
	await updateDoc(doc(db, 'products', product.id), {
		name: product.name,
		category: product.category,
		price: product.price,
	});
};
export const deleteFSProduct = async (product: Product) => {
	await deleteDoc(doc(db, 'products', product.id));
};
