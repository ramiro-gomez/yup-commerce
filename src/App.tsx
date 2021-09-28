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
import { auth, getAssociatedUsername } from './firebase/handler';
import NavBar from './components/NavBar';
import { YupUser } from './interfaces';

const App = () => {
	const [currentUser, setCurrentUser] = useState<null|YupUser>(null);
	const [loadingUser, setLoadingUser] = useState(true);

	useEffect(() => {
		const unsuscribeAuthListener = onAuthStateChanged(auth, async (userAuth) => {
			if (userAuth) {
				const username = await getAssociatedUsername(userAuth.uid);
				setCurrentUser({
					...userAuth,
					username,
				});
			} else {
				setCurrentUser(null);
			}
			setLoadingUser(false);
		});
		return unsuscribeAuthListener;
	}, []);

	return (
		<HashRouter>
			{loadingUser ? (
				<div className="d-flex align-items-center justify-content-center position-absolute top-0 start-0 bottom-0 end-0">
					<Spinner className="text-primary p-4 p-lg-5" animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			) : (
				<Switch>
					<Route path="/" exact>
						<NavBar currentUser={currentUser} />
						<ProductPage currentUser={currentUser} />
					</Route>
					<Route path="/cart" exact>
						{currentUser ? (
							<>
								<NavBar currentUser={currentUser} />
								<CartPage />
							</>
						) : <Redirect to="/signin" />}
					</Route>
					<Route path="/signin" exact>
						{currentUser ? <Redirect to="/" /> : <SignInPage />}
					</Route>
					<Route path="/signup" exact>
						{currentUser ? <Redirect to="/" /> : <SignUpPage />}
					</Route>
				</Switch>
			)}
		</HashRouter>
	);
};

export default App;
