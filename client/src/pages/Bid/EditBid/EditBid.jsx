import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Card, Button } from 'react-bootstrap';
import "./editBid.css"
import { NavbarGeneral } from '../../../components/navBarGeneral/NavbarGeneral';
import { Footer } from '../../../components/footer/Footer';
export const EditBid = () => {
  const [editBid, setEditBid] = useState({});
  const { bid_id } = useParams();
  const navigate = useNavigate();
  const checkInDate = new Date(editBid?.check_in_date);
  const checkOutDate = new Date(editBid?.check_out_date);
  const differenceInTime = checkOutDate?.getTime() - checkInDate?.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  useEffect(() => {
    axios
      .get(`http://localhost:4000/bids/seeBid/${bid_id}`)
      .then((res) => {
        setEditBid(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleChange = (e) => {
    let { name, value } = e.target;
    setEditBid({ ...editBid, [name]: value });
  };
  const onSubmit = () => {
    const calculatedPrice = editBid?.price_night * differenceInDays;
    const updatedBid = { ...editBid, price: calculatedPrice };
    axios
      .put(`http://localhost:4000/bids/editBid/${bid_id}`, updatedBid)
      .then((res) => {
        navigate(`/bidDetails/${bid_id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <NavbarGeneral />
      <div style={{ height: `calc(100vh - 137px)` }} >
        <hr />
        <a href="" className='todologo'>
          <img className='logo1' src="/assets/images/LoginYRegistro/Text.png" alt="" />
        </a>
        <h3 className='titl4'>Edit your Bid at {editBid?.name}! </h3>
        <p className='par'>Please fill the form</p>
        <div>
          <div>
            <Container className='bid'>
              <Card>
                <Form>
                  <p>
                    <label htmlFor="check_in_date" className='inps'><strong> CheckIn date</strong></label>
                    <input
                      type="date"
                      name="check_in_date"
                      id="startDate"
                      value={editBid?.check_in_date}
                      onChange={handleChange}
                      className='inp1'
                    />
                  </p>
                  <p>
                    <label htmlFor="check_out_date" className='inps'><strong> CheckOut date</strong></label>
                    <input
                      type="date"
                      name="check_out_date"
                      id="endDate"
                      value={editBid?.check_out_date}
                      onChange={handleChange}
                      className='inp1'
                    />
                  </p>
                  <div>
                    <label htmlFor="number_of_guest" className='inps'><strong> Number of guest</strong></label>
                    <select
                      name="number_of_guest"
                      id="numbers"
                      value={editBid?.number_of_guest}
                      onChange={handleChange}
                      className='inp1'
                    >
                      <option value="">Selecciona un número</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                  <h1 name="price" className='price'>Price: {editBid?.price_night * differenceInDays}</h1>
                </Form>
              </Card>
            </Container>
          </div>
        </div>
        <div className='botones'>
          <Button className='bttn' onClick={() => navigate(-1)}>Cancel</Button>
          <Button className='bttn' onClick={onSubmit}>Enter</Button>
        </div>
        <hr />
      </div>
      <Footer />
    </>
  );
};