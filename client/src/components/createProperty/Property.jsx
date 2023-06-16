import React, { useContext, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { FlexRentContext } from "../../context/FlexRentProvider";
import axios from "axios";

import './createProperty.css'

const initialValue = {
  description: "",
};

export const Property = ({ onNext }) => {
  const [regProperty1, setRegProperty1] = useState(initialValue);
  const [showMsg1, setShowMsg1] = useState("");
  const { user } = useContext(FlexRentContext);

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setRegProperty1({ ...regProperty1, [name]: value });
  };

  const onSubmit1 = () => {
    if (
      !regProperty1.name ||
      !regProperty1.description ||
      !regProperty1.price_night
    ) {
      setShowMsg1("Please fill out all the fields.");
    } else {
      axios

        .post(
          `http://localhost:4000/properties/createProperty1/${user?.user_id}`,
          regProperty1
        )
        .then((res) => {
          console.log(res);
          onNext();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <h1>1. Describe your accommodation</h1>
          <hr />
        </Col>
      </Row>
      <br />
      <Row>
        <p>
          We will ask you what type of accommodation you want to share and if
          guests will have the entire space or just one room. You will then need
          to tell us the location and how many guests can stay.
        </p>
      </Row>
      <br />
      <br />

      <Row>
        <Col className="propertyPrice">
          <Form.Group className="propertyDescription" controlId="propertyDescription">
            <h3>Title</h3>
            <hr />
            <Form.Control
            autoComplete="off"
              as="input"
              name="name"
              value={regProperty1.name}
              onChange={handleChange1}
              placeholder="Give a name to your property"
            />

            <br />

            <h3>Description</h3>
            <hr />
            <Form.Control
              as="textarea"
              rows={5}
              name="description"
              value={regProperty1.description}
              onChange={handleChange1}
              placeholder="Describe your property"
            />
          </Form.Group>
        </Col>
      </Row>

      <br />
      <br />
      <Row>
         <h1>2. Property price</h1>
          <hr />
          <br />
          <br />
        <Col className="propertyPrice">
         
          <Col>
            <h5 className="determineThePrice">
              Determine the minimum price you would accept, per night, for this
              property.
            </h5>
          </Col>
          <Form.Control
          className="priceProperty"
            as="input"
            type="number"
            name="price_night"
            value={regProperty1.price_night}
            onChange={handleChange1}
            placeholder="000.00 €"
          />
          <br />
          <p className="mensajeError">{showMsg1}</p>

          <br />
          <br />
        </Col>
      </Row>
      <Row>
        <Col className="col-6 propertyPrice">
          <Button className="botonNext" variant="primary" onClick={onSubmit1}>
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
};
