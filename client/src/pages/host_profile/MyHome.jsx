import "./hostProfile.css";
import { FlexRentContext } from "../../context/FlexRentProvider";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const MyHome = () => {
  const { user, userProperties } = useContext(FlexRentContext);

  const navigate = useNavigate();
  //  const property = userProperty?.find(property => property.user_id === user.id);
  return (
    <div>
      {userProperties?.map((property) => (
        <Card className="CardHost">
          <Card.Body>
            <Card.Text>
              <p><strong> House:</strong> {property.name}</p>
              <p><strong>Description:</strong> {property.description}</p>
            </Card.Text>

            <Button
              style={{
                height: "4vh",
                marginTop: "25px",
                backgroundColor: "#067696",
                borderColor: "transparent",
                color: "white",
                marginLeft: "29px",
                borderRadius: "10px",
              }}
              variant="primary"
              onClick={() => navigate(`../bidsOffered/${property.property_id}`)}
            >
              ver pujas
            </Button>
            <Button
              style={{
                height: "4vh",
                marginTop: "25px",
                backgroundColor: "#067696",
                borderColor: "transparent",
                color: "white",
                marginLeft: "29px",
                borderRadius: "10px",
              }}
              variant="primary"
              onClick={() => navigate(`/oneProperty/${property.property_id}`)}
            >
              más info
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
