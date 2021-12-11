import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Button } from "antd";
import NavbarBloodbankSignIn from "../components/navBarBloodbankSignInPage";
import css from "./css/BloodbankSignIn.css";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const BloodbankSignIn = () => {
  const [form] = Form.useForm();

  //   const onFinish = (values) => {
  //     console.log('Received values of form: ', values);
  //   };

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    //console.log(name, value);
  };

  const login = () => {
    const { username, password } = user;

    // console.log(user);

    if (username && password) {
      if (username) {
        Axios.post("http://localhost:3001/loginBloodBank", user).then((res) => {
          if (res.data.message === "login sucessful") {
            alert(res.data.message);
            //setLoginUser(res.data.user);
            navigate("/BloodBankProfile");
          } else {
            alert(res.data.message);
            //setLoginUser(res.data.user);
          }
        });
      }
    } else {
      alert("Enter All fields");
    }
  };

  

  return (
    <>
      <NavbarBloodbankSignIn />
      <div className="card-signin ">
        <Form.Item
          name="username"
          label="Username"
          rules={[
           
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Your username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            type="text"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Your Password"
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button className="signin" htmlType="submit" onClick={login}>
            login
          </Button>
        </Form.Item>
      </div>
    </>
  );
};

export default BloodbankSignIn;
