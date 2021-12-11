import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import NavBarBloodbankProfile from '../components/navBarBloodbankProfile';
import css from './css/Profile.module.css';
import { useNavigate } from 'react-router-dom';

import { Modal } from 'antd';
import { Form, Input, Select, Button, DatePicker } from 'antd';
const { TextArea } = Input;

const BloodBankProfile = () => {
	const [open, setOpen] = useState(false);
	const [open1, setOpen1] = useState(false);
	const [profile, setProfile] = useState([]);
	const [postList1, setPostList1] = useState([]);
	const navigate = useNavigate();

	const [user, setUser] = useState({
		bloodGroup: '',
		bagOfBlood: '',
	});

	const [evnt, setEvnt] = useState({
		title: '',
		place: '',
		date:'',
		description: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({
			...user,
			[name]: value,
		});
		console.log(name, value);
	};

	const handleChange1 = (e) => {
		const { name, value } = e.target;
		setEvnt({
			...evnt,
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

	const handleChangeSelect1 = (key, value) => {
		setEvnt({
			...evnt,
			[key]: value,
		});
		console.log(key, value);
	};

	const handleOk = () => {
		console.log(user);

		const { bloodGroup, bagOfBlood } = user;

		if (bloodGroup && bagOfBlood) {
			// console.log(user);

			Axios.put('http://localhost:3001/EditBloodBank', user).then((res) => {
				//alert(res.data.message);
				// setLoginUser(res.data.user);
				// navigate('/Profile');
				console.log(res.data.message);
			});
		}
		setOpen(false);
	};

	const handleOk1 = () => {

		console.log(evnt);

		const { title, place,date,description } = evnt;

		Axios.post("http://localhost:3001/createEvent", evnt).then((res) => {
			alert(res.data.message);
			// setLoginUser(res.data.user);
			// navigate('/');
		  });
		setOpen1(false);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const handleCancel1 = () => {
		setOpen1(false);
	};

	useEffect(() => {
		Axios.get('http://localhost:3001/BloodBankProfile').then((res) => {
			// console.log(res.data);
			setProfile(res.data);
		});
	},[]);

	//[] removed

	const editing = () => {
		setOpen(true);
		// navigate('/Edit');
	};

	const createEvenet = () => {
		setOpen1(true);
	};

	//   useEffect(() => {
	//     Axios.get("http://localhost:3001/showPost").then((res) => {
	//       console.log(res.data);
	//       setPostList1(res.data);
	//     });
	//   }, []);

	return (
		<>
			<NavBarBloodbankProfile />

			<div className='container'>
				<div className='card-profile'>
					{profile.map((val, key) => {
						return (
							<div
								className='custom-profile'
								style={{ marginTop: '10px' }}
								key={key}>
								<div className='card2'>
									<h1 style={{ color: 'white' }}>Blood Collection</h1>
								</div>
								<div className='name'>
									<p>A+:{val.aPos}</p>
								</div>
								<div className='name'>
									<p>A-:{val.aNeg}</p>
								</div>
								<div className='name'>
									<p>B+:{val.bPos}</p>
								</div>
								<div className='name'>
									<p>B- :{val.bNeg}</p>
								</div>
								<div className='name'>
									<p>O+:{val.oPos}</p>
								</div>
								<div className='name'>
									<p>O-:{val.oNeg}</p>
								</div>
								<div className='name'>
									<p>AB+:{val.abPos}</p>
								</div>
								<div className='name'>
									<p>AB-:{val.abNeg}</p>
								</div>
							</div>
						);
					})}

					<button type='submit' className='edit' onClick={editing}>
						Edit Collection
					</button>
					<button
						style={{ marginTop: '20px' }}
						type='submit'
						className='edit'
						onClick={createEvenet}>
						Create Event
					</button>
				</div>

				<div className='scroll-post'>
					<div className='card-body'>
						<div className='card1'>
							<h1 style={{ color: 'white' }}>All Post</h1>
						</div>
						<div className='container'>
							{postList1.map((val, key) => {
								return (
									<div className='card' style={{ marginTop: '10px' }} key={key}>
										<div className='name'>
											{' '}
											<p>Blood_group: {val.bloodGroup}</p>
										</div>
										<div className='name'>
											{' '}
											<p>Amount of Blood: {val.bagOfBlood} bags</p>
										</div>
										<div className='name'>
											{' '}
											<p>Location: {val.location}</p>
										</div>
										<div className='name'>
											<p>Contact:{val.contact}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			<div>
				<div>
					<Modal
						title='Update Blood Bank Collection'
						visible={open}
						// onOk={handleOk}
						// onCancel={handleCancel}
						footer={[
							<Button onClick={handleCancel}>Cancel</Button>,
							<Button type='primary' onClick={handleOk}>
								Update
							</Button>,
						]}>
						<div>
							<div>
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
										name='bloodGroup'
										value={user.bloodGroup}
										onChange={(value) =>
											handleChangeSelect('bloodGroup', value)
										}
										placeholder='select blood group'>
										<Select.Option value='A+'>A+</Select.Option>
										<Select.Option value='B+'>B+</Select.Option>
										<Select.Option value='O+'>O+</Select.Option>
										<Select.Option value='AB+'>AB+</Select.Option>
										<Select.Option value='A-'>A-</Select.Option>
										<Select.Option value='B-'>B-</Select.Option>
										<Select.Option value='O-'>O-</Select.Option>
										<Select.Option value='AB-'>AB-</Select.Option>
									</Select>
								</Form.Item>
							</div>

							<div>
								<Form.Item
									name='bagOfBlood'
									label='Bag of Bloods'
									className='edit-info'
									// rules={[
									// 	{
									// 		required: true,
									// 		message: 'Please input your phone number!',
									// 	},
									// ]}
								>
									<Input
										//   addonBefore={prefixSelector}
										style={{
											width: '100%',
										}}
										type='text'
										name='bagOfBlood'
										value={user.bagOfBlood}
										onChange={handleChange}
										placeholder='Stored amount of blood'
									/>
								</Form.Item>
							</div>
						</div>
					</Modal>
				</div>
			</div>

			<div>
				<div>
					<Modal
						title='Create An Event'
						visible={open1}
						// onOk={handleOk}
						// onCancel={handleCancel}
						footer={[
							<Button onClick={handleCancel1}>Cancel</Button>,
							<Button type='primary' onClick={handleOk1}>
								Create
							</Button>,
						]}>
						<div>
							<div>
								<Form.Item
									name='title'
									label='Title'
									className='edit-info'
									// rules={[
									// 	{
									// 		required: true,
									// 		message: 'Please input your phone number!',
									// 	},
									// ]}
								>
									<Input
										//   addonBefore={prefixSelector}
										style={{
											width: '100%',
										}}
										type='text'
										name='title'
										value={evnt.title}
										onChange={handleChange1}
										placeholder='Give an event title'
									/>
								</Form.Item>
							</div>
							<div>
								<Form.Item
									name='place'
									label='Place'
									className='edit-info'
									// rules={[
									// 	{
									// 		required: true,
									// 		message: 'Please input your phone number!',
									// 	},
									// ]}
								>
									<Input
										//   addonBefore={prefixSelector}
										style={{
											width: '100%',
										}}
										type='text'
										name='place'
										value={evnt.place}
										onChange={handleChange1}
										placeholder='Event Place'
									/>
								</Form.Item>
							</div>
							<div>
								<Form.Item
									name='date'
									label='Date'
								>
									<DatePicker
										name='date'
										value={evnt.date}
										onChange={(value) =>
											handleChangeSelect1('date', value)
										}
									/>
								</Form.Item>
							</div>
							<div >
							<label>description</label>	
							<TextArea name='description' value={evnt.description} showCount maxLength={200} style={{ height: 120 }} onChange={handleChange1} />
							</div>
						</div>
					</Modal>
				</div>
			</div>
		</>
	);
};

export default BloodBankProfile;
