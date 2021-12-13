import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker, Space } from 'antd';
import NavBarBloodbankSignUp from '../components/navBarBloodbankSignUpPage';
import css from "./css/BloodbankSignupPage.module.css";

import { Form, Input, Select, Button } from 'antd';
const { Option } = Select;
const formItemLayout = {
	// labelCol: {
	// 	xs: {
	// 		span: 24,
	// 	},
	// 	sm: {
	// 		span: 12,
	// 	},
	// },
	// wrapperCol: {
	// 	xs: {
	// 		span: 24,
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

const BloodbankSignUpPage = () => {


	const [form] = Form.useForm();

	const navigate = useNavigate();

	const [user, setUser] = useState({
		name: '',
        username:'',
		email: '',
		password: '',
		reEnterPassword: '',
		location: '',
		phone: '',
        aPos:'0',
        bPos:'0',
        oPos:'0',
        abPos:'0',
        aNeg:'0',
        bNeg:'0',
        oNeg:'0',
        abNeg:'0',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({
			...user,
			[name]: value,
		});
		console.log(name, value);
	};

	const handleChangeSelect = (key, value) => {
		setUser({
			...user,
			[key]: value,
		});
		console.log(key, value);
	};

	const register = () => {
		console.log(user);

		const {
			name,
            username,
			email,
			password,
			reEnterPassword,
			location,
			phone,
            aPos,
            bPos,
            oPos,
            abPos,
            aNeg,
            bNeg,
            oNeg,
            abNeg

		} = user;

		// && location && gender && bloodGroup && lastDonation

		if (name && email && password && reEnterPassword && phone) {
			console.log(user);
			if (password === reEnterPassword) {
				Axios.post('http://localhost:3001/registerBloodBank', user).then(
					(res) => {
						alert(res.data.message);
						// setLoginUser(res.data.user);
						navigate('/BloodbankSignIn');
						// console.log(res.data.message);
					}
				);
			} else {
				alert('password does not match');
			}
		} else {
			alert('Enter All fields');
		}
	};

	return (
		<>
			<NavBarBloodbankSignUp />

			<h1 style={{ textAlign: 'center', color: 'red' }}>
				Signup as Blood Bank
			</h1>
			<div className={css.banksignupcustom}>
				
					<Form.Item
						name='name'
						label='Name'
						className='form-item'
						rules={[
							{
								required: true,
								message: 'Please enter your Name',
							},
						]}>
						<Input
							type='text'
							name='name'
							value={user.name}
							onChange={handleChange}
							placeholder='Your Name'
						/>
					</Form.Item>
				

				
					<Form.Item
						name='username'
						label='Username'
						className='form-item'
						rules={[
							{
								required: true,
								message: 'Please enter your username',
							},
						]}>
						<Input
							type='text'
							name='username'
							value={user.name}
							onChange={handleChange}
							placeholder='Your Username'
						/>
					</Form.Item>
			

				
					<Form.Item
						name='email'
						label='E-mail'
						className='form-item'
						rules={[
							{
								type: 'email',
								message: 'The input is not valid E-mail!',
							},
							{
								required: true,
								message: 'Please input your E-mail!',
							},
						]}>
						<Input
							type='text'
							name='email'
							value={user.email}
							onChange={handleChange}
							placeholder='Your Email'
						/>
					</Form.Item>
			

			
					<Form.Item
						name='password'
						label='Password'
						className='form-item'
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}
						hasFeedback>
						<Input.Password
							type='text'
							name='reEnterPassword'
							value={user.reEnterPassword}
							onChange={handleChange}
							placeholder='Your Password'
						/>
					</Form.Item>
			
					<Form.Item
						name='confirm'
						label='Confirm Password'
						dependencies={['password']}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'Please confirm your password!',
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}

									return Promise.reject(
										new Error(
											'The two passwords that you entered do not match!'
										)
									);
								},
							}),
						]}>
						<Input.Password
							type='text'
							name='password'
							value={user.reEnterPassword}
							onChange={handleChange}
							placeholder='Confirm your password'
						/>
					</Form.Item>
			
					<Form.Item
						name='City'
						label='City'
						rules={[
							{
								required: true,
								message: 'Please select City!',
							},
						]}>
						<Select
							type='text'
							name='location'
							value={user.location}
							onChange={(value) => handleChangeSelect('location', value)}
							placeholder='Select Your City'>
							<Select.Option value='Dhaka'>Dhaka</Select.Option>
							<Select.Option value='Sylhet'>Sylhet</Select.Option>
							<Select.Option value='Chittagong'>Chittagong</Select.Option>
							<Select.Option value='Comilla'>Comilla</Select.Option>
							<Select.Option value='Rajshahi'>Rajshahi</Select.Option>
							<Select.Option value='Rangpur'>Rangpur</Select.Option>
							<Select.Option value='Barishal'>Barishal</Select.Option>
							<Select.Option value='Brahminbaria'>Brahminbaria</Select.Option>
						</Select>
					</Form.Item>

					
						<Form.Item
							name='phone'
							label='Phone Number'
							rules={[
								{
									required: true,
									message: 'Please input your phone number!',
								},
							]}>
							<Input
								//   addonBefore={prefixSelector}
								style={{
									width: '100%',
								}}
								type='text'
								name='phone'
								value={user.phone}
								onChange={handleChange}
								placeholder='Your phone number'
							/>
						</Form.Item>

					
							<Form.Item >
								<Button className={css.signup} htmlType='submit'onClick={register}>
									Sign Up
								</Button>
							</Form.Item>
					
					
				
			</div>
		</>
	);
};

export default BloodbankSignUpPage;
