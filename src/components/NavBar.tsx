import { signOut } from '@firebase/auth';
import { Icon } from '@iconify/react';
import { FC, useState } from 'react';
import {
	Button, Nav, Navbar, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import { HashRouter, Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { auth } from '../firebase/handler';
import { setUser } from '../store/reducers/userReducer';
import { useAppDispatch, useAppSelector } from '../store/store';

const NavBar: FC = () => {
	const [disableSignOutBtn, setDisableSignOutBtn] = useState(false);
	const cartItems = useAppSelector((state) => state.cart);
	const totalProducts = cartItems.reduce(
		(acc, cartProduct) => acc + cartProduct.quantity, 0,
	);
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const signOutUser = async () => {
		setDisableSignOutBtn(true);
		try {
			await signOut(auth);
			dispatch(setUser(null));
		} catch (e) {
			console.log(e);
		}
		setDisableSignOutBtn(false);
	};

	return (
		<HashRouter>
			<Navbar bg="light" expand="lg" sticky="top" className="shadow-nav custom-container d-flex align-items-center flex-wrap">
				<Link className="me-auto" to="/">
					<img className="nav-logo" src={logo} alt="logo" />
				</Link>
				{user ? (
					<>
						<Link to="/cart" className="d-flex align-items-center text-decoration-none">
							<Icon className="nav-cart-icon text-primary me-2" icon="bytesize:cart" />
							<p className="text-primary fs-3 fs-lg-1">
								(
								{totalProducts}
								)
							</p>
						</Link>
						<Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2" />
						<Navbar.Collapse id="basic-navbar-nav" className="ms-2 flex-grow-0">
							<Nav className="py-3 py-lg-0 d-grid align-items-center gap-3 auto-flow-lg-column">
								<OverlayTrigger
									placement="bottom"
									overlay={(
										<Tooltip color="red">
											{user.displayName}
										</Tooltip>
									)}
								>
									<div className="profile-icon d-flex justify-content-center align-items-center bg-primary mx-auto rounded-circle">
										<h2 className="text-white fm-header fs-3 fs-lg-2">{user.displayName[0].toUpperCase()}</h2>
									</div>
								</OverlayTrigger>
								<Button variant="outline-primary" disabled={disableSignOutBtn} onClick={signOutUser}>Sign out</Button>
							</Nav>
						</Navbar.Collapse>
					</>
				) : (
					<>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0">
							<Nav className="py-3 py-lg-0 d-grid align-items-center gap-3 auto-flow-lg-column">
								<Link to="/signin">
									<Button className="w-100" variant="outline-primary">Sign in</Button>
								</Link>
								<Link to="/signup">
									<Button className="w-100" variant="primary">Sign up</Button>
								</Link>
							</Nav>
						</Navbar.Collapse>
					</>
				)}
			</Navbar>
		</HashRouter>
	);
};

export default NavBar;
