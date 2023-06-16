import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import {Footer} from '../../components/footer/Footer'
import './guestProfile.css'
import { FlexRentContext } from '../../context/FlexRentProvider';
import axios from 'axios';
import { NavbarGeneral } from '../../components/navBarGeneral/NavbarGeneral'
import { Col, Row } from 'react-bootstrap';




export const GuestProfile = () => {

  const [userBids, setUserBids] = useState([]);
  const { user, userProperties } = useContext(FlexRentContext);

 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserBids = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/users/getUserBids/${user.user_id}`);
        setUserBids(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (user && user.user_id) {
      fetchUserBids();
    }
  }, [user]);


  const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };
  const [showChecks, setShowChecks] = useState(false);

  const handleVerifyClick = () => {
    setShowChecks(true);
  };

  return (

<><Row>
<NavbarGeneral/></Row>

<Row className='GuestPage'>
    <Row className='backgroundGuest'>
      <Col className='BotonesPerfilSwitch' >
     <button
          onClick={() => navigate(`/hostProfile/about`)}
          className="BotonSwitch"
          
        >
          <img className='avatarmin'
            src="/assets/images/menu/userIcon.png"
            alt=""
            width="20px"
            height="20px"
           
          />
          switch to host
        </button>

        <button onClick={() => navigate('/editUser')} className='editprofileGuest'>
          <img className="avatarmin" src="/assets/images/Guest_Profile/pen.png" alt="" width='20px' height='20px' /> Edit Profile
        </button>
      </Col></Row>

      <Row className='d-flex' style={{ marginLeft: "3vw" }}>
        <Col className='d-flex'>
        <div>
          <img className='profilePhotoGuest' src={`/images/user/${user?.profile_photo}`} alt="" />
        </div>


        <div className='infoGuest1 d-flex p-2' style={{ lineHeight: "0.5", fontSize: "21px" }}>
          <div className='d-flex numStar' style={{ gap: "1vw" }}>
            
            <p><img className= "imageStar"style={{ width: "16px", height: "16px", marginRight: "10px" }} src="/assets/images/Guest_Profile/star1.png" alt="" />4.56</p>
          </div>
          <p>20 reviews</p>
       {userProperties?.length > 0 ? (
      <h4><strong>Landlord</strong></h4>
    ) : (
      <h4><strong>Tenant</strong></h4>
    )}
        </div>
      </Col></Row>

      <Row className='d-flex rws' style={{ margin: "1vw 5vw 2vw 5vw", padding: "2vw", gap: "9%" }}>
        <Col className='col-lg-4 col-sm-12' >
          <h3><strong> {user?.name} {user?.last_name}</strong></h3>
          <h5 style={{ color: "grey" }}>{user?.occupation}, {calculateAge(user?.birth_date)} YEARS</h5>
          <br />

          
   
          <div className='verified'>
            <div style={{ padding: "1vw" }}>
              <h4 style={{ textAlign: "center" }}>Verified information</h4>
              <br />

              <p className='check'>Email address {showChecks && user?.email ? <img className='cruzcheck' style={{ width: "16px", height: "16px" }} src="/assets/images/Guest_Profile/Tic_Done.png" alt="" /> : <img className='cruzcheck' style={{ width: "16px", height: "16px" }} src="/assets/images/Guest_Profile/Tic_cruz.png" alt="" />}</p>

              <p className='check'>Identity {showChecks && user?.dni ? <img className='cruzcheck' style={{ width: "16px", height: "16px" }} src="/assets/images/Guest_Profile/Tic_Done.png" alt="" /> : <img className='cruzcheck' style={{ width: "16px", height: "16px" }} src="/assets/images/Guest_Profile/Tic_cruz.png" alt="" />}</p>

              <p className='check'>Mobile number {showChecks && user?.phone_number ? <img  className='cruzcheck'style={{ width: "16px", height: "16px" }} src="/assets/images/Guest_Profile/Tic_Done.png" alt="" /> : <img className='cruzcheck' style={{ width: "16px", height: "16px" }} src="/assets/images/Guest_Profile/Tic_cruz.png" alt="" />}</p>
            </div>
            <hr />

            <div style={{ padding: "1vw" }}>
              <h4 style={{ textAlign: "center" }}>Check identity</h4>
              <br />
              <p>Add the identity verification badge to let the rest of the community know that you are who you say you are.</p>
              <br />
              {!showChecks && <button className='verify' onClick={handleVerifyClick}>verify</button>}
            </div>
          </div>

          <div>
            <br />
            <br />
            <h3><strong>Reviews</strong></h3>
            <br />
            <div className='d-flex'>
              <img className='GuestReview' style={{ width: "5vw", height: "5vw" }} src="/assets/images/Guest_Profile/manreview.png" alt="" />
              <div style={{ marginLeft: "2vw", lineHeight: "0.5" }}>
                <p><strong>Jonn Doe</strong></p>
                <p>Milano, Italy</p>
                <img className='GuestReview' src="/assets/images/Guest_Profile/star1.png" alt="" />
                <img className='GuestReview' src="/assets/images/Guest_Profile/star1.png" alt="" />
                <img className='GuestReview' src="/assets/images/Guest_Profile/star1.png" alt="" />
                <img className='GuestReview' src="/assets/images/Guest_Profile/star1.png" alt="" />
                <img className='GuestReview' src="/assets/images/Guest_Profile/star1.png" alt="" />
              </div>
            </div>
            <br />
            <div>
              <p>Sarah thank you for being our guest in Milano, we would love to see you again. You are super organized and calm. You will be always welcome.</p>
            </div>
          </div>
          <br />

          <div className='d-flex'>
            <img className='GuestReview' style={{ width: "5vw", height: "5vw" }} src="/assets/images/Guest_Profile/womenreview.png" alt="" />
            <div style={{ marginLeft: "2vw", lineHeight: "0.5" }}>
              <p><strong>María Ramirez</strong></p>
              <p>Madrid, Spain</p>
              <img className='GuestReview' src="/assets/images/Guest_Profile/star1.png" alt="" />
              <img className='GuestReview' src="/assets/images/Guest_Profile/star1.png" alt="" />
              <img className='GuestReview' src="/assets/images/Guest_Profile/star1.png" alt="" />
              <img className='GuestReview' src="/assets/images/Guest_Profile/star1.png" alt="" />
              <img className='GuestReview' src="/assets/images/Guest_Profile/star1.png" alt="" />
            </div>
          </div>
          <br />
          <div>
            <p>Sarah thank you for being our guest in Milano, we would love to see you again. You are super organized and calm. You will be always welcome.</p>
          </div>
          <br />

          <button className='verify'>show all reviews</button>
        </Col>

        <Col className='col-lg-8 col-sm-12' style={{ width: "55%" }}>
          <h3><strong>About</strong></h3>
          <p className="about-text">{user?.about}</p>
          <hr />
          <br />
          <h3><strong>Properties advertised</strong></h3>
          <br />
          <Row className='propad'>
            <Col lg={4} md={4} sm={12} style={{ lineHeight: "0.5" }}>
              <img className='propertyimg' src="/assets/images/Guest_Profile/bidguestimg1.png" alt="" />
              <br /><br /> <br />
              <p><strong> € 70</strong> night</p>
              <p><strong> Madrid, Spain</strong></p>
              <p style={{ color: "grey" }} className='description' > Cozy room in an oasis</p>
            </Col>

            <Col lg={4} md={4} sm={12}  style={{ lineHeight: "0.5" }}>
              <img className='propertyimg'  src="/assets/images/Guest_Profile/bidguestimg1.png" alt="" />
              <br /><br /> <br />
              <p><strong> € 70</strong> night</p>
              <p><strong> Madrid, Spain</strong></p>
              <p style={{ color: "grey" }} className='description'> Cozy room in an oasis</p>
            </Col>

            <Col lg={4} md={4} sm={12} style={{ lineHeight: "0.5" }}>
              <img className='propertyimg'  src="/assets/images/Guest_Profile/bidguestimg1.png" alt="" />
              <br /><br /> <br />
              <p><strong> € 70</strong> night</p>
              <p><strong> Madrid, Spain</strong></p>
              <p style={{ color: "grey" }} className='description'> Cozy room in an oasis</p>
            </Col>
          </Row>

          <br />
          <hr />
          <br />

          <h3><strong>My bids</strong></h3>
          <br />

          <Row className='d-flex' style={{ display: "flex", gap:"20px"}}>
            {userBids.map((bid) => (
              <Col lg={6} md={6} sm={12} key={bid.bid_id} className="PropFotoInfo" >
                <Col lg={6} md={6} sm={12} className='bidHouseImg'>
                <img className='GuestReview' style={{ width: "300px", borderRadius: "10px" }} src={`/images/properties/${bid.file_name}`} alt="" /></Col>
                <Col lg={6} md={6} sm={12} className='bidInfoGuest'>
                  <div className='d-flex' style={{ flexDirection: "column", marginLeft: "2vw", lineHeight: "0.5", marginTop: "1vh", width: "17vw" }}>
                    <p className='propertyTitle'><strong>{bid.city_name}, {bid.country_name}</strong></p>
                    <p className='propertyTitle'>{bid.name}</p>
                  </div>
                  <br />
                  <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "2vw" }}>
                    <p className='propertyTitle'> <strong>€{bid.price_night}</strong> night</p>
                    
                    {bid.status === 1 ? (
                      <img className='winwon' src="/assets/images/Guest_Profile/won.png" alt="" />
                    ) : bid.status === 2 ? (
                      <img className='winwon'  src="/assets/images/Guest_Profile/loss.png" alt="" />
                    ) : null}
                  </div>
                  <div><button className='BotonMoreGuest' onClick={() => navigate(`/bidDetails/${bid.bid_id}`)}>more info</button></div>
                </Col>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      </Row><Row>
      <Footer /></Row>
  
    </>
  );
}
