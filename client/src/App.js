import { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import Register from './Pages/Register';
import Register1 from './Pages/Register1';
import FrontPage from './Pages/FrontPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<div>
				<Router>
					<Routes>
						<Route exact path='/' element={<FrontPage />} />
						{/* <Route exact path="/queryPage" element={<QueryPage />} />
          <Route exact path = "/showPost" element={<ShowPost/>}/> */}

						{/* <Route exact path="/post" element={<Post />} /> */}
						<Route path='/register' element={<Register />} />

						{/* <Route
            path="/login"
            element={<LogIn setLoginUser={setLoginUser} />}
          /> */}
					</Routes>
				</Router>
				{/* <Register/> */}
			</div>

			{/* <Register1 /> */}

			{/* <Register /> */}
			{/* <FrontPage /> */}
		</div>
	);
}

// function App() {

// // const [Dname,setDname] = useState('');
// // const [Bgroup,setBgroup] = useState('');

// // const [DonorList,setDonorList] = useState([]);

// // const [newDName,setNewDname] = useState('');

// // useEffect(()=>{
// // Axios.get("http://localhost:3001/read").then((response)=>{
// //   console.log(response);
// //   setDonorList(response.data)
// // })

// // },[])

// // const RegisterDonor = ()=>{

// // Axios.post("http://localhost:3001/",{
// // DonorName: Dname,
// // BloodGroup: Bgroup,

// // });

// // // console.log(Dname+' '+Bgroup);

// // };

// // const updateDonor = (id)=>{

// //   Axios.put("http://localhost:3001/update",{
// //     id:id,
// //     newDName:newDName

// //   })
// // }

// // const deleteDonor = (id)=>{
// // Axios.delete(`http://localhost:3001/delete/${id}`);
// // }

//   return (
//     <div className="App">
//       {/* <h1>Blood For life</h1>
//       <div className="App">
//       <label>Donor Name</label>
//       <input type="text" onChange={(event)=>
//       setDname(event.target.value)
//       }/>
//       <label> Blood Group</label>
//       <input type="text" onChange={(event)=>
//       setBgroup(event.target.value)
//       }/>
//       </div>

//       <button onClick={RegisterDonor}>Register</button>

//       <h1>Donor List</h1>

//       {DonorList.map((val,key)=>{
//         return <div key={key}>
//                   <h1>{val.DonorName}</h1>
//                   <h1>{val.BloodGroup}</h1>
//                   <input type= "text" placeholder="Upate your name.."
//                       onChange={(event)=>
//                         setNewDname(event.target.value)
//                      }/>
//                   <button onClick={()=>updateDonor(val._id)}>Update</button>
//                   <button onClick = {()=>deleteDonor(val._id)}>Delete</button>
//                </div>
//       })}

//  */}

//   <Register />

//     </div>
//   );
// }

export default App;
