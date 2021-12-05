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

let sz = 1;
let data;

const Search_Donor1 = () => {
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
        <div className="container" style={{ color: 'red', width: '100px' ,innerHeight:'200px' }}>

            <div className="card"  style={{ color: 'red', width: '100px' ,innerHeight:'200px' }}>

            {/* <Form
            {...formItemLayout}
            form={form}
            // name='register'
            //onFinish={this.search}
            //   initialValues={{
            //     residence: ['zhejiang', 'hangzhou', 'xihu'],
            //     prefix: '86',
            //   }}
            scrollToFirstError> */}
            <Form.Item
                name='City'
                label='Ciry'
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
                <Button type='primary' htmlType='submit' onClick={search}>
                    Search
                </Button>
            </Form.Item>
        {/* </Form> */}

            </div>
       

        <div className="card">
            {user.result.map((val, key) => {
                return (
                    <div
                        className='card'
                        style={{ color: 'red', marginTop: '10px' }}
                        key={key}>
                        <h1>Name:{val.name}</h1>
                        <h1>email:{val.email}</h1>
                        <h1>Location:{val.location}</h1>
                    </div>
                );
            })}
        </div>
    </div>
	);
};

export default Search_Donor1;