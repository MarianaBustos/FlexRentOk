import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Row, Form, Card } from "react-bootstrap";
import axios from "axios";
import { FlexRentContext } from "../../context/FlexRentProvider";

import './createProperty.css'



export const Publish = ({onNext}) => {

  const { user } = useContext(FlexRentContext);
  const [lastProperty, setLastProperty] = useState({})

  useEffect(() => {
    axios

      .get(`http://localhost:4000/properties/getPropertyId/${user.user_id}`)
      .then((res) => {
        console.log(res);
        setLastProperty(res.data.result.slice(res.data.result.length - 1, res.data.result.length ));
        console.log(res.data)
    
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit5 = () => {
  
      axios
      .put(`http://localhost:4000/properties/publishProperty/${lastProperty[0].property_id}`)
      .then((res) => {
          console.log(res);
          onNext();
        })
      .catch((err) => {
          console.log(err);
        });
    }

  return (
    <div className="seccion">
<Card className="tarjetaPublicacion">
      <Card.Body >
        <Card.Title>{user.name}</Card.Title>
        <Card.Text className="textoTarjeta">
          <i>Then you can add the available booking period</i>
        </Card.Text>
        <Button className="botonNext" variant="primary" onClick={onSubmit5}>Publish</Button>
      </Card.Body>
    </Card>

    </div>
  )
}
