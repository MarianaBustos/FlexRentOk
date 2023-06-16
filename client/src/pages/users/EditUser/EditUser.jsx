import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FlexRentContext } from '../../../context/FlexRentProvider';
import { Card, Button } from 'react-bootstrap';
import './EditUser.css'

const initialValue = {
  name: "",
  last_name: "",
  dni: "",
  birth_date: "1900-01-01",
  // email: "",
  // password: "",
  phone_number: "",
  occupation: "",
  about: ""
};

export const EditUser = () => {
  const { user, setUser } = useContext(FlexRentContext);
  const [editUser, setEditUser] = useState(initialValue);
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const [showMsg1, setShowMsg1] = useState("");

  useEffect(() => {
    if (user) {
      setEditUser(user);
    }
  }, [user]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleFiles = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = () => {
    const newFormData = new FormData();
    newFormData.append("file", file);
    newFormData.append("editUser", JSON.stringify(editUser));
    if (
      !editUser.name ||
      !editUser.last_name ||
      !editUser.dni ||
      !editUser.phone_number ||
      !editUser.birth_date ||
      !editUser.occupation ||
      !editUser.about
    ) {
      setShowMsg1("Please fill out all the fields.");
    } else {
    axios
      .put(`http://localhost:4000/users/editUser/${editUser.user_id}`, newFormData)
      .then((res) => {
        setUser({ ...editUser, img: res.data.img });
        navigate('/guestProfile');
      })
      .catch((err) => {
        console.log(err);
      });
  };}

  return (
    <div style={{ border: '1px solid #CCCCCC', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', margin:"30px" }}>
      <hr />

      <div className='EditUser'>
        <div ><a href=""><img src="/assets/images/LoginYRegistro/Text.png" alt="" /></a>
      <h3>Welcome back!</h3>
      <p>We are ready for the next adventure</p></div>
      <div style={{display:"grid"}}>
        <input
        style={{width: "100%"}}
          className="m-2"
          placeholder="Nombre"
          name="name"
          onChange={handleChange}
          value={editUser.name}
          autoComplete="off"
        />
        <input
        style={{width: "100%"}}
          className="m-2"
          placeholder="Last Name"
          name="last_name"
          onChange={handleChange}
          value={editUser.last_name}
          autoComplete="off"
        />
        <input
        style={{width: "100%"}}
          className="m-2"
          placeholder="DNI"
          name="dni"
          onChange={handleChange}
          value={editUser.dni}
          autoComplete="off"
        />
        <input
        style={{width: "100%"}}
          type="date"
          className="m-2"
          placeholder="Birth date"
          name="birth_date"
          onChange={handleChange}
          value={editUser.birth_date}
          autoComplete="off"
        />
        <input
        style={{width: "100%"}}
          type="text"
          className="m-2"
          placeholder="Phone number"
          name="phone_number"
          onChange={handleChange}
          value={editUser.phone_number}
          autoComplete="off"
        />
        <input
        style={{width: "100%"}}
          type="text"
          className="m-2"
          placeholder="Occupation"
          name="occupation"
          onChange={handleChange}
          value={editUser.occupation}
          autoComplete="off"
        />
        <input style={{width: "100%"}}
          type="text"
          className="m-2 "
          placeholder="About"
          name="about"
          onChange={handleChange}
          value={editUser.about}
          autoComplete="off"
        />
        <label htmlFor="">Attach your photo</label>
        <input
        style={{margin:"20px"}}
          type="file"
          onChange={handleFiles}
        />
        
      </div >{showMsg1}

      <button  onClick={onSubmit} style={{ margin: '20px', backgroundColor: '#067696', color: 'white', borderRadius: '10px', padding: '10px 20px', border: 'none' }}>Enter</button></div>
      <div>
      
      <div style={{display:"flex", justifyContent:"center", alignItems:"center" }} >
        <a href=""><img className="LogoBoton" src="/assets/images/LoginYRegistro/applebutton.png" alt="" /></a>
        <a href=""><img className="LogoBoton" src="/assets/images/LoginYRegistro/googlebutton.png" alt="" /></a>
        <a href=""><img className="LogoBoton" src="/assets/images/LoginYRegistro/Face.png" alt="" /></a>
      </div>

      <br />
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <div style={{display:"flex", gap:"10px"}}>
        <p>You do not have an account? </p>
        <a href="">Sign up</a></div>
      </div>
    </div></div>
  );
};