import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./hostProfile.css";


export const BidsOffered = () => {
  const [propertyBids, setPropertyBids] = useState([]);
  const { property_id, bid_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/bids/viewBidsProperty/${property_id}`)
      .then((res) => {
        setPropertyBids(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
 
  const handleApproveBid = (bidId) => {
    axios
      .put(`http://localhost:4000/bids/approveBid/${property_id}/${bidId}`)
      .then((res) => {
        setPropertyBids(res.data.resultProperty);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelBid = (bidId) => {
    axios
      .put(
        `http://localhost:4000/bids/cancelPropertyBid/${property_id}/${bidId}`
      )
      .then((res) => {
        setPropertyBids(res.data.resultProperty);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {propertyBids.map((propertyBid) => {
        return (
          <div key={propertyBid.bid_id}>
            <Card className= "CardHost" style={{margin: "2vw"}}>
              <Card.Header style={{ fontSize: "30px", fontWeight: "bold", backgroundColor:"#DDF1EF", color:"#3EB0BE" }}>
                BIDDER INFO
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <div className="InfoHostBid">
                    <div>
                      <p>
                        <strong>Nombre:</strong> {propertyBid.name}
                      </p>
                      <p>
                        <strong>Apellidos:</strong> {propertyBid.last_name}
                      </p>
                      <p>
                        <strong>Teléfono:</strong> {propertyBid.phone_number}
                      </p>
                      <p>
                        <strong>Email:</strong> {propertyBid.email}
                      </p>
                      <p>
                        <strong>About:</strong> {propertyBid.about}
                      </p>
                    </div>
                    <div >
                      <img style={{ width: "13vh" }}
                        src={`/images/user/${propertyBid.profile_photo}`}
                        alt=""
                      />
                    </div>
                  </div>
                  {/* <button onClick={()=>navigate(`../../guestProfile/${propertyBid.user_id}`)}>more info about the guest</button> */}
                </Card.Text>

                <Card.Header style={{ fontSize: "30px", fontWeight: "bold", backgroundColor:"#DDF1EF", color:"#3EB0BE"  }}>
                  BID INFO:
                </Card.Header>
                <Card.Text>
                  <br />
                  <p>
                    <strong>Cantidad de la puja:</strong> {propertyBid.price}
                  </p>
                  <p>
                    <strong>Check-in date:</strong> {new Date(propertyBid.check_in_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Check-out date:</strong>{" "}
                    {new Date(propertyBid.check_in_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Bid date:</strong> {new Date(propertyBid.check_in_date).toLocaleDateString()}
                  </p>
                </Card.Text>
                {propertyBid.status === 0 && (
                  <>
                  <div className="ButtonHostBid">
                    <Button
                      style={{ height: "5vh", backgroundColor: "#067696", borderColor: "#067696", borderColor: "#067696" }}
                      variant="primary"
                      onClick={() => handleApproveBid(propertyBid.bid_id)}
                    >
                      Accept bid
                    </Button>
                    <Button
                      style={{ height: "5vh", backgroundColor: "#067696", borderColor: "#067696", borderColor: "#067696" }}
                      variant="primary"
                      onClick={() => handleCancelBid(propertyBid.bid_id)}
                    >
                      Cancel bid
                    </Button>
                    <Button
                      style={{ height: "5vh", backgroundColor: "#067696", borderColor: "#067696", borderColor: "#067696" }}
                      variant="primary"
                      onClick={() =>
                        navigate(`../../bidDetails/${propertyBid.bid_id}`)
                      }
                    >
                      more info about bid
                    </Button></div>
                  </>
                )}

                {propertyBid.status === 1 && (
                  <Button
                    style={{ height: "4vh", backgroundColor: "#067696", borderColor: "#067696", borderColor: "#067696" }}
                    variant="primary"
                    onClick={() => handleCancelBid(propertyBid.bid_id)}
                  >
                    Cancel bid
                  </Button>
                )}

                {propertyBid.status === 2 && (
                  <Button style={{ height: "4vh", backgroundColor: "#067696", borderColor: "#067696", borderColor: "#067696" }} variant="primary" disabled>
                    Canceled bid
                  </Button>
                )}
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </>
  );
};
