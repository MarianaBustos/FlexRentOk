import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Container, Grid, Typography } from '@mui/material'
import { TotalUsers } from '../admin/TotalUsers'
import { useNavigate } from "react-router-dom";
import { NavbarGeneral } from '../../../components/navBarGeneral/NavbarGeneral';
import { Footer } from '../../../components/footer/Footer';
export const Admin = () => {
  const [ setAllUsers] = useState()
  const [total, setTotal] = useState()
  const [totalEnabled, setTotalEnabled] = useState()
  const [totalDisabled, setTotalDisabled] = useState()
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllUsers")
      .then((res) => {
        setAllUsers(res.data);
        console.log(res.data)
        setTotal(res.data.length)
        setTotalEnabled(res.data.filter(e => e.is_deleted_user === 0).length)
        setTotalDisabled(res.data.filter(e => e.is_deleted_user === 1).length)
      })
      .catch((err) => console.log(err))
  }, [])
 
  return (
    <>
      <NavbarGeneral/>
      <Container style={{ height: `calc(100vh - 132px)`}}>
      <Typography variant='h4' sx={{ mb: 5 }}>
        Welcome Admin!      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <TotalUsers
            title={"Total Users"}
            data={total}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TotalUsers
            title={"Active Users"}
            data={totalEnabled}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TotalUsers
            title={"Inactive Users"}
            data={totalDisabled}
          />
        </Grid>
      </Grid>
      <Button style={{
                height: "4vh",
                marginTop: "25px",
                backgroundColor: "#067696",
                borderColor: "transparent",
                color: "white",
                marginLeft: "29px",
                borderRadius: "10px",
              }} onClick={() => navigate(`/adminUsers`)
      }>
        MANAGE USERS
      </Button>
    </Container>
    <Footer/></>
  )
}









