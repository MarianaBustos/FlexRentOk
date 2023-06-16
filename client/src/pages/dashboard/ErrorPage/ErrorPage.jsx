import React from 'react'
import { NavbarGeneral } from '../../../components/navBarGeneral/NavbarGeneral'
import { useNavigate } from 'react-router-dom'

export const ErrorPage = () => {

    const navigate = useNavigate();

  return (
    <>
<NavbarGeneral/>

<h2 style={{color:"#3EB0BE", textAlign: "center", marginTop:"20vh"}}>Error page</h2>
<h3 style={{color:"#3EB0BE", textAlign: "center",  pointerEvents: "pointer",marginTop:"5vh"}} onClick={() =>navigate(`/home`)}>Go Home</h3>
    </>
  )
}
