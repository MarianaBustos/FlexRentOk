import React, { useState } from 'react'
// import AppNavbar from '../../../components/navbar/AppNavbar'
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import './Landing.css'
import { Footer } from '../../../components/footer/Footer';
export const Landing = () => {
  const [register, setRegister] = useState("");
  const [msgError, setMsgError] = useState("");
  // const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };
  const onSubmit = () => {
    if (!register.email) {
      setMsgError("Hay algun campo vacio");
    } else {
      axios
        .get("http://localhost:4000/users/checkmail")
        .then((res) => {
          if (register.email) {
            console.log(res);
            navigate("/Login");
          }
          else {
            navigate("/Register");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    < >
      <Row>
        <div style={{ padding: "40px" }} className='FondoFlexRent'>
        <div>
          <img src="/assets/images/LoginYRegistro/FlexRentCpmpleto.png" />
          <Button
                  style={{
                    height: "4vh",
                    marginRight: "2vw",
                    fontSize: "16px",
                    marginTop: "20px",
                    backgroundColor: "#067696",
                    borderColor: "transparent"
                  }}
                  variant="primary"
                  href="/login"
                >
                  Login
                </Button>
                <Button
                  className="B"
                  style={{
                    height: "4vh",
                    fontSize: "16px",
                    marginTop: "20px",
                    backgroundColor: "#067696",
                    borderColor: "transparent"
                  }}
                  variant="primary"
                  href="/register"
                >
                  Register
                </Button>
          <div className='community' style={{ padding: "4vw", paddingTop: "40vh" }} >
            <h1 style={{ color: "white", fontSize: "48px" }} >Travel while saving your rent!</h1>
            <p style={{ color: "white", fontSize: "20px" }}>A community-based platform that uses flexibility in traditional rental as a shared benefit for the mid term</p>
            <div className='divCorreo' style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <input className='correo' style={{ width: "16vw" }} type="text"
                placeholder='Your email address'
                name="email"
                onChange={handleChange}
                value={register.email}
                autoComplete="off"
              />
              <Button className='botonCorreo' href="/register"><b>Join now!</b></Button>
              <Button className='mobile-button'
                  style={{
                  
                    marginTop: "25px",
                    backgroundColor: "#067696",
                    borderColor: "transparent",
                    padding: "25px"
                  }}
                  variant="primary"
                  href="/login"
                >
                  Login
                </Button>
            </div>
            <div>
              <p>{msgError}</p>
            </div>
          </div>
        </div>
        <div className='fondogris' style={{ padding: "40px", marginLeft: "9%" }}>
          <div className='CuadroBlanco3Iconos' style={{ gap: "20px", margin: "30px" }} >
            <div>
              <img style={{ height: "120px" }} src="/assets/images/LandingPage/IconosGrandes/Lanlord.png" alt="" />
              <br /><br />
              <h1 className='titulo1'>LANDLORD </h1>
              <p>Increase your rental shields</p>
            </div>
            <div>
              <img style={{ height: "120px" }} src="/assets/images/LandingPage/IconosGrandes/Host.png" alt="" />
              <br /><br />
              <h1 className='titulo1'>HOST </h1>
              <p>Save on your rental payment</p>
            </div>
            <div>
              <img style={{ height: "120px" }} src="/assets/images/LandingPage/IconosGrandes/Guest.png" alt="" />
              <br /><br />
              <h1 className='titulo1'>GUEST </h1>
              <p>Pay much less for your accommodation</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Col className='vistaMovil d-flex justify-content-center' style={{ gap: "30px", marginTop: "40vh" }}>
          <div className='tarjetaTablet'>
            <Card className='tarjeta' style={{ width: '18rem', backgroundColor: "#FFFFFF", borderRadius: "24px", padding: "1%" }}>
            <Card.Img style={{ height: "40px", width: "40px" }} variant="top" src="/assets/images/LandingPage/IconosChicos/homes.png" />
            <Card.Body>
              <Card.Title><b>1.Homes</b></Card.Title>
              <Card.Text className='textogris'>
                Landlords and Hosts submit their home to the comunity.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className='tarjeta' style={{ width: '18rem', backgroundColor: "#FFFFFF", borderRadius: "24px", padding: "1%" }}>
            <Card.Img style={{ height: "40px", width: "40px" }} variant="top" src="/assets/images/LandingPage/IconosChicos/offers.png" />
            <Card.Body>
              <Card.Title><b>2.New offers</b></Card.Title>
              <Card.Text className='textogris'>
                When Hosts travel, new offers are placed in the platform to be autioned.
              </Card.Text>
            </Card.Body>
          </Card>
          </div>
          <div className='tarjetaTablet'>
            <Card className='tarjeta' style={{ width: '18rem ', backgroundColor: "#FFFFFF", borderRadius: "24px", padding: "1%" }}>
            <Card.Img style={{ height: "40px", width: "40px" }} variant="top" src="/assets/images/LandingPage/IconosChicos/bid.png" />
            <Card.Body>
              <Card.Title><b>3.Bid</b></Card.Title>
              <Card.Text className='textogris'>
                Potencial guests bid on price and reputation.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className='tarjeta' style={{ width: '18rem', backgroundColor: "#FFFFFF", borderRadius: "24px", padding: "1%" }}>
            <Card.Img style={{ height: "30px", width: "50px" }} variant="top" src="assets/images/LandingPage/IconosChicos/win.png" />
            <Card.Body>
              <Card.Title><b>4.Win-Win</b></Card.Title>
              <Card.Text className='textogris'>
                Hosts and guests arrange their FlexRent and Landlords get paid.
              </Card.Text>
            </Card.Body>
          </Card>
          </div>
          
        </Col>
        <br /><br />
        <div className='fondo' style={{ padding: "200px", backgroundColor: "white" }} >
          <h2 className='join' style={{ color: "#3EB0BE", fontSize: "48px" }}>Join our early community
            and don´t miss it out !</h2>
          <p style={{ fontSize: "34px" }}>Product launch in: 31 days</p>
          <div className='inputFinal'>
            <input type="text"
              placeholder='Your email address'
            />
            <br />
            <Button className='botonFinal' href='/register'><b>Get started!</b></Button>
          </div>
        </div>
      </div>
      </Row>
      <Row>
        <Footer />
      </Row>
      
      {/* footer */}
      {/* <footer className="bg-light text-center text-lg-start">
  <div className="text-center footer p-3 " >
    © 2023 FlexRent All Right Reserved
    <br />
    <a >How it works     /  How we are  /   About us   </a>
  </div>
</footer> */}
    </>
  )
}
export default Landing;