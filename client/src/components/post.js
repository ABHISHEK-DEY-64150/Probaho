import { Form, Input, Button, Checkbox } from "antd";
import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    bloodGroup: "",
    bagOfBlood: "",
    location: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);
    setPost({
      ...post,
      [name]: value,
    });
  };

  const posting = () => {
    const { bloodGroup, bagOfBlood, location, contact } = post;

    if (bloodGroup && bagOfBlood && location && contact) {
      console.log(post);
      Axios.post("http://localhost:3001/post", post).then((res) => {
        alert(res.data.message);
        // setLoginUser(res.data.user);
        navigate("/");
      });
    } else {
      alert("Enter All fields");
    }
  };

  return (
    <div className="card-body">
      <div className="container">
        <h1>Post page</h1>

        <div className="form-group">
          <label>Blood_Group</label>
          <input
            type="text"
            className="form-control"
            name="bloodGroup"
            value={post.bloodGroup}
            onChange={handleChange}
            placeholder="Enter Blood_Group"
          />
        </div>

        <div className="form-group">
          <label for="exampleInputEmail1">Amount of Blood(bags)</label>
          <input
            type="text"
            className="form-control"
            name="bagOfBlood"
            value={post.bagOfBlood}
            onChange={handleChange}
            id="exampleInputEmail1"
            placeholder="Enter the amount of blood bags"
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={post.location}
            onChange={handleChange}
            placeholder="Enter Location"
          />
        </div>

        <div className="form-group">
          <label for="exampleInputPassword1">Contact no.</label>
          <input
            type="text"
            name="contact"
            value={post.contact}
            onChange={handleChange}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Give contact info"
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={posting}>
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
