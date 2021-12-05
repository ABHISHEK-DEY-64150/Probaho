import css from './css/FrontPage.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import NavBarFrontPage from '../components/navBarFrontPage';
import Axios from 'axios';
import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';

import { Form, Input, Select, Button } from 'antd';

const { Header, Content, Footer } = Layout;
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

let sz = 1;
let data;

export default function Design() {
	const navigate = useNavigate();

	const [form] = Form.useForm();
	const [user, setUser] = useState({
		location: '',
		bloodGroup: '',
		result: [],
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
	};

	const search = (e) => {
		// e.preventDefault();
		if (user.bloodGroup === '' || user.location === '') {
			alert('enter all data ');
			return;
		}

		//   console.log(this.state)
		Axios.post('http://localhost:3001/query', user).then((res) => {
			data = res.data;
			console.log(data);
			if (data) {
				setUser({ result: data });
			} else {
				sz = 0;
			}
		});

		
	};

	return (
		<>
			<NavBarFrontPage />
			<div>
				<div>
					<div className="card-front">
						<Form.Item
							name='City'
							label="City"
							className='ant-form-item-city'
							rules={[
								{
									// required: true,
									// message: 'Please select City!',
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
							name='blood'
							label='Blood group'
							className='ant-form-item-blood'
							rules={[
								{
									// required: true,
									// message: 'Please select blood group!',
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

						<Form.Item {...tailFormItemLayout}>
							<Button   className='search' htmlType='submit' onClick={search}>
								Search
							</Button>
						</Form.Item>
						{/* </Form> */}
					</div>

					<div>
						{user.result.map((val, key) => {
							return (
								<div className='query-result'
									key={key}>
									<h1 className='query-result-name'>Name:{val.name}</h1>
									<h1 className='query-result-email'>email:{val.email}</h1>
									<h1 className='query-result-phone'>Phone:{val.phone}</h1>
									<h1 className='query-result-location'>Location:{val.location}</h1>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}
