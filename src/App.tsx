import {
	HashRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { Spinner } from 'react-bootstrap';
import ProductPage from './views/ProductPage';
import SignUpPage from './views/SignUpPage';
import SignInPage from './views/SignInPage';
import CartPage from './views/CartPage';
import { auth, getUserData } from './firebase/handler';
import { useAppDispatch, useAppSelector } from './store/store';
import { setUser } from './store/reducers/userReducer';
import { fetchProducts } from './store/reducers/productsReducer';

const App = () => {
	const [loadingUser, setLoadingUser] = useState(true);
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
		const unsuscribeAuthListener = onAuthStateChanged(auth, async (userAuth) => {
			if (userAuth && userAuth.email) {
				const { firstName, lastName } = await getUserData(userAuth.uid);
				dispatch(setUser({
					uid: userAuth.uid,
					email: userAuth.email,
					displayName: `${firstName} ${lastName}`,
				}));
			}
			setLoadingUser(false);
		});
		return unsuscribeAuthListener;
	}, []);

	return (
		<HashRouter>
			{loadingUser ? (
				<div className="d-flex align-items-center justify-content-center position-absolute top-0 start-0 bottom-0 end-0">
					<Spinner className="spinner-size text-primary" animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			) : (
				<Switch>
					<Route path="/" exact>
						<ProductPage />
					</Route>
					<Route path="/cart" exact>
						{user ? <CartPage /> : <Redirect to="/signin" />}
					</Route>
					<Route path="/signin" exact>
						{user ? <Redirect to="/" /> : <SignInPage />}
					</Route>
					<Route path="/signup" exact>
						{user ? <Redirect to="/" /> : <SignUpPage />}
					</Route>
				</Switch>
			)}
		</HashRouter>
	);
};

export default App;
