import React, { useContext, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FlexRentContext } from '../../../context/FlexRentProvider';

// import { AllUsers } from '../allUsers/AllUsers';

import { useNavigate } from 'react-router-dom';
import { Register } from '../../auth/register/Register';

export const User = () => {
  const { user } = useContext(FlexRentContext);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/allUsers');
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Row style={{ marginLeft: '20px', marginTop: '20px' }}>
        <h1>User profile</h1>
        <hr />
        <br />
      </Row>
      <Row>
        <Col md={8}>
          <Card.Body style={{ color: 'black', marginLeft: '20px' }}>
            <h4>Name: {user?.name}</h4>
            <h4>Last name: {user?.last_name}</h4>
            <h4>DNI: {user?.dni}</h4>
            <h4>Email: {user?.email}</h4>
            <h4>Phone: {user?.phone_number}</h4>
            <h4>Occupation: {user?.occupation}</h4>
            <h4>Description: {user?.about} </h4>
            <h4>Birthday: {formatDate(user?.birth_date)}</h4>
            <br />
            <Button onClick={handleBack} style={{ height: '50px', width: '80px', marginLeft: '30%', marginTop: '15px' }}>Back</Button>
          </Card.Body>
        </Col>
        <Col md={4} className="d-flex align-items-center justify-content-center">
          <img src={`${user?.profile_photo}`} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </Col>
      </Row>
    </>
  );
}