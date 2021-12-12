import React, { useState, useEffect } from "react";
import Axios from "axios";
import NavbarProfile from "../components/navBarProfilePage";
import css from "./css/Profile.module.css";
import { useNavigate } from "react-router-dom";
// import Modal from "react-bootstrap/Modal";
// import Select from "react-bootstrap/FormSelect";

import { Modal } from "antd";
import { Form, Input, Select, Button, DatePicker } from "antd";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [postList, setPostList] = useState([]);
  const [postList1, setPostList1] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user, setUser] = useState({
    location: "",
    phone: "",
    lastDonation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(name, value);
  };

  const handleChangeSelect = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
    console.log(key, value);
  };

  const handleOk = () => {
    console.log(user);

    const { location, phone, lastDonation } = user;

    if (location || phone || lastDonation) {
      console.log(user);

      Axios.put("http://localhost:3001/Edit", user).then((res) => {
        //alert(res.data.message);
        // setLoginUser(res.data.user);
        navigate("/Profile");
        console.log(res.data.message);
      });
    }
    setOpen(false);
    // handleClose();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/Profile").then((res) => {
      // console.log(res.data);
      if (res.data) {
        setPostList(res.data);
      } else {
        navigate("/Login");
      }
    });
  }, []);

  //[] removed

  const editing = () => {
    setOpen(true);
    // navigate('/Edit');
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/showPost").then((res) => {
      console.log(res.data);
      setPostList1(res.data);
    });
  }, []);

  return (
    <>
      <NavbarProfile />

      <div className="container">
        <div className={css.card_profile}>
          {postList.map((val, key) => {
            return (
              <div
                className={css.custom_profile}
                style={{ marginTop: "10px" }}
                key={key}
              >
                <div className={css.card2}>
                  <h1 style={{ color: "white" }}>Profile</h1>
                </div>
                <div className={css.name}>
                  <p>Name:{val.name}</p>
                </div>
                <div className={css.name}>
                  <p>Contact_no:{val.phone}</p>
                </div>
                <div className={css.name}>
                  <p>Blood_group:{val.bloodGroup}</p>
                </div>
                <div className={css.name}>
                  <p>Last Blood Donation :{val.lastDonation}</p>
                </div>
                <div className={css.name}>
                  <p>Location:{val.location}</p>
                </div>

                <button type="submit" className={css.edit} onClick={editing}>
                  Edit Profile
                </button>
              </div>
            );
          })}
        </div>

        <div className={css.scroll_post}>
          <div className="card-body">
            <div className={css.card1}>
              <h1 style={{ color: "white" }}>All Post</h1>
            </div>
            <div className="container">
              {postList1.map((val, key) => {
                return (
                  <div
                    className={css.card}
                    style={{ marginTop: "10px" }}
                    key={key}
                  >
                    <h1>Blood_group: {val.bloodGroup}</h1>
                    <h1>Amount of Blood: {val.bagOfBlood}</h1>
                    <h1>Location: {val.location}</h1>
                    <h1>Contact_no: {val.contact}</h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div></div>

        <div>
          <Modal
            title="Update your Profile"
            visible={open}
            // onOk={handleOk}
            // onCancel={handleCancel}
            footer={[
              <Button onClick={handleCancel}>Cancel</Button>,
              <Button type="primary" onClick={handleOk}>
                UpDate
              </Button>,
            ]}
          >
            <div className={css.modal_design}>
              <Form.Item name="City" label="City">
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
                  <Select.Option value="Brahminbaria">
                    Brahminbaria
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="phone" label="Phone Number">
                <Input
                  //   addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </Form.Item>

              <Form.Item name="lastDonation" label="Last Blood Donation">
                <DatePicker
                  name="lastDonation"
                  value={user.lastDonation}
                  onChange={(value) =>
                    handleChangeSelect("lastDonation", value)
                  }
                />
              </Form.Item>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Profile;
