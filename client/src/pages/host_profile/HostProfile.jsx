import React, { useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./hostProfile.css";
import { FlexRentContext } from "../../context/FlexRentProvider";
import { Button, Col, Row } from "react-bootstrap";
import { Footer } from "../../components/footer/Footer";
import { NavbarGeneral } from "../../components/navBarGeneral/NavbarGeneral";


export const HostProfile = () => {
  const { user } = useContext(FlexRentContext);
  const navigate = useNavigate();

  const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <>
    <Row>
      <NavbarGeneral /></Row>
<Row className="HostPage">
      <Row className="backgroundHost">
   <Col className='BotonesPerfilSwitch'>
          <button
            onClick={() => navigate(`/guestProfile`)}
            className="BotonSwitch"
            
          >
            <img
            className="avatarmin"
              src="/assets/images/menu/userIcon.png"
              alt=""
              width="20px"
              height="20px"
            />
            switch to guest
          </button>
          <button
            onClick={() => navigate("/editUser")}
            className="editprofileHost"
          >
            <img
              className="avatarmin"
              src="/assets/images/Guest_Profile/pen.png"
              alt=""
              width="20px"
              height="20px"
            />
            Edit Profile
          </button>
       </Col> </Row>
      

      <div className="d-flex" style={{ marginLeft: "3vw" }}>
        <div className="profilePhotoHost">
          <img className="PhotoHost"
            src={`/images/user/${user?.profile_photo}`}
            alt=""
          />
        </div>
      </div>

      <Row className="row NameConnect" >
        <Col lg={6} sm={12}
          className="TextoHost"
        >
          <h3>
            <strong>
              {user?.name} {user?.last_name}
            </strong>
          </h3>
          <h5 style={{ color: "grey" }} className="years">
            {user?.occupation}, {calculateAge(user?.birth_date)} YEARS
          </h5>
          <br />
        </Col>
        <Col lg={6} sm={12}
          className="mesandcon"
          
        >
          <p style={{ wordSpacing: "5px" }}>
            <strong> 50 </strong> Reviews | <strong> 70</strong> Follow |{" "}
            <strong> 20</strong> Contact
          </p>
          <div className="botonesMsgAndConnect d-flex">
            <Button style={{ height: "5vh" }} className="BtonMsg">
              Message
            </Button>
            <Button style={{ height: "5vh" }} className="BtonConnect">
              Connect
            </Button>
          </div>
        </Col>
      </Row>

      <Row style={{ marginLeft: "5vw" }}>
        <Col lg={8} md={12} sm={12} className="izqHost">
          <div className="barraInfoProfile d-flex">
            <p className="hover" onClick={() => navigate("about")}>
              About
            </p>
            <p className="hover" onClick={() => navigate("myHome")}>
              My property
            </p>
            <p className="hover" onClick={() => navigate("reviews")}>
              Reviews
            </p>
          </div>
          <hr />
          <div className="scroll">
            <Outlet />
          </div>
        </Col>
        <Col lg={4} md={12} sm={12} className=" NC1">
          <h5 className="NC">New Contacts</h5>
          <div className="mapeoContacts">
            <div className="mapeoContacts2">
              <img
                className="imgDch"
                src="/assets/images/HostProfile/LuisTosar.png"
                alt=""
              />
              <div style={{ marginTop: "1vh" }}>
                <h5 className="nmbr">Luis Tosar</h5>
                <p className="nmbr">London</p>
              </div>
            </div>
            <br />
            <div className="mapeoContacts2">
              <img className="imgDch"
                
                src="/assets/images/HostProfile/LuisTosar.png"
                alt=""
              />
              <div style={{ marginTop: "1vh" }}>
                <h5 className="nmbr">Luis Tosar</h5>
                <p className="nmbr">London</p>
              </div>
            </div>
            <br />
            <div className="mapeoContacts2">
              <img
                className="imgDch"
                src="/assets/images/HostProfile/LuisTosar.png"
                alt=""
              />
              <div style={{ marginTop: "1vh" }}>
                <h5 className="nmbr">Luis Tosar</h5>
                <p className="nmbr">London</p>
              </div>
            </div>
            <br />
            <div className="mapeoContacts2">
              <img
                className="imgDch"
                src="/assets/images/HostProfile/LuisTosar.png"
                alt=""
              />
              <div style={{ marginTop: "1vh" }}>
                <h5 className="nmbr">Luis Tosar</h5>
                <p className="nmbr">London</p>
              </div>
            </div>
            <br />
            <div className="mapeoContacts2">
              <img
                className="imgDch"
                src="/assets/images/HostProfile/LuisTosar.png"
                alt=""
              />
              <div style={{ marginTop: "1vh" }}>
                <h5 className="nmbr">Luis Tosar</h5>
                <p className="nmbr">London</p>
              </div>
            </div>
          </div>
          <a href="" className="SM">
            see more
          </a>
        </Col>
      </Row>

      <div>
        <div className="ReviewsHost">
          <h3 className="nombr">Reviews</h3>

          <div className="d-flex rwsss">
            <img
            className="starsmini"
              style={{ width: "16px", height: "16px" }}
              src="/assets/images/Guest_profile/Star1.png"
              alt=""
            />
            <p className="nmbr">4.56 320 reviews</p>
          </div>
          <br />

          <div className="flex-wrap RevHost">
            <div
              className="col-lg-6 col-md-6 col-sm-12 parrafosReviews"
            >
              <div className="d-flex">
                <div>
                  <img
                    className="Fotillo"
                    src="/assets/images/Guest_profile/womenreview.png"
                    alt=""
                  />
                </div>
                <div style={{ marginLeft: "2vw", marginTop: "1vw" }}>
                  <h3 className="nmbr">Marisa Lara</h3>
                  <p className="nmbr">Milano, Italy</p>

                  <a href="">
                    <img className="imgHostTop" src="/assets/images/Guest_profile/Star1.png" alt="" />
                  </a>
                  <a href="">
                    <img className="imgHostTop" src="/assets/images/Guest_profile/Star1.png" alt="" />
                  </a>
                  <a href="">
                    <img className="imgHostTop" src="/assets/images/Guest_profile/Star1.png" alt="" />
                  </a>
                  <a href="">
                    <img className="imgHostTop" src="/assets/images/Guest_profile/Star1.png" alt="" />
                  </a>
                </div>
              </div>
              <br />
              <p className="nmbr">
                Sarah thank you for being our guest in Milano, we would love to
                see you again. You are super organized and calm. You will be
                always welcome.
              </p>
            </div>

            <div
              className="col-lg-6 col-md-6 col-sm-12 parrafosReviews"
              
            >
              <div className="d-flex">
                <div>
                  <img
                    className="Fotillo"
                    src="/assets/images/Guest_profile/womenreview.png"
                    alt=""
                  />
                </div>
                <div style={{ marginLeft: "2vw", marginTop: "1vw" }}>
                  <h3 className="nmbr">Marisa Lara</h3>
                  <p className="nmbr">Milano, Italy</p>

                  <a href="">
                    
                    <img className="imgHostTop" src="/assets/images/Guest_profile/Star1.png" alt="" />
                  </a>
                  <a href="">
                    <img className="imgHostTop" src="/assets/images/Guest_profile/Star1.png" alt="" />
                  </a>
                  <a href="">
                    <img className="imgHostTop" src="/assets/images/Guest_profile/Star1.png" alt="" />
                  </a>
                  <a href="">
                    <img className="imgHostTop" src="/assets/images/Guest_profile/Star1.png" alt="" />
                  </a>
                </div>
              </div>
              <br />
              <p className="nmbr">
                Sarah thank you for being our guest in Milano, we would love to
                see you again. You are super organized and calm. You will be
                always welcome.
              </p>
            </div>
          </div>
        </div>
      </div>
</Row><Row>
      <Footer /></Row>
    </>
  );
};
