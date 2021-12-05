import React from 'react';
import css from './navBarFrontPage.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

//const { Header, Content, Footer } = Layout;

export default function Navbar() {
	const navigate = useNavigate();
	return (
		<div className='layout'>
		
				<Header style={{ position: 'fixed', zIndex: 10, width: '100%' }}>
					<div className='logo'/>
					<Menu className='menu' mode='horizontal' defaultSelectedKeys={['2']}>
						<Menu.Item
							key='1'
                            className='menuitem'
							onClick={() => {
								navigate('/Post');
							}}>
							Post
						</Menu.Item>
						<Menu.Item
							key='2'
                            className='menuitem'
							onClick={() => {
								navigate('/Register');
							}}>
							Sign Up
						</Menu.Item>
						<Menu.Item
							key='3'
                            className='menuitem'
							onClick={() => {
								navigate('/Login');
							}}>
							Sign In
						</Menu.Item>

					
					</Menu>
				</Header>
		
			
		
			
		</div>
	);
}


