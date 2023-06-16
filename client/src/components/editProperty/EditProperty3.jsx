import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import './editProperty.css'




import { useParams } from "react-router-dom";

export const EditProperty3 = () => {
  const [images, setImages] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [inputImgs, setInputImgs] = useState();
  const [showMsn, setShowMsn] = useState("");

  const { property_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/properties/getPropertyPhotos2/${property_id}`)
      .then((res) => {
        setImages(res.data);
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const delImage = (id) => {

    axios
      .delete(`http://localhost:4000/properties/delPhoto/${id}`)
      .then((res) => {
        const imgProv = images.filter((e) => e.photo_id !== id);
        setImages(imgProv);

        // setImages(images.filter((e)=> e.photo_id !== id ))
      })
      .catch((err) => console.log(err));
  };

  const handleFiles = (e) => {
    setInputImgs(e.target.files);
  };


  const addPictures = () => {
    if (!inputImgs || inputImgs.length === 0) {
      setShowMsn("");
    } else {
      const newFormData = new FormData();

      if (inputImgs) {
        for (const elem of inputImgs) {
          newFormData.append("file", elem);
        }
      }
      axios
        .post(`http://localhost:4000/properties/createProperty4/${property_id}`, newFormData)
        .then((res) => {
          console.log(res.data);
          setShowMsn("");
          setShowInput(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  
  return (
    <Row>
      <Col className="galleryFotos">
        {images?.map((foto) => {
          return (
            <div key={foto.photo_id} className="contFoto">
              <img
              style={{height:"334px",width:"326px",objectFit: "cover", objectPosition: "center", borderRadius: "16%", margin:"5px"}}
                src={`/images/properties/${foto?.file_name}`}
                alt="foto turismo"
              />
              <Button
                variant="danger"
                className="delete"
                onClick={() => delImage(foto.photo_id)}
              >Delete
              </Button>
            </div>
          );
        })}
        <div className="formEdit">
          <Button
          className="botonNext botonOk"
            onClick={() => {
              setShowInput(!showInput);
              setShowMsn("");
            }}
          >
            {!showInput ? "Add" : "Cancel"}
          </Button>
        </div>
        {showInput && (
          <div className="logoEdit">
            <input type="file" multiple onChange={handleFiles} />
            {showMsn}
            <Button className="botonNext" onClick={addPictures}>Aceptar</Button>
          </div>
        )}
        <div className="formEdit">
          <Button className="botonNext botonOk" onClick={()=>navigate(`/oneProperty/${property_id}`)
}>Ok</Button>
   
        </div>
        
      </Col>
    </Row>
  );
};
