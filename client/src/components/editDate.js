import { Form, Input, Button, Checkbox } from "antd";
import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const EditDate = (user) => {
  const navigate = useNavigate();
  const [date, setDate] = useState({
    newDate:"",
  });

//   console.log(user._id); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log( value);
    setDate({
      ...date,
      [name]: value,
    });
  };

  const editing = () => {
    const { newDate } = date;
    // // const date = new Date();
    console.log(newDate);

    // let c= new Date();

    if(newDate)
    {
        Axios.put("http://localhost:3001/update",date).then((res) => {
        alert(res.data.message);
        navigate("/edit");
      });  
    }

    // if (bloodGroup && bagOfBlood && location && contact) {
    //   // console.log(post.date);
    //   Axios.post("http://localhost:3001/post", date).then((res) => {
    //     alert(res.data.message);
    //     // setLoginUser(res.data.user);
    //     navigate("/");
    //   });
    // } else {
    //   alert("Enter All fields");
    // }
  };

  return (
    <div className="card-body">
      <div className="container">
        <h1>Edit_page</h1>
        <div className="form-group">
          <label for="newDate">Last Donation:</label>
          <input name="newDate" type="date"  value={date.newDate} onChange={handleChange} id="date" ></input>
        </div>
        <button type="submit" className="btn btn-primary" onClick={editing}>
          edit
        </button>
      </div>
    </div>
  );
};

export default EditDate;
