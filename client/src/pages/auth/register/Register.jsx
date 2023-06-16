import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavbarGeneral } from "../../../components/navBarGeneral/NavbarGeneral";

import { Button, Col, Row, Card } from "react-bootstrap";



import './Register.css'
import { Footer } from "../../../components/footer/Footer";






const initialValue = {
  name: "",
  last_name: "",
  dni: "",
  birth_date: "1900-01-01",
  email: "",
  password: "",
};
export const Register = () => {
  const [register, setRegister] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const [showError, setShowError] = useState(false);
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };
  const onSubmit = () => {
    if (!register.name || !register.last_name || !register.email || !register.dni || !register.birth_date || !register.password) {
      setMsgError("Hay algun campo vacio");
    } else {
      axios
        .post("http://localhost:4000/users/createUser", register)
        .then((res) => {
          console.log(res);
          navigate("/login");
        })
        .catch((err) => {
          if (err.response.data.error.errno === 1062) {
            setMsgError("email duplicado");
          } else {
            setShowError(true);
          }
          console.log(err);
        });
    }
  };
  const handleFiles = (e) => {
    setFile(e.target.files[0])
  }
  return (
    <>
      <Row className="navbargeneral">
        <NavbarGeneral />
      </Row>
      <Row>
        <div
          className="Register"
          style={{ marginTop: "4vh", marginBottom: "-5vh" }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a href="">
              <img
                className="logoRegister"
                src="/images/Home/Isologo.png"
                alt=""
                style={{ width: "12vw" }}
              />
            </a>
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>Welcomes you! </h3>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p style={{ fontSize: "19px" }}>Quick and easy</p>
          </div>
          <div className="cardRegister">
            <Form>
              <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                  className="tarjetaDeInputs"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginRight: "40px",
                    }}
                  >
                    <input
                      className="m-2"
                      style={{
                        width: "280px",
                        borderRadius: "5px",
                        height: "38px",
                      }}
                      placeholder="Nombre"
                      name="name"
                      onChange={handleChange}
                      value={register.name}
                      autoComplete="off"
                    />
                    <input
                      className="m-2"
                      style={{
                        width: "280px",
                        borderRadius: "5px",
                        height: "38px",
                      }}
                      placeholder="Last Name"
                      name="last_name"
                      onChange={handleChange}
                      value={register.last_name}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div
                className="tarjetaDeInputs"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginRight: "40px",
                  }}
                >
                  <input
                    className="m-2"
                    style={{
                      width: "280px",
                      borderRadius: "5px",
                      height: "38px",
                    }}
                    placeholder="DNI"
                    name="dni"
                    onChange={handleChange}
                    value={register.dni}
                    autoComplete="off"
                  />
                  <input
                    type="date"
                    className="m-2"
                    style={{
                      width: "280px",
                      borderRadius: "5px",
                      height: "38px",
                    }}
                    placeholder="Birth date"
                    name="birth_date"
                    onChange={handleChange}
                    value={register.birth_date}
                    autoComplete="off"
                  />
                </div>
                <div
                className="tarjetaDeInputs"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginRight: "55px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "280px",
                      marginRight: "15px",
                    }}
                  >
                    <input
                      className="m-2"
                      style={{
                        width: "282px",
                        borderRadius: "5px",
                        height: "38px",
                      }}
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      value={register.email}
                      autoComplete="off"
                    />
                
                  </div>
                  <div
                    className="d-flex"
                    style={{ position: "relative", width: "280px" }}
                  >
                    <input
                      type="password"
                      className="m-2"
                      style={{
                        width: "282px",
                        borderRadius: "5px",
                        height: "38px",
                      }}
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      value={register.password}
                      autoComplete="off"
                    />
                  
                  </div>
                  <p>{msgError}</p>
                </div>
                <br />
              </div>
              <br />
              <div 
              className="joinNow"
              style={{ display: "flex", justifyContent: "center" }}>
                <p style={{ fontSize: "20px" }}>
                  By clicking <strong>Join now</strong>, you agree to{" "}
                  <strong>Flex Rent User Agreement Privacy Policy,</strong> and{" "}
                  <strong>Cookie Policy</strong>
                </p>
              </div>
              <br />
              <div 
              className="botonsingup"
              style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="primary"
                  style={{
                    backgroundColor: "RGB(5,119,148)",
                    width: "130px",
                    height: "50px",
                    borderColor: "RGB(5,119,148)",
                  }}
                  onClick={onSubmit}
                >
                  Sign up!
                </Button>
                <hr />
              </div>
              <br />
              <br />
              <div 
              className="orContinue"
              style={{ display: "flex", justifyContent: "center" }}>
                <p style={{ fontSize: "24px" }}>
                  ----------------- or continue with -----------------{" "}
                </p>
              </div>
              <div
                className="d-flex logoRedes"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <a href="">
                  <img
                  className="logoBajo"
                    src="/assets/images/LoginYRegistro/applebutton.png"
                    alt=""
                    
                  />
                </a>
                <a href="">
                  <img
                  className="logoBajo"
                    src="/assets/images/LoginYRegistro/googlebutton.png"
                    alt=""
                    
                  />
                </a>
                <a href="">
                  <img
                  className="logoBajo"
                    src="/assets/images/LoginYRegistro/Face.png"
                    alt=""
                    
                  />
                </a>
              </div>
              <br />
              <div
                className="d-flex finalRegister"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <p>Already in FlexRent? </p>
                <a
                  href=""
                  style={{
                    textDecoration: "none",
                    marginLeft: "15px",
                    color: "RGB(86,186,198)",
                  }}
                >
                  {" "}
                  <strong>Sign up</strong>{" "}
                </a>
              </div>
            </Form>
          </div>
        </div>
      </Row>
      <Row className="footer12">
        <Footer />
      </Row>
      
    </>
  );
}