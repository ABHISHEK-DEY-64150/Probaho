import { Form, Input, Button, Checkbox } from "antd";
import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

let sz = 1;
let data;
class QueryPage extends React.Component {
  state = {
    name: "",
    location: "",
    result: [],
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.location === "") {
      alert("enter all data ");
      return;
    }
    // this.props.addContactHandler(this.state);

    //   console.log(this.state)
    Axios.post("http://localhost:3001/query", this.state).then((res) => {
      data = res.data;
      if (data) {
        this.setState({ result: data });
      } else {
        sz = 0;
      }
    });

    // console.log(this.state.result);
    this.setState({ name: "", location: "" });

    // this.props.history.push("/");
  };

  render() {
    return (
      <div className="ui inverted segment">
        <form className="ui inverted form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Location</label>
            <input
              type="text"
              email="location"
              value={this.state.location}
              onChange={(e) => this.setState({ location: e.target.value })}
              placeholder="location"
            />
          </div>
          <button type="submit" className="ui button">
            Submit
          </button>
        </form>

        {
          <div>
            {this.state.result.map((val, key) => {
              return (
                <div
                  className="card"
                  style={{ color: "red", marginTop: "10px" }}
                  key={key}
                >
                  <h1>Name:{val.name}</h1>
                  <h1>email:{val.email}</h1>
                  <h1>Location:{val.location}</h1>
                </div>
              );
            })}
          </div>
        }
      </div>
    );
  }
}

export default QueryPage;
