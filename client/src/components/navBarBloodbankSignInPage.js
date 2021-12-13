import React from 'react';
import css from './navBarBloodbankSignInPage.module.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

//const { Header, Content, Footer } = Layout;

export default function NavbarBloodbankSignInPage() {
	return (
		<header className={css.header}>
		  <div className={css.logo}>Probaho</div>
		  <nav>
			<ul>
			<li>
				<Link to='/'>Home</Link>
			  </li>
			  <li>
				<Link to='/Post'>Post</Link>
			  </li>
			  <li>
				<Link to='/Register'>Sign Up</Link>
			  </li>
			  <li>
				<Link to='/Login'>Sign In</Link>
			  </li>
			</ul>
		  </nav>
		</header>
	  );
}
