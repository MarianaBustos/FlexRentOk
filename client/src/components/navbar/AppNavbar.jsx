import React from "react";
import Button from "react-bootstrap/Button";
import "./AppNavbar.css";
import { Container } from "react-bootstrap";


export const AppNavbar = () => {
  return (
    <Container fluid>
    <div
      style={{
        position: "absolute",
        padding: "35px",
      }}
      className="NavbarTransp"
    >
      <div>
        <div
          fluid
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div className="margin" href="#">
              <img
              className="logoFlex"
                style={{ marginRight: "23vw" }}
                src="/assets/images/LoginYRegistro/FlexRentCpmpleto.png"
                alt=""
              />
            </div>
          </div>
          <div>
            <div
              className="navbarInfo me-auto my-2 my-lg-0"
              style={{
                maxHeight: "100px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              navbarScroll
            >
              <div className="apartadosNavbar">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "30px",
                    gap: "2vw",
                  }}
                >
                  <p>How it works</p>
                  <p>Who we are</p>
                  <p>About us</p>
                </div>
                <Button
                className="BotonLoginLanding"
                  variant="primary"
                  href="/login"
                >
                  Login
                </Button>
                <Button
                  className="BotonLoginLanding"
                 
                  variant="primary"
                  href="/register"
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div></Container >
  );
};
export default AppNavbar;