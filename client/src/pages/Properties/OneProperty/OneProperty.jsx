import React, { useState, useContext, useEffect } from "react";
import "./OneProperty.css";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../../components/footer/Footer.jsx";
import { CalendarioProperty } from "../../../components/calendarioProperty/CalendarioProperty";
import { useParams } from "react-router-dom";
import { DescripHome } from "../../../components/onePropComp/DescripHome";
import { InfoPrice } from "../../../components/onePropComp/InfoPrice";
import { MeetHost } from "../../../components/onePropComp/MeetHost";
import { FlexRentContext } from "../../../context/FlexRentProvider";
import axios from "axios";
import { Mapa } from "../../../components/onePropComp/Mapa";
import { NavbarGeneral } from "../../../components/navBarGeneral/NavbarGeneral";
export const OneProperty = () => {
  const [userProperty, setUserProperty] = useState(null);
  const [allBids, setAllBids] = useState([]);
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const navigate = useNavigate();
  const { property_id } = useParams();
  const { user } = useContext(FlexRentContext);
  console.log(userProperty?.start_date);
  const onSubmit = () => {
    axios
      .post(
        `http://localhost:4000/properties/createAvailability/${property_id}`,
        { start_date, end_date }
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteProperty = () => {
    axios
      .put(`http://localhost:4000/properties/deleteProperty/${property_id}`)
      .then((res) => {
        console.log(res);
        navigate(`/home`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
    <NavbarGeneral/>
    <div style={{padding: "2vw"}}>
      <div className="botonesEditar">
        {userProperty?.user_id === user?.user_id && (
          <div>
            <button
              className="botonCorreo"
              onClick={() => navigate(`/editProperty/${property_id}`)}
            >
              Edit Property
            </button>
            <button className="botonCorreo" onClick={deleteProperty}>
              Delete Property
            </button>
          </div>
        )}
      </div>
      <DescripHome
        userProperty={userProperty}
        setUserProperty={setUserProperty}
        property_id={property_id}
      />
      <InfoPrice
        userProperty={userProperty}
        property_id={property_id}
        allBids={allBids}
        setAllBids={setAllBids}
        startdate={userProperty?.start_date}
        enddate={userProperty?.end_date}
      />
        <br />
        <br />
        <Row>
          <Col className="col-12 col-md-6">
            <div>
              <h3>Available days</h3>
              <p>
                Can see the available days of this property and edit them as you
                want
              </p>
              <CalendarioProperty
                startdate={userProperty?.start_date}
                enddate={userProperty?.end_date}
              />
            </div>
            <br />
          </Col>
          <Col className="col-12 col-md-6">
            {userProperty?.user_id === user?.user_id && (
              <div>
                <h3>Available booking</h3>
                <p>
                  Host, here you can add a available booking period for your
                  property
                </p>
                <p>
                  <input
                    type="date"
                    name="check_in_date"
                    id="startDate"
                    value={start_date}
                    onChange={(e) => setStart_date(e.target.value)}
                    style={{ borderRadius: "10px", padding: "5px" }}
                  />
                </p>
                <p>
                  <input
                    type="date"
                    name="check_out_date"
                    id="endDate"
                    value={end_date}
                    onChange={(e) => setEnd_date(e.target.value)}
                    style={{ borderRadius: "10px", padding: "5px" }}
                  />
                </p>
                <button
                  style={{
                    color: "white",
                    borderRadius: "5px",
                    padding: "10px",
                    margin: "10px",
                    background: "rgb(5, 119, 148)",
                  }}
                  onClick={onSubmit}
                >
                  Add Availability
                </button>
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <h3>Where will I stay?</h3>
            </div>
            <div>
              {/* <a href="">
                <Mapa cityName="Málaga" />
              </a> */}
              <div>
              <img style={{maxWidth: '100%', width: '100%'}}src="/assets/images/FichaDeProducto/mapa.png" alt="" />
              </div>
              <hr />
            </div>
          </Col>
        </Row>
      {userProperty?.user_id !== user?.user_id && (
        <MeetHost userProperty={userProperty} />
      )}
<hr />
      <div>
        <h3>Reviews</h3>
        <p>
          {" "}
          <img src="/assets/images/FichaDeProducto/Star1.png" alt="" />
          <a href="">4.56 - 320 Reviews</a>{" "}
        </p>
      </div>
      <Row>
        <Col className="col-6">
          <div className=" ">
            <img
              style={{ width: "125px" }}
              src="/assets/images/FichaDeProducto/Chaval.png"
              alt=""
            />
          </div>
          <p>Milano, Italy</p>
          <a href="">
            <img src="/assets/images/FichaDeProducto/Star1.png" alt="" />
          </a>
          <img src="/assets/images/FichaDeProducto/Star1.png" alt="" />
          <img src="/assets/images/FichaDeProducto/Star1.png" alt="" />
          <img src="/assets/images/FichaDeProducto/Star1.png" alt="" />
          <img src="/assets/images/FichaDeProducto/Star1.png" alt="" />
          <p>
            Sarah thank you for being our guest in Milano, we would love to see
            you again. You are super organized and calm. You will be always
            welcome.
          </p>
        </Col>
        <Col className="col-6">
          <div className=" ">
            <img
              style={{ width: "125px" }}
              src="/assets/images/FichaDeProducto/Ellipse26.png"
              alt=""
            />
          </div>
          <p>Madrid, Spain</p>
          <a href="">
            <img src="/assets/images/FichaDeProducto/Star1.png" alt="" />
          </a>
          <img src="/assets/images/FichaDeProducto/Star1.png" alt="" />
          <img src="/assets/images/FichaDeProducto/Star1.png" alt="" />
          <img src="/assets/images/FichaDeProducto/Star1.png" alt="" />
          <img src="/assets/images/FichaDeProducto/Star1.png" alt="" />
          <p>
            You are the perfect guest and also a very good person. I hope you
            enjoyed the experience in Madrid. You will be always welcome
            here,Amiga.{" "}
          </p>
        </Col>
      </Row>
</div>
      <Footer />
    </>
  );
};