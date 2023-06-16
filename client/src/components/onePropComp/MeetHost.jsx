import React, { useState, useContext } from "react";
import {  Col, Row } from "react-bootstrap";
import { FlexRentContext } from "../../context/FlexRentProvider";
import { useNavigate } from "react-router-dom";

export const MeetHost = ({ userProperty }) => {
  const { user } = useContext(FlexRentContext);
  

  const navigate = useNavigate();
  


  return (
    <Row>
      <Col className="col-12 col-md-6">
        <h3>Meet your host</h3>
        <div>
          <h4>
            <a href="">
            {/* <Button onClick={()=>navigate(`/hostProfile/${userProperty?.user_id}`)} style={{ background: "transparent", border: "none", padding: "0" }}> */}
<img
                src={`/images/user/${userProperty?.profile_photo}`}
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              {/* </Button> */}
              
            </a>
            {/* ${userProperty?.profile_photo}`} alt="" /> */}
            Property hosted by {userProperty?.user_name}
          </h4>
          <p>
            {userProperty?.num_guest} guest · {userProperty?.num_bedroom}{" "}
            bedroom · {userProperty?.num_bathroom} bathroom
          </p>
        </div>
        <p>{userProperty?.about} </p>
      </Col>
  
      <Col className="col-12 col-md-6" style={{ backgroundColor: "#E4F0ED", borderRadius: "10px" }}>
        <h3>Chat with {userProperty?.user_name}</h3>
        <div>
          <p>
            {" "}
            <a href="">
              <img
                 style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={`/images/user/${user?.profile_photo}`}
                alt=""
              />
            </a>
            Hi! Thank you for your auction. Sure, I will look your profile. You
            have a very good Guest Rating!{" "}
          </p>
        </div>

           <div style={{backgroundColor: "white"}}>
          <p>
            Hi! I made an auction of 10% I’m super interested in your place.
            Feel free to see my profile{" "}
            <a href="">
              <img
                style={{ width: "60px" }}
                src="/assets/images/FichaDeProducto/Ellipse28.png"
                alt=""
              />
            </a>
          </p>
        </div>

        <div>
          <input
            className="RecuadroMessage"
            type="text"
            placeholder="Messege"
          />
        </div>
        <button style={{
                  backgroundColor: "rgb(5, 119, 148)",
                  color: "white",
                  borderRadius: "10px",
                }} className="SendMessage">Send Message</button>
      </Col>
    </Row>
  );
};
