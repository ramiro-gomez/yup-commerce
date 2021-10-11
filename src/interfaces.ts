export interface UserData {
	firstName: string,
	lastName: string
}

export interface YupUser {
	uid: string,
	email: string,
	displayName: string
}

export interface Product {
	id: string,
	name: string,
	category: string,
	price: number,
	createdBy: string
}
