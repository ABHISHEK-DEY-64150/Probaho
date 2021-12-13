import css from "./css/FrontPage.module.css";
import { Layout, Menu, Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import NavBarFrontPage from "../components/navBarFrontPage";
// import MainNavigation from '../components/mainNavigation'
import Axios from "axios";
import { BiSearch, RiEmotionSadFill } from "react-icons/all";
import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import { Modal } from "antd";
import { Form, Input, Select, Button } from "antd";
const { TextArea } = Input;
const { Header, Content, Footer } = Layout;
const { Option } = Select;
const formItemLayout = {};
const tailFormItemLayout = {};

let x = 0;
let data, data_email;

export default function Design() {
  const navigate = useNavigate();
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState({
    email: "",
    phone: "",
    description: "",
  });

  const [form] = Form.useForm();
  const [user, setUser] = useState({
    location: "",
    bloodGroup: "",
    result: [],
    result1: [12],
  });

  const [bloodBank, setBloodBank] = useState({
    result0: [],
    result01: [12],
  });

  const [evnt, setEvnt] = useState({
    email: "",
    phone: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(name, value);
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setEvnt({
      ...evnt,
      [name]: value,
    });
    console.log(name, value);
  };

  const handleChangeSelect1 = (key, value) => {
    setEvnt({
      ...evnt,
      [key]: value,
    });
    console.log(key, value);
  };

  const handleChangeSelect = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const handleOk1 = () => {
    // const { phone, description } = evnt;
    
    console.log(evnt);

    Axios.post('http://localhost:3001/sendNotification', evnt).then((res) => {
    	 alert(res.data.message);
    	// setLoginUser(res.data.user);
    	// navigate('/');
    });
    setOpen1(false);
  };

  const handleCancel1 = () => {
    setOpen1(false);
  };

  const notify = (item) => {
	evnt.email = item;
    setOpen1(true);
  };

  const search = (e) => {
    // e.preventDefault();
    if (user.bloodGroup === "" || user.location === "") {
      alert("enter all data ");
      return;
    }

    //   console.log(this.state)
    Axios.post("http://localhost:3001/query", user).then((res) => {
      data = res.data;

      console.log(data);
      if (data.length) {
        setUser((prev) => ({ ...prev, result: data }));
        x = 1;
      } else {
        setUser((prev) => ({ ...prev, result: [] }));
        setUser((prev) => ({ ...prev, result1: [] }));
        x = 10;
      }
    });

    Axios.post("http://localhost:3001/queryBloodBank", user).then((res) => {
      data = res.data;

      console.log(data);
      if (data.length) {
        setBloodBank((prev) => ({ ...prev, result0: data }));
        x = 1;
      } else {
        setBloodBank((prev) => ({ ...prev, result0: [] }));
        setBloodBank((prev) => ({ ...prev, result01: [] }));
        x = 10;
      }
      console.log(data);
    });
  };

  return (
    <>
      <NavBarFrontPage />

      <div className={css.card_front}>
        <Form.Item
          name="City"
          label="City"
          className="ant-form-item-city"
          rules={[
            {
              // required: true,
              // message: 'Please select City!',
            },
          ]}
        >
          <Select
            type="text"
            name="location"
            value={user.location}
            onChange={(value) => handleChangeSelect("location", value)}
            placeholder="Select Your City"
          >
            <Select.Option value="Dhaka">Dhaka</Select.Option>
            <Select.Option value="Sylhet">Sylhet</Select.Option>
            <Select.Option value="Chittagong">Chittagong</Select.Option>
            <Select.Option value="Comilla">Comilla</Select.Option>
            <Select.Option value="Rajshahi">Rajshahi</Select.Option>
            <Select.Option value="Rangpur">Rangpur</Select.Option>
            <Select.Option value="Barishal">Barishal</Select.Option>
            <Select.Option value="Brahminbaria">Brahminbaria</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="blood"
          label="Blood group"
          className="ant-form-item-blood"
          rules={[
            {
              // required: true,
              // message: 'Please select blood group!',
            },
          ]}
        >
          <Select
            type="text"
            name="blood"
            value={user.bloodGroup}
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

        <Form.Item {...tailFormItemLayout}>
          <Button className={css.search} htmlType="submit" onClick={search}>
            Search{" "}
            <div className={css.icon}>
              <BiSearch />
            </div>
          </Button>
        </Form.Item>
        {/* </Form> */}
      </div>

      <div>
        <div className={css.column}>
          {user?.result?.length ? (
            <div className={css.scroll_post}>
              <div className="card-body">
                <div className={css.card1}>
                  <h1 style={{ color: "Blue" }}>Available Donors</h1>
                </div>
                <div className="container">
                  {user.result.map((val, key) => {
                    return (
                      <div
                        className={css.card}
                        style={{ marginTop: "10px" }}
                        key={key}
                      >
                        <h1 className={css.query_result_name}>
                          Name:{val.name}
                        </h1>
                        <h1 className={css.query_result_name}>
                          email:{val.email}
                        </h1>
                        <h1 className={css.query_result_name}>
                          Phone:{val.phone}
                        </h1>
                        <h1 className={css.query_result_name}>
                          Location:{val.location}
                        </h1>
                        <button onClick={() => notify(val.email)}>
                          notify
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : user?.result1?.length ? (
            <div></div>
          ) : (
            <div className={css.scroll_post0}>
              <div className={css.no_one}>
                No one found{" "}
                <div className={css.icon1}>
                  <RiEmotionSadFill />
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          {bloodBank?.result0?.length ? (
            <div className={css.scroll_post1}>
              <div className="card-body">
                <div className={css.card1}>
                  <h1 style={{ color: "blue" }}>Available Blood Banks</h1>
                </div>
                <div className="container">
                  {bloodBank.result0.map((val, key) => {
                    return (
                      <div
                        className={css.card}
                        style={{ marginTop: "10px" }}
                        key={key}
                      >
                        <h1 className={css.query_result_name}>
                          BloodBank Name:{val.name}
                        </h1>
                        <h1 className={css.query_result_name}>
                          BloodBank:{val.email}
                        </h1>
                        <h1 className={css.query_result_name}>
                          Contact No:{val.phone}
                        </h1>
                        <h1 className={css.query_result_name}>
                          Location:{val.location}
                        </h1>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : bloodBank?.result01?.length ? (
            <div></div>
          ) : (
            <div className={css.scroll_post11}>
              <div className={css.no_one1}>
                No Blood Bank found{" "}
                <div className={css.icon1}>
                  <RiEmotionSadFill />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <Modal
          title="Create An Event"
          visible={open1}
          // onOk={handleOk}
          // onCancel={handleCancel}
          footer={[
            <Button onClick={handleCancel1}>Cancel</Button>,
            <Button type="primary" onClick={handleOk1}>
              Send email
            </Button>,
          ]}
        >
          <div>
            <div>
              <Form.Item
                name="phone"
                label="Phone No"
                className="edit-info"
                // rules={[
                // 	{
                // 		required: true,
                // 		message: 'Please input your phone number!',
                // 	},
                // ]}
              >
                <Input
                  //   addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                  type="text"
                  name="phone"
                  value={evnt.phone}
                  onChange={handleChange1}
                  placeholder="Provide Phone number"
                />
              </Form.Item>
            </div>

            <div>
              <label>Description:</label>
              <TextArea
                name="description"
                value={evnt.description}
                showCount
                maxLength={200}
                style={{ height: 120 }}
                onChange={handleChange1}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
