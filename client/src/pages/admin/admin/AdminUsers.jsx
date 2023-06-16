import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavbarGeneral } from '../../../components/navBarGeneral/NavbarGeneral';
import "./adminUsers.css"
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../../components/footer/Footer';
export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('http://localhost:4000/admin/getAllUsers')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err))
  }, []);
  const handleEnabled = (id, status) => {
    let url = `http://localhost:4000/admin/disableUser/${id}`;
    if (status === 1) {
      url = `http://localhost:4000/admin/enableUser/${id}`;
    }
    axios
      .put(url)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(searchValue.toLowerCase());
  });
  return (
    <>
      <NavbarGeneral />
      <TextField
        label="Search by Name"
        value={searchValue}
        onChange={handleSearchChange}
        className='textf'
      />
      <Button onClick={() => navigate('/admin')}
        className='fB'
      >Return</Button>
      <TableContainer component={Paper} className='tdo'>
        <Table aria-label="simple table">
          <TableHead className='tabC' >
            <TableRow >
              <TableCell align="center" className='uI1'>User_id</TableCell>
              <TableCell align="center" className='uI'>Nombre</TableCell>
              <TableCell align="center" className='uI'>Apellidos</TableCell>
              <TableCell align="center" className='uI'>email</TableCell>
              <TableCell align="center" className='uI'>is Deleted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.user_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className='spa'
              >
                <TableCell component="th" scope="row" className='uI'>
                  {user.user_id}
                </TableCell>
                <TableCell align="center" className='uI'>{user.name}</TableCell>
                <TableCell align="center" className='uI'>{user.last_name}</TableCell>
                <TableCell align="center" className='uI'>{user.email}</TableCell>
                <TableCell align="center" className='uI'>{user.is_deleted_user}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleEnabled(user.user_id, user.is_deleted_user)}>
                    {user.is_deleted_user === 0 ? "Disable" : "Enable"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </>
  )
}