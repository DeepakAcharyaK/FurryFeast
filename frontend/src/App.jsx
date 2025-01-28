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
import ViewVeterinary from './pages/userPages/ViewVeterinary';
import PetDetails from './pages/userPages/PetDetails';
import Profile from './pages/userPages/Profile';
import DonationsMade from './pages/userPages/DonationsMade';
import AdoptedPets from './pages/userPages/AdoptedPets';
import RescuedPets from './pages/userPages/RescuedPets';

//admin
import ManageDonation from './pages/adminPages/ManageDonation'
import Payment from './pages/userPages/Payment';


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
                <Route path="/user/:userid/pets/rescue" element={<AddResues userid={userid} />} />
                <Route path="/user/:userid/adopt/pets" element={<ViewAdoptPets userid={userid}/>} />
                <Route path="/user/:userid/view-veterinary" element={<ViewVeterinary />} />
                <Route path="/user/:userid/adopt/pets/petdetails/:id" element={<PetDetails />} />
                <Route path="/user/:userid/profile/settings" element={<Settings />} />
                <Route path="/user/:userid/all/donations/made-by/:userid" element={<DonationsMade />} />
                <Route path="/user/:userid/all/rescued/pets-by/:userid" element={<AdoptedPets />} />
                <Route path="/user/:userid/all/adopted/pets-by/:userid" element={<RescuedPets />} />

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;


