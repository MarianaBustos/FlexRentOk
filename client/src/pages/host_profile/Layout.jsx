import React from 'react'
import { Button } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'
import { HostProfile } from './HostProfile';
export const Layout = () =>{
    const navigate = useNavigate();
return (
  <div className='row'>
    <div className='col-3'>
      <Button onClick={()=>navigate("/hostProfile/")}>About</Button>
      <Button onClick={()=>navigate("myHome")}>My home</Button>
      <Button onClick={()=>navigate("photos")}>Fotos</Button>
      <Button onClick={()=>navigate("reviews")}>Reviews</Button>
      
    </div>
    <div>
      <Outlet/>
      <HostProfile />
    </div>
 </div>
)
}
