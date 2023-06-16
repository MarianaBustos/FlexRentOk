import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import "../CreateProperties/CreateProperty.css";
import { FlexRentContext } from "../../../context/FlexRentProvider";
import { Footer } from "../../../components/footer/Footer";
import { EditProperty1 } from "../../../components/editProperty/EditProperty1";
import { EditProperty2 } from "../../../components/editProperty/EditProperty2";
import { EditProperty3 } from "../../../components/editProperty/EditProperty3";
import { NavbarGeneral } from "../../../components/navBarGeneral/NavbarGeneral";
import './editProperty.css'




export const EditProperty = () => {
  

  const { user, userProperties, setUserProperties } = useContext(FlexRentContext);


  const [currentComponent, setCurrentComponent] = useState(1);
  
  const handleNext = () => {
    setCurrentComponent((prevComponent) => prevComponent + 1);
  };


  return (
    <>
      <NavbarGeneral />
      <Container className="editProperty">

      {currentComponent === 1 && <EditProperty1 onNext={handleNext}  />}
      {currentComponent === 2 && <EditProperty2 onNext={handleNext}  />}
      {currentComponent === 3 && <EditProperty3 onNext={handleNext}  />}


      </Container>

      <Footer />
    </>
  );
};