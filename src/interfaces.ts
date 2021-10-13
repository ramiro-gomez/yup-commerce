export interface UserData {
	firstName: string,
	lastName: string
}

export interface YupUser {
	uid: string,
	email: string,
	displayName: string
}

export interface ProductPrototype {
	name: string,
	category: string,
	price: number,
	createdBy: string
}
export interface Product extends ProductPrototype {
	id: string,
}
