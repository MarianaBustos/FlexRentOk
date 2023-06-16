import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

export const CreditCardData2 = () => {
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-5">
          <Form>
            <div className="d-flex align-items-center mb-3">
              <h5 className="me-2" style={{ color: "black" }}>
                Pay with
              </h5>
              <img
                src="/images/Home/tarjetas.png"
                alt=""
                className="ms-auto"
                style={{ marginRight: "20px" }}
              />
            </div>
            <Form.Group controlId="formCardType" className="mb-3">
              <Form.Select>
                <option value="amex"> PayPal</option>
                <option value="visa">Visa</option>
                <option value="mastercard">American Express</option>
                <option value="amex">MasterCard</option>
                <option value="amex">Discover</option>
                <option value="amex"> Diners Club International</option>
                <option value="amex"> Google Pay</option>
              </Form.Select>
            </Form.Group>

            <p style={{ color: "black", fontSize: "12px", marginLeft: "12px" }}>
              Please log in to use Paypal
            </p>
            <Form.Group controlId="formBasicCheckbox" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Termino de aceptación y de condiciones. Termino de aceptación y de condiciones. Termino de aceptación y de condiciones. Termino de aceptación y de condiciones. Termino de aceptación y de condiciones. Termino de aceptación y de condiciones. Termino de aceptación y de condiciones. Termino de aceptación y de condiciones. Termino de aceptación y de condiciones. "
                style={{ fontSize: "10px" }}
              />
            </Form.Group>

            <Button
              type="submit"
              style={{
                border: "none",
                background: "none",
                padding: 0,
                marginLeft: "40%",
                marginTop: "20px",
              }}
            >
              <img
                src="/images/Home/paypal.png"
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};
