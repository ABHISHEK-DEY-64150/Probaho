import { Form, Input, Button, Checkbox, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBarPostPage from '../components/navBarPostPage';
import css from './css/Post.css';

const { Option } = Select;

const formItemLayout = {
	// labelCol: {
	// 	xs: {
	// 		span: 240,
	// 	},
	// 	sm: {
	// 		span: 12,
	// 	},
	// },
	// wrapperCol: {
	// 	xs: {
	// 		span: 240,
	// 	},
	// 	sm: {
	// 		span: 16,
	// 	},
	// },
};
const tailFormItemLayout = {
	// wrapperCol: {
	// 	xs: {
	// 		span: 24,
	// 		offset: 0,
	// 	},
	// 	sm: {
	// 		span: 16,
	// 		offset: 8,
	// 	},
	// },
};

const Logout = () => {
	const [form] = Form.useForm();
	const [postList, setPostList] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		Axios.get('http://localhost:3001/logout').then((res) => {
            navigate('/');
		});
	},);

	return (
		<>
			
		</>
	);
};

export default Logout;
