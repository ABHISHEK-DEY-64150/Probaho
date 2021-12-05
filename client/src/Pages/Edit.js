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

const Edit = () => {
	const [form] = Form.useForm();

	const navigate = useNavigate();

	const [user, setUser] = useState({
		location: '',
		phone: '',
		lastDonation: '',
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

	const submit = () => {
		console.log(user);

		const { location, phone, lastDonation } = user;

		if (location || phone || lastDonation) {
			console.log(user);

			Axios.put('http://localhost:3001/Edit', user).then((res) => {
				//alert(res.data.message);
				// setLoginUser(res.data.user);
				navigate('/Profile');
				console.log(res.data.message);
			});
		}
	};

	return (
		<Form {...formItemLayout} form={form} name='register' scrollToFirstError>


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
				<Button type='primary' htmlType='submit' onClick={submit}>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Edit;
