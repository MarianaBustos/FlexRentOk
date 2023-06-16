import React, { useContext, useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FlexRentContext } from "../../context/FlexRentProvider";

export const InfoPrice = ({ userProperty, allBids, setAllBids, startdate, enddate }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guest, setGuest] = useState(0);
  const [numNights, setNumNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [flexFee, setFlexFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [showError, setShowError] = useState(false); // Variable de estado para mostrar el mensaje de error
  const [showBid, setShowBid] = useState(false);

  const { property_id } = useParams();
  const { user } = useContext(FlexRentContext);
  const [showError2, setShowError2] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    calculatePrice();
  }, [startDate, endDate]);

  const calculatePrice = () => {
    if (startDate && endDate && userProperty) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      const numNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

      const totalPrice = numNights * userProperty.price_night;
      const flexFee = (totalPrice * 0.15).toFixed(2); // Calcula el 15% del Total Price
      const finalPrice = totalPrice + parseFloat(flexFee); // Suma el Flex Fee al Total Price
      const total = finalPrice + userProperty.cleaning_fee; // Suma el Cleaning Fee al Total Price
      setNumNights(numNights);
      setTotalPrice(totalPrice);
      setFlexFee(flexFee);
      setTotal(total);
      setShowError(numNights < 15 || numNights > 90); // Mostrar el mensaje de error si la duración no está entre 15 y 90 días
      setShowError2(startDate < startdate || startDate > enddate); // Mostrar el mensaje de error si no entra en periodo habilitado

  
    }

    
  };

  const createBid = () => {
    const datosImportantes = {
      numNights: numNights,
      price: totalPrice,
      flexFee: flexFee,
      cleaning_fee: userProperty.cleaning_fee,
      check_in_date: startDate,
      check_out_date: endDate,
      number_of_guest: guest,
    };
    axios

      .post(
        `http://localhost:4000/bids/createBid/${property_id}/${user?.user_id}`,
        datosImportantes
      )
      .then((res) => {
        console.log(res);
        setAllBids(res.data);
        navigate("/guestProfile");
      })
      .catch((err) => console.log(err));
  };

  const viewOthersBids = () => {
    axios

      .get(`http://localhost:4000/bids/allBids/${property_id}`)
      .then((res) => {
        setAllBids(res.data);
        console.log(res);
        setShowBid(true)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Row>
        <Col className="col-12 col-md-6">
          <h3>Information about this lodging</h3>
          <p>{userProperty?.description}</p>
          <Row>
            <Col>
              <h3>Property information</h3>
              <div className="">
                {userProperty?.pool === 1 ? (
                  <span className="property-feature"> Pool - </span>
                ) : null}
                {userProperty?.green_zone === 1 ? (
                  <span className="property-feature"> Green Zone - </span>
                ) : null}
                {userProperty?.garage === 1 ? (
                  <span className="property-feature"> Parking - </span>
                ) : null}
                {userProperty?.wifi === 1 ? (
                  <span className="property-feature"> Wifi - </span>
                ) : null}
                {userProperty?.gym === 1 ? (
                  <span className="property-feature"> Gym - </span>
                ) : null}
                {userProperty?.wash_machine === 1 ? (
                  <span className="property-feature"> Wash machine - </span>
                ) : null}
              </div>
              <p>Number of guest: {userProperty?.num_guest}</p>

              <p> Number of bathroom : {userProperty?.num_bathroom}</p>
              <p> Number of bathroom : {userProperty?.num_bathroom}</p>
             <p> Number of bathroom : {userProperty?.num_bed_small_size}</p>
             <p> Number of bathroom : {userProperty?.num_bed_big_size}</p>
             <p> Number of bathroom : {userProperty?.num_bedroom}</p>
            </Col>
          </Row>
        </Col>
        <Col
          className="col-12 col-md-6"
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <h3>Base Price</h3>
          <br />
          <h1 style={{ color: "rgb(5, 119, 148)" }}>
            €{userProperty?.price_night} night
          </h1>

          <br />
          <p>
            <input
              type="date"
              name="check_in_date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ borderRadius: "10px", padding: "5px" }}
            />
          </p>
          <p>
            <input
              type="date"
              name="check_out_date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ borderRadius: "10px", padding: "5px" }}
            />
          </p>
          {showError && (
            <p style={{ color: "red" }}>
              The duration of the stay must be between 15 and 90 days.
            </p>
          )}
          {showError2 && (
            <p style={{ color: "red" }}>
              You have to select a valid period. Please check the calendar and try again.
            </p>
          )}
          <p>
            <select
              name="number_of_guest"
              id="numbers"
              onChange={(e) => setGuest(e.target.value)}
              style={{ borderRadius: "10px", padding: "5px" }}
            >
              <option value="">Selecciona un número</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </p>

          <h3>Price details</h3>
          <Row>
            <Col>
              <p>{numNights} nights </p>
            </Col>
            <Col>
              <p>x €{userProperty?.price_night}</p>
            </Col>
            <Col>
              <h5 style={{ color: "rgb(5, 119, 148)" }}>€{totalPrice}</h5>
            </Col>
          </Row>
          <Row>
            <p>
              Cleaning cost:{" "}
              {userProperty?.cleaning_fee === 1
                ? "€20"
                : `€${userProperty?.cleaning_fee}`}
            </p>

            <p> FlexRent Fee: €{flexFee}</p>
            <h3 style={{ color: "rgb(5, 119, 148)" }}>TOTAL: {total} euros</h3>
          </Row>
          {/* <h3>Additional services</h3>
      <p>Home insurance</p> */}

       

          <button
            onClick={createBid}
            disabled={numNights < 14 || numNights > 90}
            style={{
              color: numNights < 14 || numNights > 90 ? "gray" : "white",
              cursor:
                numNights < 14 || numNights > 90 ? "not-allowed" : "pointer",
              borderRadius: "5px",
              padding: "10px",
              margin: "10px",
              background: "rgb(5, 119, 148)",
            }}
          >
            Place a bid
          </button>


          <button
            onClick={viewOthersBids}
            style={{
              color: "white",
              borderRadius: "5px",
              padding: "10px",
              margin: "10px",
              background: "rgb(5, 119, 148)",
            }}
          >
            View bids from other users
          </button>

          {showBid ? (
            <table style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th align="center" style={{ padding: "10px" }}>
                    CheckIn date
                  </th>
                  <th align="center" style={{ padding: "10px" }}>
                    CheckOut date
                  </th>
                  <th align="center" style={{ padding: "10px" }}>
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {allBids.map((bid) => (
                  <tr key={bid.bid_id}>
                    <td align="center">
                      {new Date(bid.check_in_date).toLocaleDateString()}
                    </td>
                    <td align="center">
                      {new Date(bid.check_out_date).toLocaleDateString()}
                    </td>
                    <td align="center">{bid.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </Col>
      </Row>
    </div>
  );

};