import { collection, getDocs } from '@firebase/firestore';
import db from './config';

interface Product {
	name: string,
	category: string,
	price: number
}
// eslint-disable-next-line import/prefer-default-export
export const getProducts = async () => {
	const tempProducts: Product[] = [];
	try {
		const docs = await getDocs(collection(db, 'products'));
		docs.forEach((doc) => tempProducts.push(doc.data() as Product));
	} catch (e) {
		// eslint-disable-next-line no-console
		console.log(e);
	}
	return tempProducts;
};
