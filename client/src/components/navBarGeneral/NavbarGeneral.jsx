import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { FlexRentContext } from '../../context/FlexRentProvider';

import './navBarGeneral.css'



export const NavbarGeneral = () => {

    const { user, setUser, setIsLogged } = useContext(FlexRentContext);
    const navigate = useNavigate();
    const onLogOut = () => {
        window.localStorage.removeItem("token");
        setIsLogged(false);
        setUser();
        navigate('/');
      }

      const resetHomePage = () => {
        if (window.location.pathname === '/home') {
          window.location.reload();
        } else {
          navigate('/home');
        }
      };


  return (
    <>
    <Navbar bg="light" expand={false}>
      <Container fluid>
      <Navbar.Brand href="/home">
      <img
            className='logoPrincipal'
            onClick={resetHomePage}
            src="/assets/images/Auction_and_payment/FlexRent.png"
            alt=""
          />
          </Navbar.Brand>
          
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand`}
          aria-labelledby={`offcanvasNavbarLabel-expand`}
          placement="end"
        >
          <Offcanvas.Header closeButton><div
            style={{
              borderRadius: "50%",
              backgroundColor: user ? "green" : "red",
              marginLeft: "10px", // Ajusta el margen según sea necesario
              width: "30px", // Ajusta el ancho según sea necesario
              height: "30px", // Ajusta la altura según sea necesario
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="/assets/images/menu/userIcon.png" alt="" />
          </div>
            <Offcanvas.Title style={{color: "#3EB0BE"}} id={`offcanvasNavbarLabel-expand`}>
              MENU
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <hr />
            <Nav className="justify-content-end flex-grow-1 pe-3"style={{color: "#3EB0BE"}}>
            <Nav.Link  href="" > <img
                src="/images/Home/VectorNegro.png"
                alt=""
                style={{ height: "14px", marginRight: "6px" }}
              />Message</Nav.Link>
            <Nav.Link   href="/"><img
                src="/images/Home/Corazón.png"
                alt=""
                style={{ height: "14px", marginRight: "6px" }}
              />Favorites</Nav.Link>
              <hr />

              <Nav.Link  href="/createProperty">List your home</Nav.Link>
              <Nav.Link  onClick={()=>navigate(`/hostProfile/myHome`)}>My properties</Nav.Link>
              <Nav.Link  href=" ">Invite landlord</Nav.Link>
              <Nav.Link  onClick={() => navigate(`/guestProfile`)}>My profile</Nav.Link>
              <Nav.Link  href=" ">Payments / receipts</Nav.Link>
              <hr />
              <Nav.Link  href=" ">Help</Nav.Link>
              <Nav.Link  onClick={() => navigate(`/register`)}>Register</Nav.Link>
              <Nav.Link  onClick={() => navigate(`/login`)}>Login</Nav.Link>
              <Nav.Link onClick={onLogOut} variant="outline-success" href=" ">Sign off</Nav.Link>
          
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        
      </Container>
    </Navbar>
  </>
);
}