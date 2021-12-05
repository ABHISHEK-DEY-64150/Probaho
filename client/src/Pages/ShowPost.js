
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const ShowPost = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/showPost").then((res) => {
      // console.log(res.data);
      setPostList(res.data);
     
    });
  },[]);

  return (
    <div className="card-body">
      <div className="container">
        <h1 style={{color: "green"}}>All post</h1>

        {postList.map((val, key) => {
          return (
            <div className="card" style={{color: "red", marginTop: "10px"}} key={key}>
              <h1>blood_group:{val.bloodGroup}</h1>
              <h1>Amount of Blood:{val.bagOfBlood}</h1>
              <h1>Location:{val.location}</h1>
              <h1>Contact_no:{val.contact}</h1>              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowPost;