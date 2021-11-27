import React, { useState, useEffect } from "react";
import { Card, Feed } from "semantic-ui-react";
import Axios from "axios";
import Register from "./register";
import LogIn from "./logIn";
import Home from "./home";
import Post from "./post";
import ShowPost from "./showPost";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [user, setLoginUser] = useState({});
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path = "/showPost" element={<ShowPost/>}/>

          <Route exact path="/post" element={<Post />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/login"
            element={<LogIn setLoginUser={setLoginUser} />}
          />
        </Routes>
      </Router>
      {/* <Register/> */}
   
    </div>
  );
}

export default App;

// <div className="ui container">
//   <div className="ui inverted segment">
//     <form className="ui inverted form" onSubmit={addToList}>
//       <div className="field">
//         <label>Food name</label>
//         <input
//           type="text"
//           placeholder="Name"
//           name="name"
//           onChange={(e) => {
//             setFoodName(e.target.value);
//           }}
//         />
//       </div>
//       <div className="field">
//         <label>days</label>
//         <input
//           type="text"
//           review="days"
//           placeholder="days"
//           onChange={(e) => {
//             setDays(e.target.value);
//           }}
//         />
//       </div>
//       <button type="submit" className="ui button">
//         Submit
//       </button>
//     </form>
//   </div>

//   <h1>list</h1>
//   <div>
//     {foodList.map((val, key) => {
//       return (
//         <div className="ui card" key={key}>
//           <h1>{val.foodName}</h1>
//           <h1>{val.days}</h1>
//           <input
//             type="text"
//             placeholder="rename"
//             onChange={(e) => {
//               setNewFoodName(e.target.value);
//             }}
//           ></input>
//           <button onClick={()=>{updateFood(val._id)}}> update</button>
//           <button onClick={()=>{deleteFood(val._id)}}>delete</button>
//         </div>
//       );
//     })}
//   </div>
// </div>

//   const [foodName, setFoodName] = useState("");
//   const [newFoodName, setNewFoodName] = useState("");
//   const [days, setDays] = useState("");
//   const [foodList, setFoodList] = useState([]);

//   const addToList = (e) => {
//     e.preventDefault();
//     Axios.post("http://localhost:3001/insert", {
//       foodName: foodName,
//       days: days,
//     });
//     e.target.reset();
//     // this.setFoodName({ foodName: ""});
//     // setFoodName("");
//     //console.log(foodName + days);
//   };

// const updateFood =(id)=>{

//   Axios.put("http://localhost:3001/update", {
//     id:id,
//     newFoodName: newFoodName,
//   });
// }

// const deleteFood =(id)=>{

//   Axios.delete(`http://localhost:3001/delete/${id}`)
// }

//   useEffect(() => {
//     Axios.get("http://localhost:3001/read").then((res) => {
//       console.log(res);
//       setFoodList(res.data);
//     });
//   }, []);
