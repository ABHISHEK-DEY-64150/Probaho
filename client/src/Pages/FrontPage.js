import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import frontPage from './FrontPage.css';
import { useNavigate } from 'react-router-dom';
// import { useRouter } from "next/router";

//import {useRouter} from "next/router";

const FrontPage = () => {
	const navigate = useNavigate();
	//const router =  useRouter();

	return (
		<div className='background'>
			<h1 className='header'> Blood For Life</h1>
			<Button
				className='SignUpButton'
				type='dashed'
				ghost
				onClick={() => {
					navigate('/Register');
				}}>
				Sign Up
			</Button>
		</div>
	);
};

export default FrontPage;
