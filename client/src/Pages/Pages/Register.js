import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker, Space } from 'antd';

import { Form, Input, Select, Button } from 'antd';
const { Option } = Select;
const formItemLayout = {
	labelCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 12,
		},
	},
	wrapperCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 16,
		},
	},
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

const RegistrationForm = () => {
	const [form] = Form.useForm();

	const navigate = useNavigate();

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		reEnterPassword: '',
		location: '',
		phone: '',
		gender: '',
		lastDonation: '',
		bloodGroup: '',
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
			email,
			password,
			reEnterPassword,
			location,
			phone,
			gender,
			bloodGroup,
			lastDonation,
		} = user;

		// && location && gender && bloodGroup && lastDonation

		if (name && email && password && reEnterPassword && phone) {
			console.log(user);
			if (password === reEnterPassword) {
				Axios.post('http://localhost:3001/register', user).then((res) => {
					//alert(res.data.message);
					// setLoginUser(res.data.user);
					navigate('/login');
					console.log(res.data.message);
				});
			} else {
				alert('password does not match');
			}
		} else {
			alert('Enter All fields');
		}
	};

	return (
		<Form {...formItemLayout} form={form} name='register' scrollToFirstError>
			<Form.Item
				name='name'
				label='Name'
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
				name='email'
				label='E-mail'
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
								new Error('The two passwords that you entered do not match!')
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
				label='Ciry'
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

			<Form.Item
				name='gender'
				label='Gender'
				rules={[
					{
						required: true,
						message: 'Please select gender!',
					},
				]}>
				<Select
					type='text'
					name='gender'
					value={user.gender}
					onChange={(value) => handleChangeSelect('gender', value)}
					placeholder='select your gender'>
					<Option value='male'>Male</Option>
					<Option value='female'>Female</Option>
					<Option value='other'>Other</Option>
				</Select>
			</Form.Item>
			<Form.Item
				name='blood'
				label='Blood group'
				rules={[
					{
						required: true,
						message: 'Please select blood group!',
					},
				]}>
				<Select
					type='text'
					name='blood'
					value={user.bloodGroup}
					onChange={(value) => handleChangeSelect('bloodGroup', value)}
					placeholder='select blood group'>
					<Option value='A+'>A+</Option>
					<Option value='B+'>B+</Option>
					<Option value='O+'>O+</Option>
					<Option value='AB+'>AB+</Option>
					<Option value='A-'>A-</Option>
					<Option value='B-'>B-</Option>
					<Option value='O-'>O-</Option>
					<Option value='AB-'>AB-</Option>
				</Select>
			</Form.Item>

			<Form.Item
				name='lastDonation'
				label='Last Blood Donation'
				rules={[
					{
						required: true,
						message: 'Please input date!',
					},
				]}>
				<DatePicker
					name='lastDonation'
					value={user.lastDonation}
					onChange={(value) => handleChangeSelect('lastDonation', value)}
				/>
			</Form.Item>

			<Form.Item {...tailFormItemLayout}>
				<Button type='primary' htmlType='submit' onClick={register}>
					Register
				</Button>
			</Form.Item>
		</Form>
	);
};

export default RegistrationForm;
