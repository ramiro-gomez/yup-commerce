import { User } from '@firebase/auth';

export interface YupUser extends User {
	username: string
}

export interface Product {
	id: string,
	name: string,
	category: string,
	price: number
}
