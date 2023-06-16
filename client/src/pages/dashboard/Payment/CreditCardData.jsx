import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

export const CreditCardData = () => {
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
                <option
                  value="Credit Card"
                  style={{ color: "grey", fontSize: "15px" }}
                >
                  Credit Card
                </option>
                <option value="visa">Visa</option>
                <option value="mastercard">American Express</option>
                <option value="amex">MasterCard</option>
                <option value="amex">Discover</option>
                <option value="amex"> Diners Club International</option>
                <option value="amex"> PayPal</option>
                <option value="amex"> Google Pay</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formCardNumber" className="mb-3">
              <Form.Control type="text" placeholder="Number Card" />
            </Form.Group>

            <Form.Group controlId="formExpirationDate" className="mb-3">
              <Form.Control type="text" placeholder="Expiration Date" />
            </Form.Group>

            <Form.Group controlId="formCardHolder" className="mb-3">
              <Form.Control type="text" placeholder="Credit card holder" />
            </Form.Group>

            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Control type="text" placeholder="Address" />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Termino de aceptación y de condiciones. Termino de aceptación y de condiciones. Termino de aceptación y de condiciones. Termino de aceptación y de condiciones. Termino de aceptación y de condiciones. Termino de aceptación y de condiciones. Termino de aceptación y de condiciones. Termino de aceptación y de condiciones. Termino de aceptación y de condiciones. "
                style={{ fontSize: "10px" }}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Proceed to Payment
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};
