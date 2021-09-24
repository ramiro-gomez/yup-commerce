import {
	collection, doc, getDoc, getDocs, setDoc,
} from '@firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './config';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

interface Product {
	name: string,
	category: string,
	price: number
}

export const getProducts = async () => {
	try {
		const productSnaps = await getDocs(collection(db, 'products'));
		return productSnaps.docs.map((productSnap) => productSnap.data() as Product);
	} catch (e) {
		console.log(e);
	}
	return [];
};

export const getUsernameData = async (username: string) => {
	try {
		const docSnap = await getDoc(doc(db, 'usernames', username));
		if (docSnap.exists()) return docSnap.data();
	} catch (e) {
		console.log(e);
	}
	return null;
};

export const signUpUser = async (email: string, username: string, password: string) => {
	const userCredential = await createUserWithEmailAndPassword(auth, email, password);
	await setDoc(doc(db, 'usernames', username), {
		userid: userCredential.user.uid,
		email,
	});
};
