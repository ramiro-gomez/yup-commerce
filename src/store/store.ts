import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cartReducer from './reducers/cartReducer';
import productsReducer from './reducers/productsReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
	reducer: {
		user: userReducer,
		products: productsReducer,
		cart: cartReducer,
	},
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export default store;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
