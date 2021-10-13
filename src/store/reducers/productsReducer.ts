import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	createFSProduct, deleteFSProduct, fetchFSProducts, updateFSProduct,
} from '../../firebase/handler';
import { Product, ProductPrototype } from '../../interfaces';

const initialState: Product[] = [];

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	fetchFSProducts,
);
export const createProduct = createAsyncThunk(
	'products/addProduct',
	async (product: ProductPrototype):Promise<Product> => {
		const { id } = await createFSProduct(product);
		return {
			id,
			...product,
		};
	},
);
export const updateProduct = createAsyncThunk(
	'products/updateProduct',
	async (product: Product):Promise<Product> => {
		await updateFSProduct(product);
		return product;
	},
);
export const deleteProduct = createAsyncThunk(
	'products/deleteProduct',
	async (product: Product):Promise<Product> => {
		await deleteFSProduct(product);
		return product;
	},
);

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.fulfilled, (_products, { payload }) => payload);
		builder.addCase(createProduct.fulfilled, (products, { payload }) => [payload, ...products]);
		builder.addCase(updateProduct.fulfilled, (products, { payload }) => products.map(
			(product) => (product.id === payload.id ? payload : product),
		));
		builder.addCase(deleteProduct.fulfilled, (products, { payload }) => products.reduce(
			(acc, product) => {
				if (product.id === payload.id) return [...acc];
				return [...acc, product];
			}, [] as Product[],
		));
	},
});

export default productsSlice.reducer;
