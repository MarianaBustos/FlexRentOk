import "./hostProfile.css";
import { FlexRentContext } from "../../context/FlexRentProvider";
import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import "./hostProfile.css";

export const About = () => {
  const { user } = useContext(FlexRentContext);
  

  return (
    <div>
      <Card className="CardHost">
        <Card.Body>
          <Card.Text>
            <p>{user?.about} </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
