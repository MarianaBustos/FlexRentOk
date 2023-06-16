import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import { FlexRentContext } from "../../context/FlexRentProvider";

import './createProperty.css'

const InitialValue = {
  property_type: "Entire Home",
  num_guest: 1,
  num_bedroom: 0,
  num_bathroom:0,
  num_bed_small_size:0,
  num_bed_big_size:0,
};



export const PropertyInfo = ({onNext, propertyId}) => {
  const [regProperty2, setRegProperty2] = useState(InitialValue);
  const [formData, setFormData] = useState({
  });
  const [lastProperty, setLastProperty] = useState({})
  const [showMsg1, setShowMsg1] = useState("");

  const { user } = useContext(FlexRentContext);


  useEffect(() => {
    axios

      .get(`http://localhost:4000/properties/getPropertyId/${user.user_id}`)
      .then((res) => {
        console.log(res);
        setLastProperty(res.data.result.slice(res.data.result.length - 1, res.data.result.length ))
    
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  


  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setRegProperty2({ ...regProperty2, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked ? 1 : 0,
    }));
  };

  

  const onSubmit2 = () => {
    if (
      regProperty2.property_type === ""||
      regProperty2.num_guest === "" ||
      regProperty2.num_bedroom === ""||
      regProperty2.num_bathroom === ""||
      regProperty2.num_bed_big_size === "" ||
      regProperty2.num_bed_small_size === ""
    ) {
      setShowMsg1("Please fill out all the fields.");
    } else {
      axios
      
      .post(`http://localhost:4000/properties/createProperty2/${lastProperty[0].property_id}`, { regProperty2, formData })
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
    <div>
      <div>
        <h1>2. Add basic info about your space</h1>
          <hr />
          <br />
          <br />

        <Row className="characteristicProperty2">
          <Col className="characteristicProperty">
            <h4>Property Type</h4>
            <select name="property_type" id="property_type" value={regProperty2.property_type} onChange={handleChange2}>
              <option value="Entire Home">Home</option>
              <option value="Room">Room</option>
            </select>
          </Col>
        </Row>
        <br />
        <Row>
          <Col className="characteristicProperty">
          <h4>Guests</h4>
            <input
              name="num_guest"
              value={regProperty2.num_guest}
              style={{ width: "30px" }}
              onChange={handleChange2}
            />
           
          </Col>
        </Row>
        <br />
        <Row>
    
          <Col className="characteristicProperty">
           <h4>Bedrooms</h4>
            <input
              name="num_bedroom"
              value={regProperty2.num_bedroom}
              style={{ width: "30px" }}
              onChange={handleChange2}
            />
        
          </Col>
        </Row>

        <br />
        <Row>
        
          <Col className="characteristicProperty">
         <h4>Bathrooms</h4>
            <input
              name="num_bathroom"
              value={regProperty2.num_bathroom}
              style={{ width: "30px" }}
              onChange={handleChange2}
            />
            
          </Col>
        </Row>
        <br />
        <Row>
         
          <Col className="characteristicProperty">
            <h4>Double Beds</h4>
            <input
              name="num_bed_big_size"
              value={regProperty2.num_bed_big_size}
              style={{ width: "30px" }}
              onChange={handleChange2}
            />
          
          </Col>
        </Row>
        <br />
        <Row>
       

          <Col className="characteristicProperty">
           <h4>Single Beds</h4>
            <input
              name="num_bed_small_size"
              value={regProperty2.num_bed_small_size}
              style={{ width: "30px" }}
              onChange={handleChange2}
            />
                     <p>{showMsg1}</p>

          </Col>
        </Row>
        <br />
      </div>
        <h1>3. Home Services</h1>
        <hr />
      <div className="characteristicProperty2">
        
        <h3>Select all the services and comforts that you offer</h3>
        <form>
          <label>
            <input
              type="checkbox"
              name="pool"
              checked={formData.isChecked}
              onChange={handleCheckboxChange}
            />
            Pool
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="green_zone"
              checked={formData.isChecked}
              onChange={handleCheckboxChange}
            />
            Green Zone
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="garage"
              checked={formData.isChecked}
              onChange={handleCheckboxChange}
            />
            Parking
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="wifi"
              checked={formData.isChecked}
              onChange={handleCheckboxChange}
            />
            Wifi
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="tv"
              checked={formData.isChecked}
              onChange={handleCheckboxChange}
            />
            TV
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="gym"
              checked={formData.isChecked}
              onChange={handleCheckboxChange}
            />
            Gym
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="wash_machine"
              checked={formData.isChecked}
              onChange={handleCheckboxChange}
            />
            Washing Machine
          </label>
          <br />
        </form>
      </div>
      <Row>
        <Col className="col-6 botonCentrado">
          <Button className="botonNext " variant="primary" onClick={onSubmit2}>
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
};
