import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button'
import NavLink from 'react-bootstrap/esm/NavLink'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BidDetails.css'
import { NavbarGeneral } from '../../../components/navBarGeneral/NavbarGeneral';
import { Footer } from '../../../components/footer/Footer';

export const BidDetails = () => {


  // const { user, setUser } = useContext(FlexRentContext);
  const [bid, setBid] = useState({})

  const navigate = useNavigate();

  const { bid_id } = useParams();

  // Para calcular la diferencia de dias 

  const checkInDate = new Date(bid?.check_in_date);
  const checkOutDate = new Date(bid?.check_out_date);

  const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();

  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  // Para pintar los dias con dia y mes


    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const startDate = new Date(bid?.check_in_date);
const endDate = new Date(bid?.check_out_date);


  const startDay = startDate.getDate();
  const startMonth = months[startDate.getMonth()];

  const endDay = endDate.getDate();
  const endMonth = months[endDate.getMonth()];

  const formattedStartDate = `${startDay} ${startMonth}`;
  const formattedEndDate = `${endDay} ${endMonth}`;

  // Para calcular el FlexRent Fee


// const flexFee = (bid?.price * 0.15).toFixed(2); // Calcula el 15% del Total Price


  // Para editar el bid


  useEffect(() => {
    axios
      .get(`http://localhost:4000/bids/seeBid/${bid_id}`)
      .then((res) => {
        setBid(res.data[0]);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const deleteBid = () => {

    axios
      .put(`http://localhost:4000/bids/cancelBid/${bid_id}`)
      .then((res) => {
        navigate(`/home`);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <>
    <NavbarGeneral/>
   
    <div className='row d-flex' style={{ marginLeft: '40px', gap:"4vw", minHeight: `calc(100vh - 152px)` }}>
      
        <div className='col-12 col-sm-8 col-md-8' style={{ width: '44vw'}}>
          <h3 style={{ color: 'RGB(1, 129, 157)', marginTop: '30px', fontWeight: 'bold' }} >Bid details</h3>
          <br />
          <h2 style={{ marginTop: '4px', fontWeight: 'lighter', fontSize: '25px' }}>Congratulations!</h2>
          <h2 style={{ marginTop: '10px', fontWeight: 'lighter', fontSize: '25px' }}>Thank you for making a bid</h2>

          <div>
            <h4 style={{
              fontWeight: 'bold', marginTop: '20px', color: 'black'
            }}>Next steps</h4>
            <br />

            <div>
              <h5 style={{
                color: 'black', fontSize: '15px'
              }}>1. Wait for the owner confirmation</h5>
              <div className='d-flex justify-content-between align-items-center'>
                <p style={{ fontSize: '10px' }}>You must wait to be approved</p>
                {/* <Button style={{ width: '50px', height: '30px', margin: '1px', fontSize: '10px' }}>Pay</Button> */}
              </div>
            </div>



            <div>
              <h5 style={{
                color: 'black', fontSize: '15px'
              }}>2. Send the host a message</h5>
              <div className='d-flex justify-content-between align-items-center'>
                <p style={{ fontSize: '10px' }}>Send the host a message to coordinate your travel details</p>
                <Button style={{ width: '50px', height: '30px', margin: '1px', fontSize: '10px', backgroundColor: 'transparent', color: 'RGB(68,153,175)', borderColor:"#3EB0BE"  }}>Send</Button>
              </div>
            </div>


            <div>
              <h5 style={{
                color: 'black', fontSize: '15px'
              }}>3. Phone number</h5>
              <div className='d-flex justify-content-between align-items-center'>
                <p style={{ fontSize: '10px' }}>Add and confirm your phone number to receive updates on your trip</p>
                <Button style={{ width: '50px', height: '30px', margin: '1px', fontSize: '10px', backgroundColor: 'transparent', color: 'RGB(68,153,175)', borderColor:"#3EB0BE" }}>Add</Button>
              </div>
            </div>
          </div>
          <hr />
          <div>
            <h4 style={{
              marginTop: '20px', color: 'black', fontSize: '15px'
            }}>Cancellation policy</h4>
            <h5 style={{ fontSize: '10px' }}>Free cancellation for 48 hours.</h5>
            <p style={{ fontSize: '10px' }}>If you cancel before June 24, you will receive a partial refund.</p>
            <NavLink style={{ fontSize: '10px', textDecoration: 'underline' }}>
              More information</NavLink>


            <h4 style={{
              marginTop: '20px', color: 'black', fontSize: '15px'
            }}>Ground rules</h4>
            <p style={{ fontSize: '10px' }}>In order for guests on FlexRent to deliver what is expected of them, we ask that you keep a few details in mind.</p>
            <ul style={{ fontSize: '10px' }}>
              <li>Respect house rules</li>
              <li>Treat your host's space like your own home</li>
            </ul>

            <div className='d-flex align-items-center'>
              <img src="./images/Home/CalendarioAzul.png" alt="" style={{ height: '20px', marginBottom: '18px' }} />
              <p style={{ fontSize: '10px', marginLeft: '10px' }}>We do not confirm the booking until you have paid for the booking (within 24 hours). We don't charge you for anything until then</p>
            </div>
            <br />
            <button style={{ marginLeft: '85px', backgroundColor:"#3EB0BE", color:"white", borderRadius:"10px" }} onClick={() => navigate("CreditCardData")}>Proceed to payment</button>
          </div></div>

    


      <div className='col-12 col-sm-4 col-md-4' style={{ width: '30vw'}}>
        <br /><br />
        <div>
          <h3 style={{ color: 'black', marginTop: '30px', fontWeight: 'bold', fontSize: '24px' }} >Your trip</h3>
          <hr />
          <div className='d-flex'>
            <img src="./images/Home/Casas/image (16).png" alt="" style={{ height: '80px' }} />
            <div className='d-flex flex-column'>
              {/* <h1 style={{ fontSize: '10px', marginLeft: '6px', fontWeight: 'bold' }}>Mallorca, Spain</h1> */}
              <p style={{ fontSize: '10px', marginLeft: '6px' }}>{bid?.name}</p>
              <div className='d-flex justify-content-between'>
                <p style={{ fontSize: '10px', marginLeft: '6px' }}> <b>{bid?.price_night}</b> night</p>

                <img src="./images/Home/40.png" alt="" style={{ height: '10px', marginLeft: '24px', marginTop: '2px' }} />
                <p style={{ fontSize: '10px', marginLeft: '6px' }}> 4.56</p>

              </div>
            </div>
          </div>

          <div className='d-flex align-items-center'>
            <img src="/images/Home/Group.png" alt="" style={{ marginTop: '6px', marginRight: '5px', height: '15px' }} />
            <div className='d-flex justify-content-between align-items-center flex-grow-1'>
              <p style={{ color: 'black', marginTop: '20px', fontWeight: 'bold', fontSize: '15px' }}>{bid?.number_of_guest} Guest</p>
              {/* <NavLink style={{ fontSize: '13px', marginTop: '6px', color: 'RGB(36, 136, 161)' }}>Edit</NavLink> */}
            </div>
          </div>
          <div className='d-flex align-items-center'>
            <img src="/images/Home/Calendario.png" alt="" style={{ marginBottom: '10px', marginRight: '5px', height: '15px' }} />
            <div className='d-flex justify-content-between align-items-center flex-grow-1'>
              <p style={{ color: 'black', marginTop: '4px', fontWeight: 'bold', fontSize: '15px' }}>Date: {formattedStartDate} - {formattedEndDate}</p>
              {/* <NavLink style={{ fontSize: '12px', marginTop: '1px', color: 'RGB(36,136,161)' }}>Edit</NavLink> */}
            </div>
          </div>

          <div>
            <h3 style={{ color: 'black', marginTop: '10px', fontWeight: 'bold', fontSize: '24px' }}>Price details</h3>
            <div className='d-flex align-items-center'>
              <div className='d-flex justify-content-between align-items-center flex-grow-1'>
                <p style={{ color: 'black', marginTop: '10px', fontSize: '12px' }}>€{bid?.price_night} for {differenceInDays} nigths</p>
                <p style={{ fontSize: '12px', marginTop: '15px' }}>€{bid?.price_night * differenceInDays}</p>
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <div className='d-flex justify-content-between align-items-center flex-grow-1'>
                <p style={{ color: 'black', marginBottom: '0px', fontSize: '12px' }}>Cleaning costs</p>
                {/* <img src="/images/Home/Cancel.png" alt="" style={{ marginTop: '2px', marginRight: '220px', height: '12px' }} /> */}
                <p style={{ fontSize: '12px', marginTop: '30px' }}>{bid?.cleaning_fee}</p>
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <div className='d-flex justify-content-between align-items-center flex-grow-1'>
                {/* <p style={{ color: 'black', marginTop: '30px', fontSize: '12px' }}>FlexRent service fee</p>
                <p style={{ fontSize: '12px', marginTop: '30px' }}>{flexFee}</p> */}
              </div>
            </div>

            <div className='d-flex align-items-center'>
              <div className='d-flex justify-content-between align-items-center flex-grow-1'>
                {/* <p style={{ color: 'black', marginTop: '30px', fontWeight: 'bold' }}>Total</p>
                <p style={{ fontSize: '13px', marginTop: '30px', fontWeight: 'bold' }}>€1278</p> */}
              </div>
            </div>
            <hr />

          </div>

          <div>
            <h3 style={{ textAlign: 'center', fontSize: '15px', color: 'black' }}>Additional services</h3>
            <div className='d-flex align-items-center'>
              <div className='d-flex justify-content-between align-items-center flex-grow-1'>
                {/* <p style={{ color: 'grey', marginTop: '30px', fontSize: '12px' }}>Cleaning costs - added</p>
                <p style={{ fontSize: '12px', marginTop: '32px', color: 'grey' }}>€6</p> */}
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <div className='d-flex justify-content-between align-items-center flex-grow-1'>
                <p style={{ color: 'black', marginTop: '4px', fontSize: '12px' }}>Home insurance </p>
                <p style={{ fontSize: '12px', marginTop: '4px', color: 'black' }}>€{bid?.home_insurance}</p>
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <div className='d-flex justify-content-between align-items-center flex-grow-1'>
                <p style={{ color: 'black', marginTop: '4px', fontWeight: 'bold' }}>Total</p>

                <p style={{ fontSize: '13px', marginTop: '4px', color: 'black', fontWeight: 'bold' }}>€ {bid?.price + bid?.home_insurance}</p>
                

              </div>

              <hr />

            </div>
            <button style={{ marginLeft: '85px', backgroundColor:"#3EB0BE", color:"white", borderRadius:"10px" }} onClick={() => navigate(`/editBid/${bid_id}`)}>Edit your bid</button>


            <button style={{ marginLeft: '85px', backgroundColor:"#3EB0BE", color:"white", borderRadius:"10px" }} onClick={deleteBid}>Cancel</button>
           

          </div>

        </div>


      </div>










    </div>
    <Footer/>
    </>
  )
}
