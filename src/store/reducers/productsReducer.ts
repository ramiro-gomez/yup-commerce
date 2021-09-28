import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.fulfilled, (_state, { payload }) => payload);
	},
});

export default productsSlice.reducer;
