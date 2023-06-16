import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Payment.css'

export const CreditCardData5 = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="message-box">
                <h4 style={{ fontSize: '15px', color: 'black' }}>Add your phone number</h4>
                <p style={{ fontSize: '10px', color: 'black' }}>
                    We'll send you trip updates and an SMS to verify this number
                </p>
                <div className="form-group">
                    <label htmlFor="countryCode" style={{ fontSize: '10px', marginLeft: '12px' }}>País/Región</label>
                    <input type="text" id="countryCode" className="form-control" placeholder="España (+34)" />
                </div>
                <div className="form-group">
                    <br />
                    <input type="text" id="phoneNumber" className="form-control" placeholder="Phone Number" />
                </div>
                <br />
                <div className="form-group form-check">
                    <p style={{ fontSize: '12px', color: 'black', marginRight: '0px' }}>We will send you a code by SMS to confirm your number. Standard message and data rates apply</p>

                </div>
                <br />
                <Button variant="primary" style={{ marginLeft: '50%' }}>Send Code</Button>
            </div>
        </div>
    )
}
