import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "../pages/auth/register/Register";
import { OneProperty } from "../pages/Properties/OneProperty/OneProperty";
import { User } from "../pages/users/User/User";
import { EditUser } from "../pages/users/EditUser/EditUser";
import { Login } from "../pages/auth/login/Login";
import { GuestProfile } from "../pages/guest_profile/GuestProfile";
import { Home } from "../pages/Home/Home";
import { HostProfile } from "../pages/host_profile/HostProfile";
import { About } from "../pages/host_profile/About";
import { MyHome } from "../pages/host_profile/MyHome";
// import { Photos } from "../pages/host_profile/Photos";
import { Reviews } from "../pages/host_profile/Reviews";
import { AllProperties } from "../pages/Properties/AllProperties/AllProperties";
import { BidDetails } from "../pages/Bid/BidDetails/BidDetails";
import { EditBid } from "../pages/Bid/EditBid/EditBid";
import { BidsOffered } from "../pages/host_profile/BidsOffered";
import { Admin } from "../pages/admin/admin/Admin";

// import { AllUsers } from "../pages/users/allUsers/AllUsers";

import { CreateProperty } from "../pages/Properties/CreateProperties/CreateProperty";
import { EditProperty } from "../pages/Properties/EditProperty/EditProperty";
import { Landing } from "../pages/dashboard/LandingPage/Landing";
import { AdminUsers } from "../pages/admin/admin/AdminUsers";
import { ErrorPage } from "../pages/dashboard/ErrorPage/ErrorPage";
// import { Payment } from "../pages/dashboard/Payment/Payment";
export const AppRoutes = () => {
  return (
    <Container fluid>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Landing />} />
          {/* <Route path='/payment' element={<Payment />} /> */}
          <Route path='/home' element={<Home />} />
          <Route path='/createProperty' element={<CreateProperty />} />
          <Route path='/oneProperty/:property_id' element={<OneProperty />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/adminUsers" element={<AdminUsers />} />
            {/* <Route path="/allUsers" element={< AllUsers />} /> */}
          <Route path='/editProperty/:property_id' element={<EditProperty />} />
          <Route path='/user' element={<User />} />
          <Route path='/editUser' element={<EditUser />} />
          <Route path='/guestProfile' element={<GuestProfile />} />
          <Route path="/allProperties" element={<AllProperties />} />
          <Route path="/bidDetails/:bid_id" element={<BidDetails />} />
          <Route path="/editBid/:bid_id" element={<EditBid />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path="/hostProfile" element={<HostProfile />}>
            <Route path="about" element={<About />} />
            <Route path="myHome" element={<MyHome />} />
            {/* <Route path="photos" element={<Photos />} /> */}
            <Route path="reviews" element={<Reviews />} />
            <Route path="bidsOffered/:property_id" element={<BidsOffered />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
};