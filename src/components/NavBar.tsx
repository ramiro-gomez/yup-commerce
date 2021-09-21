import { FC } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { HashRouter, Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const NavBar: FC = () => (
	<HashRouter>
		<Navbar bg="light" expand="lg" sticky="top" className="shadow-nav">
			<div className="custom-container d-flex align-items-center flex-wrap">
				<Link to="/">
					<img className="nav-logo" src={logo} alt="logo" />
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
				<Navbar.Collapse id="basic-navbar-nav" className="ms-auto">
					<Nav className="ms-auto py-3 py-lg-0 d-grid gap-3 auto-flow-lg-column">
						<Link to="/signin">
							<Button variant="outline-primary">Sign in</Button>
						</Link>
						<Link to="signup">
							<Button variant="primary">Sign up</Button>
						</Link>
					</Nav>
				</Navbar.Collapse>
			</div>
		</Navbar>
	</HashRouter>
);

export default NavBar;
