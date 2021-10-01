import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../interfaces';

interface CartProduct {
	product: Product,
	quantity: number
}

const initialState: CartProduct[] = [];

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (cartProducts, action: PayloadAction<CartProduct>) => {
			const { payload } = action;
			if (cartProducts.some(({ product }) => product.id === payload.product.id)) {
				return cartProducts.map(({ product, quantity }) => {
					if (product.id === payload.product.id) {
						return {
							product,
							quantity: quantity + payload.quantity,
						};
					}
					return { product, quantity };
				});
			}
			return [...cartProducts, payload];
		},
		removeFromCart: (cartProducts, action: PayloadAction<CartProduct>) => {
			const { payload } = action;
			return cartProducts.reduce((acc, { product, quantity }) => {
				if (product.id === payload.product.id) {
					const newQuantity = quantity - payload.quantity;
					if (newQuantity > 0) {
						return [
							...acc,
							{
								product,
								quantity: newQuantity,
							},
						];
					}
					return [...acc];
				}
				return [...acc, { product, quantity }];
			}, [] as CartProduct[]);
		},
		resetCart: () => {
			console.log('reset');
			return initialState;
		},
	},
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
