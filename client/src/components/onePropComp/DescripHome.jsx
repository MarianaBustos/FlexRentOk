import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { Carousel } from "react-bootstrap";

export const DescripHome = ({ userProperty, setUserProperty, property_id }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/properties/getInfoProperty/${property_id}`)
      .then((res) => {
        setUserProperty(res.data[0]);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/properties/getPropertyPhotos2/${property_id}`)
      .then((res) => {
        setPhotos(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        <h1 style={{ color: "rgb(5, 119, 148)" }}>{userProperty?.property_name}</h1>
        <p>⭑ 4.56</p> 
        <p>320 reviews</p>
        <h3>{userProperty?.city_name}</h3>
      </div>

      <div className="container">
        <Row>
        <Col className="col-12 col-md-6">
            <div>
              <img
                style={{ maxWidth: '80%', width: '80%', margin: "20px", objectFit: "cover",
                objectPosition: "center",borderRadius:"10%" }}
                src={`/images/Properties/${photos[0]?.file_name}`}
                alt=""
              />
            </div>
          </Col>
          <Col className="col-12 col-md-6">

          <Carousel style={{ width: "50%", height: "auto" }}>
  {photos.slice(1).map((photo) => (
    <Carousel.Item key={photo.photo_id}>
      <img
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          margin: "20px",
        }}
        className="d-block w-100"
        src={`/images/Properties/${photo.file_name}`}
        alt={photo.file_name}
      />
    </Carousel.Item>
  ))}
</Carousel>

           
          </Col>
        </Row>

        <br />

        {/* <Row>
          <Col>
            {userProperty?.pool === 1 ? (
              <img
                style={{ width: "200px" }}
                src="/assets/images/FichaDeProducto/BotonCompletoPisc.png"
                alt=""
              />
            ) : null}
          </Col>
          <Col>
            {userProperty?.ac === 1 ? (
              <img
                style={{ width: "150px" }}
                src="/assets/images/FichaDeProducto/BotonCompAire .png"
                alt=""
              />
            ) : null}
          </Col>
          <Col>
            {userProperty?.gym === 1 ? (
              <img
                style={{ width: "150px" }}
                src="/assets/images/FichaDeProducto/BotonCompletoGym.png"
                alt=""
              />
            ) : null}
          </Col>
        </Row> */}


        <br />

        <hr />

        <br />
      </div>
    </div>
  );
};