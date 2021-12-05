import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
	const [postList, setPostList] = useState([]);
    const navigate = useNavigate();


	useEffect(() => {
		Axios.get('http://localhost:3001/Profile').then((res) => {
			// console.log(res.data);
			if(res.data)
			{
				setPostList(res.data);
			}
			else
			{
				navigate("/Login");
			}
			
		});
	}, []);


    const editing = () => {
		
        navigate('/Edit') ;

	};


	return (
		<div className='card-body'>
			<div className='container'>
				<h1 style={{ color: 'green' }}>Profile</h1>

				{postList.map((val, key) => {
					return (
						<div
							className='card'
							style={{ color: 'red', marginTop: '10px' }}
							key={key}>
							<h1>Name:{val.name}</h1>
							<h1>Contact_no:{val.phone}</h1>
							<h1>blood_group:{val.bloodGroup}</h1>
							<h1>Last Blood Donation :{val.lastDonation}</h1>							
							<h1>Location:{val.location}</h1>
							
						</div>
					);
				})}
			</div>

			<button type='submit' onClick={editing} >
				edit
			</button>
		</div>
	);
};

export default Profile;
