import { Form, Input, InputNumber, Button } from "antd";
import React, { useState } from "react";
import Axios from "axios";

import { useNavigate } from 'react-router-dom';

const Login = ({setLoginUser}) => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);

    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    const { email, password } = user;

    if (email && password) {
      if (email) {
        Axios.post("http://localhost:3001/login", user).then((res) => {

          if(res.data.message === "login sucessful")
          {
            alert(res.data.message);
            setLoginUser(res.data.user);
            navigate("/");
          }
          else
          {
            alert(res.data.message);
            setLoginUser(res.data.user);

          }
          
          
         
        });
      }
    } else {
      alert("Enter All fields");
    }
  };

  return (
    <div className="card-body">
      <div className="container">
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="text"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={login}>
          Log in
        </button>
        <div>Or</div>

        <button type="submit" className="btn btn-primary" onClick={()=>{navigate('/register')}}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
