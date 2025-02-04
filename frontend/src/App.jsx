import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoutes from './components/ProtectedRoutes';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

//user
import AddDonations from './pages/userPages/AddDonations';
import AddResues from './pages/userPages/AddResues';
import Settings from './pages/userPages/Settings';
import ViewAdoptPets from './pages/userPages/ViewAdoptPets';
import ViewGallery from './pages/userPages/ViewGallery';
import ViewWorks from './pages/userPages/ViewWorks';
import ViewVeterinary from './pages/userPages/ViewVeterinary';
import PetDetails from './pages/userPages/PetDetails';
import Profile from './pages/userPages/Profile';
import DonationsMade from './pages/userPages/DonationsMade';
import AdoptedPets from './pages/userPages/AdoptedPets';
import RescuedPets from './pages/userPages/RescuedPets';
import Payment from './pages/userPages/Payment';
import AllRescueInfo from './pages/userPages/AllRescueInfo'

//admin
import ManageDonation from './pages/adminPages/ManageDonation'
import Dashboards from './pages/adminPages/Dashboards';
import ManageGallery from './pages/adminPages/ManageGallery';
import ManageRescue from './pages/adminPages/ManageRescue';
import ManagePetDog from './pages/adminPages/ManagePetDog';
import ManageVeterinary from './pages/adminPages/ManageVeterinary';
import ManageVaccination from './pages/adminPages/ManageVaccination';
import Setting from './pages/adminPages/Setting';


function App() {
  const [isloggedin, setIsloggedin] = useState(localStorage.getItem('isloggedin') === 'true');
  const [userid, setuserid] = useState(localStorage.getItem('userid') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    setIsloggedin(localStorage.getItem('isloggedin') === 'true');
    setuserid(localStorage.getItem('userid') || '');
    setRole(localStorage.getItem('role') || '');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {!isloggedin ? (
          <>
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={<Login setIsloggedin={setIsloggedin} setRole={setRole} />}
            />
            <Route path="/signup" element={<Signup setuserid={setuserid} />} />
          </>
        ) : (
          <Route element={<ProtectedRoutes />}>
            <Route path="/:userid" element={<Landing />} />
            <Route path="/login" element={<Navigate to={`/${userid}`} />} />
            <Route path="/signup" element={<Navigate to={`/${userid}`} />} />

            {role !== 'admin' && (
              <>
                <Route path="/user/:userid/make-a-donation" element={<AddDonations userid={userid}/>} />
                <Route path="/user/:userid/donation/:donationid/payment/type/details" element={<Payment userid={userid}/>} />
                <Route path="/user/:userid/view-gallery" element={<ViewGallery />} />
                <Route path="/user/:userid/view-available-works" element={<ViewWorks userid={userid} />} />
                <Route path="/user/:userid/pets/rescue" element={<AddResues userid={userid} />} />
                <Route path="/user/:userid/adopt/pets" element={<ViewAdoptPets userid={userid}/>} />
                <Route path="/user/:userid/view-veterinary" element={<ViewVeterinary />} />
                <Route path="/user/:userid/adopt/pets/petdetails/:id" element={<PetDetails userid={userid}/>} />
                <Route path="/user/:userid/profile/settings" element={<Settings />} />
                <Route path="/user/:userid/all/donations/made-by/:userid" element={<DonationsMade userid={userid} />} />
                <Route path="/user/:userid/all/rescued/pets-by/:userid" element={<RescuedPets userid={userid} />} />
                <Route path="/user/:userid/all/rescue/information/given-by/:userid" element={<AllRescueInfo userid={userid} />} />
                <Route path="/user/:userid/all/adopted/pets-by/:userid" element={<AdoptedPets userid={userid} />} /> 

              </>
            )}

            {
              role==='admin' &&(
                <>
                  <Route path="/adminDashboard" element={<ManageDonation/>} />
                </>
              )
            }
          </Route>
        )}
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Navigate to="/" />} />





        <Route path="/adminDashboard" element={<Dashboards/>} />
        <Route path="/manageRescue" element={<ManageRescue/>} />

        <Route path="/Donations" element={<ManageDonation/>} />
        <Route path='/adminSetting' element={<Setting/>} />
        <Route path="/adminGallery" element={<ManageGallery/>} />
        <Route path="/managePetDog" element={<ManagePetDog/>} />
        <Route path='/manageVeterinary' element={<ManageVeterinary/>} />
        <Route path='/manageVaccination' element={<ManageVaccination/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


