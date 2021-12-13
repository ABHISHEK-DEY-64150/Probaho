import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import NavBarBloodbankProfile from '../components/navBarBloodbankProfile';
import css from './css/BloodBankProfile.module.css';
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
		date: '',
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

		const { title, place, date, description } = evnt;

		Axios.post('http://localhost:3001/createEvent', evnt).then((res) => {
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
	}, []);

	//[] removed

	const editing = () => {
		setOpen(true);
		// navigate('/Edit');
	};

	const createEvenet = () => {
		setOpen1(true);
	};

	useEffect(() => {
		Axios.get('http://localhost:3001/showEvent').then((res) => {
			console.log(res.data);
			setPostList1(res.data);
		});
	}, []);

	return (
		<>
			<NavBarBloodbankProfile />

			<div className='container'>
				<div className={css.card_profile}>
					{profile.map((val, key) => {
						return (
							<div
								className={css.custom_profile}
								style={{ marginTop: '10px' }}
								key={key}>
								<div className={css.card2}>
									<h1 style={{ color: 'black' }}>Blood Collection</h1>
								</div>

								<table className={css.table}>
									<tr>
										<th className={css.th}>Blood Type</th>
										<th className={css.th}>Collection(in Bags)</th>
									</tr>
									<tr className={css.tr}>
										<td>A+</td>
										<td>{val.aPos}</td>
									</tr>
									<tr className={css.tr}>
										<td>A-</td>
										<td>{val.aNeg}</td>
									</tr>
									<tr className={css.tr}>
										<td>B+</td>
										<td>{val.bPos}</td>
									</tr>
									<tr className={css.tr}>
										<td>B-</td>
										<td>{val.bNeg}</td>
									</tr>
									<tr className={css.tr}>
										<td>O+</td>
										<td>{val.oPos}</td>
									</tr>
									<tr className={css.tr}>
										<td>O-</td>
										<td>{val.oNeg}</td>
									</tr>
									<tr className={css.tr}>
										<td>AB+</td>
										<td>{val.abPos}</td>
									</tr>
									<tr className={css.tr}>
										<td>AB-</td>
										<td>{val.abNeg}</td>
									</tr>
								</table>
							</div>

							// <div
							// 	className={css.custom_profile}
							// 	style={{ marginTop: '10px' }}
							// 	key={key}>
							// 	<div className={css.card2}>
							// 		<h1 style={{ color: 'white' }}>Blood Collection</h1>
							// 	</div>
							// 	<div className={css.name}>
							// 		<p>A+:{val.aPos}</p>
							// 	</div>
							// 	<div className={css.name}>
							// 		<p>A-:{val.aNeg}</p>
							// 	</div>
							// 	<div className={css.name}>
							// 		<p>B+:{val.bPos}</p>
							// 	</div>
							// 	<div className={css.name}>
							// 		<p>B- :{val.bNeg}</p>
							// 	</div>
							// 	<div className={css.name}>
							// 		<p>O+:{val.oPos}</p>
							// 	</div>
							// 	<div className={css.name}>
							// 		<p>O-:{val.oNeg}</p>
							// 	</div>
							// 	<div className={css.name}>
							// 		<p>AB+:{val.abPos}</p>
							// 	</div>
							// 	<div className={css.name}>
							// 		<p>AB-:{val.abNeg}</p>
							// 	</div>
							// </div>
						);
					})}

					<button type='submit' className={css.edit} onClick={editing}>
						Edit Collection
					</button>
					<button
						style={{ marginTop: '20px' }}
						type='submit'
						className={css.edit}
						onClick={createEvenet}>
						Create Event
					</button>
				</div>

				<div className={css.scroll_post}>
					<div className='card1'>
						<h1 style={{ color: 'white' }}>All Events</h1>
					</div>
					<div className='container'>
						{postList1.map((val, key) => {
							return (
								<div
									className={css.card}
									style={{ marginTop: '10px' }}
									key={key}>
									<div className={css.name}>
										{' '}
										<p>Title: {val.title}</p>
									</div>
									<div className={css.name}>
										{' '}
										<p>Place: {val.place}</p>
									</div>
									<div className={css.name}>
										{' '}
										<p>Description: {val.description}</p>
									</div>
									<div className={css.name}>
										<p>Event Date:{val.date}</p>
									</div>
								</div>
							);
						})}
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
								<Form.Item name='City' label='Place'>
									<Select
										type='text'
										name='place'
										value={evnt.place}
										onChange={(value) => handleChangeSelect1('place', value)}
										placeholder='Select Your City'>
										<Select.Option value='Dhaka'>Dhaka</Select.Option>
										<Select.Option value='Sylhet'>Sylhet</Select.Option>
										<Select.Option value='Chittagong'>Chittagong</Select.Option>
										<Select.Option value='Comilla'>Comilla</Select.Option>
										<Select.Option value='Rajshahi'>Rajshahi</Select.Option>
										<Select.Option value='Rangpur'>Rangpur</Select.Option>
										<Select.Option value='Barishal'>Barishal</Select.Option>
										<Select.Option value='Brahminbaria'>
											Brahminbaria
										</Select.Option>
									</Select>
								</Form.Item>
							</div>
							<div>
								<Form.Item name='date' label='Date'>
									<DatePicker
										name='date'
										value={evnt.date}
										onChange={(value) => handleChangeSelect1('date', value)}
									/>
								</Form.Item>
							</div>
							<div>
								<label>Description:</label>
								<TextArea
									name='description'
									value={evnt.description}
									showCount
									maxLength={200}
									style={{ height: 120 }}
									onChange={handleChange1}
								/>
							</div>
						</div>
					</Modal>
				</div>
			</div>
		</>
	);
};

export default BloodBankProfile;
