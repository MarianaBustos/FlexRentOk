import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FlexRentContext } from "../../context/FlexRentProvider";

import './createProperty.css'

import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const Address = ({ onNext, propertyId }) => {
  const [regProperty3, setRegProperty3] = useState({});
  const [idState, setIdState] = useState(0);
  const [idProvince, setIdProvince] = useState(0);
  const [idCity, setIdCity] = useState(0);
  const [lastProperty, setLastProperty] = useState({});
  const [state, setState] = useState([]);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [showMsg1, setShowMsg1] = useState("");

  const { user } = useContext(FlexRentContext);

  useEffect(() => {
    axios

      .get(`http://localhost:4000/properties/getPropertyId/${user.user_id}`)
      .then((res) => {
        console.log(res);
        setLastProperty(
          res.data.result.slice(
            res.data.result.length - 1,
            res.data.result.length
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios

      .get("http://localhost:4000/properties/getAllState")
      .then((res) => {
        console.log(res);

        setState(res.data.resultState);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios

      .get(`http://localhost:4000/properties/getAllProvince/${idState}`)
      .then((res) => {
        console.log(res);
        setProvince(res.data.resultProv);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idState]);

  useEffect(() => {
    axios

      .get(`http://localhost:4000/properties/getAllCity/${idProvince}`)
      .then((res) => {
        console.log(res);
        setCity(res.data.resultCity);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idProvince]);

  const handleChange3 = (e) => {
    const { name, value } = e.target;
    setRegProperty3({ ...regProperty3, [name]: value });
  };

  const handleStateChange = (event) => {
    setIdState(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setIdProvince(event.target.value);
  };

  const handleCityChange = (event) => {
    setIdCity(event.target.value);
  };

  const onSubmit3 = () => {
    if (
      !regProperty3.street ||
      !idState ||
      !idProvince ||
      !idProvince
    ) {
      setShowMsg1("Please fill out all the fields.");
    } else {
    axios
      .post(`http://localhost:4000/properties/createProperty3/${lastProperty[0].property_id}`, {
        regProperty3,
        idState,
        idProvince,
        idCity,
      })
      .then((res) => {
        console.log(res);
        onNext();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  }
  return (
    <div>
      <h1>3. Location</h1>
        <hr />

      <Row >
        <div className="inputLocation">
          <label htmlFor="street">street</label>
        <p>{showMsg1}</p>
        <input
        autoComplete="off"
        className="barraInput"
          name="street"
          value={regProperty3.street}
          onChange={handleChange3}
        />
        <label htmlFor="floor">floor</label>
        <input
        className="barraInput"
          name="floor"
          value={regProperty3.floor}
          onChange={handleChange3}
        />
        </div>
        

    
        <div className="inputLocation">
          <label htmlFor="stateSelect">Select autonomous community:</label>
          <select
            id="stateSelect"
            value={idState}
            onChange={handleStateChange}
            name="state"
          >
            <option value="">Select</option>
            {state.map((state) => (
              <option key={state.state_id} value={state.state_id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
       

        <div className="inputLocation">
          <label htmlFor="provinceSelect">Select province:</label>
          <select
            id="provinceSelect"
            value={idProvince}
            onChange={handleProvinceChange}
            name="province"
          >
            <option value="">Select</option>
            {province.map((province) => (
              <option key={province.province_id} value={province.province_id}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
  

        <div className="inputLocation">
          <label htmlFor="citySelect">Select city:</label>
          <select
            id="citySelect"
            value={idCity}
            onChange={handleCityChange}
            name="city"
          >
            <option value="">Select</option>
            {city.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name}
              </option>
            ))}
          </select>

        </div>


      </Row>
      <br />
      <Row>
        <Col className="col-6 inputLocation">
          <Button className="botonNext" variant="primary" onClick={onSubmit3}>
            Next
          </Button>
        </Col>
      </Row>
      <br />
    </div>
  );
};
