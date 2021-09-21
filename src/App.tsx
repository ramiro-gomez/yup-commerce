import { HashRouter, Switch, Route } from 'react-router-dom';
import ProductPage from './views/ProductPage';
import SignUpPage from './views/SignUpPage';
import SignInPage from './views/SignInPage';
import CartPage from './views/CartPage';

const App = () => (
	<HashRouter>
		<Switch>
			<Route path="/" exact component={ProductPage} />
			<Route path="/cart" exact component={CartPage} />
			<Route path="/signin" exact component={SignInPage} />
			<Route path="/signup" exact component={SignUpPage} />
		</Switch>
	</HashRouter>
);

export default App;
