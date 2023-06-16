import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { FlexRentContext } from "../../../context/FlexRentProvider";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Footer } from "../../../components/footer/Footer";
import { NavbarGeneral } from "../../../components/navBarGeneral/NavbarGeneral";
import { Button, Col, Row } from "react-bootstrap";


import './Login.css'



const initialValue = {
  email: "",
  password: "",
};
export const Login = () => {
  const [login, setLogin] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const { setUser, setIsLogged, setToken } = useContext(FlexRentContext);
  const navigate = useNavigate();
  const [msgError2, setMsgError2] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const onSubmit = () => {
    if (!login.email || !login.password) {
      setMsgError("Hay algun campo vacio");
    } else {
      axios
        .post("http://localhost:4000/users/login", login)
        .then((res) => {
          window.localStorage.setItem("token", res.data.token);
          setUser(res.data.user);
          setIsLogged(true);
          const type = res.data.user.category;
          if (type === 2) {
            navigate("/home");
          } else if (type === 1) {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        })
        .catch((err) => {
          setMsgError2("Issues with login, please try again or register on the site.");
          console.log(err);
        });
    }
  };
  return (
    <>
      <Row className="navegador">
        <NavbarGeneral />
      </Row>
      <Row>
        <div
          className="Login"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            style={{ alignItems: "center", margin: "80px", padding: "20px" }}
            className="text-center "
          >
            <div>
              {" "}
              <img
                className="imgLogin"
                style={{ width: "17vw", height: "6vh" }}
                src="/assets/images/Auction_and_payment/flexRentComplex.png"
                alt=""
              />{" "}
            </div>
            <Card.Body>
              <Card.Title>Welcome back!</Card.Title>
              <Card.Text>We are ready for the next adventure</Card.Text>
              <div>
                <div>
                  <input
                    type="text"
                    className="m-2"
                    placeholder="Email "
                    name="email"
                    onChange={handleChange}
                    value={login.email}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="m-2"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={login.password}
                    autoComplete="off"
                  />
                </div>
              </div>
              <Form style={{ alignItems: "center" }} className="d-flex">
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check type={type} />
                  </div>
                ))}
                <p>
                  By clicking <strong> Join now</strong> , you agree to Flex
                  Rent User Agreement Privacy Policy, and Cookie Policy{" "}
                </p>
              </Form>
              <Button
                style={{
                  borderRadius: "16px",
                  backgroundColor: "#057794",
                  width: "165px",
                  height: "50px",
                  borderColor: "#057794",
                }}
                onClick={onSubmit}
              >
                Enter
              </Button>
              <h5>{msgError}</h5>
              <h5>{msgError2}</h5>
            </Card.Body>
            <hr />
          </Card>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ gap: "30px" }} className="d-flex logos">
              <a href="">
                <img
                  src="/assets/images/LoginYRegistro/applebutton.png"
                  alt=""
                />
              </a>
              <a href="">
                <img
                  src="/assets/images/LoginYRegistro/googlebutton.png"
                  alt=""
                />
              </a>
              <a href="">
                <img src="/assets/images/LoginYRegistro/Face.png" alt="" />
              </a>
            </div>
          </div>
          <div
            style={{
              display: "block",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2vh",
              gap: "15px",
            }}
            className="d-flex"
          >
            <p className="already">Already in FlexRent? </p>
            <p>
              <a href="">Sign up</a>
            </p>
          </div>
        </div>
      </Row>
      <Row className="footer1">
        <Footer />
      </Row>
    </>
  );
};
export default Login;
