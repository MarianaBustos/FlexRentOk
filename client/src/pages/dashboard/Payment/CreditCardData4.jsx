import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './Payment.css'

export const CreditCardData4 = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="message-box">
                <h4 style={{ fontSize: '15px', color: 'black' }}>Send the host a message</h4>
                <p style={{ fontSize: '10px', color: 'black' }}> Send the host a message to coordinate your travel details</p>
                <div className="user-info">
                    <img src="/images/Home/eloy.png" alt="" style={{ height: '40px' }} />
                    <span className="username" style={{ marginLeft: '10px', marginTop: '5px', color: 'black' }}>Eloy</span>
                </div>
                <Form.Group controlId="messageTextarea" >
                    <Form.Control as="textarea" rows={3} placeholder="" style={{ marginTop: '20px', marginBottom: '10px', width: '500px' }} />
                </Form.Group>
                <Button variant="primary">Send Message</Button>
            </div>
        </div>
    )
}
