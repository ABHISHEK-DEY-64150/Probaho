
import { Form, Input, Button, Checkbox } from "antd";
import { DatePicker, Space } from "antd";
import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    location: "",
    lastDonation: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, location, password, reEnterPassword,lastDonation } = user;

    if (name && email && location && password && reEnterPassword) {
      console.log(user);
      if (password === reEnterPassword) {
        Axios.post("http://localhost:3001/register", user).then((res) => {
          alert(res.data.message);
          // setLoginUser(res.data.user);
          navigate("/login");
        });
      } else {
        alert("password does not match");
      }
    } else {
      alert("Enter All fields");
    }
  };

  return (
    <div className="card-body">
      <div className="container">
        <h1>Registration</h1>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Enter Name"
          />
        </div>

        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleChange}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={user.location}
            onChange={handleChange}
            placeholder="Enter Location"
          />
        </div>

        <div className="form-group">
          <label for="lastDonation">Last Donation:</label>
          <input name="lastDonation" type="date"  value={user.lastDonation} onChange={handleChange} id="lastDonation" ></input>
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

        <div className="form-group">
          <label for="exampleInputPassword1">Confirm Password</label>
          <input
            type="text"
            name="reEnterPassword"
            value={user.reEnterPassword}
            onChange={handleChange}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Confirm Password"
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={register}>
          Register
        </button>
        <div>Already signed up?</div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;

