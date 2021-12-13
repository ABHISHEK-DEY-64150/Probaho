import React from 'react';
import css from './navBarBloodbankProfile.module.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

//const { Header, Content, Footer } = Layout;

export default function NavbarBloodBankProfile() {
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
				<Link to='/'>Logout</Link>
			  </li>
			</ul>
		  </nav>
		</header>
	  );
}
