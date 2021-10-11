import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProducts } from '../../firebase/handler';
import { Product } from '../../interfaces';

const initialState: Product[] = [];

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	getProducts,
);

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addProduct: (products, action: PayloadAction<Product>) => [action.payload, ...products],
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.fulfilled, (_state, { payload }) => payload);
	},
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;
