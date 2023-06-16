import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
// import "../CreateProperties/CreateProperty.css";
import { FlexRentContext } from "../../../context/FlexRentProvider";
import { Footer } from "../../../components/footer/Footer";
import { Property } from "../../../components/createProperty/Property";
import { PropertyInfo } from "../../../components/createProperty/PropertyInfo";
import { CreatePhotos } from "../../../components/createProperty/CreatePhotos";
import { Address } from "../../../components/createProperty/Address";
import { Publish } from "../../../components/createProperty/Publish";
import { Thanks } from "../../../components/createProperty/Thanks";
import { NavbarGeneral } from "../../../components/navBarGeneral/NavbarGeneral";



export const CreateProperty = () => {
  

  const { user, userProperties, setUserProperties } = useContext(FlexRentContext);


  const [currentComponent, setCurrentComponent] = useState(1);
  
  const handleNext = () => {
    setCurrentComponent((prevComponent) => prevComponent + 1);
  };

  return (
    <>
    
     
        <NavbarGeneral/>
 <div style={{padding: "4vw"}}>
      {currentComponent === 1 && <Property onNext={handleNext}  />}
      {currentComponent === 2 && <Address onNext={handleNext}  />}
      {currentComponent === 3 && <PropertyInfo onNext={handleNext}  />}
      {currentComponent === 4 && <CreatePhotos onNext={handleNext}  />}
      {currentComponent === 5 && <Publish onNext={handleNext} />}
      {currentComponent === 6 && <Thanks onNext={handleNext} />}
      
      </div><Footer />

      
    </>


  );
};
