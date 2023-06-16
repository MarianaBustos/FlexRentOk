import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import { FlexRentContext } from "../../context/FlexRentProvider";

import './createProperty.css'

export const CreatePhotos = ({onNext}) => {
  // const [regProperty4, setRegProperty4] = useState({});
  const [files, setFiles] = useState();
  // const [showMsg, setShowMsg] = useState(false);
  const [lastProperty, setLastProperty] = useState({})

  const [photoError, setPhotoError] = useState(false);

  const { user } = useContext(FlexRentContext);

  useEffect(() => {
    axios

      .get(`http://localhost:4000/properties/getPropertyId/${user.user_id}`)
      .then((res) => {
        console.log(res);
        setLastProperty(res.data.result.slice(res.data.result.length - 1, res.data.result.length ))
      
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
 


  const handleFiles = (e) =>{
    setFiles(e.target.files)
    setPhotoError(false); // Reinicia el estado del error

}
const onSubmit4 = () => {
  

  const newFormData =  new FormData();
  newFormData.append("regProperty4", JSON.stringify(files));
  
  if(files && files.length >= 4){
      for(const elem of files){
          newFormData.append("file", elem)
      }
  axios
  

  .post(`http://localhost:4000/properties/createProperty4/${lastProperty[0].property_id}` , newFormData)
  .then((res)=>{
      // setUserTravels(res.data);
      // setShowForm(false)
      onNext();
      console.log(res);
  })
  .catch((error)=>console.log(error))
} else {
  setPhotoError(true);
}

};

  return (
    <div>

<Row>
<h1>4. Add some pictures of your apartment</h1>
<hr />

<div>
  <br />
  <br />

  <h5 className="propertyPrice">
  To start, you will need 4 photos. Then you can add more or make
  changes
</h5>
<br />
<br />
</div>

<br />
<br />
<Row>
  <Col>
    <div class="image-upload">
      <label for="input" class="upload-label">
        <img src="/images/Home/Mas.png" alt="" />
        <span class=""><i>Upload photos here</i></span>
        <br />
       
        <input className="eligeArchivos" id="" type="file" accept="" onChange={handleFiles} multiple/>
      </label>
    </div>
  </Col>
</Row>

<br />
<br />
</Row>

<div className="propertyPrice">
  <Button className="botonNext" onClick={onSubmit4}>Next</Button>
</div>
{photoError && <p>Please upload at least 4 photos.</p>}
<br />
<br />
<br />
<br />
<br />
<br />
<br />
    </div>

  )
}
