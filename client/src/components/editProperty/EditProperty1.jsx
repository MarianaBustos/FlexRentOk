import React, { useState, useEffect } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";



import './editProperty.css'

export const EditProperty1 = ({onNext}) => {
  const [regProperty1, setRegProperty1] = useState({});
  const [showMsg1, setShowMsg1] = useState("");
  const { property_id } = useParams();
 const [property, setProperty] = useState()
 



useEffect(() => {
  axios
    .get(`http://localhost:4000/properties/getInfoProperty/${property_id}`)
    .then((res) => {
      setProperty(res.data[0]);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);



  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };  
  const onSubmit1 = () => {
    if (
      !property.name ||
      !property.description ||
      !property.price_night
    ) {
      setShowMsg1("Please fill out all the fields.");
    } else {
      axios
      
      .put(`http://localhost:4000/properties/editProperty1/${property_id}`, property)
      .then((res) => {
          console.log(res);
          onNext();
        })
      .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <><div style={{ height: `calc(100vh - 132px)` }} >
    <div className="logoEdit">
      <a href="/">
        <img src="/assets/images/LoginYRegistro/Text.png" alt="" />
      </a>
      <h3>Edit your Property!</h3>
      <hr />
    </div>
      <div>
        <Row>
          <Col className="formEdit">
            <Form.Group>
              <Form.Label>Property Name</Form.Label>
              <Form.Control
                as="input"
                name="name"
                value={property?.name}
                onChange={handleChange1}
                placeholder={"Give a name to your property"}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col className="formEdit">
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="input"
                name="description"
                value={property?.description}
                onChange={handleChange1}
                placeholder="Give a description to your property"
              />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <h5>2. Property price</h5>
            <hr />
           
            <Col className="formEdit">
              <br />
              <br />
              <h5>
                Determine the minimum price you would accept, per night, for
                this property.
              </h5>
            </Col>
            <br />
            
            <div className="formEdit">
              <Form.Control
              as="input"
              type="number"
              name="price_night"
              value={property?.price_night}
              onChange={handleChange1}
              placeholder="price"
            />
            </div>
            
            <br />
            <p>{showMsg1}</p>

          </Col>
        </Row>
        <Row>
          <Col className="col-6 formEdit">
            <Button className="botonNext" variant="primary" onClick={onSubmit1}>
              Next
            </Button>
          </Col>
        </Row>
      </div></div>
    </>
  );
};
