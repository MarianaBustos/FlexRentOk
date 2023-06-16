import React from 'react'
import { Button, Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import './createProperty.css'


export const Thanks = () => {
  const navigate = useNavigate();

  return (
    <div className='espacioSuperior'>

     <Row>
      <h2>Thank you for trusting us</h2>
            <hr />
          <Col className='characteristicProperty gracias'>
            <h5>
              This is a neew step in our relationship and we hope it will be a
              very good and long-lasting one.
            </h5>
            <img src="/images/Home/CoraAzul.png" alt="" />
          </Col>
        </Row>
        <Button className='botonNext' onClick={()=>navigate("/HostProfile/myHome")}>My profile</Button>
        <br />
        <br />
    </div>
  )
}
