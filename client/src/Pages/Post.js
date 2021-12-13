import { Form, Input, Button, Checkbox, Select } from "antd";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBarPostPage from "../components/navBarPostPage";
import css from "./css/Post.module.css";
import { IoIosAddCircle } from 'react-icons/all';

const { Option } = Select;

const formItemLayout = {
  // labelCol: {
  // 	xs: {
  // 		span: 240,
  // 	},
  // 	sm: {
  // 		span: 12,
  // 	},
  // },
  // wrapperCol: {
  // 	xs: {
  // 		span: 240,
  // 	},
  // 	sm: {
  // 		span: 16,
  // 	},
  // },
};
const tailFormItemLayout = {
  // wrapperCol: {
  // 	xs: {
  // 		span: 24,
  // 		offset: 0,
  // 	},
  // 	sm: {
  // 		span: 16,
  // 		offset: 8,
  // 	},
  // },
};

const Post = () => {
  const [form] = Form.useForm();
  const [postList, setPostList] = useState([]);
  // const navigate = useNavigate();
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
    e.target.bagOfBlood="";
  };

  const handleChangeSelect = (key, value) => {
    setPost({
      ...post,
      [key]: value,
    });
    console.log(key, value);
  };

  const posting = () => {
    const { bloodGroup, bagOfBlood, location, contact } = post;
    console.log(post);

    if (bagOfBlood && contact) {
      // console.log(post.date);
      Axios.post("http://localhost:3001/post", post).then((res) => {
        alert(res.data.message);
        // setLoginUser(res.data.user);
        // navigate('/');
      });
    } else {
      alert("Enter All fields");
    }
   
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/showPost").then((res) => {
      console.log(res.data);

      setPostList(res.data);
    });
  },);

  return (
    <>
      <NavBarPostPage />

      <div>
        <div>
          <div className={css.card_post}>
            <div className={css.custom_form}>
              <Form.Item
                name="blood"
                label="Blood group"
                rules={[
                  {
                    required: true,
                    message: "Please select blood group!",
                  },
                ]}
              >
                <Select
                  type="text"
                  name="blood"
                  value={post.bloodGroup}
                  onChange={(value) => handleChangeSelect("bloodGroup", value)}
                  placeholder="select blood group"
                >
                  <Option value="A+">A+</Option>
                  <Option value="B+">B+</Option>
                  <Option value="O+">O+</Option>
                  <Option value="AB+">AB+</Option>
                  <Option value="A-">A-</Option>
                  <Option value="B-">B-</Option>
                  <Option value="O-">O-</Option>
                  <Option value="AB-">AB-</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="bagOfBlood"
                label="Bag of Bloods"
                rules={[
                  {
                    required: true,
                    message: "Bag of Bloods!",
                  },
                ]}
              >
                <Input
                  //   addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                  type="text"
                  name="bagOfBlood"
                  value={post.bagOfBlood}
                  onChange={handleChange}
                  placeholder="Bags of Blood"
                />
              </Form.Item>

              <Form.Item
                name="City"
                label="City"
                rules={[
                  {
                    required: true,
                    message: "Please select City!",
                  },
                ]}
              >
                <Select
                  type="text"
                  name="location"
                  value={post.location}
                  onChange={(value) => handleChangeSelect("location", value)}
                  placeholder="Select Your City"
                >
                  <Option value="Dhaka">Dhaka</Option>
                  <Option value="Sylhet">Sylhet</Option>
                  <Option value="Chittagong">Chittagong</Option>
                  <Option value="Comilla">Comilla</Option>
                  <Option value="Rajshahi">Rajshahi</Option>
                  <Option value="Rangpur">Rangpur</Option>
                  <Option value="Barishal">Barishal</Option>
                  <Option value="Brahminbaria">Brahminbaria</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="contact"
                label="Contact"
                rules={[
                  {
                    required: true,
                    message: "Provide Contact!",
                  },
                ]}
              >
                <Input
                  //   addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                  type="text"
                  name="contact"
                  value={post.contact}
                  onChange={handleChange}
                  placeholder="Contact"
                />
              </Form.Item>

              <Form.Item
              // {...tailFormItemLayout}
              >
                <Button className={css.post} htmlType="submit" onClick={posting}>
                  Create Post <div className={css.icon}><IoIosAddCircle/></div>
                </Button>
              </Form.Item>
            </div>
          </div>

		  <div className={css.scroll_post1}>
        <h1 style={{marginLeft:"28rem",fontFamily:"system-ui"}}>All post</h1>
          <div className="card-body">
            <div className="container">
              {postList.map((val, key) => {
                return (
                  <div className={css.card3} style={{ marginTop: "10px" }} key={key}>
                    <p className={css.name}>Blood_group: {val.bloodGroup}</p>
                    <p className={css.name}>Amount of Blood: {val.bagOfBlood}</p>
                    <p className={css.name}>Location: {val.location}</p>
                    <p className={css.name}>Contact_no: {val.contact}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Post;
