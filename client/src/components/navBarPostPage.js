import React from 'react';
import css from './navBarPostPage.module.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

//const { Header, Content, Footer } = Layout;

export default function NavBarPostPage() {
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
						<Link to='/Login'>Sign In</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
