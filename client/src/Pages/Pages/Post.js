import { Form, Input, Button, Checkbox, Select } from 'antd';
import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const Post = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [post, setPost] = useState({
		bloodGroup: '',
		bagOfBlood: '',
		location: '',
		contact: '',
		date: new Date(),
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		console.log(name, value);
		setPost({
			...post,
			[name]: value,
		});
	};

	const handleChangeSelect = (key, value) => {
		setPost({
			...post,
			[key]: value,
		});
		console.log(key, value);
	};

	const posting = () => {
		const { bloodGroup, bagOfBlood, location, contact } = post;
		console.log(post);

		if (bagOfBlood && contact) {
			// console.log(post.date);
			Axios.post('http://localhost:3001/post', post).then((res) => {
				alert(res.data.message);
				// setLoginUser(res.data.user);
				navigate('/');
			});
		} else {
			alert('Enter All fields');
		}
	};

	return (
		<Form {...formItemLayout} form={form} name='register' scrollToFirstError>
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
					value={post.bloodGroup}
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
				name='bagOfBlood'
				label='Bag of Bloods'
				rules={[
					{
						required: true,
						message: 'Bag of Bloods!',
					},
				]}>
				<Input
					//   addonBefore={prefixSelector}
					style={{
						width: '100%',
					}}
					type='text'
					name='bagOfBlood'
					value={post.bagOfBlood}
					onChange={handleChange}
					placeholder='Bags of Blood'
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
					value={post.location}
					onChange={(value) => handleChangeSelect('location', value)}
					placeholder='Select Your City'>
					<Option value='Dhaka'>Dhaka</Option>
					<Option value='Sylhet'>Sylhet</Option>
					<Option value='Chittagong'>Chittagong</Option>
					<Option value='Comilla'>Comilla</Option>
					<Option value='Rajshahi'>Rajshahi</Option>
					<Option value='Rangpur'>Rangpur</Option>
					<Option value='Barishal'>Barishal</Option>
					<Option value='Brahminbaria'>Brahminbaria</Option>
				</Select>
			</Form.Item>

			<Form.Item
				name='contact'
				label='Contact'
				rules={[
					{
						required: true,
						message: 'Provide Contact!',
					},
				]}>
				<Input
					//   addonBefore={prefixSelector}
					style={{
						width: '100%',
					}}
					type='text'
					name='contact'
					value={post.contact}
					onChange={handleChange}
					placeholder='Contact'
				/>
			</Form.Item>
			<Form.Item {...tailFormItemLayout}>
				<Button type='primary' htmlType='submit' onClick={posting}>
					Post
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Post;
